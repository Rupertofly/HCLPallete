import React, { memo } from 'react';
import * as T from '../../types';
import * as S from '../../stateCode';
import * as ED from 'riek';
import Swatch from './Swatch';
interface Props {
  st: S.State;
  selected: [number, number];
  select: (toSelect: [number, number]) => any;
  dispatch: React.Dispatch<S.Actions>;
}
// Comment
export function Pallete({ st, select, selected, dispatch }: Props) {
  return (
    <table style={{ borderSpacing: 0, fontFamily: 'fira code' }}>
      <tr>
        <th />
        {st.shades.map((sh, i) => {
          return (
            <th
              style={{
                backgroundColor: i === selected[1] ? '#e0e0e0ff' : '#fefefe00',

                transition: 'background-color 233ms',
              }}
              key={i}>
              {' '}
              <input
                type='textarea'
                name='shades'
                value={sh.name}
                size={6}
                style={{ border: 0, fontFamily: 'fira code', background: '0' }}
              />
            </th>
          );
        })}
      </tr>
      {st.colours.map((hue, hueIndex) => {
        return (
          <tr key={hueIndex}>
            <th
              style={{
                backgroundColor: hueIndex === selected[0] ? '#e0e0e0ff' : '#fefefe00',

                transition: 'background-color 233ms',
              }}>
              {st.hues[hueIndex].name}
            </th>
            {hue.map((col, shadeIndex) => {
              return (
                <td
                  style={{
                    backgroundColor: hueIndex === selected[0] || shadeIndex === selected[1] ? '#e0e0e0ff' : '#fefefe00',

                    transition: 'background-color 233ms',
                  }}>
                  <Swatch
                    key={shadeIndex}
                    color={col}
                    location={[hueIndex, shadeIndex]}
                    selected={hueIndex === selected[0] && shadeIndex === selected[1]}
                    selector={select}
                  />
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
}
