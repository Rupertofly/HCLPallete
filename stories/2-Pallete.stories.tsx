import React from 'react';
import * as S from '../src/stateCode';
import { Pallete } from '../src/components/SwatchPallete/Pallete';
import * as SL from '../src/components/Slider';
import { COL_PROPS } from '../src/types';

export default { title: 'Pallete', component: Pallete };

export const PalleteStory = () => {
  const [state, dispatch] = React.useReducer(S.reducer, S.defaultState);
  const [drag, setDrag] = React.useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <Pallete st={state} selected={state.selected} dispatch={dispatch} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex' }}>
          {state.selected[0] >= 0
            ? state.colours[state.selected[0]].map((colour, index) => {
                return (
                  <SL.Slider
                    {...colour}
                    instant={drag}
                    max={360 % (360 + state.hues[state.selected[0]].avgHue + 90)}
                    min={360 % (360 + state.hues[state.selected[0]].avgHue - 90)}
                    onChange={(v) =>
                      dispatch(S.setValue({ hue: state.selected[0], shade: index, property: 'h', value: v }))
                    }
                    onStart={() => setDrag(true)}
                    onEnd={() => {
                      setDrag(false);
                      dispatch(S.calculateLayer('hue', state.selected[0]));
                    }}
                    type={COL_PROPS.h}
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
                    instant={drag}
                    max={130}
                    min={0}
                    onChange={(v) =>
                      dispatch(S.setValue({ hue: state.selected[0], shade: index, property: 'c', value: v }))
                    }
                    onStart={() => setDrag(true)}
                    onEnd={() => {
                      setDrag(false);
                      dispatch(S.calculateLayer('hue', state.selected[0]));
                    }}
                    type={COL_PROPS.c}
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
                    instant={drag}
                    max={100}
                    min={0}
                    onChange={(v) =>
                      dispatch(S.setValue({ hue: state.selected[0], shade: index, property: 'l', value: v }))
                    }
                    onStart={() => setDrag(true)}
                    onEnd={() => {
                      setDrag(false);
                      dispatch(S.calculateLayer('hue', state.selected[0]));
                    }}
                    type={COL_PROPS.l}
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
