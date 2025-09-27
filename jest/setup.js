// Jest setup for React Native project
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
import { jest } from '@jest/globals';
// Include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// import { setUpTests } from 'react-native-reanimated';

// Mock Platform module
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
    OS: 'ios',
    select: () => null
}));

// setUpTests();

// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Ensure dev flag exists for RN deps expecting it
if (typeof global.__DEV__ === 'undefined') {
    global.__DEV__ = true;
}

// Mock react-native-reanimated using official mock
// jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

// Mock @react-native-firebase modules
jest.mock('@react-native-firebase/app', () => ({
    __esModule: true,
    default: () => ({
        onReady: jest.fn(() => Promise.resolve())
    })
}));

jest.mock('@react-native-firebase/analytics', () => ({
    __esModule: true,
    default: () => ({
        logEvent: jest.fn(),
        setUserProperties: jest.fn(),
        setUserId: jest.fn()
    })
}));

jest.mock('@react-native-firebase/crashlytics', () => ({
    __esModule: true,
    default: () => ({
        recordError: jest.fn(),
        setUserId: jest.fn(),
        setAttributes: jest.fn()
    })
}));

jest.mock('@react-native-firebase/messaging', () => ({
    __esModule: true,
    default: () => ({
        getToken: jest.fn(() => Promise.resolve('mock-token')),
        onMessage: jest.fn(),
        onNotificationOpenedApp: jest.fn(),
        getInitialNotification: jest.fn(() => Promise.resolve(null))
    })
}));

// Mock redux-persist-filesystem-storage
jest.mock('redux-persist-filesystem-storage', () => ({
    __esModule: true,
    default: {
        getItem: jest.fn(() => Promise.resolve(null)),
        setItem: jest.fn(() => Promise.resolve()),
        removeItem: jest.fn(() => Promise.resolve()),
        clear: jest.fn(() => Promise.resolve())
    }
}));

// Mock react-native-blob-util
jest.mock('react-native-blob-util', () => ({
    __esModule: true,
    default: {
        fs: {
            dirs: {
                DocumentDir: '/mock/document/dir',
                CacheDir: '/mock/cache/dir'
            },
            exists: jest.fn(() => Promise.resolve(false)),
            writeFile: jest.fn(() => Promise.resolve()),
            readFile: jest.fn(() => Promise.resolve('')),
            unlink: jest.fn(() => Promise.resolve()),
            mkdir: jest.fn(() => Promise.resolve())
        },
        config: jest.fn(() => ({
            fetch: jest.fn(() => Promise.resolve({ data: '' }))
        }))
    }
}));

// Mock expo modules
jest.mock('expo-splash-screen', () => ({
    hideAsync: jest.fn(() => Promise.resolve()),
    preventAutoHideAsync: jest.fn(() => Promise.resolve())
}));

jest.mock('expo-status-bar', () => ({
    StatusBar: 'StatusBar'
}));

// Global test setup - suppress console warnings
global.console = {
    ...console,
    warn: jest.fn(),
    error: jest.fn()
};
