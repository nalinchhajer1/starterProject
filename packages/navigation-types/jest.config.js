const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'navigation-types',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/navigation-types/**/?(*.)+(spec|test).[tj]s?(x)']
};
