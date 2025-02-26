module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      require('nativewind/babel'),
      [require('babel-plugin-module-resolver'), {
        alias: {
          '@env': '.env'
        }
      }]
    ]
  };
};