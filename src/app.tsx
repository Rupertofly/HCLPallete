import React, { useState } from 'react';

import * as d3 from 'd3';
import * as S from './stateCode';
import * as Pal from './components/SwatchPallete/Pallete';
import * as SL from './components/Slider/index';
interface Props {
  n?: string;
}
export const App = (props: Props) => {
  const [state, dispatch] = React.useReducer(S.reducer, S.defaultState);
  const selHue = state.selected[0] < 0 ? 2 : state.selected[0];
  const selShade = state.selected[0] < 0 ? 2 : state.selected[1];

  const lSliders = state.colours[selHue].map((cl, i) => {
    return <SL.Slider {...cl} dispatch={dispatch} drag={state.drag} type={'l'} loc={[selHue, i]} key={i} />;
  });

  return (
    <>
      <main className='dark' style={{ margin: '2em' }}>
        <div id='pallete'>
          <Pal.Pallete dispatch={dispatch} st={state} />
        </div>
        <div id='input-sliders' style={{ display: 'flex', flexDirection: 'column' }}>
          <fieldset style={{}}>
            <legend>Hue - {state.hues[selHue].name}</legend>
            {hueSet(state, selHue, dispatch)}
          </fieldset>
          <fieldset style={{}}>
            <legend>Chroma - {state.hues[selHue].name}</legend>
            {state.colours[selHue].map((cl, i) => {
              return <SL.Slider {...cl} dispatch={dispatch} drag={state.drag} type={'c'} loc={[selHue, i]} key={i} />;
            })}
          </fieldset>
          <fieldset style={{}}>
            <legend>Lightness - {state.hues[selHue].name}</legend>
            {lSliders}
          </fieldset>
        </div>
        <div id='hue-sliders' style={{ display: 'flex', flexDirection: 'column' }}>
          <fieldset style={{}}>
            <legend>Hue - {state.shades[selShade].name}</legend>
            {state.colours.map((cl, i) => {
              return (
                <SL.Slider
                  {...cl[selShade]}
                  dispatch={dispatch}
                  drag={state.drag}
                  type={'h'}
                  loc={[i, selShade]}
                  key={i}
                />
              );
            })}
          </fieldset>
          <fieldset style={{}}>
            <legend>Chroma - {state.shades[selShade].name}</legend>
            {state.colours.map((cl, i) => {
              return (
                <SL.Slider
                  {...cl[selShade]}
                  dispatch={dispatch}
                  drag={state.drag}
                  type={'c'}
                  loc={[i, selShade]}
                  key={i}
                />
              );
            })}
          </fieldset>
          <fieldset style={{}}>
            <legend>Lightness - {state.shades[selShade].name}</legend>
            {sliderSet(state, selShade, dispatch)}
          </fieldset>
        </div>
      </main>
    </>
  );
};

export default App;
function hueSet(
  state: {
    name: string;
    selected: [number, number];
    drag: boolean;
    hues: S.HueInfo[];
    shades: S.ShadeInfo[];
    colours: S.Colour[][];
  },
  selHue: number,
  dispatch: React.Dispatch<S.Actions>
) {
  return state.colours[selHue].map((cl, i) => {
    return (
      <SL.Slider
        {...cl}
        dispatch={dispatch}
        drag={state.drag}
        type={'h'}
        loc={[selHue, i]}
        key={i}
        fine
        fineCenter={state.hues[selHue].avgHue}
        fineOffset={45}
      />
    );
  });
}

function sliderSet(
  state: {
    name: string;
    selected: [number, number];
    drag: boolean;
    hues: S.HueInfo[];
    shades: S.ShadeInfo[];
    colours: S.Colour[][];
  },

  dispatch: React.Dispatch<S.Actions>
) {
  const selSh = state.selected[0] < 0 ? 2 : state.selected[1];

  return state.colours.map((cl, i) => {
    return <SL.Slider {...cl[selSh]} dispatch={dispatch} drag={state.drag} type={'l'} loc={[i, selSh]} key={i} />;
  });
}
