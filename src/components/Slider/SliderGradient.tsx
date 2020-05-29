import React, { ReactElement } from 'react';
import * as T from '../../types';
import * as d3 from 'd3';
import styled from 'styled-components';
export interface SliderGradientProps {
    p1: number;
    p2: number;
    min: number;
    max: number;
    type: T.HCLProp;
    id: string;
}
function degMod(t: number, min: number, max: number) {
    if (max < min) max += 360;
    const v = t * (max - min);

    return (min + v) % 360;
}
function fromNormalised(t: number, min: number, max: number) {
    const scaled = min + t * (max - min);

    return scaled > min ? (scaled < max ? scaled : max) : min;
}
function tupleFromRange(
    type: T.HCLProp,
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
export const SliderGradient = React.memo(
    (props: SliderGradientProps): ReactElement => {
        return (
            <linearGradient id={props.id} x1='0' x2='0' y1='1' y2='0'>
                {d3.range(7).map((v) => {
                    const col = d3.hcl(...tupleFromRange(props.type, v / 6, props.p1, props.p2, props.min, props.max));

                    return <stop offset={`${((v / 6) * 100).toFixed(1)}%`} stop-color={col.hex()} />;
                })}
            </linearGradient>
        );
    }
);
