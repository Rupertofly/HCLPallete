<script lang="typescript">
  import { buildTriangle } from './BuildTriangle';
  import { animate } from './store';
  export let hexColour: string;
  export let value: number;
</script>

<style>
  .anim {
    transition: transform 233ms;
  }
  path {
    transform: scale(1);
    transform-origin: 0.5px 0px;
    transition: transform 233ms;
  }
  path:hover {
    transform: scale(1.1);
  }
</style>

<g
  class:anim={$animate}
  style={`transform: translate(-0.31px, calc(4px - ${4 - value}px));`}
  on:pointerdown>
  <path
    d={buildTriangle(0.8, 0.08)}
    stroke="#0f0f0f"
    fill={hexColour}
    stroke-width={0.0625} />
</g>
