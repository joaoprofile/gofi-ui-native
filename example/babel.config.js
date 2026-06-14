const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            // Docs-internal modules (pages, showcase, nav…)
            '@': './src',
            // Consume the library by its published name, served from local source
            // so Fast Refresh works while developing the docs.
            'gofi-ui-native': path.resolve(__dirname, '../src/index.ts'),
          },
        },
      ],
    ],
  };
};
