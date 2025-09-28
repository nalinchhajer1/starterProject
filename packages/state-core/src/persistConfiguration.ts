import { PersistConfig, createMigrate } from 'redux-persist';
import { migrations } from './migrations';
import storage from './Storage';

// Root persist configuration
export const rootPersistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    version: 2,
    migrate: createMigrate(migrations, { debug: false })
};

// Per-slice persist configurations
export const slicePersistConfigs: Record<string, PersistConfig<any>> = {
    appState: {
        key: 'appState',
        storage, // Will be handled by state-core
        version: 1,
        whitelist: ['language', 'numberOfTimeAppOpened']
    }
};

// Helper function to get persist config for a slice
export const getPersistConfig = (sliceKey: string): PersistConfig<any> | undefined => {
    return slicePersistConfigs[sliceKey];
};
