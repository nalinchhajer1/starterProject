const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const nxPlugin = require('@nx/eslint-plugin');
const testingLibraryPlugin = require('eslint-plugin-testing-library');

module.exports = defineConfig([
    expoConfig,
    eslintPluginPrettierRecommended,
    {
        ignores: [
            'node_modules/',
            'apps/next/.next/',
            'apps/next/out/',
            'apps/next/dist/',
            'apps/next/build/',
            'apps/next/public/',
            'apps/next/package.json',
            'apps/next/next.config.js',
            'apps/next/tsconfig.json',
            'apps/next/tsconfig.tsbuildinfo',
            'coverage/',
            'apps/expo/android/',
            'apps/expo/ios/',
            'apps/expo/.expo/',
            'apps/expo/build/',
            'apps/expo/dist/'
        ]
    },
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: {
            '@nx': nxPlugin,
        },
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: 'type:apps',
                            onlyDependOnLibsWithTags: ['type:navigation', 'type:feature', 'type:ui', 'type:state', 'type:util', 'type:app']
                        },
                        {
                            sourceTag: 'type:app',
                            onlyDependOnLibsWithTags: ['type:navigation', 'type:feature', 'type:ui', 'type:state', 'type:util']
                        },
                        {
                            sourceTag: 'type:navigation',
                            onlyDependOnLibsWithTags: ['type:feature', 'type:ui', 'type:state', 'type:util']
                        },
                        {
                            sourceTag: 'type:feature',
                            onlyDependOnLibsWithTags: ['type:ui','type:util', 'type:lib']
                        },
                        {
                            sourceTag: 'type:ui',
                            onlyDependOnLibsWithTags: ['type:util']
                        },
                        {
                            sourceTag: 'type:state',
                            onlyDependOnLibsWithTags: ['type:util', 'type:feature']
                        },
                        {
                            sourceTag: 'type:util',
                            onlyDependOnLibsWithTags: []
                        }
                    ]
                }
            ]
        }
    },
    {
        files: ['apps/next/**/*.{ts,tsx,js,jsx}'],
        rules: {
            'import/no-unresolved': [
                'error',
                {
                    ignore: ['react-native', 'solito/navigation', 'app/provider']
                }
            ]
        }
    },
    {
        // Test files only
        files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', 'jest/**/*.js'],
        plugins: {
            'testing-library': testingLibraryPlugin,
        },
        rules: {
            'testing-library/prefer-screen-queries': 'error',
            'testing-library/no-debugging-utils': 'warn',
            'testing-library/no-dom-import': 'off', // We're using React Native, not DOM
        }
    }
]);
