const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'navigation',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/navigation/**/?(*.)+(spec|test).[tj]s?(x)']
};
