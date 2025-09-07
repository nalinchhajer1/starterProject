import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './slices';
import rootSaga from './sagas';
import { migrations } from './migrations';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 2,
    whitelist: ['appState'],
    migrate: createMigrate(migrations, { debug: false })
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        }).concat(sagaMiddleware)
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
