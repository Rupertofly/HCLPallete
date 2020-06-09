import React from 'react';
import * as S from '../src/stateCode';
import { Pallete } from '../src/components/SwatchPallete/Pallete';

export default { title: 'Pallete', component: Pallete };

export const PalleteStory = () => {
  const [state, dispatch] = React.useReducer(S.reducer, S.defaultState);
  const [selected, select] = React.useState([0, 0] as [number, number]);

  return <Pallete st={state} select={select} selected={selected} dispatch={dispatch} />;
};
