import React, { ReactElement, useState, useReducer } from 'react';
import DS from './components/Disk/DiskSlider';
import LS from './components/LinearS/LinearSlider';
import PI from './components/PickerInfo';
import * as d3 from 'd3';
import * as ntc from 'ntcjs';
import { palleteReducer } from './store';
import defPal from './defaultPallete.json';
import { ACTION_TYPES, COL_PROPS } from './types';
interface Props {
    i?: number;
}

export default function DisktTestApp({}: Props): ReactElement {
    const [value, setVal] = useState(0.7);
    const [br, setBr] = useState(0.5);
    const [cr, setCr] = useState(0.5);
    const [sCol, select] = useState<[number, number]>([0, 0]);
    const fill = d3.hcl(value * 360, cr * 130, br * 100);
    const { c, l } = d3.hcl(fill.toString());
    const [state, dispatch] = useReducer(palleteReducer, defPal);
    const lll = 5;
    const colInfo = (h: number, s: number) => ({
        ...state.colours[h][s],
        fill: d3
            .hcl(
                state.colours[h][s].h,
                state.colours[h][s].c,
                state.colours[h][s].l
            )
            .hex(),
    });

    return (
        <>
            <div style={{ fontFamily: 'Ubuntu Mono, monospace' }}>
                <span>
                    &nbsp;&nbsp;{d3.range(state.colours[0].length).join('')}
                </span>
                {state.colours.map((hs, i) => (
                    <div key={i}>
                        <span>{i.toString().padStart(2, '0')}</span>
                        {hs.map((c, j) => {
                            return (
                                <span
                                    key={j}
                                    onClick={() => select([i, j])}
                                    style={{
                                        color: d3.hcl(c.h, c.c, c.l).toString(),
                                    }}>
                                    █
                                </span>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div>
                {state.colours.map((hues, i) => {
                    const defaults = {
                        height: '12em',
                        min: 0,
                    };

                    return [
                        { v: COL_PROPS.h, m: 360 },
                        { v: COL_PROPS.c, m: 130 },
                        { v: COL_PROPS.l, m: 100 },
                    ].map((prop) => {
                        const pDefaults = {
                            max: prop.m,
                        };

                        return (
                            <div
                                style={{ display: 'flex' }}
                                key={`${i}${prop.v}`}>
                                {hues.map((color, j) => {
                                    return (
                                        <LS
                                            {...defaults}
                                            {...pDefaults}
                                            key={`${prop.v}${i}${j}`}
                                            color={colInfo(i, j).fill}
                                            value={
                                                colInfo(i, j)[prop.v] / prop.m
                                            }
                                            realVal={
                                                d3.hcl(colInfo(i, j).fill)[
                                                    prop.v
                                                ] * prop.m
                                            }
                                            output={(a) => {
                                                dispatch({
                                                    type: ACTION_TYPES.SET_VAL,
                                                    data: {
                                                        hue: i,
                                                        shade: j,
                                                        prop: prop.v,
                                                        value: a * prop.m,
                                                    },
                                                });
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    });
                })}
            </div>
            <div style={{ display: 'flex' }}>
                <PI color={{ ...colInfo(...sCol) }} height={'12em'} />
                <DS
                    value={colInfo(...sCol).h}
                    output={(a) => {
                        dispatch({
                            type: ACTION_TYPES.SET_VAL,
                            data: {
                                hue: sCol[0],
                                prop: COL_PROPS.h,
                                shade: sCol[1],
                                value: a * 360,
                            },
                        });
                    }}
                    c={colInfo(...sCol).c}
                    l={colInfo(...sCol).l}
                    color={colInfo(...sCol).fill}
                    rad={12}
                />
                <LS
                    value={colInfo(...sCol).l / 100}
                    color={colInfo(...sCol).fill}
                    min={0}
                    height={'12em'}
                    max={100}
                    output={(a) => {
                        dispatch({
                            type: ACTION_TYPES.SET_VAL,
                            data: {
                                hue: sCol[0],
                                prop: COL_PROPS.l,
                                shade: sCol[1],
                                value: a * 100,
                            },
                        });
                    }}
                    realVal={d3.hcl(colInfo(...sCol).fill).l / 100}
                />
                <LS
                    value={colInfo(...sCol).c / 130}
                    color={colInfo(...sCol).fill}
                    height={'12em'}
                    min={0}
                    max={130}
                    output={(a) => {
                        dispatch({
                            type: ACTION_TYPES.SET_VAL,
                            data: {
                                hue: sCol[0],
                                prop: COL_PROPS.c,
                                shade: sCol[1],
                                value: a * 130,
                            },
                        });
                    }}
                    realVal={d3.hcl(colInfo(...sCol).fill).c / 130}
                />
            </div>
        </>
    );
}
