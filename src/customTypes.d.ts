declare module 'ntcjs' {
  type Hex = string;
  type Name = string;
  type Match = boolean;
  type result = [Hex, Name, Match];
  export const names: string[][];

  export function hsl(color: string): [number, number, number];

  export function name(color: string): result;

  export function rgb(color: string): [number, number, number];
}
