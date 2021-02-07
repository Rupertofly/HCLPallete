<script lang="ts">
  import * as s from '../../stateCode';
  import * as d3 from 'd3';
  export let col = '#ef3355';
  $: brdr_col = d3.hcl(col).l > 50 ? '#303030' : '#e0e0e0';
  $: hvr_col = brdr_col + '60';
  export let sel = Math.random() < 0.5;
</script>

<button
  class:sel
  style="--swatch-col: {col};--brdr-col: {brdr_col}; --hvr-col: {hvr_col}"
/>

<style>
  button {
    width: 5em;
    height: 5em;
    margin: 0;
    border: 0;
    padding: 0.2em;
    background-color: var(--swatch-col);
    cursor: pointer;
    transition: all 50ms;
  }
  button:hover {
    border: 0.3em solid var(--hvr-col);
  }
  button.sel {
    border: 0.4em solid var(--brdr-col);
  }
  button.sel:hover {
    border: 0.4em solid var(--hvr-col);
  }

  button:focus {
    border: 0.3em solid var(--hvr-col);
    outline: 0;
  }
</style>
