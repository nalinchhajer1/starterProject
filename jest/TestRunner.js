import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from '../packages/state/src/slices';
import rootSaga from '../packages/state/src/sagas';
import { RootStackScreen } from '../packages/navigation/src/navigators';

// Mock storage for testing
const mockStorage = {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve())
};

const UPDATE_STATE_TYPE = '@@UPDATE_TESTER_STATE';

class TestRunner {
    constructor({ initialState = {}, enablePersistence = false } = {}) {
        this.initialState = initialState;
        this.enablePersistence = enablePersistence;
        this.sagaMiddleware = createSagaMiddleware();
        this.store = this.createStore();
        this.sagaTask = this.sagaMiddleware.run(rootSaga);
        this.calledActions = [];
        this.actionLookups = {};

        // Subscribe to store changes to track actions
        this.store.subscribe(() => {
            const state = this.store.getState();
            // Track actions if needed
        });
    }

    createStore() {
        const sagaMiddleware = this.sagaMiddleware;

        // Add state update reducer for testing
        const testReducer = (state, action) => {
            if (action.type === UPDATE_STATE_TYPE) {
                return this.patchState(state, action.payload);
            }
            return rootReducer(state, action);
        };

        let finalReducer = testReducer;

        if (this.enablePersistence) {
            const persistConfig = {
                key: 'root',
                storage: mockStorage,
                whitelist: ['appState']
            };
            finalReducer = persistReducer(persistConfig, testReducer);
        }

        const store = configureStore({
            reducer: finalReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', UPDATE_STATE_TYPE]
                    }
                }).concat(sagaMiddleware),
            preloadedState: this.patchState(rootReducer(undefined, {}), this.initialState)
        });

        return store;
    }

    patchState(state, newState) {
        if (!newState || typeof newState !== 'object') {
            return state;
        }

        const result = { ...state };

        Object.keys(newState).forEach((key) => {
            if (result[key] && typeof result[key] === 'object' && !Array.isArray(result[key])) {
                result[key] = { ...result[key], ...newState[key] };
            } else {
                result[key] = newState[key];
            }
        });

        return result;
    }

    // Store methods
    getState() {
        return this.store.getState();
    }

    dispatch(action) {
        this.calledActions.push(action);
        this.actionLookups[action.type] = this.actionLookups[action.type] || [];
        this.actionLookups[action.type].push(action);
        return this.store.dispatch(action);
    }

    updateState(newState) {
        return this.dispatch({
            type: UPDATE_STATE_TYPE,
            payload: newState
        });
    }

    getCalledActions() {
        return [...this.calledActions];
    }

    getLatestCalledAction(type) {
        if (type) {
            const actions = this.actionLookups[type] || [];
            return actions[actions.length - 1] || null;
        }
        return this.calledActions[this.calledActions.length - 1] || null;
    }

    resetActions() {
        this.calledActions = [];
        this.actionLookups = {};
    }

    // Wait for specific action to be dispatched
    async waitFor(actionType, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                reject(new Error(`Action ${actionType} was not dispatched within ${timeout}ms`));
            }, timeout);

            const checkAction = () => {
                if (this.actionLookups[actionType] && this.actionLookups[actionType].length > 0) {
                    clearTimeout(timeoutId);
                    resolve(this.getLatestCalledAction(actionType));
                } else {
                    setTimeout(checkAction, 10);
                }
            };

            checkAction();
        });
    }

    // Render methods
    render(ui, options = {}) {
        const { store = this.store, ...renderOptions } = options;

        const AllTheProviders = ({ children }) => {
            if (this.enablePersistence) {
                const persistor = persistStore(store);
                return (
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            {children}
                        </PersistGate>
                    </Provider>
                );
            }

            return <Provider store={store}>{children}</Provider>;
        };

        return render(ui, { wrapper: AllTheProviders, ...renderOptions });
    }

    renderWithNavigation(component, options = {}) {
        const { store = this.store, initialRouteName = 'Tab', ...renderOptions } = options;

        const Stack = createStackNavigator();

        const TestNavigator = () => (
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen name="Tab" component={component} options={{ headerShown: false }} />
            </Stack.Navigator>
        );

        const AllTheProviders = ({ children }) => (
            <Provider store={store}>
                <NavigationContainer>{children}</NavigationContainer>
            </Provider>
        );

        return render(<TestNavigator />, { wrapper: AllTheProviders, ...renderOptions });
    }

    renderFullApp(options = {}) {
        const { store = this.store, ...renderOptions } = options;

        const AllTheProviders = ({ children }) => {
            if (this.enablePersistence) {
                const persistor = persistStore(store);
                return (
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <NavigationContainer>{children}</NavigationContainer>
                        </PersistGate>
                    </Provider>
                );
            }

            return (
                <Provider store={store}>
                    <NavigationContainer>{children}</NavigationContainer>
                </Provider>
            );
        };

        return render(<RootStackScreen />, { wrapper: AllTheProviders, ...renderOptions });
    }

    // Navigation testing helpers
    async navigateTo(routeName, params = {}) {
        // This would be used with navigation refs in actual tests
        // Implementation depends on your navigation structure
        return Promise.resolve();
    }

    // Cleanup
    cleanup() {
        this.sagaTask.cancel();
        this.resetActions();
    }

    // Utility methods
    createMockAction(type, payload = {}) {
        return {
            type,
            payload,
            timestamp: Date.now()
        };
    }

    // Mock API responses
    mockApiResponse(url, response, status = 200) {
        // This would integrate with your API mocking strategy
        // Could use fetch mock or other mocking libraries
        return {
            url,
            response,
            status
        };
    }
}

// Factory function for creating test runners
export const createTestRunner = (options = {}) => {
    return new TestRunner(options);
};

// Default export
export default TestRunner;
