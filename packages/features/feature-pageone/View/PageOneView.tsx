import * as React from 'react';
import { View, Text } from 'react-native';
import { useAppSelector } from '../../core/hooks';
import { getNumberOfTimeAppOpenedFromState } from '../../feature-app/redux/AppSelector';
import Strings from 'utils/src/language';

// Standalone PageOneView component for optimal tree shaking
export const PageOneView = () => {
    const numberOfTimeAppOpened = useAppSelector(getNumberOfTimeAppOpenedFromState);

    // Format the localized string with parameters
    const counterText = Strings.formatString(Strings.APP_OPENED_COUNTER, numberOfTimeAppOpened, numberOfTimeAppOpened !== 1 ? 's' : '');

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
                    fontSize: 16,
                    color: '#333',
                    textAlign: 'center',
                    paddingHorizontal: 20,
                    marginBottom: 20,
                    fontWeight: 'bold'
                }}>
                {counterText}
            </Text>
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
