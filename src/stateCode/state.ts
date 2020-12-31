import { uniqueId as uID } from 'lodash';
import * as NT from 'ntcjs';
import * as d3 from 'd3';
export interface Colour {
  identifier: string;
  hue: number;
  chroma: number;
  lightness: number;
  hexColour: string;
  name: string;
  apparentValues: {
    h: number;
    c: number;
    l: number;
  };
}
export type ColourProperties = 'hue' | 'chroma' | 'lightness';
export interface HueInfo {
  identifier: string;
  name: string;
  averageLightness: number;
}
export interface ShadeInfo {
  identifier: string;
  name: string;
  averageLightness: number;
}
export interface PalleteImport {
  name: string;
  hues: string[];
  shades: string[];
  colours: { h: number; c: number; l: number }[][];
}
export const defaultPallete = {
  name: 'defaultPallete' as string,
  hues: [
    { identifier: uID('hue-'), name: 'Pinks', averageLightness: 8.0 },
    { identifier: uID('hue-'), name: 'Oranges', averageLightness: 52.0 },
    { identifier: uID('hue-'), name: 'Yellows', averageLightness: 86.56 },
    { identifier: uID('hue-'), name: 'Greens', averageLightness: 123.06 },
    { identifier: uID('hue-'), name: 'Aquas', averageLightness: 212.32 },
    { identifier: uID('hue-'), name: 'Purples', averageLightness: 295.06 },
    { identifier: uID('hue-'), name: 'YGreys', averageLightness: 96.23 },
    { identifier: uID('hue-'), name: 'PGreys', averageLightness: 315.72 },
  ] as HueInfo[],
  shades: [
    {
      identifier: uID('shade-'),
      name: 'Pales',
      averageLightness: 89.59999999999998,
    },
    {
      identifier: uID('shade-'),
      name: 'Brights',
      averageLightness: 76.89750000000001,
    },
    { identifier: uID('shade-'), name: 'Strongs', averageLightness: 59.93125 },
    {
      identifier: uID('shade-'),
      name: 'Deeps',
      averageLightness: 41.752500000000005,
    },
    {
      identifier: uID('shade-'),
      name: 'Darks',
      averageLightness: 23.478749999999998,
    },
  ] as ShadeInfo[],
  colours: [
    [
      {
        identifier: 'col-14',
        hue: 4.85,
        chroma: 30.38,
        lightness: 80.71,
        hexColour: '#ffb3c5',

        apparentValues: { h: 4.85, c: 30.38, l: 80.71 },
        name: 'Pink',
      },
      {
        identifier: 'col-15',
        hue: 10.49,
        chroma: 65.06,
        lightness: 63.3,
        hexColour: '#ff5f88',

        apparentValues: { h: 10.49, c: 65.06, l: 63.3 },
        name: 'Wild Watermelon',
      },
      {
        identifier: 'col-16',
        hue: 11.84,
        chroma: 53.97,
        lightness: 47.44,
        hexColour: '#c04261',

        apparentValues: { h: 11.84, c: 53.97, l: 47.44 },
        name: 'Blush',
      },
      {
        identifier: 'col-17',
        hue: 6.74,
        chroma: 30.65,
        lightness: 35.86,
        hexColour: '#813f50',

        apparentValues: { h: 6.74, c: 30.65, l: 35.86 },
        name: 'Lotus',
      },
      {
        identifier: 'col-18',
        hue: 6.09,
        chroma: 19.79,
        lightness: 20.9,
        hexColour: '#4d2630',

        apparentValues: { h: 6.09, c: 19.79, l: 20.9 },
        name: 'Livid Brown',
      },
    ],
    [
      {
        identifier: 'col-19',
        hue: 52.05,
        chroma: 26.5,
        lightness: 85.85,
        hexColour: '#ffcbb0',

        apparentValues: { h: 52.05, c: 26.5, l: 85.85 },
        name: 'Romantic',
      },
      {
        identifier: 'col-20',
        hue: 51.62,
        chroma: 57.69,
        lightness: 72.74,
        hexColour: '#fd9761',

        apparentValues: { h: 51.62, c: 57.69, l: 72.74 },
        name: 'Atomic Tangerine',
      },
      {
        identifier: 'col-21',
        hue: 51.92,
        chroma: 51.67,
        lightness: 54.61,
        hexColour: '#c06b3d',

        apparentValues: { h: 51.92, c: 51.67, l: 54.61 },
        name: 'Copper',
      },
      {
        identifier: 'col-22',
        hue: 52.1,
        chroma: 26.65,
        lightness: 40.58,
        hexColour: '#80553e',

        apparentValues: { h: 52.1, c: 26.65, l: 40.58 },
        name: 'Spicy Mix',
      },
      {
        identifier: 'col-23',
        hue: 52.32,
        chroma: 17.5,
        lightness: 24.12,
        hexColour: '#4d3325',

        apparentValues: { h: 52.32, c: 17.5, l: 24.12 },
        name: 'Saddle',
      },
    ],
    [
      {
        identifier: 'col-24',
        hue: 88.8,
        chroma: 31.81,
        lightness: 93.63,
        hexColour: '#ffebaf',

        apparentValues: { h: 88.8, c: 31.81, l: 93.63 },
        name: 'Peach',
      },
      {
        identifier: 'col-25',
        hue: 86.39,
        chroma: 66.07,
        lightness: 88,
        hexColour: '#ffd858',

        apparentValues: { h: 86.39, c: 66.07, l: 88 },
        name: 'Mustard',
      },
      {
        identifier: 'col-26',
        hue: 85.81,
        chroma: 56.59,
        lightness: 67.03,
        hexColour: '#bf9f36',

        apparentValues: { h: 85.81, c: 56.59, l: 67.03 },
        name: 'Earls Green',
      },
      {
        identifier: 'col-27',
        hue: 85.97,
        chroma: 30.98,
        lightness: 47.3,
        hexColour: '#806e3b',

        apparentValues: { h: 85.97, c: 30.98, l: 47.3 },
        name: 'Yellow Metal',
      },
      {
        identifier: 'col-28',
        hue: 85.83,
        chroma: 20.04,
        lightness: 28.55,
        hexColour: '#4d4224',

        apparentValues: { h: 85.83, c: 20.04, l: 28.55 },
        name: 'Lisbon Brown',
      },
    ],
    [
      {
        identifier: 'col-29',
        hue: 123.55,
        chroma: 41.95,
        lightness: 95.79,
        hexColour: '#d8ffad',

        apparentValues: { h: 123.55, c: 41.95, l: 95.79 },
        name: 'Reef',
      },
      {
        identifier: 'col-30',
        hue: 122.65,
        chroma: 57.31,
        lightness: 82.35,
        hexColour: '#a8dc6d',

        apparentValues: { h: 122.65, c: 57.31, l: 82.35 },
        name: 'Yellow Green',
      },
      {
        identifier: 'col-31',
        hue: 122.36,
        chroma: 60.35,
        lightness: 71.79,
        hexColour: '#89bf4b',

        apparentValues: { h: 122.36, c: 60.35, l: 71.79 },
        name: 'Sushi',
      },
      {
        identifier: 'col-32',
        hue: 123.27,
        chroma: 39.98,
        lightness: 49.76,
        hexColour: '#5e803a',

        apparentValues: { h: 123.27, c: 39.98, l: 49.76 },
        name: 'Fern Green',
      },
      {
        identifier: 'col-33',
        hue: 123.48,
        chroma: 25.78,
        lightness: 30.25,
        hexColour: '#394d24',

        apparentValues: { h: 123.48, c: 25.78, l: 30.25 },
        name: 'Woodland',
      },
    ],
    [
      {
        identifier: 'col-34',
        hue: 207.98,
        chroma: 23.92,
        lightness: 92.8,
        hexColour: '#b1f7ff',

        apparentValues: { h: 207.98, c: 23.92, l: 92.8 },
        name: 'French Pass',
      },
      {
        identifier: 'col-35',
        hue: 209.48,
        chroma: 32.78,
        lightness: 81.99,
        hexColour: '#76dce9',

        apparentValues: { h: 209.48, c: 32.78, l: 81.99 },
        name: 'Sky Blue',
      },
      {
        identifier: 'col-36',
        hue: 209.53,
        chroma: 30.88,
        lightness: 67.94,
        hexColour: '#54b4c0',

        apparentValues: { h: 209.53, c: 30.88, l: 67.94 },
        name: 'Fountain Blue',
      },
      {
        identifier: 'col-37',
        hue: 214.11,
        chroma: 20.6,
        lightness: 46.53,
        hexColour: '#3f7781',

        apparentValues: { h: 214.11, c: 20.6, l: 46.53 },
        name: 'Oracle',
      },
      {
        identifier: 'col-38',
        hue: 220.52,
        chroma: 13.28,
        lightness: 27.58,
        hexColour: '#27464e',

        apparentValues: { h: 220.52, c: 13.28, l: 27.58 },
        name: 'Plantation',
      },
    ],
    [
      {
        identifier: 'col-39',
        hue: 294.23,
        chroma: 39.83,
        lightness: 76.05,
        hexColour: '#bfb3ff',

        apparentValues: { h: 294.23, c: 39.83, l: 76.05 },
        name: 'Melrose',
      },
      {
        identifier: 'col-40',
        hue: 294.87,
        chroma: 47.53,
        lightness: 68.62,
        hexColour: '#ab9df6',

        apparentValues: { h: 294.87, c: 47.53, l: 68.62 },
        name: 'Portage',
      },
      {
        identifier: 'col-41',
        hue: 295.93,
        chroma: 51.08,
        lightness: 48.93,
        hexColour: '#7769c3',

        apparentValues: { h: 295.93, c: 51.08, l: 48.93 },
        name: 'Blue Marguerite',
      },
      {
        identifier: 'col-42',
        hue: 296.16,
        chroma: 41.15,
        lightness: 30.82,
        hexColour: '#4a4083',

        apparentValues: { h: 296.16, c: 41.15, l: 30.82 },
        name: 'Victoria',
      },
      {
        identifier: 'col-43',
        hue: 294.09,
        chroma: 26.72,
        lightness: 17.76,
        hexColour: '#2b274f',

        apparentValues: { h: 294.09, c: 26.72, l: 17.76 },
        name: 'Martinique',
      },
    ],
    [
      {
        identifier: 'col-44',
        hue: 94.6,
        chroma: 10.77,
        lightness: 98.25,
        hexColour: '#fffae5',

        apparentValues: { h: 94.6, c: 10.77, l: 98.25 },
        name: 'Early Dawn',
      },
      {
        identifier: 'col-45',
        hue: 95.68,
        chroma: 4.79,
        lightness: 81.3,
        hexColour: '#cccac1',

        apparentValues: { h: 95.68, c: 4.79, l: 81.3 },
        name: 'Cloud',
      },
      {
        identifier: 'col-46',
        hue: 91.36,
        chroma: 3.44,
        lightness: 62.5,
        hexColour: '#999791',

        apparentValues: { h: 91.36, c: 3.44, l: 62.5 },
        name: 'Star Dust',
      },
      {
        identifier: 'col-47',
        hue: 94.65,
        chroma: 2.43,
        lightness: 42.78,
        hexColour: '#666561',

        apparentValues: { h: 94.65, c: 2.43, l: 42.78 },
        name: 'Ironside Gray',
      },
      {
        identifier: 'col-48',
        hue: 104.87,
        chroma: 1.98,
        lightness: 21.17,
        hexColour: '#333330',

        apparentValues: { h: 104.87, c: 1.98, l: 21.17 },
        name: 'Tuatara',
      },
    ],
    [
      {
        identifier: 'col-49',
        hue: 316.82,
        chroma: 13.43,
        lightness: 93.72,
        hexColour: '#fae7ff',

        apparentValues: { h: 316.82, c: 13.43, l: 93.72 },
        name: 'White Pointer',
      },
      {
        identifier: 'col-50',
        hue: 315.4,
        chroma: 11.53,
        lightness: 76.88,
        hexColour: '#c8b9cd',

        apparentValues: { h: 315.4, c: 11.53, l: 76.88 },
        name: 'Chatelle',
      },
      {
        identifier: 'col-51',
        hue: 314.81,
        chroma: 9.08,
        lightness: 59.21,
        hexColour: '#968b9a',

        apparentValues: { h: 314.81, c: 9.08, l: 59.21 },
        name: 'Mountain Mist',
      },
      {
        identifier: 'col-52',
        hue: 316.29,
        chroma: 5.93,
        lightness: 40.39,
        hexColour: '#645d66',

        apparentValues: { h: 316.29, c: 5.93, l: 40.39 },
        name: 'Salt Box',
      },
      {
        identifier: 'col-53',
        hue: 315.28,
        chroma: 2.98,
        lightness: 17.5,
        hexColour: '#2d2a2e',

        apparentValues: { h: 315.28, c: 2.98, l: 17.5 },
        name: 'Baltic Sea',
      },
    ],
  ] as Colour[][],
};
export type State = typeof defaultPallete;
export type Selected = { hue: number | null; shade: number | null };
export type Location = { hue: number; shade: number };
