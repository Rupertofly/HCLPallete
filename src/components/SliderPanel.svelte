<script lang="ts">
  import * as s from '../stateCode';

  import SlideGroup from './SlideGroup.svelte';
  export let cp: s.State = s.defaultPallete;
  const hues = cp.hues;
</script>

<article>
  {#each hues as hues, i}
    <SlideGroup colours={cp.colours[i]} index={i} type="lightness" />
  {/each}
</article>
