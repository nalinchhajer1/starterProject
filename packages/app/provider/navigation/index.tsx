import { NavigationContainer } from '@react-navigation/native';
import { PDDarkTheme, PDLightTheme } from 'ui/src/theme';
import { useMemo } from 'react';

export function NavigationProvider({ children }: { children: React.ReactNode }) {
    // For web, we'll use light theme by default (can be enhanced with theme detection later)
    const isDark = false; // You can add theme detection here later

    return (
        <NavigationContainer
            theme={isDark ? PDDarkTheme : PDLightTheme}
            linking={useMemo(
                () => ({
                    prefixes: ['http://localhost:3000', 'https://yourapp.com'],
                    config: {
                        initialRouteName: 'Tab',
                        screens: {
                            Tab: {
                                path: '/',
                                screens: {
                                    DAY_VIEW: 'day',
                                    MONTH_VIEW: 'month',
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
