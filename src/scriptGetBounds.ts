import * as bar from 'cli-progress';
import * as CONST from './appConstants';

import { lab } from 'd3-color';
const { min, max } = Math;
const deg2rad = Math.PI / 180;
const rad2deg = 180 / Math.PI;
const filter = new bar.SingleBar(
  { etaBuffer: 2000 },
  bar.Presets.shades_classic
);
const setup = new bar.SingleBar({ etaBuffer: 0 }, bar.Presets.shades_classic);
const colorSet = new Set<number>();

// setup.start(256 * 256 * 256, 0);
for (let r = 0; r < 256; r++)
  for (let g = 0; g < 256; g++)
    for (let b = 0; b < 256; b++) {
      colorSet.add(b + (g << 8) + (r << 16));
      setup.increment();
    }
// setup.stop();
const OFFSET = 0.1;

function calculateLAB(l: number, a: number, b: number) {
  const color = lab(l, a, b);
  const { r, g, b: bl } = color.rgb();

  if (r > 255 || g > 255 || bl > 255) return;
  const { floor: flr } = Math;

  colorSet.delete(flr(bl) + (flr(g) << 8) + (flr(r) << 16));
}
function calculateGrey(l: number) {
  const { r, g, b } = lab(l, 0, 0).rgb();

  if (r > 255 || g > 255 || b > 255) return;
  const { floor: flr } = Math;

  colorSet.delete(flr(b) + (flr(g) << 8) + (flr(r) << 16));
}
filter.start((360 / OFFSET) * (135 / OFFSET), 0);
for (let h = 0; h < CONST.hueMax; h = h + OFFSET) {
  const ha = Math.cos(h * deg2rad);
  const hb = Math.sin(h * deg2rad);

  for (let c = 0; c < CONST.chromaMax; c = c + OFFSET) {
    const a = ha * c;
    const b = hb * c;

    filter.increment();
    for (let l = 0; l < CONST.lightnessMax; l = l + OFFSET) {
      calculateLAB(l, a, b);
    }
  }
}
filter.stop();
console.log(colorSet.size / 0xffffff);
