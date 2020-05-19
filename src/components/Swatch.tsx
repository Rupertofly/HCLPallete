import React, { ReactElement } from 'react';
import { SelectionOptions, UICOLOURS } from '../types';
import styled from 'styled-components';
import { hcl } from 'd3';
const SRect = styled.rect.attrs<{ fillColor: string; dark: boolean }>((p) => ({
    style: {
        fill: p.fillColor,
        '--stroke-col': p.dark ? UICOLOURS.DARK_COL : UICOLOURS.LIGHT_COL,
    },
}))<{ fillColor: string; dark: boolean }>`
    stroke: var(--stroke-col);
    stroke-width: 0.1;
`;

interface Props {
    location: [number, number];
    color: { h: number; c: number; l: number };
    selected: boolean;
    reducer: (action: SelectionOptions) => void;
}

export default function Swatch({ color }: Props): ReactElement {
    const HclColor = hcl(color.h, color.c, color.l);
    const svgProps = {
        height: '100%',
        width: '100%',
        viewbox: '0 0 1 1',
    };

    return (
        <svg {...svgProps}>
            <SRect
                width='1'
                height='1'
                dark={color.l <= 50}
                fillColor={HclColor.hex()}
            />
        </svg>
    );
}
