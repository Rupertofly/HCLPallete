import { State, Colour, PalleteImport } from './State';
import * as Actions from './actions';
import * as d3 from 'd3';
import { uniqueId } from 'lodash';
import * as NTC from 'ntcjs';
const TAU = 2 * Math.PI;
const fromDeg = (n) => n * (TAU / 360);
const toDeg = (n) => n * (360 / TAU);

type nDimensionalArray<T> = Array<T | nDimensionalArray<T>>;
type iteratorFunc<T> = (iter: T, index: number, arr: nDimensionalArray<T>) => T;

function replaceAt<T>(array: T[], index: number, iteree: (value: T, i: number, arr: T[]) => T): T[] {
  const newArray = array.slice(0);

  newArray[index] = iteree(array[index], index, array);

  return newArray;
}
function nDimensionalReplaceAt<T, U extends nDimensionalArray<T>>(
  source: U,
  indexes: (number | '_')[],
  iterator: iteratorFunc<T>
): U {
  const recurse = (s: U, depth: number) => {
    if (s.constructor !== Array) return s;
    if (depth >= indexes.length - 1) {
      return indexes[depth] === '_'
        ? s.map((v, i) => iterator(v as T, i, s))
        : replaceAt(s, indexes[depth] as number, iterator);
    } else {
      return indexes[depth] === '_'
        ? s.map((v, i) => recurse(v as U, depth + 1))
        : replaceAt(s, indexes[depth] as number, (arr) => recurse(arr as U, depth + 1));
    }
  };

  return recurse(source, 0) as U;
}

function circularMean(angles: number[]) {
  const mSin = d3.mean(angles.map((a) => Math.sin(fromDeg(a))));
  const mCos = d3.mean(angles.map((a) => Math.cos(fromDeg(a))));
  const newAngle = Math.atan(mSin / mCos);

  return toDeg((TAU + newAngle) % TAU);
}
function calculateColour(col: string, id?: string): Colour;
function calculateColour(h: number, c: number, l: number, id?: string): Colour;
function calculateColour(a: string | number, b?: number | string, cc?: number, id?: string) {
  let color: d3.HCLColor;

  id = id ?? uniqueId('col-');
  if (typeof a === 'string') {
    color = d3.hcl(a);
  } else {
    color = d3.hcl(a, b as number, cc);
  }
  const hex = color.hex();
  const { h, c, l } = color;
  const realCol = d3.hcl(hex);
  const name = NTC.name(hex)[1];

  return {
    name,
    id,
    h,
    c,
    l,
    hex,
    light: l >= 50,
    r: {
      h: realCol.h,
      c: realCol.c,
      l: realCol.l,
    },
  };
}

// Colour Handlers
/* eslint-disable @typescript-eslint/no-use-before-define */

export function handleSetVal(oldState: State, { options }: Actions.ActionSetValue['action']): State {
  const newState: State = {
    ...oldState,
    colours: nDimensionalReplaceAt(oldState.colours, [options.hue, options.shade], (v: Colour) => {
      const newCol = { ...v };

      newCol[options.property] = options.value;
      const { h, c, l, id } = newCol;

      return calculateColour(h, c, l, id);
    }),
  };

  return newState;
}

export function handleSetColour(oldState: State, { options }: Actions.ActionSetColour['action']): State {
  const newState: State = {
    ...oldState,
    colours: nDimensionalReplaceAt(oldState.colours, [options.hue, options.shade], (v: Colour) => {
      if (typeof options.color === 'string') {
        return calculateColour(options.color, v.id);
      } else {
        const { h, c, l } = options.color;

        return calculateColour(h, c, l, v.id);
      }
    }),
  };

  return handleCalculateLayer(
    handleCalculateLayer(newState, Actions.calculateLayer('shade', options.shade).action),
    Actions.calculateLayer('hue', options.hue).action
  );
}
/* eslint-enable @typescript-eslint/no-use-before-define */
// Pallete Handlers

