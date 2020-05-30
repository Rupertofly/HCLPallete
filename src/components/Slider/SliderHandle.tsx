import React, { ReactElement, MutableRefObject } from 'react';
import styled from 'styled-components';

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

export interface SliderHandleProps {
    onDown: (e: PointerEvent | React.PointerEvent<any>) => any;
    onUp?: (e: PointerEvent | React.PointerEvent<any>) => any;
    onMove?: (e: PointerEvent | React.PointerEvent<any>) => any;
    fill: string;
    instant: boolean;
    value: number;
    boundingBox: MutableRefObject<SVGRectElement>;
}

const SliderHandle = React.memo(function SliderHandle(props: SliderHandleProps): ReactElement {
    return (
        <g
            style={{
                transform: `translate(32px, ${252 - 244 * props.value}px)`,
                transition: !props.instant ? 'transform 233ms' : 'none',
            }}>
            <CircFill
                r='1'
                onPointerDown={(e) => props.onDown(e)}
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

SliderHandle.displayName = 'SliderMarker';
export { SliderHandle };
export default SliderHandle;
