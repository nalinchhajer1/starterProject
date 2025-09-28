import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { reducerRegistry } from './persist';
import { sagaRegistry } from './sagaRegistry';

export const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: reducerRegistry.getReducer(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
                }
            }).concat(sagaMiddleware)
    });

    // Set up dynamic reducer registration
    const originalReducerRegister = reducerRegistry.register;
    (reducerRegistry as any).register = (key: string, reducer: any, meta?: any) => {
        originalReducerRegister.call(reducerRegistry, key, reducer, meta);
        store.replaceReducer(reducerRegistry.getReducer());
    };

    // Set up dynamic saga registration
    const originalSagaRegister = sagaRegistry.register;
    (sagaRegistry as any).register = (key: string, saga: any) => {
        originalSagaRegister.call(sagaRegistry, key, saga);
        // Restart saga middleware with new root saga
        sagaMiddleware.run(sagaRegistry.getRootSaga());
    };

    const persistor = persistStore(store);
    const injectReducer = reducerRegistry.register;
    const injectSaga = sagaRegistry.register;

    // Start the initial root saga
    sagaMiddleware.run(sagaRegistry.getRootSaga());

    return { store, persistor, injectReducer, injectSaga };
};

export type AppStore = ReturnType<typeof createStore>['store'];
export type AppDispatch = AppStore['dispatch'];
