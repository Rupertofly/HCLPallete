import React, { ReactElement, useState } from 'react';
import DS from './components/DiskSlider';
import LS from './components/LinearSlider';
import PI from './components/PickerInfo';
import * as d3 from 'd3';
import * as ntc from 'ntcjs';
interface Props {
    i?: number;
}

export default function DisktTestApp({}: Props): ReactElement {
    const [value, setVal] = useState(0.7);
    const [br, setBr] = useState(0.5);
    const [cr, setCr] = useState(0.5);
    const fill = d3.hcl(value * 360, cr * 130, br * 100);
    const { c, l } = d3.hcl(fill.toString());

    return (
        <div style={{ display: 'flex' }}>
            <PI
                color={{ c: cr * 130, l: br * 100, h: value * 360 }}
                height={'12em'}
            />
            <DS
                value={value * 360}
                output={(a) => {
                    setVal(a);
                }}
                c={fill.c}
                l={fill.l}
                color={fill.hex()}
                rad={12}
            />
            <LS
                value={br}
                color={fill.hex()}
                min={0}
                height={'12em'}
                max={100}
                output={(a) => {
                    setBr(a);
                }}
                realVal={l / 100}
            />
            <LS
                value={cr}
                color={fill.hex()}
                height={'12em'}
                min={0}
                max={130}
                output={(a) => {
                    setCr(a);
                }}
                realVal={c / 130}
            />
        </div>
    );
}
