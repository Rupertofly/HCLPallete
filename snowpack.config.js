const preProp = require('svelte-preprocess');
const config = {
  plugins: [

  ],
};

module.exports = {
  mount: {
      public: { url: '/', static: true },
      src: { url: '/dist' },
  },
  plugins: [
    [
      '@snowpack/plugin-svelte',
      {
        preprocess: preProp(),
      },
    ],
  ],
  packageOptions: {
      /* ... */
  },
  devOptions: {
      fallback: 'src/index.html',
      open: 'none',
  },
  buildOptions: {
      sourcemap:true
  },
  exclude: ['**/node_modules/**/*', './output'],
};