import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig, createMigrate } from 'redux-persist';
import { migrations } from './migrations';
import storage from './Storage';

type Entry = { key: string; reducer: Reducer<any>; persist?: PersistConfig<any> };
const asyncEntries: Record<string, Entry> = {};
const coreReducers: Record<string, Reducer<any>> = {};

const rootPersistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    version: 2,
    whitelist: ['appState'], // fill with small, stable keys if needed
    migrate: createMigrate(migrations, { debug: false })
};

const buildRoot = () => {
    const wrapped: Record<string, Reducer<any>> = {};
    Object.values(asyncEntries).forEach(({ key, reducer, persist }) => {
        wrapped[key] = persist ? persistReducer(persist, reducer) : reducer;
    });
    // Ensure we always have at least one reducer to avoid empty combineReducers
    const allReducers = { ...coreReducers, ...wrapped };
    if (Object.keys(allReducers).length === 0) {
        // Provide a dummy reducer that returns an empty state
        allReducers._placeholder = (state = {}) => state;
    }

    const root = combineReducers(allReducers);
    return persistReducer(rootPersistConfig, root);
};

let currentReducer = buildRoot();

export const reducerRegistry = {
    register(key: string, reducer: Reducer<any>, meta?: { persist?: PersistConfig<any> }) {
        if (!asyncEntries[key]) {
            asyncEntries[key] = { key, reducer, persist: meta?.persist };
            currentReducer = buildRoot();
        }
    },
    getReducer() {
        return currentReducer;
    }
};
