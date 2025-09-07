// Re-export components from feature-based structure
import * as React from 'react';
import { View, Text } from 'react-native';

export { PageOneView } from '../../feature-pageone/View';
export { PageTwoView } from '../../feature-pagetwo/View';
export { OtherView } from '../../feature-otherview/View';
export { LoadingView } from '../../feature-loading/View';

// Individual screen components without React Navigation dependencies
// These can be used on both web and mobile

export const YearListView = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Year List - Replace with your YearListView component</Text>
        </View>
    );
};

export const SettingsView = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings - Replace with your SettingsView component</Text>
        </View>
    );
};
