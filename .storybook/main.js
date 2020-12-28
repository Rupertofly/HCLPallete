const sveltePreprocess = require('svelte-preprocess');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    { name: "@storybook/addon-essentials", options: { docs: false } }
  ],
  /** @param {webpack.Configuration} config */
  webpackFinal: async (config) => {

    const cfgIndex = config.module.rules.findIndex(rule => /svelte-loader/.test(rule.loader))
    config.module.rules[cfgIndex].options.preprocess = sveltePreprocess();
    config.module.rules[cfgIndex].options.hotReload = false;
    config.module.rules[cfgIndex].loader = 'svelte-loader'
    config.target = 'web'
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
  } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
  }
    return config
  }
}