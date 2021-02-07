<script lang="ts">
  import Slider from './Slider/Slider.svelte';
  import * as s from '../stateCode';
  import { dispatch } from '../svelteStore';
  export let type: s.ColourProperties;
  export let index: number;
  export let colours: any[];
  const dispatcher: s.Dispatcher = $dispatch;
</script>

<section>
  {#each colours as cl, i}
    <Slider
      colour={cl}
      location={{ hue: index, shade: i }}
      property={type}
      {dispatcher}
    />
  {/each}
</section>
