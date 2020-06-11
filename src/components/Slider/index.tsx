import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import * as T from '../../types';
import * as S from '../../stateCode';
import { uniqueId } from 'lodash';
import { SliderGradient } from './SliderGradient';
import { SliderHandle } from './SliderHandle';
import SliderMarker from './SliderMarker';
export interface BaseSliderProps extends S.Colour {
  type: T.COL_PROPS;
  loc: [number, number];
  dispatch: React.Dispatch<S.Actions>;
  drag: boolean;
}

interface FineSliderProps extends BaseSliderProps {
  fine: true;
  fineCenter: number;
  fineOffset: number;
}
interface FullSliderProps extends BaseSliderProps {
  fine?: never;
  fineCenter?: never;
  fineOffset?: never;
}
export type SliderProps = FullSliderProps | FineSliderProps;
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
  if (circular && n < min) n += 360;
  const normalised = (n - min) / (max - min);

  return normalised > 0 ? (normalised < 1 ? normalised : 1) : 0;
}

export function Slider(props: SliderProps): ReactElement {
  const gradientID = useRef(uniqueId('grad-'));
  const maskID = useRef(uniqueId('mask-'));
  const mask = `url(#${maskID.current})`;
  const [hue, shade] = props.loc;
  const borderCol = props.light ? '#373737' : '#f0f0f0';

  const inputSpaceRef = useRef<SVGRectElement>();
  const TextInputRef = useRef<HTMLInputElement>();

  const value = props[props.type];
  const svgStyles = {
    '--fill': props.hex,
    '--border': borderCol,
    marginBottom: '0.8em',
  };

  // Setting up input info
  if (TextInputRef.current) TextInputRef.current.value = value.toFixed(1);

  // Handling Gradient Values
  let gradientValues = { firstProp: 0, secondProp: 0 };
  let extent = [0, 100] as [number, number];
  let isHue = false;

  switch (props.type) {
    case 'h':
      gradientValues = { firstProp: props.c, secondProp: props.l };
      if (props?.fine) {
        const hmin = (360 + (props.fineCenter - props.fineOffset)) % 360;
        const hMax = (360 + (props.fineCenter + props.fineOffset)) % 360;

        extent = [hmin, hMax];
      } else extent = [0, 360];
      isHue = true;
      break;
    case 'c':
      gradientValues = { firstProp: props.l, secondProp: props.h };
      extent = [0, 130];
      break;
    case 'l':
      gradientValues = { firstProp: props.h, secondProp: props.c };
      extent = [0, 100];
      break;
  }
  const [min, max] = extent;

  const minMaxRef = React.useRef(extent);

  minMaxRef.current = extent;
  const [dragState, setDrag] = useState({ touched: false, startingPos: 0, startingVal: -1 });
  const handleStart = (e: React.PointerEvent<any>) => {
    if (dragState.touched) {
      return;
    }
    e.preventDefault();
    const inputBounds = inputSpaceRef.current.getBoundingClientRect();
    const scaledPosition = 1 - (e.clientY - inputBounds.top) / (inputBounds.bottom - inputBounds.top);
    const DragStartPosition = scaledPosition > 0 ? (scaledPosition > 1 ? 1 : scaledPosition) : 0;

    props.dispatch(S.drag(true));
    setDrag((s) => ({ touched: true, startingPos: DragStartPosition, startingVal: value }));
  };
  const handleMove = (e: React.PointerEvent<any>) => {
    if (!dragState.touched) {
      return;
    }

    e.preventDefault();
    const inputBounds = inputSpaceRef.current.getBoundingClientRect();
    const scaledPosition = 1 - (e.clientY - inputBounds.top) / (inputBounds.bottom - inputBounds.top);
    const constrainedPosition = scaledPosition > 0 ? (scaledPosition > 1 ? 1 : scaledPosition) : 0;
    const currentOffset = constrainedPosition - dragState.startingPos;
    const newValue = fromNormalised(toNormalised(dragState.startingVal, min, max) + currentOffset, min, max);

    props.dispatch(S.setValue({ hue: props.loc[0], shade: props.loc[1], property: props.type, value: newValue }));
  };
  const handleEnd = (e: React.PointerEvent<any>) => {
    e.preventDefault();
    props.dispatch(S.drag(false));
    props.dispatch(S.calculateLayer('hue', props.loc[0]));
    setDrag((s) => ({ touched: false, startingPos: 0, startingVal: -1 }));
  };

  return (
    <div
      style={{ width: '4em', height: '16em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      onPointerMoveCapture={handleMove}
      onPointerUpCapture={handleEnd}>
      <svg viewBox='0 0 64 256' style={svgStyles as any}>
        <defs>
          <SliderGradient id={gradientID.current} max={max} min={min} type={props.type} {...gradientValues} />
          <mask id={maskID.current}>
            <rect x='4' y='4' width='56' height='248' rx='8' fill='white'></rect>
          </mask>
        </defs>

        <rect
          x='0'
          y='0'
          width='64'
          height='256'
          rx='12'
          style={{ fill: 'var(--border)', transition: dragState.touched ? '' : 'fill 233ms' }}
        />
        <rect
          x='4'
          y='4'
          width='56'
          height='248'
          mask={mask}
          ref={inputSpaceRef}
          style={{ fill: `url('#${gradientID.current}')` }}
        />
        <SliderMarker
          key='Marker'
          value={toNormalised(props.r[props.type], min, max)}
          instant={dragState.touched}
          maskId={mask}
        />
        <SliderHandle
          fill={props.hex}
          instant={dragState.touched}
          value={toNormalised(props[props.type], min, max)}
          onDown={handleStart}
          boundingBox={inputSpaceRef}
        />
      </svg>
      <input
        type='text'
        ref={TextInputRef}
        defaultValue={value.toFixed(1)}
        onKeyDown={(e) => {
          if (/[0-9]|Backspace|Delete|Left|Right|\./.test(e.key)) {
            return true;
          } else e.preventDefault();
          if (/Enter/.test(e.key)) {
            let n = Number.parseFloat(TextInputRef.current.value) ?? 0;

            n = isHue ? (n < 0 ? 0 : n > 360 ? 360 : n) : n < min ? min : n > max ? max : n;
            TextInputRef.current.value = n.toFixed(1);
            props.dispatch(S.setValue({ hue, shade, property: props.type, value: n }));
          }
        }}
        onBlur={(e) => {
          TextInputRef.current.value = value.toFixed(1);
          props.dispatch(S.setValue({ hue, shade, property: props.type, value }));
        }}
        // onChange={(e) => {
        //     let n = +inp.current.value || 1;

        //     n = n < min ? min : n > max ? max : n;
        //     setVal((n - min) / (max - min));
        // }}
        style={{
          appearance: 'textarea',
          WebkitAppearance: 'none',
          padding: 0,
          margin: '0 auto',
          marginTop: '-0.5em',
          border: 0,
          width: '3em',
          fontFamily: 'Fira Code',
          color: ' var(--text-col)',
          backgroundColor: 'transparent',
          textAlign: 'center',
        }}
      />
    </div>
  );
}
