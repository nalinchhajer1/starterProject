import * as React from 'react';
import { View, Text } from 'react-native';

// Standalone OtherView component for optimal tree shaking
export const OtherView = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Other View</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>Replace with your actual other view implementation.</Text>
        </View>
    );
};

export default OtherView;
