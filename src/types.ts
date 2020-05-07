export type HCLProp = 'h' | 'c' | 'l';
export interface ColorLocator {
    hue: number;
    shade: number;
}
export interface ValueLocatior extends ColorLocator {
    p: HCLProp;
}
export type col = {
    h: number;
    c: number;
    l: number;
};
export type JSONPallete = {
    shades: string[];
    hues: string[];
    colours: col[][];
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
    SET_VAL,
    SET_COLOR,
    RENAME,
    LOAD_PALLETE,
    SAVE_PALLETE,
    REBUILD,
}
interface ActionBaseRequest {
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
export interface RenameActionRequest {
    type: ACTION_TYPES.RENAME;
    data: {
        shade: number;
        hue: number;
        name: string;
    };
}
export interface ActionRequest<A extends ActionBaseRequest> {
    type: A['type'];
    data: A['data'];
}
