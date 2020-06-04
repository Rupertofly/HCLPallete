import * as T from './types';
import { Reducer } from 'react';
import * as d3 from 'd3';
import { hcl } from 'd3';
const TAU = Math.PI * 2;
const fromDeg = (n) => n * (TAU / 360);
const toDeg = (n) => n * (360 / TAU);
const defaultState = {
  hues: [
    { name: 'Pinks', avgHue: 276.22670612171225 },
    { name: 'Oranges', avgHue: 315.71999345370483 },
    { name: 'Yellows', avgHue: 8.001678664721135 },
    { name: 'Greens', avgHue: 52.00200023440547 },
    { name: 'Aquas', avgHue: 86.55989623299905 },
    { name: 'Purples', avgHue: 303.0620022099017 },
    { name: 'YGreys', avgHue: 32.319630634667035 },
    { name: 'PGreys', avgHue: 295.0559944983775 },
  ],
  shades: [
    { name: 'Pales', avgValue: 89.59999999999998 },
    { name: 'Brights', avgValue: 76.89750000000001 },
    { name: 'Strongs', avgValue: 59.93125 },
    { name: 'Deeps', avgValue: 41.752500000000005 },
    { name: 'Darks', avgValue: 23.478749999999998 },
  ],
  colours: [
    [
      { h: 94.6, c: 10.77, l: 98.25, hex: '#fffae5', light: true, r: { h: 94.6, c: 10.77, l: 98.25 } },
      { h: 95.68, c: 4.79, l: 81.3, hex: '#cccac1', light: true, r: { h: 95.68, c: 4.79, l: 81.3 } },
      { h: 91.36, c: 3.44, l: 62.5, hex: '#999791', light: true, r: { h: 91.36, c: 3.44, l: 62.5 } },
      { h: 94.65, c: 2.43, l: 42.78, hex: '#666561', light: false, r: { h: 94.65, c: 2.43, l: 42.78 } },
      { h: 104.87, c: 1.98, l: 21.17, hex: '#333330', light: false, r: { h: 104.87, c: 1.98, l: 21.17 } },
    ],
    [
      { h: 316.82, c: 13.43, l: 93.72, hex: '#fae7ff', light: true, r: { h: 316.82, c: 13.43, l: 93.72 } },
      { h: 315.4, c: 11.53, l: 76.88, hex: '#c8b9cd', light: true, r: { h: 315.4, c: 11.53, l: 76.88 } },
      { h: 314.81, c: 9.08, l: 59.21, hex: '#968b9a', light: true, r: { h: 314.81, c: 9.08, l: 59.21 } },
      { h: 316.29, c: 5.93, l: 40.39, hex: '#645d66', light: false, r: { h: 316.29, c: 5.93, l: 40.39 } },
      { h: 315.28, c: 2.98, l: 17.5, hex: '#2d2a2e', light: false, r: { h: 315.28, c: 2.98, l: 17.5 } },
    ],
    [
      { h: 4.85, c: 30.38, l: 80.71, hex: '#ffb3c5', light: true, r: { h: 4.85, c: 30.38, l: 80.71 } },
      { h: 10.49, c: 65.06, l: 63.3, hex: '#ff5f88', light: true, r: { h: 10.49, c: 65.06, l: 63.3 } },
      { h: 11.84, c: 53.97, l: 47.44, hex: '#c04261', light: false, r: { h: 11.84, c: 53.97, l: 47.44 } },
      { h: 6.74, c: 30.65, l: 35.86, hex: '#813f50', light: false, r: { h: 6.74, c: 30.65, l: 35.86 } },
      { h: 6.09, c: 19.79, l: 20.9, hex: '#4d2630', light: false, r: { h: 6.09, c: 19.79, l: 20.9 } },
    ],
    [
      { h: 52.05, c: 26.5, l: 85.85, hex: '#ffcbb0', light: true, r: { h: 52.05, c: 26.5, l: 85.85 } },
      { h: 51.62, c: 57.69, l: 72.74, hex: '#fd9761', light: true, r: { h: 51.62, c: 57.69, l: 72.74 } },
      { h: 51.92, c: 51.67, l: 54.61, hex: '#c06b3d', light: true, r: { h: 51.92, c: 51.67, l: 54.61 } },
      { h: 52.1, c: 26.65, l: 40.58, hex: '#80553e', light: false, r: { h: 52.1, c: 26.65, l: 40.58 } },
      { h: 52.32, c: 17.5, l: 24.12, hex: '#4d3325', light: false, r: { h: 52.32, c: 17.5, l: 24.12 } },
    ],
    [
      { h: 88.8, c: 31.81, l: 93.63, hex: '#ffebaf', light: true, r: { h: 88.8, c: 31.81, l: 93.63 } },
      { h: 86.39, c: 66.07, l: 88, hex: '#ffd858', light: true, r: { h: 86.39, c: 66.07, l: 88 } },
      { h: 85.81, c: 56.59, l: 67.03, hex: '#bf9f36', light: true, r: { h: 85.81, c: 56.59, l: 67.03 } },
      { h: 85.97, c: 30.98, l: 47.3, hex: '#806e3b', light: false, r: { h: 85.97, c: 30.98, l: 47.3 } },
      { h: 85.83, c: 20.04, l: 28.55, hex: '#4d4224', light: false, r: { h: 85.83, c: 20.04, l: 28.55 } },
    ],
    [
      { h: 123.55, c: 41.95, l: 95.79, hex: '#d8ffad', light: true, r: { h: 123.55, c: 41.95, l: 95.79 } },
      { h: 122.65, c: 57.31, l: 82.35, hex: '#a8dc6d', light: true, r: { h: 122.65, c: 57.31, l: 82.35 } },
      { h: 122.36, c: 60.35, l: 71.79, hex: '#89bf4b', light: true, r: { h: 122.36, c: 60.35, l: 71.79 } },
      { h: 123.27, c: 39.98, l: 49.76, hex: '#5e803a', light: false, r: { h: 123.27, c: 39.98, l: 49.76 } },
      { h: 123.48, c: 25.78, l: 30.25, hex: '#394d24', light: false, r: { h: 123.48, c: 25.78, l: 30.25 } },
    ],
    [
      { h: 207.98, c: 23.92, l: 92.8, hex: '#b1f7ff', light: true, r: { h: 207.98, c: 23.92, l: 92.8 } },
      { h: 209.48, c: 32.78, l: 81.99, hex: '#76dce9', light: true, r: { h: 209.48, c: 32.78, l: 81.99 } },
      { h: 209.53, c: 30.88, l: 67.94, hex: '#54b4c0', light: true, r: { h: 209.53, c: 30.88, l: 67.94 } },
      { h: 214.11, c: 20.6, l: 46.53, hex: '#3f7781', light: false, r: { h: 214.11, c: 20.6, l: 46.53 } },
      { h: 220.52, c: 13.28, l: 27.58, hex: '#27464e', light: false, r: { h: 220.52, c: 13.28, l: 27.58 } },
    ],
    [
      { h: 294.23, c: 39.83, l: 76.05, hex: '#bfb3ff', light: true, r: { h: 294.23, c: 39.83, l: 76.05 } },
      { h: 294.87, c: 47.53, l: 68.62, hex: '#ab9df6', light: true, r: { h: 294.87, c: 47.53, l: 68.62 } },
      { h: 295.93, c: 51.08, l: 48.93, hex: '#7769c3', light: false, r: { h: 295.93, c: 51.08, l: 48.93 } },
      { h: 296.16, c: 41.15, l: 30.82, hex: '#4a4083', light: false, r: { h: 296.16, c: 41.15, l: 30.82 } },
      { h: 294.09, c: 26.72, l: 17.76, hex: '#2b274f', light: false, r: { h: 294.09, c: 26.72, l: 17.76 } },
    ],
  ],
};

