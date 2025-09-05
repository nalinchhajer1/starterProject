// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: [
      'node_modules/',
      'apps/next/**/*',
      'coverage/',
      'apps/expo/android/',
      'apps/expo/ios/',
      'apps/expo/.expo/',
      'apps/expo/build/',
      'apps/expo/dist/',
    ],
  }
]);
