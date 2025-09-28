import * as React from 'react';
import { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { RootStackParamList } from './types';
import { NAVIGATION_STYLE } from './styles';
import { TabNavigation } from './screens';
import { isWeb } from 'utils/src/platform';

const RootStack = createStackNavigator<RootStackParamList>();

interface Props {}

class RootStackScreenComponent extends Component<Props> {
    componentDidMount() {
        if (!isWeb()) {
            // SplashScreen.hide() - Add your splash screen logic here
        }
    }

    render() {
        return (
            <RootStack.Navigator screenOptions={NAVIGATION_STYLE}>
                <RootStack.Screen name="Tab" options={{ headerShown: false }} component={TabNavigation} />
            </RootStack.Navigator>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export const RootStackScreen = connect(mapStateToProps, mapDispatchToProps)(RootStackScreenComponent);
