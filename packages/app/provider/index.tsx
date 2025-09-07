import * as React from 'react';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeArea } from './safe-area';
import { NavigationProvider } from './navigation';
import { isWeb } from 'utils/src/platform';
import { CodePushManager, FirebasePushNotificationManager } from 'utils/src/managers';
import { DEFAULT_LANGUAGE, LanguageChangeManager, LanguageContext } from 'utils/src/language';
import store, { persistor } from 'state/src/store';
import { getLanguageFromState } from 'features/feature-app/redux';

function AppProviders({ children }: { children: React.ReactNode }) {
    const language = useSelector(getLanguageFromState);

    return (
        <>
            {!isWeb() && (
                <>
                    <CodePushManager />
                    <FirebasePushNotificationManager />
                </>
            )}
            <LanguageChangeManager language={language} />
            <LanguageContext.Provider value={language ?? DEFAULT_LANGUAGE}>
                <SafeArea>
                    <NavigationProvider>{children}</NavigationProvider>
                </SafeArea>
            </LanguageContext.Provider>
        </>
    );
}

export function Provider({ children, loading }: { children: React.ReactNode; loading?: React.ReactNode }) {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={loading || null} persistor={persistor}>
                <AppProviders>{children}</AppProviders>
            </PersistGate>
        </ReduxProvider>
    );
}
