const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'utils',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/utils/**/?(*.)+(spec|test).[tj]s?(x)']
};
