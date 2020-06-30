import React from 'react';

interface SliderMarkerProps {
  value: number;
  instant: boolean;
  maskId: string;
}

export const SliderMarker = React.memo(function SliderMarker(
  props: SliderMarkerProps
) {
  return (
    <g>
      <g
        style={{
          transform: `translateY(${252 - 244 * props.value}px)`,
          transition: props.instant ? 'none' : 'transform 233ms',
        }}
      >
        <path
          d='M32 0L60 0'
          style={{
            stroke: 'var(--border)',
            strokeWidth: '4px',
            strokeLinecap: 'round',
            filter:
              'drop-shadow(0.1px 0.1px 0.1px #00000070) drop-shadow(-0.1px -0.1px 0.1px #ffffff70);',
          }}
        />
      </g>
    </g>
  );
});
SliderMarker.displayName = 'SliderMarker';
export default SliderMarker;
