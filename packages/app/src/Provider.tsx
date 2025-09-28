import * as React from 'react';
import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore } from 'state-core/src/store';
import { registerAppStates, selectors } from 'features-registry/src/index';
import { isWeb } from 'utils/src/platform';
import { CodePushManager, FirebasePushNotificationManager } from 'utils/src/managers';
import { DEFAULT_LANGUAGE, LanguageChangeManager, LanguageContext } from 'utils/src/language';

// App supplies concrete route map type M (import your AppRoutes here if defined)
const { store, persistor } = createStore(registerAppStates);

function AppProviders({ children }: { children: React.ReactNode }) {
    const language = useSelector(selectors.getLanguageFromState);

    return (
        <>
            {!isWeb() && (
                <>
                    <CodePushManager />
                    <FirebasePushNotificationManager />
                </>
            )}
            <LanguageChangeManager language={language} />
            <LanguageContext.Provider value={language ?? DEFAULT_LANGUAGE}>{children}</LanguageContext.Provider>
        </>
    );
}

export const Provider: React.FC<React.PropsWithChildren<{ loading?: React.ReactNode }>> = ({ children, loading }) => (
    <ReduxProvider store={store}>
        <PersistGate persistor={persistor} loading={loading || null}>
            <AppProviders>{children}</AppProviders>
        </PersistGate>
    </ReduxProvider>
);
