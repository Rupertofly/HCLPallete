import { Slider } from '../src/components/Slider';
import { reducer, defaultState } from '../src/stateCode';
import React, { useReducer } from 'react';
export default {
  title: 'name',
  component: Slider,
};
export const story = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const col = state.colours[2][2];

  return (
    <Slider
      {...col}
      dispatch={dispatch}
      drag={state.drag}
      loc={{ hue: 2, shade: 2 }}
      type={'c'}
    />
  );
};
