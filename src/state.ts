export interface Colour {
  id: string;
  hue: number;
  chroma: number;
  lightness: number;
  hexColor: string;
  name: string;
  colorIsDark: boolean;
  realValue: {
    hue: number;
    chroma: number;
    lightness: number;
  };
}
export type ColourProperties = 'hue' | 'chroma' | 'lightness';
export interface HueInfo {
  id: string;
  name: string;
  avgHue: number;
}
export interface ShadeInfo {
  id: string;
  name: string;
  avgLightness: number;
}
export interface PalleteImport {
  name: string;
  hues: string[];
  shades: string[];
  colours: { h: number; c: number; l: number }[][];
}
