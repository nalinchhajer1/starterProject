import { registerAppFeature } from 'features/feature-app/register';
import { registerLoadingFeature } from 'features/feature-loading/register';
import { registerPageOneFeature } from 'features/feature-pageone/register';

// Feature views
import { PageOneView } from 'features/feature-pageone/View/PageOneView';
import { LoadingView } from 'features/feature-loading/View/LoadingView';

// Feature selectors
import { getLanguageFromState } from 'features/feature-app/redux/AppSelector';

// Called once during app bootstrap
export const registerAppStates = (
    injectReducer: (key: string, reducer: any, meta?: { persist?: any }) => void,
    injectSaga: (key: string, saga: any) => void
) => {
    // Register all feature states and sagas
    registerAppFeature(injectReducer, injectSaga);
    registerLoadingFeature(injectReducer, injectSaga);
    registerPageOneFeature(injectReducer, injectSaga);
};

// Export individual feature views for direct use in apps
export const views = {
    PageOneView,
    LoadingView
};

// Export selectors for use in app providers
export const selectors = {
    getLanguageFromState
};
