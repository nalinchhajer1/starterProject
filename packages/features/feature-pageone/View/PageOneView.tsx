import * as React from 'react';
import { View, Text } from 'react-native';

// Standalone PageOneView component for optimal tree shaking
export const PageOneView = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff'
            }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Starter Project</Text>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Page One View</Text>
            <Text
                style={{
                    fontSize: 14,
                    color: '#666',
                    textAlign: 'center',
                    paddingHorizontal: 20
                }}>
                This PageOneView component is shared between web and mobile.{'\n'}
                Replace this with your actual page one implementation.
            </Text>
        </View>
    );
};

export default PageOneView;
