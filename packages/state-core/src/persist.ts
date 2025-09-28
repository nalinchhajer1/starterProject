import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { persistReducer, PersistConfig } from 'redux-persist';
import { rootPersistConfig, getPersistConfig } from './persistConfiguration';

type Entry = { key: string; reducer: Reducer<any>; persist?: PersistConfig<any> };
const asyncEntries: Record<string, Entry> = {};
const coreReducers: Record<string, Reducer<any>> = {};

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

export const reducerRegistry = {
    register(key: string, reducer: Reducer<any>) {
        if (!asyncEntries[key]) {
            // Automatically determine persist config based on key
            const persistConfig = getPersistConfig(key);
            asyncEntries[key] = { key, reducer, persist: persistConfig };
        }
    },
    buildRoot() {
        return buildRoot();
    },
    getReducer() {
        return buildRoot();
    }
};
