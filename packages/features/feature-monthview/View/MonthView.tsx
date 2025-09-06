import * as React from 'react';
import { View, Text } from 'react-native';

// Standalone MonthView component for optimal tree shaking
export const MonthView = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Month View</Text>
            <Text
                style={{
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'center',
                    paddingHorizontal: 20
                }}>
                Replace with your actual month view implementation.
            </Text>
        </View>
    );
};

export default MonthView;
