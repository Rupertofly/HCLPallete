import React, { ReactElement } from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import * as S from 'stateCode';
const DETAIL = 12;

export interface SliderGradientProps {
  firstProp: number;
  secondProp: number;
  min: number;
  max: number;
  type: S.ColourProperties;
  id: string;
}
function degMod(t: number, min: number, max: number) {
  if (max < min) max += 360;
  const v = t * (max - min);

  return (min + v) % 360;
}
function fromNormalised(t: number, min: number, max: number) {
  const circular = min >= max;

  if (circular) max += 360;
  const scaled = min + t * (max - min);

  const out = scaled > min ? (scaled < max ? scaled : max) : min;

  return circular ? out % 360 : out;
}
// for example max = 45, min = 315, val = 345
function toNormalised(n: number, min: number, max: number) {
  const circular = min >= max;

  if (circular) max += 360;
  const normalised = (n - min) / (max - min);

  return normalised > 0 ? (normalised < 1 ? normalised : 1) : 0;
}
function tupleFromRange(
  type: S.ColourProperties,
  range: number,
  p1: number,
  p2: number,
  min: number,
  max: number
): [number, number, number] {
  switch (type) {
    case 'h':
      return [degMod(range, min, max), p1, p2];
    case 'c':
      return [p2, fromNormalised(range, min, max), p1];
    case 'l':
      return [p1, p2, fromNormalised(range, min, max)];
  }
}
export const SliderGradient = React.memo(function SliderGradient(
  props: SliderGradientProps
) {
  return (
    <linearGradient id={props.id} x1='0' x2='0' y1='1' y2='0'>
      {d3.range(DETAIL + 1).map((v) => {
        const col = d3.hcl(
          ...tupleFromRange(
            props.type,
            v / DETAIL,
            props.firstProp,
            props.secondProp,
            props.min,
            props.max
          )
        );

        return (
          <stop
            offset={`${((v / DETAIL) * 100).toFixed(1)}%`}
            stopColor={col.hex()}
            key={v}
          />
        );
      })}
    </linearGradient>
  );
});
