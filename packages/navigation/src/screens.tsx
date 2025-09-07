import * as React from 'react';
import { useContext, useMemo } from 'react';

// Tab Navigation Implementation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NAVIGATION_VIEW_ID, TAB_ICON, FONT_ICON } from './constants';
import { NAVIGATION_STYLE } from './styles';
import FontIcon from 'ui/src/FontIcon';
import Strings, { LanguageContext } from 'utils/src/language';
import { COLOR } from 'utils/src/colors';
import { fontSize } from 'utils/src/font';
import { OtherView } from 'features/feature-otherview/View/OtherView';
import { PageTwoView } from 'features/feature-pagetwo/View/PageTwoView';
import { PageOneView } from 'features/feature-pageone/View/PageOneView';

const Tab = createBottomTabNavigator();

const TabView = React.memo<{ size: number; color: string; name: string }>(({ size, color, name }) => {
    console.log('render:TabView');
    const language = useContext(LanguageContext);
    return <FontIcon name={TAB_ICON[name] ?? FONT_ICON.BRIGHTNESS} size={size} color={color} language={language} />;
});

TabView.displayName = 'TabView';

const TabNavigationConfig = ({ route }: any) => {
    return {
        tabBarIcon: ({ color, size }: any) => {
            return <TabView color={color} size={size} name={route.name} />;
        },
        tabBarInactiveTintColor: COLOR.UNSELECTED_COLOR,
        tabBarActiveTintColor: COLOR.PRIMARY_COLOR,
        ...NAVIGATION_STYLE
    };
};

function createOptions(title: string, headerShown = false) {
    return {
        headerShown: headerShown,
        title: title,
        tabBarLabelStyle: {
            fontSize: fontSize()
        }
    };
}

export const TabNavigation = () => {
    const language = useContext(LanguageContext);
    const [oneOption, twoOption, otherOption] = useMemo(() => {
        // Force re-computation when language changes by accessing Strings
        return [createOptions(Strings.ONE, false), createOptions(Strings.TWO, false), createOptions(Strings.OTHER, true)];
    }, [language]);

    return (
        <Tab.Navigator screenOptions={TabNavigationConfig} initialRouteName={NAVIGATION_VIEW_ID.PAGE_ONE_VIEW}>
            <Tab.Screen name={NAVIGATION_VIEW_ID.PAGE_ONE_VIEW} component={PageOneView} options={oneOption} />
            <Tab.Screen name={NAVIGATION_VIEW_ID.PAGE_TWO_VIEW} component={PageTwoView} options={twoOption} />
            <Tab.Screen name={NAVIGATION_VIEW_ID.OTHER_VIEW} component={OtherView} options={otherOption} />
        </Tab.Navigator>
    );
};
