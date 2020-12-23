import React, { ReactElement } from 'react';
import styled from 'styled-components';
const { PI, cos, sin } = Math;
const QTR = PI / 2;
const TAU = 2 * PI;

interface Props {
  value: number;
  light: boolean;
}

export default function DiskMarker({ value, light }: Props): ReactElement {
  const xA = cos(value * TAU - QTR);
  const yA = sin(value * TAU - QTR);

  return (
    <g style={{ transform: `rotate(${value}deg)` }}>
      <path
        className={`marker-line ${!light ? 'dark-stroke' : 'light-stroke'}`}
        d={`M0.7,0L0.85,0`}
      />
      ;
    </g>
  );
}
