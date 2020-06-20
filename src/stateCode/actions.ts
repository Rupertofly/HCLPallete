import { PalleteImport } from './state';
//#region Colour Actions
export enum COLOUR_ACTION_TYPES {
  SET_VAL = 'setValue',
  SET_COLOR = 'setColor',
}

// Set Colour
type setColourInput = string | { h: number; c: number; l: number };
export function setColour(color: setColourInput, shade: number, hue: number) {
  return {
    actionType: 'COLOUR',
    action: {
      type: COLOUR_ACTION_TYPES.SET_COLOR,
      options: {
        shade,
        hue,
        color,
      },
    },
  } as const;
}
export type ActionSetColour = ReturnType<typeof setColour>;

// Set Value
type valueType = 'h' | 'c' | 'l';
export function setValue(opts: { hue: number; shade: number; property: valueType; value: number }) {
  return {
    actionType: 'COLOUR',
    action: {
      type: COLOUR_ACTION_TYPES.SET_VAL,
      options: {
        ...opts,
      },
    },
  } as const;
}
export type ActionSetValue = ReturnType<typeof setValue>;

export type ColourActions = ActionSetColour | ActionSetValue;
//#endregion
//#region Pallete Actions

export enum PALLETE_ACTION_TYPES {
  ADD_LAYER = 'addLayer',
  REMOVE_LAYER = 'removeLayer',
  REARRANGE_LAYER = 'rearrangeLayer',
  RENAME_LAYER = 'renameLayer',
  CALCULATE_LAYER = 'calculateLayer',
}
type layers = 'hue' | 'shade';
// Add Layer
export function addLayer(layerType: layers) {
  return {
    actionType: 'PALLETE',
    action: {
      type: PALLETE_ACTION_TYPES.ADD_LAYER,
      options: {
        type: layerType,
      },
    },
  } as const;
}
export type ActionAddLayer = ReturnType<typeof addLayer>;
// Remove Layer
export function removeLayer(layerType: layers, index: number) {
  return {
    actionType: 'PALLETE',
    action: {
      type: PALLETE_ACTION_TYPES.REMOVE_LAYER,
      options: {
        type: layerType,
        index,
      },
    },
  } as const;
}
export type ActionRemoveLayer = ReturnType<typeof removeLayer>;
// Rearrange Layer
export function rearrangeLayer(layerType: layers, from: number, to: number) {
  return {
    actionType: 'PALLETE',
    action: {
      type: PALLETE_ACTION_TYPES.REARRANGE_LAYER,
      options: {
        type: layerType,
        from,
        to,
      },
    },
  } as const;
}
export type ActionRearrangeLayer = ReturnType<typeof rearrangeLayer>;
// Rename Layer
export function renameLayer(layerType: layers, index: number, newName: string) {
  return {
    actionType: 'PALLETE',
    action: {
      type: PALLETE_ACTION_TYPES.RENAME_LAYER,
      options: {
        type: layerType,
        index,
        newName,
      },
    },
  } as const;
}
export type ActionRenameLayer = ReturnType<typeof renameLayer>;

export function calculateLayer(layerType: layers, index: number) {
  return {
    actionType: 'PALLETE',
    action: {
      type: PALLETE_ACTION_TYPES.CALCULATE_LAYER,
      options: {
        type: layerType,
        index,
      },
    },
  } as const;
}
export type ActionCalculateLayer = ReturnType<typeof calculateLayer>;

export type PalleteActions =
  | ActionAddLayer
  | ActionCalculateLayer
  | ActionRearrangeLayer
  | ActionRemoveLayer
  | ActionRenameLayer;
//#endregion
//#region Global Actions
export enum GLOBAL_ACTION_TYPES {
  LOAD_PALLETE = 'loadPallete',
  SAVE_PALLETE = 'savePallete',
  RENAME_PALLETE = 'renamePallete',
  IMPORT_PALLETE = 'importPallete',
  REBUILD = 'rebuild',
  SELECT_COLOUR = 'selectColour',
  DRAG = 'drag',
}
// Load Pallete
export function loadPallete(name: string) {
  return {
    actionType: 'GLOBAL',
    action: {
      type: GLOBAL_ACTION_TYPES.LOAD_PALLETE,
      options: {
        name,
      },
    },
  } as const;
}
export type ActionLoadPallete = ReturnType<typeof loadPallete>;

// Save Pallete
export function savePallete() {
  return {
    actionType: 'GLOBAL',
    action: {
      type: GLOBAL_ACTION_TYPES.SAVE_PALLETE,
      options: {},
    },
  } as const;
}
export type ActionSavePallete = ReturnType<typeof savePallete>;

// Rename Pallete
export function renamePallete(newName: string) {
  return {
    actionType: 'GLOBAL',
    action: {
      type: GLOBAL_ACTION_TYPES.RENAME_PALLETE,
      options: {
        newName,
      },
    },
  } as const;
}
export type ActionRenamePallete = ReturnType<typeof renamePallete>;
// Import Pallete
export function importPallete(toImport: PalleteImport) {
  return {
    actionType: 'GLOBAL',
    action: {
      type: GLOBAL_ACTION_TYPES.IMPORT_PALLETE,
      options: {
        toImport,
      },
    },
  } as const;
}
export type ActionImportPallete = ReturnType<typeof importPallete>;
// Rebuild
export function rebuildPallete() {
  return {
    actionType: 'GLOBAL',
    action: {
      type: GLOBAL_ACTION_TYPES.REBUILD,
      options: {},
    },
  } as const;
}
export type ActionRebuildPallete = ReturnType<typeof rebuildPallete>;
// Select Colour
export function selectColour(location: { hue: number; shade: number }) {
  return {
    actionType: 'GLOBAL',
    action: {
      type: GLOBAL_ACTION_TYPES.SELECT_COLOUR,
      options: {
        location,
      },
    },
  } as const;
}
export type ActionSelectColour = ReturnType<typeof selectColour>;
// Drag
export function drag(isDragging: boolean) {
  return {
    actionType: 'GLOBAL',
    action: {
      type: GLOBAL_ACTION_TYPES.DRAG,
      options: {
        isDragging,
      },
    },
  } as const;
}
export type ActionDrag = ReturnType<typeof drag>;
export type GlobalActions =
  | ActionLoadPallete
  | ActionSavePallete
  | ActionImportPallete
  | ActionRenamePallete
  | ActionRebuildPallete
  | ActionSelectColour
  | ActionDrag;
//#endregion
export type Actions = ColourActions | PalleteActions | GlobalActions;
