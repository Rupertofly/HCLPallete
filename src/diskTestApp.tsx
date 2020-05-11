import React, { ReactElement, useState } from 'react';
import DS from './components/DiskSlider';
import LS from './components/LinearSlider';
import * as d3 from 'd3';
interface Props {
    i?: number;
}

export default function DisktTestApp({}: Props): ReactElement {
    const [value, setVal] = useState(0.7);
    const [br, setBr] = useState(0.5);
    const fill = d3.hcl(value * 360, 50, br * 100);

    return (
        <div>
            <DS
                value={value * 360}
                output={(a) => {
                    setVal(a);
                    console.log(a);
                }}
                c={fill.c}
                l={fill.l}
                color={fill.hex()}
                rad={8}
            />
            <LS
                value={br}
                color={fill.hex()}
                min={0}
                max={100}
                output={(a) => {
                    setBr(a);
                }}
            />
        </div>
    );
}
