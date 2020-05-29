import React, { ReactElement, useRef } from 'react';
import styled from 'styled-components';
import * as T from '../../types';
import { uniqueId } from 'lodash';
import { SliderGradient } from './SliderGradient';
import { SliderHandle } from './SliderHandle';
export interface SliderProps extends T.Col {
    /**
     * Min value
     */
    min: number;

    /**
     * Max value
     */
    max: number;

    /**
     * Type of Slider (either h, c or l)
     */
    type: T.COL_PROPS;

    /**
     * Called when slider is clicked
     */
    onStart?: (v: number) => any;
    /**
     * Called everytime slider is moved and when input field is updated
     */
    onChange: (v: number) => any;
    /**
     * Called when slider is lifted
     */
    onEnd?: (v: number) => any;

    instant: boolean;
}
function fromNormalised(t: number, min: number, max: number) {
    const scaled = min + t * (max - min);

    return scaled > min ? (scaled < max ? scaled : max) : min;
}
function toNormalised(n: number, min: number, max: number) {
    const normalised = (n - min) / (max - min);

    return normalised > 0 ? (normalised < 1 ? normalised : 1) : 0;
}

export function Slider(props: SliderProps): ReactElement {
    const gradientID = useRef(uniqueId('grad-'));
    const maskID = useRef(uniqueId('mask-'));
    const mask = `url(#${maskID.current})`;
    const borderCol = props.light ? T.UICOLOURS.DARK_COL : T.UICOLOURS.LIGHT_COL;
    const svgStyles = {
        '--fill': props.hex,
        '--border': borderCol,
    };
    let gradientValues = { p1: 0, p2: 0 };

    switch (props.type) {
        case 'h':
            gradientValues = { p1: props.c, p2: props.l };
            break;
        case 'c':
            gradientValues = { p1: props.l, p2: props.h };
            break;
        case 'l':
            gradientValues = { p1: props.h, p2: props.c };
            break;
    }

    return (
        <div style={{ width: '4em', height: '16em' }}>
            <svg viewBox='0 0 64 256' style={svgStyles as any}>
                <defs>
                    <SliderGradient
                        id={gradientID.current}
                        max={props.max}
                        min={props.min}
                        type={props.type}
                        {...gradientValues}
                    />
                </defs>
                <mask id={maskID.current}>
                    <rect x='4' y='4' width='56' height='248' rx='8' fill='white'></rect>
                </mask>
                <rect
                    x='0'
                    y='0'
                    width='64'
                    height='256'
                    rx='12'
                    style={{ fill: 'var(--border)', transition: props.instant ? '' : 'fill 233ms' }}
                />
                <rect
                    x='4'
                    y='4'
                    width='56'
                    height='248'
                    mask={mask}
                    style={{ fill: `url('#${gradientID.current}')` }}
                />
                <SliderHandle
                    fill={props.hex}
                    instant={props.instant}
                    value={toNormalised(props[props.type], props.min, props.max)}
                    onDown={() => console.log()}
                />
            </svg>
        </div>
    );
}
