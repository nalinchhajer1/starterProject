const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'native',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/native/**/?(*.)+(spec|test).[tj]s?(x)']
};
