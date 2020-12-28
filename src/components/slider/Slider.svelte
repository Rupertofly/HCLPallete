<script lang="ts">
  import { ColourProperties } from 'state';
  import { onMount } from 'svelte';
  import * as ns from 'open-simplex-noise';
  import * as tri from './BuildTriangle';
  import { range } from 'd3';
  const bt = tri.buildTriangle;
  const bbt = tri.buildReverseTriangle;
  import SliderBackground from './SliderBackground.svelte';
  const noise = ns.makeNoise2D(Math.random());
  let t = 0;
  let time = 0;
  onMount(() => {
    let anim;
    let fr = () => {
      time = time + 1;
      anim = requestAnimationFrame(fr);
    };
    anim = requestAnimationFrame(fr);
    let it = setInterval(() => {
      t = (t + 1) % 4;
    }, 10000);
    return () => {
      cancelAnimationFrame(anim);
      clearInterval(it);
    };
  });
  function buildWave(t: number, w, q) {
    const points = [];
    for (let x = 0; x <= 1.05; x = x + 0.05) {
      const y = Math.sin(x * w + t) * q;
      points.push(`${x},${y}`);
    }
    return `M${points.join('L')}L1,4L0,4Z`;
  }
  export let value = 3;
  export const hexColour: string = '#900000';
  export const property: ColourProperties = 'lightness';
  let op = value;
</script>

<style>
</style>

<svg viewBox="-0.35 -0.5 1.7 5" style="width: 4em;--solid-fill:{hexColour};">
  <rect
    width={1.125}
    height={4.125}
    style="fill:#0f0f0f;"
    rx={0.1875}
    x={-0.0625}
    y={-0.0625} />
  <rect width={1} height={4} style="fill:#ffffff;" rx={0.125} />
  <SliderBackground type="wave" value={t} />
  <!-- <g clip-path="url(#cl)">
    <use href="#wave" style="fill:green;transform: translate(-0px, 2px)" />
  </g> -->
  <g style={`transform: translate(-0.31px, calc(4px - ${2}px));`}>
    <path
      d={bt(0.8, 0.08)}
      stroke="#0f0f0f"
      fill={hexColour}
      stroke-width={0.0625} />
  </g>
  <g style={`transform: translate(0.1px, 2.5px);`}>
    <path
      d={bbt(0.4, 0.05)}
      stroke="#0f0f0f"
      fill={hexColour}
      stroke-width={0.0625} />
  </g>
</svg>
<svg style="opacity:0;">
  <clipPath id="cl">
    <rect width={1} height={4} rx={0.125} />
  </clipPath>
  <path id="wave" d={buildWave(time / 10, 12, 0.03)} />
</svg>
