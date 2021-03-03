/** Declaration file generated by dts-gen */
import * as R from 'react';
import * as S from './stateCode';
declare global {
  interface Colour {
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
  type appDispatch = R.Dispatch<S.Actions>;
  type colourProp = 'h' | 'c' | 'l';
}
export {};