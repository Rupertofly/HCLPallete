import React, { ReactElement } from 'react';
import { UICOLOURS } from '../../types';
import * as S from '../../stateCode';
import styled from 'styled-components';
import { hcl } from 'd3';
const SButton = styled.button`
  height: 4em;
  width: 4em;
  font-size: inherit;
  margin: 0.2em;
  border-width: 0.25em;
  border-style: solid;
  border-color: var(--border);
  border-radius: 1em;
  background-color: var(--fill);
  transform: scale(1);
  transition: transform 233ms, border-width 233ms;
  cursor: pointer;

  &:hover {
    transform: scale(1.125);
  }
  &:focus {
    outline: none;
  }
`;

interface Props {
  location: [number, number];
  color: S.Colour;
  selected: boolean;
  selector: (toSelect: [number, number]) => any;
}

export function Swatch({ color, selected, location, selector }: Props): ReactElement {
  const svgProps = {
    viewbox: '0 0 1 1',
  };
  const css: React.CSSProperties = {
    borderWidth: selected ? '0.5em' : '0.25em',
  };

  return (
    <SButton
      style={
        {
          '--fill': color.hex,
          '--border': color.light ? UICOLOURS.DARK_COL : UICOLOURS.LIGHT_COL,
          ...css,
        } as any
      }
      onClick={() => {
        if (selected) selector([-1, -1]);
        else selector(location);
      }}
    />
  );
}
export default Swatch;
