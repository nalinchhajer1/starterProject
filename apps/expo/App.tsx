import React from 'react';
import { Provider } from 'app/src/Provider';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from 'navigation/src/navigators';
import { NavigationProvider } from 'app/src/provider/navigation';

export default function App() {
    return (
        <Provider>
            <NavigationProvider>
                <RootStackScreen />
            </NavigationProvider>
        </Provider>
    );
}
