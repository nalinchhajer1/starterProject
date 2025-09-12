import { NavigationContainer } from '@react-navigation/native';
import { PDDarkTheme, PDLightTheme } from 'ui/src/theme';
import { useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const scheme = useColorScheme();
    const onReadyCallback = useCallback(() => {}, []);
    return (
        <NavigationContainer
            onReady={onReadyCallback}
            theme={scheme === 'dark' ? PDDarkTheme : PDLightTheme}
            linking={useMemo(
                () => ({
                    prefixes: [],
                    config: {
                        initialRouteName: 'Tab',
                        screens: {
                            Tab: {
                                path: '/',
                                screens: {
                                    PAGE_ONE_VIEW: 'one',
                                    PAGE_TWO_VIEW: 'two',
                                    OTHER_VIEW: 'other'
                                }
                            },
                            SETTINGS: 'settings'
                            // Add more routes as needed
                        }
                    }
                }),
                []
            )}>
            {children}
        </NavigationContainer>
    );
}
