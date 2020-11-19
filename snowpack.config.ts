import sp from 'snowpack';
import preProp from 'svelte-preprocess';
const config = {
  plugins: [
    [
      '@snowpack/plugin-svelte',
      {
        preprocess: preProp(),
      },
    ],
  ],
};

export default config;
