import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { reducerRegistry } from './persist';
import { sagaRegistry } from './sagaRegistry';

export const createStore = (
    registerFeatures?: (injectReducer: (key: string, reducer: any) => void, injectSaga: (key: string, saga: any) => void) => void
) => {
    const sagaMiddleware = createSagaMiddleware();

    // If registration function is provided, register all features first
    if (registerFeatures) {
        registerFeatures(reducerRegistry.register, sagaRegistry.register);
    }

    const store = configureStore({
        reducer: reducerRegistry.buildRoot(),
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
                }
            }).concat(sagaMiddleware)
    });

    const persistor = persistStore(store);
    // Start the initial root saga
    sagaMiddleware.run(sagaRegistry.getRootSaga());

    return { store, persistor };
};

export type AppStore = ReturnType<typeof createStore>['store'];
export type AppDispatch = AppStore['dispatch'];
