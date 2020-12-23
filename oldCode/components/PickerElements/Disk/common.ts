import { radialLine } from 'd3';

export const TAU = Math.PI * 2;
export function degree(rad: number) {
  return rad * (360 / TAU);
}
export function radian(deg: number) {
  return deg * (TAU / 360);
}
export function atan2deg(y: number, x: number) {
  return (360 + degree(Math.atan2(y, x))) % 360;
}
