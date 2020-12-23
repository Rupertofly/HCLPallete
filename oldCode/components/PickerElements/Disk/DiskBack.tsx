import React, { useRef } from 'react';
import * as d3 from 'd3';
import { TAU } from './common';
import './DiskSlider.scss';
export type BackProps = { c: number; l: number; count: number; backRef: React.MutableRefObject<SVGPathElement> };
export const DiskBack = ({ c, l, count, backRef }: BackProps) => {
  const { floor: flr, random: rnd } = Math;
  const idKey = useRef(
    'mask' +
      flr(rnd() * 6400)
        .toString(16)
        .slice(0, 4)
  );

  const outerEdge = d3.arc()({
    startAngle: 0,
    endAngle: TAU,
    outerRadius: 0.9,
    innerRadius: 0.5,
  });

  const section = d3
    .arc<{
      i: number;
      disp: boolean;
    }>()
    .innerRadius(0.55)
    .outerRadius(0.85)
    .startAngle(({ i }) => i * (TAU / count) - 0.01)
    .endAngle(({ i }) => (i + 1) * (TAU / count));

  return (
    <>
      <mask id={idKey.current}>
        <rect x='-1' y='-1' width='2' height='2' fill='black' />
        <path d={outerEdge} fill='white' />
      </mask>
      <path
        d={outerEdge}
        ref={backRef}
        style={{ fill: l <= 50 ? 'var(--dark-border)' : 'var(--light-border)', transition: 'fill 0.15s' }}
      />
      <g mask={'url(#' + idKey.current + ')'}>
        {d3.range(count).map((i) => (
          <path
            d={section({
              i,
              disp: d3.hcl(i * (360 / count), c, l).displayable(),
            })}
            fill={d3.hcl(i * (360 / count), c, l).toString()}
            key={i}
            opacity={1}
          />
        ))}
      </g>
    </>
  );
};
