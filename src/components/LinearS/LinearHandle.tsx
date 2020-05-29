import React from 'react';
import styled from 'styled-components';
import { UICOLOURS as UC } from '../../types';
interface Props {
    fillC: string;
    light: boolean;
    strokeWeight?: number;
    rad?: number;
    x: number;
    drag: boolean;
    y: number;
    lineY: number;
    hovRad?: number;
}
const smSize = 0.25;
const hvSize = 0.37;

interface HProps {
    colour: string;
    light: boolean;
    dragged: boolean;
    scCol?: any;
    sW?: any;
    hS?: any;
    pushed?: any;
}
const HCircle = styled.circle.attrs<HProps>((p) => ({
    style: {
        fill: p.colour,
        stroke: p.light ? UC.LIGHT_COL : UC.DARK_COL,
        transform: p.dragged ? `scale(${hvSize})` : undefined,
    },
}))<HProps>`
    stroke-width: ${0.08 * (1 / smSize)};
    transform-box: fill-box;
    transform-origin: center;
    transform: scale(${smSize});
    transition: transform 0.15s, stroke 0.15s;
    &:hover {
        transform: scale(${hvSize});
    }
`;

export const Handle = ({
    fillC,
    light,
    x,
    y,
    drag,
    lineY,
    rad = 0.3,
    strokeWeight = 0.08,
}: Props) => {
    const [over, setOver] = React.useState(false);
    const dis = y - lineY;

    return (
        <g transform={`translate(${x}, ${y})`}>
            <HCircle
                colour={fillC}
                dragged={drag}
                light={light}
                onMouseEnter={() => setOver(true)}
                onMouseLeave={() => setOver(false)}
                r={1}
            />
        </g>
    );
};

export default Handle;
