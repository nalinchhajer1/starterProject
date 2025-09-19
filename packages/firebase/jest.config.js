const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'firebase',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/firebase/**/?(*.)+(spec|test).[tj]s?(x)']
};
