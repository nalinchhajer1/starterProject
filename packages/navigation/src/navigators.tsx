import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { RootStackParamList } from './types';
import { NAVIGATION_VIEW_ID } from './constants';
import { NAVIGATION_STYLE } from './styles';
import { TabNavigation } from './screens';
import {
    YearListView,
    LocalWebView,
    SettingsView,
    PachkkanAudio,
    ManglikAudio,
    AppDeveloperView,
    SponsorView,
    SelectLocation
} from 'features/feature-extras/View/components';
import { isWeb } from 'utils/src/platform';
import Strings from 'utils/src/language';
import { onAppInitialize } from 'features/feature-app/redux';

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
        console.log('RootStackScreen:render');

        return (
            <RootStack.Navigator screenOptions={NAVIGATION_STYLE}>
                <RootStack.Group>
                    <RootStack.Screen name="Tab" options={{ headerShown: false }} component={TabNavigation} />

                    <RootStack.Group>
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.TITHI_VIEW}
                            component={YearListView}
                            options={{
                                title: Strings.TITHIS
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.JAIN_PARV}
                            component={YearListView}
                            options={{
                                title: Strings.JAIN_PARV
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.CHOGADIYA_VIEW}
                            component={LocalWebView}
                            options={{
                                title: Strings.CHOGADIYA
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.PACHKKHAN}
                            component={LocalWebView}
                            options={{
                                title: Strings.PACHKKHAN
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.SAMAY_GYAAN}
                            component={LocalWebView}
                            options={{
                                title: Strings.SAMAY_GYAAN
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.KAAL_RAHU_VICHAR}
                            component={LocalWebView}
                            options={{
                                title: Strings.KAAL_RAHU_VICHAR
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.FOURTEEN_NEEYAM}
                            component={LocalWebView}
                            options={{
                                title: Strings.FOURTEEN_NEEYAM
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.AMRIT_SIDHI_YOG}
                            component={YearListView}
                            options={{
                                title: Strings.AMRIT_SIDHI_YOG
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.SHUB_ASHUB_DAY}
                            component={YearListView}
                            options={{
                                title: Strings.SHUB_ASHUB_DAY
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.PANCHAK}
                            component={YearListView}
                            options={{
                                title: Strings.PANCHAK
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.PUSHYA_NAKSHATARA}
                            component={YearListView}
                            options={{
                                title: Strings.PUSHYA_NAKSHATARA
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.PAKSHIK_PARV}
                            component={YearListView}
                            options={{
                                title: Strings.PAKSHIK_PARV
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.PACHKKAN_AUDIO}
                            component={PachkkanAudio}
                            options={{
                                title: Strings.PACHKKAN_AUDIO
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.MANGLIK_AUDIO}
                            component={ManglikAudio}
                            options={{
                                title: Strings.MANGLIK_AUDIO
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.APP_DEVELOPER_VIEW}
                            component={AppDeveloperView}
                            options={{
                                title: Strings.APP_DEVELOPER
                            }}
                        />
                        <RootStack.Screen
                            name={NAVIGATION_VIEW_ID.SPONSOR_VIEW}
                            component={SponsorView}
                            options={{
                                title: Strings.SPONSORS
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
                    <RootStack.Screen
                        name={NAVIGATION_VIEW_ID.SELECT_LOCATION}
                        component={SelectLocation}
                        options={{
                            title: Strings.CHANGE_LOCATION
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