type State = typeof defaultState;

function circularMean(angles: number[]) {
  const mSin = d3.mean(angles.map((a) => Math.sin(fromDeg(a))));
  const mCos = d3.mean(angles.map((a) => Math.cos(fromDeg(a))));
  const newAngle = Math.atan(mSin / mCos);

  return toDeg((TAU + newAngle) % TAU);
}

// Change Color
function calculateColour(col: string): T.Colour;
function calculateColour(h: number, c: number, l: number): T.Colour;
function calculateColour(a: string | number, b?: number, cc?: number) {
  let color: d3.HCLColor;

  if (typeof a === 'string') {
    color = hcl(a);
  } else {
    color = hcl(a, b, cc);
  }
  const hex = color.hex();
  const { h, c, l } = color;
  const realCol = hcl(hex);

  return {
    h,
    c,
    l,
    hex,
    light: l > 50,
    r: {
      h: realCol.h,
      c: realCol.c,
      l: realCol.l,
    },
  };
}
function getMeanHue(h: number, cols: T.Colour[][]): number {
  return circularMean(cols[h].map((cl) => cl.h));
}

function getMeanShade(s: number, cols: T.Colour[][]): number {
  return d3.mean(cols.map((h) => h[s].l));
}
function updateColor(state: T.State, h: number, s: number, newCol: T.Colour) {
  return {
    ...state,
    colours: state.colours.map((hs, i) => (i === h ? hs.map((ss, i) => (i === s ? newCol : ss)) : hs)),
  } as T.State;
}
function setColor(state: T.State, data: T.SetColorActionRequest['data']) {
  return updateColor(state, data.hue, data.shade, calculateColour(data.color));
}

