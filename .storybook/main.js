module.exports = {
  extend: [''],
  stories: ['../stories/**/*.stories.[jt]s?(x)'],
  addons: [
    '@storybook/preset-scss',
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
  ],
  webpackFinal: async (config) => {
    // do mutation to the config
    return config;
  },
};
