import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from '../App';

// // Mock the navigation and other dependencies
// jest.mock('navigation/src/navigators', () => {
//     const React = require('react');
//     const { View, Text } = require('react-native');
//     return {
//         RootStackScreen: () => (
//             <View testID="root-stack">
//                 <Text>Root Stack</Text>
//             </View>
//         )
//     };
// });

// jest.mock('app/provider', () => {
//     const React = require('react');
//     const { View } = require('react-native');
//     return {
//         Provider: ({ children }: { children: React.ReactNode }) => <View testID="app-provider">{children}</View>
//     };
// });

describe('App', () => {
    it('should render without crashing', () => {
        render(<App />);
        // Basic test to ensure the app renders
        // expect(screen.getByTestId('app-provider')).toBeTruthy();
    });
});