function setValue(state: T.State, data: T.SetValActionRequest['data']) {
  const updatedColor: T.Colour = { ...state.colours[data.hue][data.shade] };

  updatedColor[data.prop] = data.value;

  return updateColor(state, data.hue, data.shade, calculateColour(updatedColor.h, updatedColor.c, updatedColor.l));
}

// Layers
function degDist(a: number, b: number) {
  return Math.abs(b - a) < 180 ? Math.abs(b - a) : 360 - Math.abs(b - a);
}
function addHueLayer(state: T.State, name: string): T.State {
  const newHue = state.colours
    .map((hs) => d3.mean(hs.map((c) => c.h)))
    .sort()
    .reduce(
      ({ min, ang }, v, i, arr) => {
        let mVal = min;
        let aVal = ang;
        const l = arr.length;
        const fwd = arr[(l + i + 1) % l];
        const bk = arr[(l + i - 1) % l];
        const fwdDistance = degDist(v, fwd);
        const bkwdDistance = degDist(v, bk);

        if (fwdDistance / 2 > mVal) {
          mVal = fwdDistance / 2;
          aVal = l + Math.sign(l - fwd) * mVal;
        }
        if (bkwdDistance / 2 > mVal) {
          mVal = bkwdDistance / 2;
          aVal = l + Math.sign(l - bk) * mVal;
        }

        return { min: mVal, ang: aVal };
      },
      { min: 0, ang: 0 }
    ).ang;

  return {
    shades: state.shades,
    hues: [...state.hues, { name, avgHue: newHue }],
    colours: [
      ...state.colours,
      d3
        .range(state.shades.length)
        .map((si) =>
          calculateColour(
            newHue,
            d3.mean(state.colours.map((hue) => hue[si].c)),
            d3.mean(state.colours.map((hue) => hue[si].l))
          )
        ),
    ],
  };
}
function addShadeLayer(state: T.State, name: string): T.State {
  return {
    hues: state.hues,
    shades: [...state.shades, { name, avgValue: 45 }],
    colours: state.colours.map((hue) => [...hue, calculateColour(d3.mean(hue.map((c) => c.h)), 45, 45)]),
  };
}
function addLayer(state: T.State, data: T.AddLayerActionRequest['data']): T.State {
  if (data.name.length < 1) return state;
  switch (data.layerType) {
    case 'hue':
      return addHueLayer(state, data.name);
    case 'shade':
      return addShadeLayer(state, data.name);
    default:
      return state;
  }
}

function removeLayer(state: T.State, data: T.RemoveLayerActionRequest['data']): T.State {
  const ix = data.index;

  switch (data.layerType) {
    case 'hue':
      return {
        shades: state.shades,
        hues: state.hues.filter((v, i) => i !== ix),
        colours: state.colours.filter((v, i) => i !== ix),
      };
    case 'shade':
      return {
        hues: state.hues,
        shades: state.shades.filter((v, i) => i !== ix),
        colours: state.colours.map((hues) => hues.filter((v, i) => i !== ix)),
      };
    default:
      return state;
  }
}

