const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    // Let each project/jest.config.js define its own testMatch pattern
    // testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Removed - causes all tests to run
    // Let each project/jest.config.js define its own transform via babel-jest.
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'mjs'],
    coverageReporters: ['html']
};
