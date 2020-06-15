import React from 'react';
import * as S from '../src/stateCode';
import { Pallete } from '../src/components/SwatchPallete/Pallete';
import * as SL from '../src/components/Slider';
import DS from '../src/components/Disk/DiskSlider';
import { COL_PROPS } from '../src/types';
import styled, { createGlobalStyle } from 'styled-components';
import '../src/global.scss';
import '../normalize.css';
const DARK_MODE = true;

export default { title: 'Pallete', component: Pallete };

export const PalleteStory = () => {
  const [state, dispatch] = React.useReducer(S.reducer, S.defaultState);
  const [drag, setDrag] = React.useState(false);
  const selectedHue = state.selected[0];
  const col = state.colours[2][2];

  return (
    <div className={DARK_MODE ? 'dark' : 'light'} style={{ display: 'flex' }}>
      <Pallete st={state} selected={state.selected} dispatch={dispatch} />
      <DS {...col} dispatch={dispatch} loc={[2, 2]} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          {state.selected[0] >= 0
            ? state.colours[state.selected[0]].map((colour, index) => {
                const avgHue = state.hues[state.selected[0]].avgHue;

                return (
                  <SL.Slider
                    {...colour}
                    fine
                    fineCenter={avgHue}
                    fineOffset={90}
                    drag={drag}
                    dispatch={dispatch}
                    type={COL_PROPS.h}
                    key={index}
                    loc={[state.selected[0], index]}
                  />
                );
              })
            : null}
        </div>
        <div style={{ display: 'flex' }}>
          {state.selected[0] >= 0
            ? state.colours[state.selected[0]].map((colour, index) => {
                return (
                  <SL.Slider
                    {...colour}
                    dispatch={dispatch}
                    loc={[selectedHue, index]}
                    type={COL_PROPS.c}
                    drag={drag}
                    key={index}
                  />
                );
              })
            : null}
        </div>
        <div style={{ display: 'flex' }}>
          {state.selected[0] >= 0
            ? state.colours[state.selected[0]].map((colour, index) => {
                return (
                  <SL.Slider
                    {...colour}
                    dispatch={dispatch}
                    loc={[selectedHue, index]}
                    type={COL_PROPS.l}
                    drag={drag}
                    key={index}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
