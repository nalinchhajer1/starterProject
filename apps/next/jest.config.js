const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  displayName: 'next-app',
  rootDir: '../../',
  testMatch: ['<rootDir>/apps/next/**/__tests__/?(*.)+(spec|test).[tj]s?(x)'],
};




