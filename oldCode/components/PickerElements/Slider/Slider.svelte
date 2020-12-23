<script lang="ts">
  import { onMount } from 'svelte';
  import * as b from './BuildTriangle';

  let s = 0;
  onMount(() => {
    let int = setInterval(() => ((s = s + 1), 3000));
    return () => clearInterval(int);
  });
</script>

<svg viewBox="-0.1 -0.75 1.2 2" width="300" height="600">
  <path
    d={b.buildTriangle(0.6, 0.03)}
    fill="green"
    transform={`translate(0,${Math.sin(0.004 * s)})`} />

  <path
    d={b.buildReverseTriangle(0.2, 0.03)}
    fill="white"
    stroke="black"
    stroke-width="0.05" />
</svg>
