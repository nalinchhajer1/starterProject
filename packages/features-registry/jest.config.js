const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'features-registry',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/features-registry/**/?(*.)+(spec|test).[tj]s?(x)']
};
