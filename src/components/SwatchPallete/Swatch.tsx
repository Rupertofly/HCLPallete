import React, { ReactElement } from 'react';
import { UICOLOURS } from '../../types';
import * as S from '../../stateCode';
import styled from 'styled-components';
import * as WCAG from 'wcag-contrast';
import { hcl } from 'd3';

interface Props {
  location: { hue: number; shade: number };
  color: S.Colour;
  selected: boolean;
  dispatch: React.Dispatch<S.Actions>;
  details: boolean;
  selectedColor?: string;
}

export function Swatch({
  color,
  selected,
  selectedColor,
  location,
  details,
  dispatch,
}: Props): ReactElement {
  const svgProps = {
    viewbox: '0 0 1 1',
  };

  const css: React.CSSProperties = {
    borderWidth: selected ? '0.5em' : '0.25em',
  };

  const ll: number = WCAG.hex(color.hex, selectedColor ?? '#ffffff');

  return (
    <button
      style={
        {
          '--fill': color.hex,
          '--border': color.light ? UICOLOURS.DARK_COL : UICOLOURS.LIGHT_COL,
          ...css,
        } as any
      }
      className={'swatch'}
      onClick={() => {
        if (selected) dispatch(S.selectColour({ hue: -1, shade: -1 }));
        else dispatch(S.selectColour(location));
      }}
    >
      {details ? (
        <>
          <span
            style={{
              position: 'absolute',
              top: '0.1em',
              fontSize: '0.8em',
              color: selectedColor ?? 'white',
            }}
          >
            {ll.toFixed(2)} {WCAG.score(ll)}
          </span>
          <span
            style={{
              position: 'absolute',
              bottom: '0.15em',
              right: '0.2em',
              padding: '0.05em',
              fontSize: '0.6em',
              textAlign: 'right',
              color: !color.light ? 'white' : 'black',
            }}
          >
            {color.name}
          </span>{' '}
        </>
      ) : null}
    </button>
  );
}
export default Swatch;
