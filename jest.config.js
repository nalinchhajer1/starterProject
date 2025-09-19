module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
    transformIgnorePatterns: [
        'node_modules/(?!(@react-native|react-native|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-native-worklets|react-redux|immer|react-native-blob-util|redux-persist-filesystem-storage|redux-persist)/)'
    ],
    resolver: '@nx/jest/plugins/resolver',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'mjs'],
    coverageReporters: ['json', 'text', 'lcov', 'clover', 'html'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.html$': '<rootDir>/__mocks__/htmlMock.js',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^app/(.*)$': '<rootDir>/packages/app/$1',
        '^features/(.*)$': '<rootDir>/packages/features/$1',
        '^navigation/(.*)$': '<rootDir>/packages/navigation/$1',
        '^state/(.*)$': '<rootDir>/packages/state/$1',
        '^ui/(.*)$': '<rootDir>/packages/ui/$1',
        '^utils/(.*)$': '<rootDir>/packages/utils/$1',
        '^types/(.*)$': '<rootDir>/packages/types/$1',
        '^firebase-config/(.*)$': '<rootDir>/packages/firebase/$1'
    }
};
