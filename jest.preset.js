const nxPreset = require('@nx/jest/preset').default;

module.exports = {
    ...nxPreset,
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
        '^.+\\.(ts|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: 'tsconfig.spec.json'
            }
        ]
    },
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
    coverageReporters: ['html']
};

