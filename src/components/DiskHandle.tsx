import React from 'react';
import styled from 'styled-components';
import { UICOLOURS as UC } from '../types';
const { PI, cos, sin } = Math;
const QTR = PI / 2;
const TAU = 2 * PI;

interface Props {
    colour: string;
    light: boolean;
    value: number;
    mD: Function;
    pushed: boolean;
}
const smSize = 0.1;
const hvSize = 0.15;
const HCircle = styled.circle<Props>`
    fill: ${(p) => p.colour};
    stroke: ${({ light }) => (light ? UC.LIGHT_COL : UC.DARK_COL)};
    stroke-width: ${0.03 * (1 / smSize)};
    transform-box: fill-box;
    transform-origin: 50% 50%;
    transform: scale(${(p) => (p.pushed ? hvSize : smSize)});
    transition: transform 0.15s, stroke 0.15s;
    &:hover {
        transform: scale(${hvSize});
    }
`;
const DiskHandle = (p: Props) => {
    const xA = cos(p.value * TAU - QTR);
    const yA = sin(p.value * TAU - QTR);

    return (
        <HCircle
            r='1'
            cx={xA * 0.7}
            cy={yA * 0.7}
            {...p}
            onMouseDown={(e) => p.mD(e)}
        />
    );
};

export default DiskHandle;
