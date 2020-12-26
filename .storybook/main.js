const sveltePreprocess = require('svelte-preprocess');
const webpack = require('webpack');
module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links", '@storybook/addon-controls',
    { name: "@storybook/addon-essentials", options: { docs: false } }
  ],
  /** @param {webpack.Configuration} config */
  webpackFinal: async (config) => {

    const cfgIndex = config.module.rules.findIndex(rule => /svelte-loader/.test(rule.loader))
    config.module.rules[cfgIndex].options.preprocess = sveltePreprocess();
    config.module.rules[cfgIndex].options.hotReload = false;
    config.module.rules[cfgIndex].loader = 'svelte-loader'
    config.target = 'web'
    return config
  }
}