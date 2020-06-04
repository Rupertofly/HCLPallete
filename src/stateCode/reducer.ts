import * as A from './actions';
import { State } from './state';

function colourReducer(state: State, { action }: A.ColourActions): State {
  switch (action.type) {
    case 'setColor':
      break;
    case 'setValue':
  }

  return state;
}
function palleteReducer(state: State, { action }: A.PalleteActions): State {
  switch (action.type) {
  }

  return state;
}
function globalReducer(state: State, { action }: A.GlobalActions): State {
  switch (action.type) {
  }

  return state;
}
export function reducer(state: State, action: A.Actions): State {
  switch (action.actionType) {
    case 'COLOUR':
      return colourReducer(state, action);
    case 'GLOBAL':
      return globalReducer(state, action);
    case 'PALLETE':
      return palleteReducer(state, action);
    default:
      return state;
  }
}
