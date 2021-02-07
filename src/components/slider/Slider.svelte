<script lang="ts">
  import {
    ColourProperties,
    Location,
    Colour,
    Dispatcher,
    setValue,
  } from '../../stateCode';
  import { onMount } from 'svelte';
  import SliderThumb from './SliderThumb.svelte';
  import SliderNotch from './SliderNotch.svelte';
  import SliderBackground from './SliderBackground.svelte';
  import { animate } from './store';
  import {
    chromaMax,
    chromaMin,
    hueMax,
    hueMin,
    lightnessMax,
    lightnessMin,
    propToT,
    TtoProp,
  } from '../../appConstants';
  import SliderInput from './SliderInput.svelte';
  import type { symbol } from 'd3';
  import SliderGenerics from './SliderGenerics.svelte';
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
  enum al {
    lightness = 'l',
    hue = 'h',
    chroma = 'c',
  }
  export let colour: Colour;
  $: hexColour = colour.hexColour;
  export let location: Location;
  export let dispatcher: Dispatcher;
  export let property: ColourProperties = 'lightness';
  let mdown: boolean;
  let elt = 0;
  $: apparentTransformed =
    4 - propToT(property, colour.apparentValues[al[property]]) * 4;
  $: transformed = 4 - propToT(property, colour[property]) * 4;
  let mouseOffset = [0, 0];
  let mId: number | null = null;
  let gElem: SVGGElement;
  let hasWave = true;
  console.log(document.getElementById('wave'));
  onMount(() => {
    hasWave = !!document.getElementById('wave');
    console.log(document.getElementById('wave'));
  });
  const update = (v) =>
    dispatcher(
      setValue({
        hue: location.hue,
        property: property,
        shade: location.shade,
        value: TtoProp(property, v),
      })
    );
  export let type: 'solid' | 'spectrum' | 'wave' = 'solid';
  const getMinMax = () => {
    switch (property) {
      case 'lightness': {
        return [lightnessMin, lightnessMax] as const;
      }
      case 'chroma': {
        return [chromaMin, chromaMax] as const;
      }
      case 'hue': {
        return [hueMin, hueMax] as const;
      }
    }
  };
  $: [min, max] = getMinMax();
  function pointerdown(event: PointerEvent) {
    if (mdown) return;
    svgElem.setPointerCapture(event.pointerId);
    mId = event.pointerId;
    mdown = true;
    function clamp(t: number) {
      return t > 1 ? 1 : t < 0 ? 0 : t;
    }
    gElem = event.target as SVGGElement;
    $animate = false;
    const cbb = gElem.getBoundingClientRect();
    mouseOffset = [event.pageX - cbb.left, event.pageY - cbb.right];
    console.log('start');
    const bgRect = bgElem.getBoundingClientRect();
    const my = event.pageY - bgRect.top;
    // console.log(mx, my);
    if (my < bgRect.height && my > 0) {
      const v = my / bgRect.height;
      update(1 - v);
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
      update(1 - v);
      // console.log(v);
    }
  }
  function clamp(t: number) {
    return t > 1 ? 1 : t < 0 ? 0 : t;
  }
  function pointerend(event: PointerEvent) {
    mdown = false;
    svgElem.releasePointerCapture(event.pointerId);
    mId = null;
    elt = t;
    $animate = true;
    console.log('end');
  }
  function updateInput(event: Event & { target: HTMLInputElement }) {
    update(clamp(parseFloat(event.target.value) / max));
  }
</script>

<div>
  <svg
    viewBox="-0.5 -0.5 2 5"
    style="width: 4em;height: auto; --solid-fill:{hexColour};touch-action: none;"
    bind:this={svgElem}
    on:pointermove={pointermove}
    on:lostpointercapture={pointerend}
  >
    <defs>
      {#if !hasWave}
        <SliderGenerics />
      {/if}
    </defs>
    <rect
      width={1.125}
      height={4.125}
      style="fill:#0f0f0f;"
      rx={0.1875}
      x={-0.0625}
      y={-0.0625}
    />
    <rect
      width={1}
      height={4}
      style="fill:#ffffff;"
      rx={0.125}
      bind:this={bgElem}
    />
    <SliderBackground {type} value={transformed} {colour} {property} />
    <SliderThumb {hexColour} value={transformed} on:pointerdown={pointerdown} />
    <SliderNotch {hexColour} value={apparentTransformed} />
  </svg>
  <SliderInput
    incomingValue={colour[property]}
    {min}
    {max}
    on:change={updateInput}
  />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
