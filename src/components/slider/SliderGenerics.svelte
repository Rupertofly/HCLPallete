<script lang="ts">
  import type { symbol } from 'd3';
  import { onMount } from 'svelte';
  let time = 0;
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
</script>

<symbol>
  <clipPath id="cl" style="">
    <rect width={1} height={4} rx={0.125} />
  </clipPath>
</symbol>
<symbol>
  <path id="wave" d={buildWave(time / 10, 12, 0.03)} />
</symbol>
