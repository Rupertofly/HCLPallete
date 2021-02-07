<script lang="ts">
  import * as s from '../../stateCode';
  import Swatch from './Swatch.svelte';
  export let pallete = s.defaultPallete;
  export let coloumns: number = 5;
  $: hues = pallete.hues;
  $: shades = pallete.shades;
  $: colours = pallete.colours.flat(1);
</script>

<article>
  <section class="sh">
    {#each shades as shade}
      <h3>{shade.name}</h3>
    {/each}
  </section>
  <section class="hs">
    {#each hues as hue}
      <h3>{hue.name}</h3>
    {/each}
  </section>
  <section class="cp" style="--cols:{coloumns}">
    {#each colours as SwCol}
      <Swatch col={SwCol.hexColour} />
    {/each}
  </section>
</article>

<style>
  .cp {
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(var(--cols), auto);
    grid-area: pal;
  }
  article {
    width: min-content;
    display: grid;
    grid-template:
      'cnr sh' 3em
      'hs pal' auto / min-content auto;
  }
  .hs {
    grid-area: hs;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-around;
    align-content: flex-end;
  }
  .sh {
    grid-area: sh;
    display: flex;

    flex-direction: row;
    width: 100%;
  }
  .sh > * {

  }
  .sh > * {
    width: 3.3em;
    padding: 0;
    margin: 0;
    text-align: center;
    transform: rotate(45deg);
  }
  h3 {
    font-family: 'Quicksand';
    font-weight: 400;
  }
</style>
