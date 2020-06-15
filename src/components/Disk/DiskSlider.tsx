import React, { useState, useEffect, useRef } from 'react';
import * as S from '../../stateCode';
import { hcl, svg } from 'd3';
import { DiskBack } from './DiskBack';
import DM from './DiskMarker';
import DH from './DiskHandle';
import './DiskSlider.scss';
export const TAU = Math.PI * 2;
const toRAD = (a) => a * (TAU / 360);
const toDEG = (a) => a * (360 / TAU);

interface Props extends S.Colour {
  loc: [number, number];
  dispatch: React.Dispatch<S.Actions>;
}
const DiskSlider = (p: Props) => {
  const [dragState, setDrag] = useState({ touched: false, startingPos: 0, startingVal: -1 });
  const svgRef = useRef<SVGSVGElement>();
  const inpRef = useRef<HTMLInputElement>();
  const divRef = useRef<HTMLDivElement>();
  const pathBackingRef = useRef<SVGPathElement>();

  if (inpRef.current) inpRef.current.value = p.h.toFixed(1);

  const handleStart = (e: React.PointerEvent<any>) => {
    if (dragState.touched) {
      return;
    }
    console.log(pathBackingRef.current.getBoundingClientRect());
    e.preventDefault();
    const { left, right, top, bottom } = pathBackingRef.current.getBoundingClientRect();
    const cx = left + (right - left) / 2;
    const cy = top + (bottom - top) / 2;
    const { clientX: mx, clientY: my } = e;

    console.log(mx, my);

    const [oX, oY] = [mx - cx, my - cy];
    const angle = (TAU + Math.atan2(oY, oX) + TAU / 4) % TAU;

    setDrag((s) => ({ touched: true, startingPos: angle, startingVal: p.h }));
  };

  function handleMove(e: React.PointerEvent<any>) {
    if (!dragState.touched) return;
    e.preventDefault();
    const { left, right, top, bottom } = pathBackingRef.current.getBoundingClientRect();
    const cx = left + (right - left) / 2;
    const cy = top + (bottom - top) / 2;
    const { clientX: mx, clientY: my } = e;
    const [oX, oY] = [mx - cx, my - cy];
    const angle = (TAU + Math.atan2(oY, oX) + TAU / 4) % TAU;
    const currentOffset = angle - dragState.startingPos;
    const newValue = toDEG((TAU + currentOffset) % TAU);

    p.dispatch(S.setValue({ hue: p.loc[0], shade: p.loc[1], property: 'h', value: newValue }));
  }
  const handleEnd = (e: React.PointerEvent<any>) => {
    e.preventDefault();
    p.dispatch(S.drag(false));
    p.dispatch(S.calculateLayer('hue', p.loc[0]));
    setDrag((s) => ({ touched: false, startingPos: 0, startingVal: -1 }));
  };

  return (
    <div className='outer-div' ref={divRef}>
      <svg
        width='100%'
        ref={svgRef}
        height='100%'
        viewBox={`-1 -1 2 2`}
        onPointerMoveCapture={handleMove}
        onPointerCancel={handleEnd}
        onPointerUp={handleEnd}>
        <DiskBack c={p.c} l={p.l} count={32} backRef={pathBackingRef} />
        <DM light={p.light} value={p.r.h} />
        <DH colour={p.hex} light={p.light} value={p.h} handleDown={handleStart} pushed={dragState.touched} />
      </svg>
      <input
        type='text'
        ref={inpRef}
        defaultValue={p.h.toFixed(1)}
        className='disk-slider-numbers'
        onKeyDown={(e) => {
          if (/[0-9]|Backspace|Delete|Left|Right|\./.test(e.key)) {
            return true;
          } else e.preventDefault();
          if (/Enter/.test(e.key)) {
            let n = Number.parseFloat(inpRef.current.value) ?? 0;

            n = n < 0 ? 0 : n > 360 ? 360 : n;
            p.dispatch(S.setValue({ hue: p.loc[0], shade: p.loc[1], property: 'h', value: n }));
          }
        }}
        onBlur={(e) => {
          inpRef.current.value = p.h.toFixed(1);
          p.dispatch(S.setValue({ hue: p.loc[0], shade: p.loc[1], property: 'h', value: p.h }));
        }}
      />
    </div>
  );
};

export default DiskSlider;
export type BackProps = { c: number; l: number; count: number; backRef: React.MutableRefObject<SVGPathElement> };
