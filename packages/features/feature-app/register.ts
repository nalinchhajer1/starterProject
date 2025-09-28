import AppSlices from './redux/AppSlices';
import { appSaga } from './redux/AppSaga';

export function registerAppFeature(injectReducer: (key: string, reducer: any) => void, injectSaga: (key: string, saga: any) => void) {
    // Register the app reducer (persistence handled automatically by state-core)
    injectReducer('appState', AppSlices);

    // Register the app saga
    injectSaga('appSaga', appSaga);
}
