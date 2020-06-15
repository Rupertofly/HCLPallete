import React from 'react';
import styled from 'styled-components';
import './DiskSlider.scss';
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

const DiskHandle = (p: Props) => {
  return (
    <g style={{ transform: `rotate(${p.value}deg)` }}>
      <g style={{ transform: 'translate(0.7px ,0px)' }}>
        <circle
          r='1'
          className={`disk-handle ${p.light ? 'light-stroke' : 'dark-stroke'}`}
          style={{ fill: p.colour }}
          onPointerDown={p.handleDown}
        />
        ;
      </g>
    </g>
  );
};

export default DiskHandle;
