const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'navigation-ports',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/navigation-ports/**/?(*.)+(spec|test).[tj]s?(x)']
};
