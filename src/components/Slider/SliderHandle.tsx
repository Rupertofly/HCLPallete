import React, { ReactElement } from 'react';
import styled from 'styled-components';

type downType = (e: SliderEventMouse | SliderEventTouch) => any;
const CircFill = styled.circle`
    transform: scale(14);
    stroke: var(--border);
    stroke-width: 0.3;
    &:hover {
        transform: scale(20);
        stroke-width: 0.25;
    }
`;
const CircBorder = styled.circle`
    transform: scale(18);
    fill: var(--border);
    transition: all 233ms;
    &:hover {
        transform: scale(24);
    }
`;

interface SliderEventCommon {
    y: number;
}
interface SliderEventTouch extends SliderEventCommon {
    touch: true;
    touchIndex: number;
}
interface SliderEventMouse extends SliderEventCommon {
    touch: false;
}
export interface SliderHandleProps {
    onDown: downType;
    fill: string;
    instant: boolean;
    value: number;
}

export const SliderHandle = React.memo(function (props: SliderHandleProps): ReactElement {
    return (
        <g style={{ transform: `translate(32px, ${252 - 244 * props.value}px)` }}>
            <CircFill
                r='1'
                style={{
                    fill: props.fill,
                    transition: props.instant
                        ? ''
                        : 'fill 233ms, ' + 'transform 233ms, stroke 233ms, stroke-width 233ms',
                    cursor: 'pointer',
                }}
            />
        </g>
    );
});
