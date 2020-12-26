<script lang="ts">
  import { onMount } from 'svelte';
  import * as tri from './BuildTriangle';
  import { range } from 'd3';
  const bt = tri.buildTriangle;
  const bbt = tri.buildReverseTriangle;
  import SliderBackground from './SliderBackground.svelte';

  let t = 0;
  onMount(() => {
    setInterval(() => {
      t = t - 0.1;
    }, 1000 / 60);
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
</script>

<style>
</style>

<svg
  viewBox="-0.35 -0.5 1.7 5"
  style="width: 4em;--solid-fill:#f383a2;"
  class:animateable>
  <rect
    width={1.125}
    height={4.125}
    style="fill:#0f0f0f;"
    rx={0.1875}
    x={-0.0625}
    y={-0.0625} />
  <rect width={1} height={4} style="fill:#ffffff;" rx={0.125} />
  <SliderBackground type="solid" {value} />
  <!-- <g clip-path="url(#cl)">
    <use href="#wave" style="fill:green;transform: translate(-0px, 2px)" />
  </g> -->
  <g style={`transform: translate(-0.31px, calc(4px - ${2}px));`}>
    <path
      d={bt(0.8, 0.08)}
      stroke="#0f0f0f"
      fill="#f383a2"
      stroke-width={0.0625} />
  </g>
  <g style={`transform: translate(0.1px, 2.5px);`}>
    <path
      d={bbt(0.4, 0.05)}
      stroke="#0f0f0f"
      fill="#f383a2"
      stroke-width={0.0625} />
  </g>
</svg>
<svg style="opacity:0;">
  <clipPath id="cl">
    <rect width={1} height={4} rx={0.125} />
  </clipPath>
  <path id="wave" d={buildWave(t, 12, 0.03)} />
</svg>
