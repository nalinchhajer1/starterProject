const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'expo-app',
    rootDir: '../../',
    testMatch: ['<rootDir>/apps/expo/**/__tests__/?(*.)+(spec|test).[tj]s?(x)']
};
