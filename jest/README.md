# Testing Setup for React Native Project

This directory contains the testing configuration and utilities for the React Native project using Jest and React Native Testing Library.

## Overview

The testing setup includes:
- Jest configuration optimized for React Native
- Comprehensive mocking for native modules and third-party libraries
- Modern TestRunner utility for simplified testing
- ESLint rules for testing best practices

## Files

- `setup.js` - Jest setup file with mocks for native modules
- `TestRunner.js` - Modern testing utility replacing the old TestRunner
- `examples/` - Example test files demonstrating usage

## Dependencies

The following testing dependencies are installed:
- `@testing-library/react-native` - React Native Testing Library
- `@testing-library/user-event` - User interaction testing
- `react-test-renderer` - React test renderer
- `eslint-plugin-testing-library` - ESLint rules for testing

## Usage

### Basic Component Testing

```javascript
import TestRunner from '../jest/TestRunner';

describe('MyComponent', () => {
  let testRunner;

  beforeEach(() => {
    testRunner = new TestRunner();
  });

  afterEach(() => {
    testRunner.cleanup();
  });

  it('should render correctly', () => {
    const { getByTestId } = testRunner.render(<MyComponent />);
    expect(getByTestId('my-component')).toBeTruthy();
  });
});
```

### Redux Integration

```javascript
import TestRunner from '../jest/TestRunner';

describe('Redux Component', () => {
  let testRunner;

  beforeEach(() => {
    testRunner = new TestRunner({
      initialState: {
        appState: { counter: 0 }
      }
    });
  });

  it('should access Redux state', () => {
    const state = testRunner.getState();
    expect(state.appState.counter).toBe(0);
  });

  it('should dispatch actions', () => {
    testRunner.dispatch({ type: 'INCREMENT' });
    const actions = testRunner.getCalledActions();
    expect(actions[0].type).toBe('INCREMENT');
  });
});
```

### Navigation Testing

```javascript
import TestRunner from '../jest/TestRunner';

describe('Navigation', () => {
  let testRunner;

  beforeEach(() => {
    testRunner = new TestRunner();
  });

  it('should render with navigation', () => {
    const { getByTestId } = testRunner.renderWithNavigation(
      MyComponent,
      { initialRouteName: 'Home' }
    );
    expect(getByTestId('my-component')).toBeTruthy();
  });
});
```

### Saga Testing

```javascript
import TestRunner from '../jest/TestRunner';

describe('Saga Testing', () => {
  let testRunner;

  beforeEach(() => {
    testRunner = new TestRunner();
  });

  it('should handle async actions', async () => {
    testRunner.dispatch({ type: 'ASYNC_ACTION' });
    
    const result = await testRunner.waitFor('ASYNC_SUCCESS', 5000);
    expect(result.type).toBe('ASYNC_SUCCESS');
  });
});
```

## TestRunner API

### Constructor Options

```javascript
const testRunner = new TestRunner({
  initialState: {}, // Initial Redux state
  enablePersistence: false // Enable Redux Persist
});
```

### Methods

#### State Management
- `getState()` - Get current Redux state
- `dispatch(action)` - Dispatch Redux action
- `updateState(newState)` - Update state for testing
- `getCalledActions()` - Get all dispatched actions
- `getLatestCalledAction(type)` - Get latest action of specific type
- `resetActions()` - Clear action history

#### Rendering
- `render(component, options)` - Render component with Redux provider
- `renderWithNavigation(component, options)` - Render with navigation
- `renderFullApp(options)` - Render full app with navigation

#### Utilities
- `waitFor(actionType, timeout)` - Wait for specific action
- `createMockAction(type, payload)` - Create mock action
- `mockApiResponse(url, response, status)` - Mock API response
- `cleanup()` - Clean up resources

## Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for specific app
pnpm test:expo
pnpm test:next
```

## Mocked Modules

The following modules are automatically mocked in the Jest setup:

### React Navigation
- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-screens`

### Firebase
- `@react-native-firebase/app`
- `@react-native-firebase/analytics`
- `@react-native-firebase/crashlytics`
- `@react-native-firebase/messaging`
- `@react-native-firebase/remote-config`

### Native Modules
- `react-native-vector-icons`
- `react-native-device-info`
- `react-native-permissions`
- `react-native-in-app-review`
- `react-native-geocoding`
- `react-native-calendar-strip`
- `react-native-reanimated-zoom`
- `react-native-worklets`
- `redux-persist-filesystem-storage`
- `@react-native-async-storage/async-storage`

### Expo Modules
- `expo-splash-screen`
- `expo-status-bar`
- `expo-image`
- `expo-linear-gradient`

## Best Practices

1. **Use TestRunner for complex components** - The TestRunner provides Redux integration and navigation support
2. **Mock external dependencies** - All native modules are pre-mocked
3. **Test user interactions** - Use `fireEvent` and `userEvent` for realistic testing
4. **Wait for async operations** - Use `waitFor` for saga actions and async state updates
5. **Clean up after tests** - Always call `testRunner.cleanup()` in `afterEach`

## Migration from Old TestRunner

The new TestRunner is a modern replacement for the old TestRunner that used:
- `react-test-renderer` (deprecated)
- `redux-saga-tester` (replaced with direct Redux integration)
- `enzyme` (replaced with React Native Testing Library)

### Key Changes

1. **Rendering**: Use `testRunner.render()` instead of `testRunner.render()`
2. **Navigation**: Use `testRunner.renderWithNavigation()` for navigation testing
3. **Actions**: Direct Redux integration instead of saga-tester
4. **Async**: Use `waitFor()` instead of saga-tester's `waitFor()`

## Examples

See the `examples/` directory for comprehensive examples of:
- Basic component testing
- Redux integration
- Navigation testing
- Saga testing
- Error handling

## Troubleshooting

### Common Issues

1. **Module not found errors** - Check if the module is mocked in `setup.js`
2. **Navigation errors** - Ensure you're using `renderWithNavigation()` for navigation components
3. **Async test failures** - Use `waitFor()` and proper timeouts
4. **State not updating** - Check if actions are being dispatched correctly

### Debug Tips

1. Use `testRunner.getCalledActions()` to see all dispatched actions
2. Use `testRunner.getState()` to inspect current state
3. Use `screen.debug()` to see rendered component tree
4. Check Jest setup file for missing mocks
