import { State, Colour, defaultState } from './State';
import * as Actions from './actions';
import * as d3 from 'd3';
import { uniqueId } from 'lodash';
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
  indexes: number[],
  iterator: iteratorFunc<T>
): U {
  const recurse = (s: any, depth: number) => {
    if (s.constructor !== Array) return s;
    if (depth >= indexes.length - 1) {
      return replaceAt(s, indexes[depth], iterator);
    } else {
      return replaceAt(s, indexes[depth], (arr) => recurse(arr, depth + 1));
    }
  };

  return recurse(source, 0) as U;
}
console.log(
  nDimensionalReplaceAt(
    [
      [1, 2],
      [3, 4],
      [
        [5, 6],
        [7, 8],
      ],
    ],
    [2, 0, 1],
    (a: number) => 99
  )
);

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

  return {
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
console.log(
  handleSetVal(defaultState, {
    type: Actions.COLOUR_ACTION_TYPES.SET_VAL,
    options: { hue: 1, shade: 2, property: 'h', value: 69.69 },
  }).colours[1]
);
