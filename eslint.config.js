const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
    expoConfig,
    eslintPluginPrettierRecommended,
    {
        ignores: [
            'node_modules/',
            'apps/next/**/*',
            'coverage/',
            'apps/expo/android/',
            'apps/expo/ios/',
            'apps/expo/.expo/',
            'apps/expo/build/',
            'apps/expo/dist/'
        ]
    }
]);
