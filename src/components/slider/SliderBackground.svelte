<script lang="ts">
  import { chromaMax, hueMax, lightnessMax } from '../../appConstants';

  import { hcl } from 'd3';

  import type { Colour, ColourProperties } from '../../stateCode';
  import uniqueId from '../../uniqueId';
  import { animate } from './store';

  export let type: 'solid' | 'spectrum' | 'wave';
  export let colour: Colour;
  export let property: ColourProperties;
  const colours: [number, string][] = [];

  $: if (type === 'spectrum') {
    switch (property) {
      case 'chroma': {
        for (let i = 10; i >= 0; i--) {
          let hex = hcl(
            colour.hue,
            chromaMax - (i / 10) * chromaMax,
            colour.lightness
          );
          colours[i] = [i, hex.formatHex()];
        }
        break;
      }
      case 'hue': {
        for (let i = 10; i >= 0; i--) {
          let hex = hcl(
            hueMax - (i / 10) * hueMax,
            colour.chroma,
            colour.lightness
          );
          colours[i] = [i, hex.formatHex()];
        }
        break;
      }
      case 'lightness': {
        for (let i = 10; i >= 0; i--) {
          let hex = hcl(
            colour.hue,
            colour.chroma,
            lightnessMax - (i / 10) * lightnessMax
          );
          colours[i] = [i, hex.formatHex()];
        }
        break;
      }
    }
  }
  const href: any = '#wave';
  const gradID = uniqueId('grad');
  export let value: unknown = 3;
  $: aniStyle = $animate ? 'transition: transform 233ms, fill 233ms;' : '';
  $: isPartial =
    type !== 'spectrum' ? `transform: translateY(${value}px);` : '';
</script>

<g clip-path="url(#cl)" style="">
  {#if type === 'wave' && value < 3.95 && value > 0.05}
    <!-- //@ts-ignore -->
    <use {href} class="solid" style="{isPartial}{aniStyle}" />
  {:else if type === 'spectrum'}
    <defs>
      <linearGradient id={gradID} gradientTransform="rotate(90)">
        {#each colours as item, i (item[0])}
          <stop offset="{10 * item[0]}%" stop-color={item[1]} />
        {/each}
      </linearGradient>
    </defs>
    <rect width={1} height={4} fill={`url(#${gradID})`} style={aniStyle} />
  {:else}
    <rect width={1} height={4} class="solid" style="{isPartial}{aniStyle}" />
  {/if}
</g>

<style>
  .solid {
    fill: var(--solid-fill);
  }
</style>
