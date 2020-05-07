import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import Handle from './Handle';
import * as T from '../types';

import { createGlobalStyle } from 'styled-components';
interface Props {
    output: (v: number) => any;
    min?: number;
    max?: number;
    value: number;
    width?: string | number;
    height?: string | number;
    color: string;
    realVal?: number;
}
const Glob = createGlobalStyle`
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    -webkit-overflow-scrolling: touch
}
html,
body {
  /* position: fixed;
  overflow: hidden; */

}
`;

export const Slider = ({
    min = 0,
    max = 10,
    output,
    value,
    realVal,
    color,
    width = '5em',
    height = '16em',
}: Props) => {
    const val = value;

    // eslint-disable-next-line prefer-const
    let [dragging, setDrag] = React.useState(false);
    const bar = React.useRef();
    const slider = React.useRef<SVGSVGElement>();
    const inp = React.useRef<HTMLInputElement>();

    if (inp.current) inp.current.value = (min + val * (max - min)).toFixed(1);

    function updateFromMove(ev: React.MouseEvent | React.TouchEvent) {
        ev.preventDefault();
        ev.stopPropagation();
        if (!dragging) return;
        let mx;
        let my;

        if ((ev as React.TouchEvent).touches) {
            mx = (ev as React.TouchEvent).touches.item(0).pageX;
            my = (ev as React.TouchEvent).touches.item(0).pageY;
        } else {
            my = (ev as React.MouseEvent).pageY;
        }
        const { height, y } = slider.current.getBoundingClientRect();
        let newV =
            1 - Math.round(my - y - height / 6) / Math.round((height / 6) * 4);

        newV = newV < 0 ? 0 : newV > 1 ? 1 : newV;
        newV !== val && output(newV);
    }
    const start = (e: React.TouchEvent | React.MouseEvent) => {
        setDrag(true);
        dragging = true;
        updateFromMove(e);
    };
    const move = (e: React.TouchEvent | React.MouseEvent) => updateFromMove(e);
    const end = (e: React.TouchEvent | React.MouseEvent) => {
        setDrag(false);
        updateFromMove(e);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: width,
                alignItems: 'middle',
            }}>
            <Glob />
            <svg
                viewBox='0 0 1 5'
                height={height}
                width={width}
                ref={slider}
                onMouseDown={start}
                onTouchStart={start}
                onTouchMove={move}
                onTouchEnd={end}
                onMouseUp={end}
                onMouseMove={move}
                onMouseLeave={(e) => setDrag(false)}>
                <mask id='rectMask'>
                    <rect
                        fill='white'
                        x='0'
                        y='0.5'
                        width='1'
                        height='4'
                        rx='0.25'
                    />
                </mask>
                <rect
                    stroke='black'
                    fill='#ff000000'
                    strokeWidth='0.03'
                    x='-0.075'
                    y='.45'
                    width='1.15'
                    height='4.1'
                    rx='0.25'
                />
                <rect
                    width={1}
                    height={val * 4}
                    y={0.5 + (1 - val) * 4}
                    fill={color}
                    mask='url(#rectMask)'
                />
                <Handle
                    x={0.5}
                    y={0.5 + (1 - val) * 4}
                    lineY={0.5 + (1 - (null == realVal ? val : realVal)) * 4}
                    fillC={color}
                    strokeC={d3.hcl(color).l < 60 ? '#ffffff' : '#000000'}
                    drag={dragging}
                />
            </svg>
            <input
                type='text'
                ref={inp}
                defaultValue={(min + val * (max - min)).toFixed(1)}
                min={min}
                max={max}
                step={(max - min) / 10}
                onKeyDown={(e) => {
                    if (/[0-9]|Backspace|Delete|Left|Right/.test(e.key)) {
                        return true;
                    } else e.preventDefault();
                    if (/Enter/.test(e.key)) {
                        let n = Number.parseFloat(inp.current.value) ?? 0;

                        n = n < min ? min : n > max ? max : n;
                        inp.current.value = n.toString();
                        output((n - min) / (max - min));
                    }
                }}
                // onChange={(e) => {
                //     let n = +inp.current.value || 1;

                //     n = n < min ? min : n > max ? max : n;
                //     setVal((n - min) / (max - min));
                // }}
                style={{
                    appearance: 'textarea',
                    WebkitAppearance: 'none',
                    padding: 0,
                    border: 0,
                    fontSize: '1em',
                    textAlign: 'center',
                }}
            />
        </div>
    );
};

export default Slider;
