import React from 'react';
import styled from 'styled-components';
import * as t from '../types';
const MarkerLine = styled.path<{ light: boolean }>`
    stroke: ${(p) => (p.light ? t.UICOLOURS.LIGHT_COL : t.UICOLOURS.DARK_COL)};
    stroke-width: 0.07;
    stroke-linecap: round;
    transition: stroke 0.15s;
`;

interface Props {
    value;
    light: boolean;
}

const LinearMarker = ({ light, value }: Props) => {
    const yV = 0.5 + (1 - value) * 4;

    return <MarkerLine light={!light} d={`M0.75,${yV}L1.25,${yV}`} />;
};

export default LinearMarker;
