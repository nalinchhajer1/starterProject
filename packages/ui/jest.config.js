const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'ui',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/ui/**/?(*.)+(spec|test).[tj]s?(x)']
};
