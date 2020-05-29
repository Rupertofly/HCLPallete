import React, { ReactElement, useState } from 'react';
import { Slider } from '../src/components/Slider/Slider';
import * as d3 from 'd3';
import * as knobs from '@storybook/addon-knobs';
export default { title: 'slider', decorators: [knobs.withKnobs] };
import * as T from '../src/types';
export function sliderStory(): ReactElement {
    const lightness = knobs.number('lightness', 60, { min: 0, max: 100, range: true });
    const chr = knobs.number('chr', 60, { min: 0, max: 100, range: true });
    const [v, setV] = useState(60);
    const [drag, setDrag] = useState(false);
    const col = d3.hcl(140, chr, lightness);
    const rcol = d3.hcl(col.toString());
    const color: T.Col = {
        c: chr,
        h: col.h,
        l: lightness,
        hex: col.hex(),
        light: rcol.l > 50,
        rc: rcol.c,
        rl: rcol.l,
        rh: rcol.h,
    };

    return (
        <div style={{ fontSize: '12px' }}>
            <Slider {...color} instant={drag} type={T.COL_PROPS.c} min={0} max={130} onChange={(v) => console.log(v)} />
        </div>
    );
}
