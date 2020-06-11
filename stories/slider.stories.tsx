import React, { ReactElement, useState } from 'react';
import { Slider } from '../src/components/Slider';
import * as d3 from 'd3';
import * as knobs from '@storybook/addon-knobs';
export default { title: 'slider', decorators: [knobs.withKnobs] };
import * as T from '../src/types';
import Swatch from '../src/components/PickerInfo';
export function sliderStory(): ReactElement {
  const lightness = knobs.number('lightness', 60, { min: 0, max: 100, range: true });
  const hue = knobs.number('hue', 60, { min: 0, max: 360, range: true });
  const chroma = knobs.number('chroma', 60, { min: 0, max: 130, range: true });
  const [h, setH] = useState(90);
  const [c, setC] = useState(90);
  const [l, setL] = useState(90);
  const [drag, setDrag] = useState(false);
  const but = knobs.button('set', () => {
    setH(hue);
    setL(lightness);
    setC(chroma);
  });
  const col = d3.hcl(h, c, l);
  const rcol = d3.hcl(col.toString());
  const color: T.Col = {
    c: c,
    h: h,
    l: l,
    hex: col.hex(),
    light: rcol.l > 50,
    r: { c: rcol.c, l: rcol.l, h: rcol.h },
  };

  return (
    <div style={{ fontSize: '12px', display: 'flex' }}>
      <Slider
        {...color}
        instant={drag}
        type={T.COL_PROPS.c}
        min={0}
        max={130}
        onChange={(v) => setC(v)}
        onStart={() => {
          setDrag(true);
        }}
        onEnd={() => {
          setDrag(false);
        }}
      />
      <Slider
        {...color}
        instant={drag}
        type={T.COL_PROPS.l}
        min={0}
        max={100}
        onChange={(v) => setL(v)}
        onStart={() => {
          setDrag(true);
        }}
        onEnd={() => {
          setDrag(false);
        }}
      />
      <Slider
        {...color}
        instant={drag}
        type={T.COL_PROPS.h}
        min={0}
        max={360}
        onChange={(v) => setH(v)}
        onStart={() => {
          setDrag(true);
        }}
        onEnd={() => {
          setDrag(false);
        }}
      />
      <Swatch color={color} output={(f) => f} />
    </div>
  );
}