function degDist(a: number, b: number) {
  return Math.abs(b - a) < 180 ? Math.abs(b - a) : 360 - Math.abs(b - a);
}
function handleAddHueLayer(oldState: State, name: string): State {
  const newHue = oldState.hues
    .map((hu) => hu.avgHue)
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
  const { colours } = oldState;

  return {
    ...oldState,
    hues: [...oldState.hues, { name, avgHue: newHue, id: uniqueId('hue-') }],
    colours: [
      ...colours,
      d3
        .range(oldState.shades.length)
        .map((si) =>
          calculateColour(
            newHue,
            d3.mean(colours.map((hue) => hue[si].c)),
            oldState.shades[si].avgValue,
            uniqueId('col-')
          )
        ),
    ],
  };
}
function handleAddShadeLayer(oldState: State, name: string): State {
  return {
    ...oldState,
    shades: [...oldState.shades, { name, avgValue: 45, id: uniqueId('shade-') }],
    colours: oldState.colours.map((hue, hi) => [...hue, calculateColour(oldState.hues[hi].avgHue, 45, 45)]),
  };
}
export function handleAddLayer(oldState: State, { options }: Actions.ActionAddLayer['action']): State {
  switch (options.type) {
    case 'hue':
      return handleAddHueLayer(oldState, uniqueId('hueName'));
    case 'shade':
      return handleAddShadeLayer(oldState, uniqueId('shadeName'));
  }
}
export function handleRemoveLayer(oldState: State, { options }: Actions.ActionRemoveLayer['action']): State {
  switch (options.type) {
    case 'hue':
      return {
        ...oldState,
        selected: [-1, -1],
        hues: oldState.hues.filter((v, i) => i !== options.index),
        colours: oldState.colours.filter((v, i) => i !== options.index),
      };
    case 'shade':
      return {
        ...oldState,
        selected: [-1, -1],
        shades: oldState.shades.filter((v, i) => i !== options.index),
        colours: oldState.colours.map((v) => v.filter((b, i) => i !== options.index)),
      };
    default:
      return oldState;
  }
}
function swapIndex<T>(source: T[], from: number, to: number): T[] {
  const temp = source[to];
  const newArr = source.slice(0);

  newArr[to] = source[from];
  newArr[from] = temp;

  return newArr;
}
export function handleRearrangeLayer(oldState: State, { options }: Actions.ActionRearrangeLayer['action']): State {
  switch (options.type) {
    case 'hue':
      return {
        ...oldState,
        hues: swapIndex(oldState.hues, options.from, options.to),
        colours: swapIndex(oldState.colours, options.from, options.to),
      };
    case 'shade':
      return {
        ...oldState,
        shades: swapIndex(oldState.shades, options.from, options.to),
        colours: oldState.colours.map((h) => swapIndex(h, options.from, options.to)),
      };
    default:
      return oldState;
  }
}

export function handleRenameLayer(oldState: State, { options }: Actions.ActionRenameLayer['action']): State {
  switch (options.type) {
    case 'hue':
      return { ...oldState, hues: replaceAt(oldState.hues, options.index, (h) => ({ ...h, name: options.newName })) };
    case 'shade':
      return {
        ...oldState,
        shades: replaceAt(oldState.shades, options.index, (h) => ({ ...h, name: options.newName })),
      };
    default:
      return oldState;
  }
}
export function handleCalculateLayer(oldState: State, { options }: Actions.ActionCalculateLayer['action']): State {
  switch (options.type) {
    case 'hue':
      return {
        ...oldState,
        hues: replaceAt(oldState.hues, options.index, (v) => ({
          ...v,
          avgHue: circularMean(oldState.colours[options.index].map((b) => b.h)),
        })),
      };
    case 'shade':
      return {
        ...oldState,
        shades: replaceAt(oldState.shades, options.index, (v) => ({
          ...v,
          avgValue: circularMean(oldState.colours.map((b) => b[options.index].l)),
        })),
      };
    default:
      return oldState;
  }
}

// Global Handlers
function calculateAverages(state: State) {
  return [
    ...state.hues.map((v, i) => ['hue', i] as const),
    ...state.shades.map((v, i) => ['shade', i] as const),
  ].reduce(
    (runningState, action) => handleCalculateLayer(runningState, Actions.calculateLayer(action[0], action[1]).action),
    state
  );
}
function parseImportedPallete(importedPallete: PalleteImport): State {
  const newState: State = {
    selected: [-1, -1],
    name: importedPallete.name,
    colours: importedPallete.colours.map((hu) => hu.map((cl) => calculateColour(cl.h, cl.c, cl.l))),
    shades: importedPallete.shades.map((v) => ({ avgValue: 50, id: uniqueId('shade-'), name: v })),
    hues: importedPallete.hues.map((v) => ({ avgHue: 50, id: uniqueId('hue-'), name: v })),
  };

  return calculateAverages(newState);
}
function stringifyState(state: State): string {
  const output: PalleteImport = {
    colours: state.colours.map((hu) => hu.map(({ h, c, l }) => ({ h, c, l }))),
    shades: state.shades.map((s) => s.name),
    hues: state.hues.map((s) => s.name),
    name: state.name,
  };

  return JSON.stringify(output);
}

export function handleLoadPallete(oldState: State, { options }: Actions.ActionLoadPallete['action']): State {
  const dataString = localStorage.getItem(options.name);

  if (!dataString) return oldState;

  return parseImportedPallete(JSON.parse(dataString));
}

export function handleSavePallete(oldState: State, { options }: Actions.ActionSavePallete['action']): State {
  const saveString = stringifyState(oldState);

  localStorage.setItem(oldState.name, saveString);

  return oldState;
}

export function handleRenamePallete(oldState: State, { options }: Actions.ActionRenamePallete['action']): State {
  return { ...oldState, name: options.newName };
}

export function handleImportPallete(oldState: State, { options }: Actions.ActionImportPallete['action']): State {
  const newState = parseImportedPallete(options.toImport);

  return newState;
}
export function handleRebuildPallete(oldState: State, { options }: Actions.ActionRebuildPallete['action']): State {
  return calculateAverages({
    ...oldState,
    colours: nDimensionalReplaceAt(oldState.colours, ['_', '_'], (c: Colour) => calculateColour(c.hex, c.id)),
  });
}
export function handleSelectColour(oldState: State, { options }: Actions.ActionSelectColour['action']): State {
  return { ...oldState, selected: options.location };
}
