const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    // Let each project/jest.config.js define its own transform via babel-jest.
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'mjs'],
    coverageReporters: ['html']
};
