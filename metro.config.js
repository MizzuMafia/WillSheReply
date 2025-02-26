const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = {
  'fs': require.resolve('expo-file-system'),
  'path': require.resolve('path-browserify'),
};

module.exports = config;