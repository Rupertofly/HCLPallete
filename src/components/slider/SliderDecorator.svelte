<script lang="ts">
  import { template } from 'lodash';
  import type { State } from 'stateCode';

  import * as S from 'stateCode';
  import Slider from './Slider.svelte';
  import SliderGenerics from './SliderGenerics.svelte';
  const [pal, dispatch] = S.reducible();
  let hexC: S.State = $pal;
</script>

<style>
  .plain {
    font-size: 8pt;
    display: block;
    user-select: none;
    -webkit-user-select: none;
  }
  .squircle {
    width: 4em;
    height: 4em;
    background-color: var(--colour-fill, blue);
    display: block;
    margin: 0.5em;
    border-radius: 0.25em;
  }
  .vain {
    display: flex;
    flex-direction: row;
    align-self: center;
  }
  fieldset {
    display: flex;
    width: fit-content;
  }
</style>

<template>
  <svg style="position:absolute;width:0px;height:0px;margin:0px;padding:0px;">
    <defs>
      <SliderGenerics />
    </defs>
  </svg>
  {#each $pal.colours[0] as hue, h}
    <div class="plain">
      <fieldset>
        {#each $pal.colours as item, i}
          <Slider
            colour={$pal.colours[i][h]}
            location={{ hue: i, shade: h }}
            dispatcher={dispatch}
            property="lightness"
            type="spectrum" />
        {/each}
      </fieldset>
      <fieldset>
        {#each $pal.colours as item, i}
          <Slider
            colour={$pal.colours[i][h]}
            location={{ hue: i, shade: h }}
            dispatcher={dispatch}
            property="chroma"
            type="spectrum" />
        {/each}
      </fieldset>
      <fieldset>
        {#each $pal.colours as item, i}
          <Slider
            colour={$pal.colours[i][h]}
            location={{ hue: i, shade: h }}
            dispatcher={dispatch}
            property="hue"
            type="spectrum" />
        {/each}
      </fieldset>
      <fieldset class="vain">
        {#each $pal.colours as item, i}
          <div
            class="squircle"
            style="--colour-fill: {$pal.colours[i][h].hexColour};" />
        {/each}
      </fieldset>
    </div>
  {/each}
  {#if false}
    <!-- content here -->
    <div class="plain">
      <Slider
        colour={$pal.colours[3][2]}
        location={{ hue: 3, shade: 2 }}
        dispatcher={dispatch}
        property="hue"
        type="spectrum" />
      <Slider
        colour={$pal.colours[3][2]}
        location={{ hue: 3, shade: 2 }}
        dispatcher={dispatch}
        property="chroma"
        type="wave" />
      <Slider
        colour={$pal.colours[3][2]}
        location={{ hue: 3, shade: 2 }}
        dispatcher={dispatch}
        property="lightness"
        type="wave" />
      <div
        class="squircle"
        style="--colour-fill: {$pal.colours[3][2].hexColour};" />
    </div>
  {/if}
</template>
