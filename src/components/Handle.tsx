import React from 'react';
import styled from 'styled-components';
interface Props {
    fillC: string;
    strokeC: string;
    strokeWeight?: number;
    rad?: number;
    x: number;
    drag: boolean;
    y: number;
    lineY: number;
    hovRad?: number;
}

export const Handle = ({
    fillC,
    strokeC,
    x,
    y,
    drag,
    lineY,
    hovRad = 0.4,
    rad = 0.3,
    strokeWeight = 0.01,
}: Props) => {
    const [over, setOver] = React.useState(false);
    const dis = y - lineY;

    return (
        <g transform={`translate(${x}, ${y})`}>
            <path
                stroke={'black'}
                strokeWidth={strokeWeight}
                d={`M-0.5,0L0,0`}
                transform={`translate(0,${dis * -1})`}
            ></path>
            <path
                stroke={'white'}
                strokeWidth={strokeWeight}
                d={`M0,0L0.5,0`}
                transform={`translate(0,${dis * -1})`}
            ></path>
            <circle
                fill={fillC}
                stroke={strokeC}
                onMouseEnter={() => setOver(true)}
                onMouseLeave={() => setOver(false)}
                strokeWidth={drag ? strokeWeight + 0.01 : strokeWeight}
                r={over || drag ? rad + 0.01 : rad}
                className={drag ? 'drag' : ''}
            />
        </g>
    );
};

export default Handle;
