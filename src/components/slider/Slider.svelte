<script lang="ts">
  import type { ColourProperties } from 'state';
  import SliderThumb from './SliderThumb.svelte';
  import { onMount } from 'svelte';
  import * as ns from 'open-simplex-noise';
  import * as tri from './BuildTriangle';
  import { range, svg } from 'd3';
  const bt = tri.buildTriangle;
  const bbt = tri.buildReverseTriangle;
  import SliderBackground from './SliderBackground.svelte';
  import { animate } from './store';
  import { set } from 'lodash';
  const noise = ns.makeNoise2D(Math.random());
  let svgElem: SVGSVGElement;
  let t = 0;
  let time = 0;
  let bgElem: SVGRectElement;
  onMount(() => {
    let anim;
    let fr = () => {
      time = time + 1;
      anim = requestAnimationFrame(fr);
    };
    anim = requestAnimationFrame(fr);

    return () => {
      cancelAnimationFrame(anim);
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
  export const hexColour: string = '#900000';
  export const property: ColourProperties = 'lightness';
  let mdown: boolean;
  let mouseOffset = [0, 0];
  let mId: number | null = null;
  let gElem: SVGGElement;
  function pointerdown(event: PointerEvent) {
    if (mdown) return;
    svgElem.setPointerCapture(event.pointerId);
    mId = event.pointerId;
    mdown = true;
    $animate = false;
    const cbb = gElem.getBoundingClientRect();
    mouseOffset = [event.pageX - cbb.left, event.pageY - cbb.right];
    console.log('start');
    const bgRect = bgElem.getBoundingClientRect();
    const my = event.pageY - bgRect.top;
    // console.log(mx, my);
    if (my < bgRect.height && my > 0) {
      const v = my / bgRect.height;
      t = v * 4;
      // console.log(v);
    }
  }
  function pointermove(event: PointerEvent) {
    if (!mdown) return;
    if (mId !== event.pointerId) return;
    const bgRect = bgElem.getBoundingClientRect();
    const my = event.pageY - bgRect.top;
    // console.log(mx, my);
    if (my < bgRect.height && my > 0) {
      const v = my / bgRect.height;
      t = v * 4;
      // console.log(v);
    }
  }
  function pointerend(event: PointerEvent) {
    mdown = false;
    svgElem.releasePointerCapture(event.pointerId);
    mId = null;
    $animate = true;
    console.log('end');
  }
</script>

<svg
  viewBox="-0.5 -0.5 2 5"
  style="width: 8em;--solid-fill:{hexColour};touch-action: none;"
  bind:this={svgElem}
  on:pointermove={pointermove}
  on:lostpointercapture={pointerend}>
  <rect
    width={1.125}
    height={4.125}
    style="fill:#0f0f0f;"
    rx={0.1875}
    x={-0.0625}
    y={-0.0625} />
  <rect
    width={1}
    height={4}
    style="fill:#ffffff;"
    rx={0.125}
    bind:this={bgElem} />
  <SliderBackground type="wave" value={t} />
  <SliderThumb {hexColour} value={t} on:pointerdown={pointerdown} bind:gElem />
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
