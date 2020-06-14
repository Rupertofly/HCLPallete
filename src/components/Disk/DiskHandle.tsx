import React from 'react';
import styled from 'styled-components';
import { UICOLOURS as UC } from '../../types';
const { PI, cos, sin } = Math;
const QTR = PI / 2;
const TAU = 2 * PI;

interface Props {
  colour: string;
  light: boolean;
  value: number;
  handleDown: (e: React.PointerEvent<SVGCircleElement>) => any;
  pushed: boolean;

  sW?: number;
  hS?: number;
}
const smSize = 0.1;
const hvSize = 0.15;
const HCircle = styled.circle.attrs<Props>((p) => ({
  style: {
    fill: p.colour,
    stroke: p.light ? UC.LIGHT_COL : UC.DARK_COL,
  },
}))<Props>`
  stroke-width: ${0.03 * (1 / smSize)};
  transition: transform 0.15s, stroke 0.15s;
  transform: scale(${smSize});
  &:hover {
    transform: scale(${hvSize});
  }
`;
const DiskHandle = (p: Props) => {
  const xA = cos(p.value * TAU - QTR);
  const yA = sin(p.value * TAU - QTR);

  return (
    <g style={{ transform: `rotate(${p.value}deg)` }}>
      <g style={{ transform: 'translate(0.7px ,0px)' }}>
        <HCircle r='1' {...p} onPointerDown={p.handleDown} />;
      </g>
    </g>
  );
};

export default DiskHandle;
