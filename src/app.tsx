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
  const sel = state.selected[0] < 0 ? 2 : state.selected[0];
  const selSh = state.selected[0] < 0 ? 2 : state.selected[1];

  return (
    <>
      <main className='dark' style={{ margin: '2em' }}>
        <div id='pallete'>
          <Pal.Pallete dispatch={dispatch} st={state} />
        </div>
        <div id='input-sliders' style={{ display: 'flex', flexDirection: 'column' }}>
          <fieldset style={{}}>
            <legend>Hue - {state.hues[sel].name}</legend>
            {state.colours[sel].map((cl, i) => {
              return (
                <SL.Slider
                  {...cl}
                  dispatch={dispatch}
                  drag={state.drag}
                  type={'h'}
                  loc={[sel, i]}
                  key={i}
                  fine
                  fineCenter={state.hues[sel].avgHue}
                  fineOffset={45}
                />
              );
            })}
          </fieldset>
          <fieldset style={{}}>
            <legend>Chroma - {state.hues[sel].name}</legend>
            {state.colours[sel].map((cl, i) => {
              return <SL.Slider {...cl} dispatch={dispatch} drag={state.drag} type={'c'} loc={[sel, i]} key={i} />;
            })}
          </fieldset>
          <fieldset style={{}}>
            <legend>Lightness - {state.hues[sel].name}</legend>
            {state.colours[sel].map((cl, i) => {
              return <SL.Slider {...cl} dispatch={dispatch} drag={state.drag} type={'l'} loc={[sel, i]} key={i} />;
            })}
          </fieldset>
        </div>
        <div id='hue-sliders' style={{ display: 'flex', flexDirection: 'column' }}>
          <fieldset style={{}}>
            <legend>Hue - {state.shades[selSh].name}</legend>
            {state.colours.map((cl, i) => {
              return (
                <SL.Slider {...cl[selSh]} dispatch={dispatch} drag={state.drag} type={'h'} loc={[i, selSh]} key={i} />
              );
            })}
          </fieldset>
          <fieldset style={{}}>
            <legend>Chroma - {state.shades[selSh].name}</legend>
            {state.colours.map((cl, i) => {
              return (
                <SL.Slider {...cl[selSh]} dispatch={dispatch} drag={state.drag} type={'c'} loc={[i, selSh]} key={i} />
              );
            })}
          </fieldset>
          <fieldset style={{}}>
            <legend>Lightness - {state.shades[selSh].name}</legend>
            {state.colours.map((cl, i) => {
              return (
                <SL.Slider {...cl[selSh]} dispatch={dispatch} drag={state.drag} type={'l'} loc={[i, selSh]} key={i} />
              );
            })}
          </fieldset>
        </div>
      </main>
    </>
  );
};

export default App;
