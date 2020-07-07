import { reducer, defaultState } from '../stateCode';
import React, { useReducer } from 'react';
export default {
  title: 'name',
  component: Slider,
};
export const story = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const col = state.colours[2][2];

  return (

  );
};
