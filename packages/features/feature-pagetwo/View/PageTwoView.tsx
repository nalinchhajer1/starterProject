import React from 'react';
import { View, Text } from 'react-native';

// Standalone PageTwoView component for optimal tree shaking
export const PageTwoView = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Page Two View</Text>
            <Text
                style={{
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'center',
                    paddingHorizontal: 20
                }}>
                Replace with your actual page two implementation.
            </Text>
        </View>
    );
};

export default PageTwoView;
