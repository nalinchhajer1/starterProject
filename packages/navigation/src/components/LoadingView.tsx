import * as React from 'react';
import { View, Text } from 'react-native';

// Shared LoadingView component
export const LoadingView = ({ message = 'Loading...' }: { message?: string }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#666' }}>{message}</Text>
        </View>
    );
};

export default LoadingView;
