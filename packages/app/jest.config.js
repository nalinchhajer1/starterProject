const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'app',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/app/**/?(*.)+(spec|test).[tj]s?(x)']
};
