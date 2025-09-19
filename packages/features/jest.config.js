const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'features',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/features/**/?(*.)+(spec|test).[tj]s?(x)']
};
