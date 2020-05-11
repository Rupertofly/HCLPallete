import React, { ReactElement } from 'react';
import styled from 'styled-components';
import * as t from '../types';
const { PI, cos, sin } = Math;
const QTR = PI / 2;
const TAU = 2 * PI;

interface Props {
    value: number;
    light: boolean;
}
const MarkerLine = styled.path<{ light: boolean }>`
    stroke: ${(p) => (p.light ? t.UICOLOURS.LIGHT_COL : t.UICOLOURS.DARK_COL)};
    stroke-width: 0.03;
    stroke-linecap: round;
    transition: stroke 0.15s;
`;

export default function DiskMarker({ value, light }: Props): ReactElement {
    const xA = cos(value * TAU - QTR);
    const yA = sin(value * TAU - QTR);

    return (
        <MarkerLine
            light={light}
            d={`M${xA * 0.7},${yA * 0.7}L${xA * 0.85},${yA * 0.85}`}
        />
    );
}
