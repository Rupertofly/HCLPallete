export type HCLProp = 'h' | 'c' | 'l';
export interface ColorLocator {
    hue: number;
    shade: number;
}
interface UIColours extends Readonly<any> {
    readonly DARK_COL: string;
    readonly LIGHT_COL: string;
}
export enum UICOLOURS {
    DARK_COL = '#373737',
    LIGHT_COL = '#f0f0f0',
}

export interface ValueLocatior extends ColorLocator {
    p: HCLProp;
}
export interface Col {
    h: number;
    c: number;
    l: number;
    hex: string;
    light: boolean;
    r: {
        h: number;
        c: number;
        l: number;
    };
}
export type JSONPallete = {
    shades: string[];
    hues: string[];
    colours: Col[][];
};
// module 'ntcjs' {
//     const content: any;
//     export default content;
// }
export enum COL_PROPS {
    h = 'h',
    c = 'c',
    l = 'l',
}
export enum ACTION_TYPES {
    SET_VAL = 'setValue',
    SET_COLOR = 'setColor',
    ADD_LAYER = 'addLayer',
    REMOVE_LAYER = 'removeLayer',
    RENAME = 'rename',
    LOAD_PALLETE = 'loadPallete',
    SAVE_PALLETE = 'savePallete',
    IMPORT_PALLETE = 'importPallete',
    REBUILD = 'rebuild',
}
export interface ActionBaseRequest {
    type: ACTION_TYPES;
    data: Record<string, any>;
}
export interface SetValActionRequest {
    type: ACTION_TYPES.SET_VAL;
    data: {
        shade: number;
        hue: number;
        prop: COL_PROPS;
        value: number;
    };
}
export interface SetColorActionRequest {
    type: ACTION_TYPES.SET_COLOR;
    data: {
        shade: number;
        hue: number;
        color: string;
    };
}
export interface AddLayerActionRequest {
    type: ACTION_TYPES.ADD_LAYER;
    data: {
        layerType: 'hue' | 'shade';
        name: string;
    };
}
export interface RemoveLayerActionRequest {
    type: ACTION_TYPES.REMOVE_LAYER;
    data: {
        layerType: 'hue' | 'shade';
        index: number;
    };
}

export interface RenameActionRequest {
    type: ACTION_TYPES.RENAME;
    data: {
        layerType: 'hue' | 'shade';
        index: number;
        name: string;
    };
}
export interface LoadPalleteActionRequest {
    type: ACTION_TYPES.LOAD_PALLETE;
    data: {
        name: string;
    };
}
export interface SavePalleteActionRequest {
    type: ACTION_TYPES.SAVE_PALLETE;
    data: {
        name: string;
    };
}
export interface ImportPalleteActionRequest {
    type: ACTION_TYPES.IMPORT_PALLETE;
    data: {
        dataString: string;
    };
}
export interface RebuildPalleteActionRequest {
    type: ACTION_TYPES.REBUILD;
    data: {};
}
export type ActionOptions =
    | SetColorActionRequest
    | SetValActionRequest
    | RenameActionRequest
    | AddLayerActionRequest
    | RemoveLayerActionRequest
    | LoadPalleteActionRequest
    | SavePalleteActionRequest
    | ImportPalleteActionRequest
    | RebuildPalleteActionRequest;
export interface ActionRequest<A extends ActionOptions> {
    type: A['type'];
    data: A['data'];
}
export type reducerFunction<A extends ActionOptions> = (state: JSONPallete, action: A) => JSONPallete;
interface SelectAction {
    action: 'select';
    tile: [number, number];
}
interface DeselectAction {
    action: 'deselect';
    tile?: [number, number];
}
export type SelectionOptions = SelectAction | DeselectAction;
