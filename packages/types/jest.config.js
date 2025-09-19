const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'types',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/types/**/?(*.)+(spec|test).[tj]s?(x)']
};
