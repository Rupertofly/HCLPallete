import type { ColourProperties } from 'stateCode';

export const hueMin = 0;
export const hueMax = 360;
export const chromaMin = 0;
export const chromaMax = 135;
export const lightnessMin = 0;
export const lightnessMax = 100;
export function lightnessToT(l: number) {
  return l / lightnessMax;
}
export function tToLightness(t) {
  return t * lightnessMax;
}
export function chromaToT(c: number) {
  return c / chromaMax;
}
export function tToChroma(t) {
  return t * chromaMax;
}
export function hueToT(h: number) {
  return h / hueMax;
}
export function tToHue(t) {
  return t * hueMax;
}
export function TtoProp(prop: ColourProperties, t: number) {
  switch (prop) {
    case 'lightness': {
      return tToLightness(t);
    }
    case 'chroma': {
      return tToChroma(t);
    }
    case 'hue': {
      return tToHue(t);
    }
  }
}
export function propToT(prop: ColourProperties, value: number) {
  switch (prop) {
    case 'lightness': {
      return lightnessToT(value);
    }
    case 'chroma': {
      return chromaToT(value);
    }
    case 'hue': {
      return hueToT(value);
    }
  }
}
