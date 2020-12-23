import { path } from 'd3-path';
import { drawRoundLoop } from '@rupertofly/h';
const SQRT3 = Math.sqrt(3);

function triHeight(s: number) {
  return (s / 2) * SQRT3;
}
export function buildTriangle(s: number, r: number) {
  const edge = (2 / SQRT3) * s;
  const halfEdge = edge / 2;
  const p = path();
  const oneWidth = drawRoundLoop(
    [
      [0, -1 * halfEdge],
      [s, 0],
      [0, halfEdge],
    ],
    r,
    p
  );

  return p.toString();
}
export function buildReverseTriangle(s: number, r: number) {
  const edge = (2 / SQRT3) * s;
  const halfEdge = edge / 2;
  const p = path();
  const oneWidth = drawRoundLoop(
    [
      [1, -1 * halfEdge],
      [1 - s, 0],
      [1, halfEdge],
    ],
    r,
    p
  );

  return p.toString();
}
