import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import Handle from './LinearHandle';
import * as t from '../types';
import LM from './LinearMarker';
import { createGlobalStyle } from 'styled-components';

const OutBox = styled.rect<{ light: boolean }>`
    fill: ${(p) => (p.light ? t.UICOLOURS.LIGHT_COL : t.UICOLOURS.DARK_COL)};
    transition: fill 0.15s;
`;

interface Props {
    output: (v: number) => any;
    min?: number;
    max?: number;
    value: number;
    height?: string;
    color: string;
    realVal?: number;
}
const GlobalStyles = createGlobalStyle`
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
    height = '16em',
}: Props) => {
    const val = value;
    const width = Number.parseFloat(height.match(/[0-9\.]*/)[0]) / 3 + 'em';
    // eslint-disable-next-line prefer-const
    let [dragging, setDrag] = React.useState(false);
    const slider = React.useRef<SVGSVGElement>();
    const inp = React.useRef<HTMLInputElement>();
    const l = d3.hcl(color).l;

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
            <GlobalStyles />
            <svg
                viewBox='0 0 1.5 5'
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
                        x='0.25'
                        y='0.5'
                        width='1'
                        height='4'
                        rx='0.25'
                    />
                </mask>
                <OutBox
                    light={l <= 50}
                    strokeWidth='0'
                    x='0.2'
                    y='0.45'
                    width='1.1'
                    height='4.1'
                    rx='0.30'
                />
                <OutBox
                    light={!(l <= 50)}
                    strokeWidth='0'
                    x='0.25'
                    y='0.45'
                    width='1'
                    height='4'
                    rx='0.25'
                    mask='url(#rectMask)'
                />
                <rect
                    width={1}
                    height={val * 4}
                    y={0.5 + (1 - val) * 4}
                    x='0.25'
                    fill={color}
                    mask='url(#rectMask)'
                />
                <LM value={realVal} light={!(l <= 50)} />
                <Handle
                    x={0.75}
                    y={0.5 + (1 - val) * 4}
                    lineY={0.5 + (1 - (null == realVal ? val : realVal)) * 4}
                    fillC={color}
                    light={l <= 50}
                    drag={dragging}
                />
            </svg>
            <input
                type='text'
                ref={inp}
                defaultValue={(min + val * (max - min)).toFixed(1)}
                onKeyDown={(e) => {
                    if (/[0-9]|Backspace|Delete|Left|Right|\./.test(e.key)) {
                        return true;
                    } else e.preventDefault();
                    if (/Enter/.test(e.key)) {
                        let n = Number.parseFloat(inp.current.value) ?? 0;

                        n = n < min ? min : n > max ? max : n;
                        inp.current.value = n.toFixed(1);
                        output((n - min) / (max - min));
                    }
                }}
                onBlur={(e) => {
                    inp.current.value = (min + val * (max - min)).toFixed(1);
                    output(val);
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
                    margin: '0 auto',
                    marginTop: '-0.5em',
                    border: 0,
                    width: '3em',
                    font:
                        (1 / 16) * Number.parseInt(height as string) +
                        'em Fira Code',
                    color: ' #232323',
                    textAlign: 'center',
                }}
            />
        </div>
    );
};

export default Slider;
