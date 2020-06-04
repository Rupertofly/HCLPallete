import { uniqueId as uID } from 'lodash';
export interface Colour {
  id: string;
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
export interface HueInfo {
  id: string;
  name: string;
  avgHue: number;
}
export interface ShadeInfo {
  id: string;
  name: string;
  avgValue: number;
}
export interface PalleteImport {
  name: string;
  hues: string[];
  shades: string[];
  colours: { h: number; c: number; l: number }[][];
}
export const defaultState = {
  name: 'defaultPallete' as string,
  hues: [
    { id: uID('hue-'), name: 'Pinks', avgHue: 276.22670612171225 },
    { id: uID('hue-'), name: 'Oranges', avgHue: 315.71999345370483 },
    { id: uID('hue-'), name: 'Yellows', avgHue: 8.001678664721135 },
    { id: uID('hue-'), name: 'Greens', avgHue: 52.00200023440547 },
    { id: uID('hue-'), name: 'Aquas', avgHue: 86.55989623299905 },
    { id: uID('hue-'), name: 'Purples', avgHue: 303.0620022099017 },
    { id: uID('hue-'), name: 'YGreys', avgHue: 32.319630634667035 },
    { id: uID('hue-'), name: 'PGreys', avgHue: 295.0559944983775 },
  ] as HueInfo[],
  shades: [
    { id: uID('shade-'), name: 'Pales', avgValue: 89.59999999999998 },
    { id: uID('shade-'), name: 'Brights', avgValue: 76.89750000000001 },
    { id: uID('shade-'), name: 'Strongs', avgValue: 59.93125 },
    { id: uID('shade-'), name: 'Deeps', avgValue: 41.752500000000005 },
    { id: uID('shade-'), name: 'Darks', avgValue: 23.478749999999998 },
  ] as ShadeInfo[],
  colours: [
    [
      { id: uID('col-'), h: 94.6, c: 10.77, l: 98.25, hex: '#fffae5', light: true, r: { h: 94.6, c: 10.77, l: 98.25 } },
      { id: uID('col-'), h: 95.68, c: 4.79, l: 81.3, hex: '#cccac1', light: true, r: { h: 95.68, c: 4.79, l: 81.3 } },
      { id: uID('col-'), h: 91.36, c: 3.44, l: 62.5, hex: '#999791', light: true, r: { h: 91.36, c: 3.44, l: 62.5 } },
      {
        id: uID('col-'),
        h: 94.65,
        c: 2.43,
        l: 42.78,
        hex: '#666561',
        light: false,
        r: { h: 94.65, c: 2.43, l: 42.78 },
      },
      {
        id: uID('col-'),
        h: 104.87,
        c: 1.98,
        l: 21.17,
        hex: '#333330',
        light: false,
        r: { h: 104.87, c: 1.98, l: 21.17 },
      },
    ],
    [
      {
        id: uID('col-'),
        h: 316.82,
        c: 13.43,
        l: 93.72,
        hex: '#fae7ff',
        light: true,
        r: { h: 316.82, c: 13.43, l: 93.72 },
      },
      {
        id: uID('col-'),
        h: 315.4,
        c: 11.53,
        l: 76.88,
        hex: '#c8b9cd',
        light: true,
        r: { h: 315.4, c: 11.53, l: 76.88 },
      },
      {
        id: uID('col-'),
        h: 314.81,
        c: 9.08,
        l: 59.21,
        hex: '#968b9a',
        light: true,
        r: { h: 314.81, c: 9.08, l: 59.21 },
      },
      {
        id: uID('col-'),
        h: 316.29,
        c: 5.93,
        l: 40.39,
        hex: '#645d66',
        light: false,
        r: { h: 316.29, c: 5.93, l: 40.39 },
      },
      {
        id: uID('col-'),
        h: 315.28,
        c: 2.98,
        l: 17.5,
        hex: '#2d2a2e',
        light: false,
        r: { h: 315.28, c: 2.98, l: 17.5 },
      },
    ],
    [
      { id: uID('col-'), h: 4.85, c: 30.38, l: 80.71, hex: '#ffb3c5', light: true, r: { h: 4.85, c: 30.38, l: 80.71 } },
      { id: uID('col-'), h: 10.49, c: 65.06, l: 63.3, hex: '#ff5f88', light: true, r: { h: 10.49, c: 65.06, l: 63.3 } },
      {
        id: uID('col-'),
        h: 11.84,
        c: 53.97,
        l: 47.44,
        hex: '#c04261',
        light: false,
        r: { h: 11.84, c: 53.97, l: 47.44 },
      },
      {
        id: uID('col-'),
        h: 6.74,
        c: 30.65,
        l: 35.86,
        hex: '#813f50',
        light: false,
        r: { h: 6.74, c: 30.65, l: 35.86 },
      },
      { id: uID('col-'), h: 6.09, c: 19.79, l: 20.9, hex: '#4d2630', light: false, r: { h: 6.09, c: 19.79, l: 20.9 } },
    ],
    [
      { id: uID('col-'), h: 52.05, c: 26.5, l: 85.85, hex: '#ffcbb0', light: true, r: { h: 52.05, c: 26.5, l: 85.85 } },
      {
        id: uID('col-'),
        h: 51.62,
        c: 57.69,
        l: 72.74,
        hex: '#fd9761',
        light: true,
        r: { h: 51.62, c: 57.69, l: 72.74 },
      },
      {
        id: uID('col-'),
        h: 51.92,
        c: 51.67,
        l: 54.61,
        hex: '#c06b3d',
        light: true,
        r: { h: 51.92, c: 51.67, l: 54.61 },
      },
      {
        id: uID('col-'),
        h: 52.1,
        c: 26.65,
        l: 40.58,
        hex: '#80553e',
        light: false,
        r: { h: 52.1, c: 26.65, l: 40.58 },
      },
      {
        id: uID('col-'),
        h: 52.32,
        c: 17.5,
        l: 24.12,
        hex: '#4d3325',
        light: false,
        r: { h: 52.32, c: 17.5, l: 24.12 },
      },
    ],
    [
      { id: uID('col-'), h: 88.8, c: 31.81, l: 93.63, hex: '#ffebaf', light: true, r: { h: 88.8, c: 31.81, l: 93.63 } },
      { id: uID('col-'), h: 86.39, c: 66.07, l: 88, hex: '#ffd858', light: true, r: { h: 86.39, c: 66.07, l: 88 } },
      {
        id: uID('col-'),
        h: 85.81,
        c: 56.59,
        l: 67.03,
        hex: '#bf9f36',
        light: true,
        r: { h: 85.81, c: 56.59, l: 67.03 },
      },
      {
        id: uID('col-'),
        h: 85.97,
        c: 30.98,
        l: 47.3,
        hex: '#806e3b',
        light: false,
        r: { h: 85.97, c: 30.98, l: 47.3 },
      },
      {
        id: uID('col-'),
        h: 85.83,
        c: 20.04,
        l: 28.55,
        hex: '#4d4224',
        light: false,
        r: { h: 85.83, c: 20.04, l: 28.55 },
      },
    ],
    [
      {
        id: uID('col-'),
        h: 123.55,
        c: 41.95,
        l: 95.79,
        hex: '#d8ffad',
        light: true,
        r: { h: 123.55, c: 41.95, l: 95.79 },
      },
      {
        id: uID('col-'),
        h: 122.65,
        c: 57.31,
        l: 82.35,
        hex: '#a8dc6d',
        light: true,
        r: { h: 122.65, c: 57.31, l: 82.35 },
      },
      {
        id: uID('col-'),
        h: 122.36,
        c: 60.35,
        l: 71.79,
        hex: '#89bf4b',
        light: true,
        r: { h: 122.36, c: 60.35, l: 71.79 },
      },
      {
        id: uID('col-'),
        h: 123.27,
        c: 39.98,
        l: 49.76,
        hex: '#5e803a',
        light: false,
        r: { h: 123.27, c: 39.98, l: 49.76 },
      },
      {
        id: uID('col-'),
        h: 123.48,
        c: 25.78,
        l: 30.25,
        hex: '#394d24',
        light: false,
        r: { h: 123.48, c: 25.78, l: 30.25 },
      },
    ],
    [
      {
        id: uID('col-'),
        h: 207.98,
        c: 23.92,
        l: 92.8,
        hex: '#b1f7ff',
        light: true,
        r: { h: 207.98, c: 23.92, l: 92.8 },
      },
      {
        id: uID('col-'),
        h: 209.48,
        c: 32.78,
        l: 81.99,
        hex: '#76dce9',
        light: true,
        r: { h: 209.48, c: 32.78, l: 81.99 },
      },
      {
        id: uID('col-'),
        h: 209.53,
        c: 30.88,
        l: 67.94,
        hex: '#54b4c0',
        light: true,
        r: { h: 209.53, c: 30.88, l: 67.94 },
      },
      {
        id: uID('col-'),
        h: 214.11,
        c: 20.6,
        l: 46.53,
        hex: '#3f7781',
        light: false,
        r: { h: 214.11, c: 20.6, l: 46.53 },
      },
      {
        id: uID('col-'),
        h: 220.52,
        c: 13.28,
        l: 27.58,
        hex: '#27464e',
        light: false,
        r: { h: 220.52, c: 13.28, l: 27.58 },
      },
    ],
    [
      {
        id: uID('col-'),
        h: 294.23,
        c: 39.83,
        l: 76.05,
        hex: '#bfb3ff',
        light: true,
        r: { h: 294.23, c: 39.83, l: 76.05 },
      },
      {
        id: uID('col-'),
        h: 294.87,
        c: 47.53,
        l: 68.62,
        hex: '#ab9df6',
        light: true,
        r: { h: 294.87, c: 47.53, l: 68.62 },
      },
      {
        id: uID('col-'),
        h: 295.93,
        c: 51.08,
        l: 48.93,
        hex: '#7769c3',
        light: false,
        r: { h: 295.93, c: 51.08, l: 48.93 },
      },
      {
        id: uID('col-'),
        h: 296.16,
        c: 41.15,
        l: 30.82,
        hex: '#4a4083',
        light: false,
        r: { h: 296.16, c: 41.15, l: 30.82 },
      },
      {
        id: uID('col-'),
        h: 294.09,
        c: 26.72,
        l: 17.76,
        hex: '#2b274f',
        light: false,
        r: { h: 294.09, c: 26.72, l: 17.76 },
      },
    ],
  ] as Colour[][],
};
export type State = typeof defaultState;
