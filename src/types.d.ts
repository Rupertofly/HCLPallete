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
