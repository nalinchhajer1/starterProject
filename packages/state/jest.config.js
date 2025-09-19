const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'state',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/state/**/?(*.)+(spec|test).[tj]s?(x)']
};
