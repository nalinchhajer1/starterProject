import { NavigationContainer, type LinkingOptions } from '@react-navigation/native';
import { PDDarkTheme, PDLightTheme } from 'ui/src/theme';
import { useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { RootStackParamList } from 'navigation/src/types';

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    const scheme = useColorScheme();
    const onReadyCallback = useCallback(() => {}, []);
    return (
        <NavigationContainer<RootStackParamList>
            onReady={onReadyCallback}
            theme={scheme === 'dark' ? PDDarkTheme : PDLightTheme}
            linking={useMemo<LinkingOptions<RootStackParamList>>(
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
                        }
                    }
                }),
                []
            )}>
            {children}
        </NavigationContainer>
    );
}
