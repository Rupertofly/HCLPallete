import React, { ReactElement, useRef, useState } from 'react';
import styled from 'styled-components';
import * as T from '../../types';
import { uniqueId } from 'lodash';
import { SliderGradient } from './SliderGradient';
import { SliderHandle } from './SliderHandle';
import SliderMarker from './SliderMarker';
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

    switch (props.type) {
        case 'h':
            gradientValues = { firstProp: props.c, secondProp: props.l };
            break;
        case 'c':
            gradientValues = { firstProp: props.l, secondProp: props.h };
            break;
        case 'l':
            gradientValues = { firstProp: props.h, secondProp: props.c };
            break;
    }
    const [dragState, setDrag] = useState({ touched: false, startingPos: 0, startingVal: -1 });
    const handleStart = (e: React.PointerEvent<any>) => {
        if (dragState.touched) {
            return;
        }
        e.preventDefault();
        const inputBounds = inputSpaceRef.current.getBoundingClientRect();
        const scaledPosition = 1 - (e.clientY - inputBounds.top) / (inputBounds.bottom - inputBounds.top);
        const DragStartPosition = scaledPosition > 0 ? (scaledPosition > 1 ? 1 : scaledPosition) : 0;

        props.onStart(value);
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
        const newValue = fromNormalised(
            toNormalised(dragState.startingVal, props.min, props.max) + currentOffset,
            props.min,
            props.max
        );

        props.onChange(newValue);
    };
    const handleEnd = (e: React.PointerEvent<any>) => {
        e.preventDefault();
        props.onEnd(value);
        setDrag((s) => ({ touched: false, startingPos: 0, startingVal: -1 }));
    };

    return (
        <div
            style={{ width: '4em', height: '16em', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            onPointerMoveCapture={handleMove}
            onPointerUpCapture={handleEnd}>
            <svg viewBox='0 0 64 256' style={svgStyles as any}>
                <defs>
                    <SliderGradient
                        id={gradientID.current}
                        max={props.max}
                        min={props.min}
                        type={props.type}
                        {...gradientValues}
                    />
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
                    style={{ fill: 'var(--border)', transition: props.instant ? '' : 'fill 233ms' }}
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
                    value={toNormalised(props.r[props.type], props.min, props.max)}
                    instant={props.instant}
                    maskId={mask}
                />
                <SliderHandle
                    fill={props.hex}
                    instant={props.instant}
                    value={toNormalised(props[props.type], props.min, props.max)}
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

                        n = n < props.min ? props.min : n > props.max ? props.max : n;
                        TextInputRef.current.value = n.toFixed(1);
                        props.onChange(n);
                    }
                }}
                onBlur={(e) => {
                    TextInputRef.current.value = value.toFixed(1);
                    props.onChange(value);
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
                    color: ' #232323',
                    textAlign: 'center',
                }}
            />
        </div>
    );
}
