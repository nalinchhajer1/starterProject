const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'state-core',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/state-core/**/?(*.)+(spec|test).[tj]s?(x)']
};
