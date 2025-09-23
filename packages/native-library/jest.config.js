const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  displayName: 'native-library',
  rootDir: '../../',
  testMatch: [
    '<rootDir>/packages/native-library/**/?(*.)+(spec|test).[tj]s?(x)',
  ],
};
