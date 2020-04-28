import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import Handle from './Handle';
import { createGlobalStyle } from 'styled-components';
interface Props {
    output: (v: number) => any;
    min?: number;
    max?: number;
    value?: number;
    width?: string | number;
    height?: string | number;
}
const Glob = createGlobalStyle`
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`;

export const Slider = ({
    min = 0,
    max = 10,
    output = null,
    value = 0.2,
    width = '2em',
    height = '8em',
}: Props) => {
    const [val, setVal] = React.useState(value);

    const [dragging, setDrag] = React.useState(false);
    const handle = React.useRef();
    const bar = React.useRef();
    const slider = React.useRef<SVGSVGElement>();
    const inp = React.useRef<HTMLInputElement>();

    function updateFromMove(ev: React.MouseEvent | React.TouchEvent) {
        ev.preventDefault();
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
        newV !== val && setVal(newV);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: width }}>
            <Glob />
            <svg
                viewBox="0 0 1 5"
                height={height}
                width={width}
                ref={slider}
                onMouseDown={(e) => {
                    setDrag(true);
                    updateFromMove(e);
                }}
                onTouchStart={(e) => {
                    setDrag(true);
                    updateFromMove(e);
                }}
                onTouchMove={(e) => {
                    updateFromMove(e);
                }}
                onTouchEnd={(e) => {
                    setDrag(false);
                    updateFromMove(e);
                }}
                onMouseUp={(e) => {
                    setDrag(false);
                    updateFromMove(e);
                }}
                onMouseMove={(e) => {
                    updateFromMove(e);
                }}
                onMouseLeave={(e) => setDrag(false)}
            >
                <mask id="rectMask">
                    <rect
                        fill="white"
                        x="0"
                        y="0.5"
                        width="1"
                        height="4"
                        rx="0.25"
                    />
                </mask>
                <rect
                    stroke="black"
                    fill="#ff000000"
                    strokeWidth="0.03"
                    x="-0.075"
                    y=".45"
                    width="1.15"
                    height="4.1"
                    rx="0.25"
                />
                <rect
                    width={1}
                    height={val * 4}
                    y={0.5 + (1 - val) * 4}
                    ref={bar}
                    fill={d3.interpolateBrBG(val)}
                    mask="url(#rectMask)"
                />
                <Handle
                    x={0.5}
                    y={0.5 + (1 - val) * 4}
                    fillC={d3.interpolateBrBG(val)}
                    strokeC={
                        d3.hcl(d3.interpolateBrBG(val)).l < 80
                            ? '#ffffff'
                            : '#000000'
                    }
                    drag={dragging}
                    strokeWeight={dragging ? 0.3 : 0.2}
                />
            </svg>
            <input
                type="number"
                ref={inp}
                value={min + val * (max - min)}
                min={min}
                max={max}
                step={(max - min) / 10}
                onChange={(e) => {
                    let n = +inp.current.value || 1;

                    n = n < min ? min : n > max ? max : n;
                    setVal((n - min) / (max - min));
                }}
                style={{
                    appearance: 'textarea',
                    WebkitAppearance: 'none',
                    padding: 0,
                }}
            />
        </div>
    );
};

export default Slider;
