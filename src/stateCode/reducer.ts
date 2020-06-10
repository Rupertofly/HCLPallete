import * as A from './actions';
import * as Store from './store';
import { State } from './state';
const TAP = A.GLOBAL_ACTION_TYPES;

function colourReducer(state: State, { action }: A.ColourActions): State {
  switch (action.type) {
    case 'setColor':
      return Store.handleSetColour(state, action);
    case 'setValue':
      return Store.handleSetVal(state, action);
    default:
      return state;
  }
}
function palleteReducer(state: State, { action }: A.PalleteActions): State {
  switch (action.type) {
    case 'addLayer':
      return Store.handleAddLayer(state, action);
    case 'removeLayer':
      return Store.handleRemoveLayer(state, action);
    case 'rearrangeLayer':
      return Store.handleRearrangeLayer(state, action);
    case 'renameLayer':
      return Store.handleRenameLayer(state, action);
    case 'calculateLayer':
      return Store.handleCalculateLayer(state, action);
    default:
      return state;
  }
}

function globalReducer(state: State, { action }: A.GlobalActions): State {
  switch (action.type) {
    case TAP.LOAD_PALLETE:
      return Store.handleLoadPallete(state, action);
    case TAP.SAVE_PALLETE:
      return Store.handleSavePallete(state, action);
    case TAP.RENAME_PALLETE:
      return Store.handleRenamePallete(state, action);
    case TAP.IMPORT_PALLETE:
      return Store.handleImportPallete(state, action);
    case TAP.REBUILD:
      return Store.handleRebuildPallete(state, action);
    case TAP.SELECT_COLOUR:
      return Store.handleSelectColour(state, action);
    default:
      return state;
  }
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