function renameLayer(state: T.State, data: T.RenameActionRequest['data']): T.State {
  const ix = data.index;
  const nm = data.name;

  switch (data.layerType) {
    case 'hue':
      return {
        ...state,
        hues: state.hues.map((v, i) => (i === ix ? { name: nm, avgHue: v.avgHue } : v)),
      };
    case 'shade':
      return {
        ...state,
        shades: state.shades.map((v, i) => (i === ix ? { name: nm, avgValue: v.avgValue } : v)),
      };
    default:
      return state;
  }
}

// SaveStates and Export

function loadPallete(state: T.State, data: T.LoadPalleteActionRequest['data']): T.State {
  const nm = data.name;
  const dataString = localStorage.getItem(nm);
  const newPallete: T.State = JSON.parse(dataString);

  return { ...newPallete };
}

function savePallete(state: T.State, data: T.SavePalleteActionRequest['data']): T.State {
  const nm = data.name;
  const dataString = JSON.stringify(state);

  localStorage.setItem(nm, dataString);

  return state;
}

export function importPallete(state: T.State, data: T.ImportPalleteActionRequest['data']): T.State {
  const palleteData: T.JSONPallete = JSON.parse(data.dataString);
  const newState: T.State = {
    colours: palleteData.colours.map((hue, hi) => {
      return hue.map((col) => {
        return calculateColour(col.h, col.c, col.l);
      });
    }),
    hues: palleteData.hues.map((nm, i) => {
      return { name: nm, avgHue: circularMean(palleteData.colours[i].map((cl) => cl.h)) };
    }),
    shades: palleteData.shades.map((nm, i) => {
      return {
        name: nm,
        avgValue: d3.mean(palleteData.colours.map((h) => h[i].l)),
      };
    }),
  };

  return newState;
}

function rebuildPallete(state: T.State): T.State {
  return {
    ...state,
    colours: state.colours.map((hs) =>
      hs.map((col) => {
        return calculateColour(col.hex);
      })
    ),
  };
}

function calculateHue(state: T.State, data: T.CalculateHueActionRequest['data']): T.State {
  return {
    ...state,
    hues: state.hues.map((hue, i) => {
      return i === data.hueIndex ? { ...hue, avgHue: getMeanHue(i, state.colours) } : hue;
    }),
  };
}
function calculateShade(state: T.State, data: T.CalculateShadeActionRequest['data']): T.State {
  return {
    ...state,
    shades: state.shades.map((shades, i) => {
      return i === data.shadeIndex ? ({ ...shades, avgShade: getMeanShade(i, state.colours) } as T.ShadeInfo) : shades;
    }),
  };
}

export function palleteReducer(state: T.State, action: T.ActionOptions): T.State {
  switch (action.type) {
    case T.ACTION_TYPES.SET_COLOR:
      return setColor(state, action.data);
    case T.ACTION_TYPES.SET_VAL:
      return setValue(state, action.data);
    case T.ACTION_TYPES.ADD_LAYER:
      return addLayer(state, action.data);
    case T.ACTION_TYPES.REMOVE_LAYER:
      return removeLayer(state, action.data);
    case T.ACTION_TYPES.RENAME:
      return renameLayer(state, action.data);
    case T.ACTION_TYPES.LOAD_PALLETE:
      return loadPallete(state, action.data);
    case T.ACTION_TYPES.SAVE_PALLETE:
      return savePallete(state, action.data);
    case T.ACTION_TYPES.IMPORT_PALLETE:
      return importPallete(state, action.data);
    case T.ACTION_TYPES.REBUILD:
      return rebuildPallete(state);
    case T.ACTION_TYPES.CALCULATE_SHADE:
      return calculateShade(state, action.data);
    case T.ACTION_TYPES.CALCULATE_HUE:
      return calculateHue(state, action.data);
    default:
      return state;
  }
}

export function selectionReducer(selected: [number, number], action: T.SelectionOptions): [number, number] {
  switch (action.action) {
    case 'select':
      return action.tile;
    case 'deselect':
      return [-1, -1];
    default:
      return selected;
  }
}
export default { palleteReducer, selectionReducer };
