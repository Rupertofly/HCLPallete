import React, { useState, useReducer } from 'react';
import * as PP from 'pick/SwatchPallete/Pallete';
import * as d3 from 'd3';
import * as S from './stateCode';
export const dispatchContext: React.Context<React.Dispatch<
  S.Actions
>> = React.createContext(undefined);

interface Props {
  n?: string;
}
export const App = (props: Props) => {
  const [state, dispatch] = useReducer(S.reducer, S.defaultState);

  return <dispatchContext.Provider value={dispatch}></dispatchContext.Provider>;
};
