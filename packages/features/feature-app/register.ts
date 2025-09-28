import { PersistConfig } from 'redux-persist';
import AppSlices from './redux/AppSlices';
import { appSaga } from './redux/AppSaga';

// Per-slice persist configuration for app state
const appPersistConfig: PersistConfig<any> = {
    key: 'appState',
    storage: {} as any, // Will be handled by state-core
    version: 2,
    whitelist: ['language', 'userLocation', 'savedLocation', 'dontAskForLocationOnLaunch']
};

export function registerAppFeature(
    injectReducer: (key: string, reducer: any, meta?: { persist?: PersistConfig<any> }) => void,
    injectSaga: (key: string, saga: any) => void
) {
    // Register the app reducer with persistence
    injectReducer('appState', AppSlices, { persist: appPersistConfig });

    // Register the app saga
    injectSaga('appSaga', appSaga);
}
