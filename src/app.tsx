import React, { useState, useReducer } from 'react';
import { Pallete } from 'pick/SwatchPallete/Pallete';
import * as d3 from 'd3';
import * as S from './stateCode';
import './normalize.scss';
export const dispatchContext: React.Context<appDispatch> = React.createContext(
  (a) => console.log(a)
);

interface Props {
  n?: string;
}
export const App = (props: Props) => {
  const [state, dispatch] = useReducer(S.reducer, S.defaultState);

  document.body.classList.add('dark');

  return (
    <dispatchContext.Provider value={dispatch}>
      <header>
        <h1>HCL Colour Mixer</h1>
        <button>Import/Export</button>
        <fieldset>
          <legend>Load Pallete</legend>
          <label htmlFor='pSelect'>Select: </label>
          <select name='palleteSelect' id='pSelect'>
            <optgroup label='Default Schemes'>
              <option value='def'>default Pallete</option>
            </optgroup>
          </select>
          <button>Load</button>
        </fieldset>
      </header>
      <main>
        <h2>{state.name}</h2>
        <Pallete st={state} />
      </main>
      <footer>By Ruby Quail</footer>
    </dispatchContext.Provider>
  );
};
