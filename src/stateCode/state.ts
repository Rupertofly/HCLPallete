import { uniqueId as uID } from 'lodash';
import * as NT from 'ntcjs';
import * as d3 from 'd3';
export interface Colour {
  id: string;
  h: number;
  c: number;
  l: number;
  hex: string;
  name: string;
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
  selected: [-1, -1] as [number, number],
  drag: false,
  hues: [
    { id: uID('hue-'), name: 'Pinks', avgHue: 8.0 },
    { id: uID('hue-'), name: 'Oranges', avgHue: 52.0 },
    { id: uID('hue-'), name: 'Yellows', avgHue: 86.56 },
    { id: uID('hue-'), name: 'Greens', avgHue: 123.06 },
    { id: uID('hue-'), name: 'Aquas', avgHue: 212.32 },
    { id: uID('hue-'), name: 'Purples', avgHue: 295.06 },
    { id: uID('hue-'), name: 'YGreys', avgHue: 96.23 },
    { id: uID('hue-'), name: 'PGreys', avgHue: 315.72 },
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
      {
        id: 'col-14',
        h: 4.85,
        c: 30.38,
        l: 80.71,
        hex: '#ffb3c5',
        light: true,
        r: { h: 4.85, c: 30.38, l: 80.71 },
        name: 'Pink',
      },
      {
        id: 'col-15',
        h: 10.49,
        c: 65.06,
        l: 63.3,
        hex: '#ff5f88',
        light: true,
        r: { h: 10.49, c: 65.06, l: 63.3 },
        name: 'Wild Watermelon',
      },
      {
        id: 'col-16',
        h: 11.84,
        c: 53.97,
        l: 47.44,
        hex: '#c04261',
        light: false,
        r: { h: 11.84, c: 53.97, l: 47.44 },
        name: 'Blush',
      },
      {
        id: 'col-17',
        h: 6.74,
        c: 30.65,
        l: 35.86,
        hex: '#813f50',
        light: false,
        r: { h: 6.74, c: 30.65, l: 35.86 },
        name: 'Lotus',
      },
      {
        id: 'col-18',
        h: 6.09,
        c: 19.79,
        l: 20.9,
        hex: '#4d2630',
        light: false,
        r: { h: 6.09, c: 19.79, l: 20.9 },
        name: 'Livid Brown',
      },
    ],
    [
      {
        id: 'col-19',
        h: 52.05,
        c: 26.5,
        l: 85.85,
        hex: '#ffcbb0',
        light: true,
        r: { h: 52.05, c: 26.5, l: 85.85 },
        name: 'Romantic',
      },
      {
        id: 'col-20',
        h: 51.62,
        c: 57.69,
        l: 72.74,
        hex: '#fd9761',
        light: true,
        r: { h: 51.62, c: 57.69, l: 72.74 },
        name: 'Atomic Tangerine',
      },
      {
        id: 'col-21',
        h: 51.92,
        c: 51.67,
        l: 54.61,
        hex: '#c06b3d',
        light: true,
        r: { h: 51.92, c: 51.67, l: 54.61 },
        name: 'Copper',
      },
      {
        id: 'col-22',
        h: 52.1,
        c: 26.65,
        l: 40.58,
        hex: '#80553e',
        light: false,
        r: { h: 52.1, c: 26.65, l: 40.58 },
        name: 'Spicy Mix',
      },
      {
        id: 'col-23',
        h: 52.32,
        c: 17.5,
        l: 24.12,
        hex: '#4d3325',
        light: false,
        r: { h: 52.32, c: 17.5, l: 24.12 },
        name: 'Saddle',
      },
    ],
    [
      {
        id: 'col-24',
        h: 88.8,
        c: 31.81,
        l: 93.63,
        hex: '#ffebaf',
        light: true,
        r: { h: 88.8, c: 31.81, l: 93.63 },
        name: 'Peach',
      },
      {
        id: 'col-25',
        h: 86.39,
        c: 66.07,
        l: 88,
        hex: '#ffd858',
        light: true,
        r: { h: 86.39, c: 66.07, l: 88 },
        name: 'Mustard',
      },
      {
        id: 'col-26',
        h: 85.81,
        c: 56.59,
        l: 67.03,
        hex: '#bf9f36',
        light: true,
        r: { h: 85.81, c: 56.59, l: 67.03 },
        name: 'Earls Green',
      },
      {
        id: 'col-27',
        h: 85.97,
        c: 30.98,
        l: 47.3,
        hex: '#806e3b',
        light: false,
        r: { h: 85.97, c: 30.98, l: 47.3 },
        name: 'Yellow Metal',
      },
      {
        id: 'col-28',
        h: 85.83,
        c: 20.04,
        l: 28.55,
        hex: '#4d4224',
        light: false,
        r: { h: 85.83, c: 20.04, l: 28.55 },
        name: 'Lisbon Brown',
      },
    ],
    [
      {
        id: 'col-29',
        h: 123.55,
        c: 41.95,
        l: 95.79,
        hex: '#d8ffad',
        light: true,
        r: { h: 123.55, c: 41.95, l: 95.79 },
        name: 'Reef',
      },
      {
        id: 'col-30',
        h: 122.65,
        c: 57.31,
        l: 82.35,
        hex: '#a8dc6d',
        light: true,
        r: { h: 122.65, c: 57.31, l: 82.35 },
        name: 'Yellow Green',
      },
      {
        id: 'col-31',
        h: 122.36,
        c: 60.35,
        l: 71.79,
        hex: '#89bf4b',
        light: true,
        r: { h: 122.36, c: 60.35, l: 71.79 },
        name: 'Sushi',
      },
      {
        id: 'col-32',
        h: 123.27,
        c: 39.98,
        l: 49.76,
        hex: '#5e803a',
        light: false,
        r: { h: 123.27, c: 39.98, l: 49.76 },
        name: 'Fern Green',
      },
      {
        id: 'col-33',
        h: 123.48,
        c: 25.78,
        l: 30.25,
        hex: '#394d24',
        light: false,
        r: { h: 123.48, c: 25.78, l: 30.25 },
        name: 'Woodland',
      },
    ],
    [
      {
        id: 'col-34',
        h: 207.98,
        c: 23.92,
        l: 92.8,
        hex: '#b1f7ff',
        light: true,
        r: { h: 207.98, c: 23.92, l: 92.8 },
        name: 'French Pass',
      },
      {
        id: 'col-35',
        h: 209.48,
        c: 32.78,
        l: 81.99,
        hex: '#76dce9',
        light: true,
        r: { h: 209.48, c: 32.78, l: 81.99 },
        name: 'Sky Blue',
      },
      {
        id: 'col-36',
        h: 209.53,
        c: 30.88,
        l: 67.94,
        hex: '#54b4c0',
        light: true,
        r: { h: 209.53, c: 30.88, l: 67.94 },
        name: 'Fountain Blue',
      },
      {
        id: 'col-37',
        h: 214.11,
        c: 20.6,
        l: 46.53,
        hex: '#3f7781',
        light: false,
        r: { h: 214.11, c: 20.6, l: 46.53 },
        name: 'Oracle',
      },
      {
        id: 'col-38',
        h: 220.52,
        c: 13.28,
        l: 27.58,
        hex: '#27464e',
        light: false,
        r: { h: 220.52, c: 13.28, l: 27.58 },
        name: 'Plantation',
      },
    ],
    [
      {
        id: 'col-39',
        h: 294.23,
        c: 39.83,
        l: 76.05,
        hex: '#bfb3ff',
        light: true,
        r: { h: 294.23, c: 39.83, l: 76.05 },
        name: 'Melrose',
      },
      {
        id: 'col-40',
        h: 294.87,
        c: 47.53,
        l: 68.62,
        hex: '#ab9df6',
        light: true,
        r: { h: 294.87, c: 47.53, l: 68.62 },
        name: 'Portage',
      },
      {
        id: 'col-41',
        h: 295.93,
        c: 51.08,
        l: 48.93,
        hex: '#7769c3',
        light: false,
        r: { h: 295.93, c: 51.08, l: 48.93 },
        name: 'Blue Marguerite',
      },
      {
        id: 'col-42',
        h: 296.16,
        c: 41.15,
        l: 30.82,
        hex: '#4a4083',
        light: false,
        r: { h: 296.16, c: 41.15, l: 30.82 },
        name: 'Victoria',
      },
      {
        id: 'col-43',
        h: 294.09,
        c: 26.72,
        l: 17.76,
        hex: '#2b274f',
        light: false,
        r: { h: 294.09, c: 26.72, l: 17.76 },
        name: 'Martinique',
      },
    ],
    [
      {
        id: 'col-44',
        h: 94.6,
        c: 10.77,
        l: 98.25,
        hex: '#fffae5',
        light: true,
        r: { h: 94.6, c: 10.77, l: 98.25 },
        name: 'Early Dawn',
      },
      {
        id: 'col-45',
        h: 95.68,
        c: 4.79,
        l: 81.3,
        hex: '#cccac1',
        light: true,
        r: { h: 95.68, c: 4.79, l: 81.3 },
        name: 'Cloud',
      },
      {
        id: 'col-46',
        h: 91.36,
        c: 3.44,
        l: 62.5,
        hex: '#999791',
        light: true,
        r: { h: 91.36, c: 3.44, l: 62.5 },
        name: 'Star Dust',
      },
      {
        id: 'col-47',
        h: 94.65,
        c: 2.43,
        l: 42.78,
        hex: '#666561',
        light: false,
        r: { h: 94.65, c: 2.43, l: 42.78 },
        name: 'Ironside Gray',
      },
      {
        id: 'col-48',
        h: 104.87,
        c: 1.98,
        l: 21.17,
        hex: '#333330',
        light: false,
        r: { h: 104.87, c: 1.98, l: 21.17 },
        name: 'Tuatara',
      },
    ],
    [
      {
        id: 'col-49',
        h: 316.82,
        c: 13.43,
        l: 93.72,
        hex: '#fae7ff',
        light: true,
        r: { h: 316.82, c: 13.43, l: 93.72 },
        name: 'White Pointer',
      },
      {
        id: 'col-50',
        h: 315.4,
        c: 11.53,
        l: 76.88,
        hex: '#c8b9cd',
        light: true,
        r: { h: 315.4, c: 11.53, l: 76.88 },
        name: 'Chatelle',
      },
      {
        id: 'col-51',
        h: 314.81,
        c: 9.08,
        l: 59.21,
        hex: '#968b9a',
        light: true,
        r: { h: 314.81, c: 9.08, l: 59.21 },
        name: 'Mountain Mist',
      },
      {
        id: 'col-52',
        h: 316.29,
        c: 5.93,
        l: 40.39,
        hex: '#645d66',
        light: false,
        r: { h: 316.29, c: 5.93, l: 40.39 },
        name: 'Salt Box',
      },
      {
        id: 'col-53',
        h: 315.28,
        c: 2.98,
        l: 17.5,
        hex: '#2d2a2e',
        light: false,
        r: { h: 315.28, c: 2.98, l: 17.5 },
        name: 'Baltic Sea',
      },
    ],
  ] as Colour[][],
};
export type State = typeof defaultState;
const TAU = 2 * Math.PI;
const fromDeg = (n) => n * (TAU / 360);
const toDeg = (n) => n * (360 / TAU);

function circularMean(angles: number[]) {
  const mSin = d3.mean(angles.map((a) => Math.sin(fromDeg(a))));
  const mCos = d3.mean(angles.map((a) => Math.cos(fromDeg(a))));
  const newAngle = Math.atan2(mSin, mCos);

  return toDeg((TAU + newAngle) % TAU);
}
console.log(
  defaultState.colours
    .map((hueSet, i) => {
      const name = defaultState.hues[i].name;
      const newAvg = circularMean(hueSet.map((c) => c.h));

      return `${name}: ${newAvg.toFixed(2)}`;
    })
    .join('\n')
);
