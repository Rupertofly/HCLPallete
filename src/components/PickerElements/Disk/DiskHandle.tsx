import React from 'react';
import './DiskSlider.scss';
const { PI, cos, sin } = Math;
const QTR = PI / 2;
const TAU = 2 * PI;

interface Props {
  colour: string;
  light: boolean;
  angle: number;
  handleDown: (e: React.PointerEvent<SVGCircleElement>) => any;
  pushed: boolean;

  sW?: number;
  hS?: number;
}

const DiskHandle = (p: Props) => {
  return (
    <g style={{ transform: `rotate(${p.angle}deg)` }}>
      <g style={{ transform: 'translate(0.0px ,0.7px)' }}>
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
