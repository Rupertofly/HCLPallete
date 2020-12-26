<script lang="ts">
  import { animate } from './store';

  export let type: 'gradient' | 'solid' | 'spectrum' | 'wave';

  export let value: number = 3;
  const animateable = $animate;
  $: aniStyle = $animate ? 'transition: transform 233ms;' : '';
  $: isPartial =
    type !== 'spectrum' ? `transform: translateY(${value}px);` : '';
</script>

<style>
  .solid {
    fill: var(--solid-fill);
  }
</style>

<g clip-path="url(#cl)" style="">
  <rect
    width={1}
    height={4}
    class:solid={type === 'solid'}
    style="{isPartial}{aniStyle}" />
</g>
