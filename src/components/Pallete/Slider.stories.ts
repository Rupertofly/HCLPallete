import Pl from './Pallete.svelte';
export default {
  title: 'Swatch',
  component: Pl,
  args: {
    value: 2,
    hexColor: '#fee088',
  },
};
export const Slide = (args) => ({
  Component: Pl,
  props: {
    ...args,
  },
});
