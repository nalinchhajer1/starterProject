import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { RootStackParamList } from './types';
import { NAVIGATION_VIEW_ID } from './constants';
import { NAVIGATION_STYLE } from './styles';
import { TabNavigation } from './screens';
import { YearListView, SettingsView } from 'features/feature-extras/View/components';
import { isWeb } from 'utils/src/platform';
import Strings from 'utils/src/language';
import { onAppInitialize } from 'features/feature-app/redux/AppActions';

const RootStack = createStackNavigator<RootStackParamList>();

interface Props {
    onAppInitialize: () => void;
}

class RootStackScreenComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);
        props.onAppInitialize();
    }

    componentDidMount() {
        if (!isWeb()) {
            // SplashScreen.hide() - Add your splash screen logic here
        }
    }

    render() {

        return (
            <RootStack.Navigator screenOptions={NAVIGATION_STYLE}>
                <RootStack.Group>
                    <RootStack.Screen name="Tab" options={{ headerShown: false }} component={TabNavigation} />

                    <RootStack.Group>
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.THREE_VIEW}
                            component={YearListView}
                            options={{
                                title: Strings.THREE
                            }}
                        />
                    </RootStack.Group>
                </RootStack.Group>
                <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                    <RootStack.Screen
                        name={NAVIGATION_VIEW_ID.SETTINGS}
                        component={SettingsView}
                        options={{
                            title: Strings.SETTINGS
                        }}
                    />
                </RootStack.Group>
            </RootStack.Navigator>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    onAppInitialize: onAppInitialize
};

export const RootStackScreen = connect(mapStateToProps, mapDispatchToProps)(RootStackScreenComponent);
