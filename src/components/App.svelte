<script lang="ts">
  import * as s from '../stateCode';
  import { dispatch } from '../svelteStore';

  import Pallete from './Pallete/Pallete.svelte';
  import SliderPanel from './SliderPanel.svelte';

  let colourPallete = s.defaultPallete;
  dispatch.set((action: s.Actions) => {
    colourPallete = s.reducer(colourPallete, action);
  });
</script>

<header>Blah</header>
<main>
  <Pallete />
  <SliderPanel />
</main>

<style>
  header {
    width: 100%;
    height: 1.4rem;
    background-color: #0f0f0f;
    color: #f0f0f0;
  }
</style>
