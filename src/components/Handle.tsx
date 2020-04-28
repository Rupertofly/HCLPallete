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
    hovRad?: number;
}
const StyCirc = styled.circle<{ rad: number; hovRad: number }>`
    transform: scale(${(props) => props.rad});
    transition: transform 0.05s ease-out;
    :hover {
        transform: scale(${(props) => props.hovRad});
    }
    &.drag {
        box-shadow: 4px 4px 4px black;
        transform: scale(${(props) => props.hovRad});
    }
`;

export const Handle = ({
    fillC,
    strokeC,
    x,
    y,
    drag,
    hovRad = 0.4,
    rad = 0.3,
    strokeWeight = 0.05,
}: Props) => {
    return (
        <g transform={`translate(${x} ${y})`}>
            <StyCirc
                fill={fillC}
                stroke={strokeC}
                rad={rad}
                hovRad={hovRad}
                strokeWidth={strokeWeight}
                r={1}
                className={drag ? 'drag' : ''}
            />
        </g>
    );
};

export default Handle;
