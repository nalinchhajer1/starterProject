import * as React from 'react';
import { View, Text } from 'react-native';

// Standalone DayView component for optimal tree shaking
export const DayView = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
            }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Padmodaya Jain Calendar</Text>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Day View</Text>
            <Text
                style={{
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'center',
                    paddingHorizontal: 20
                }}>
                This DayView component is shared between web and mobile.{'\n'}
                Replace this with your actual day view implementation.
            </Text>
        </View>
    );
};

export default DayView;
