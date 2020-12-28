<script lang="ts">
  import { animate } from './store';

  export let type: 'solid' | 'spectrum' | 'wave';

  export let value: number = 3;
  $: aniStyle = $animate ? 'transition: transform 233ms, fill 233ms;' : '';
  $: isPartial =
    type !== 'spectrum' ? `transform: translateY(${value}px);` : '';
</script>

<style>
  .solid {
    fill: var(--solid-fill);
  }
</style>

<g clip-path="url(#cl)" style="">
  {#if type === 'wave' && value < 3.9 && value > 0.1}
    <use href="#wave" class="solid" style="{isPartial}{aniStyle}" />
  {:else}
    <rect width={1} height={4} class="solid" style="{isPartial}{aniStyle}" />
  {/if}
</g>
