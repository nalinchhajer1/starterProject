import * as React from 'react'
import { useContext, useMemo } from 'react'

// Tab Navigation Implementation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NAVIGATION_VIEW_ID, TAB_ICON, FONT_ICON } from './constants'
import { NAVIGATION_STYLE } from './styles'
import FontIcon from 'ui/src/FontIcon'
import Strings, { LanguageContext } from 'utils/src/language'
import { COLOR } from 'utils/src/colors'
import { fontSize } from 'utils/src/font'
import { OtherView } from './components/OtherView'
import { MonthView } from './components/MonthView'
import { DayView } from './components/DayView'

const Tab = createBottomTabNavigator()

const TabView = React.memo<{ size: number; color: string; name: string }>(({ size, color, name }) => {
  console.log('render:TabView')
  const language = useContext(LanguageContext)
  return (
    <FontIcon
      name={TAB_ICON[name] ?? FONT_ICON.BRIGHTNESS}
      size={size}
      color={color}
      language={language}
    />
  )
})

TabView.displayName = 'TabView'

const TabNavigationConfig = ({ route }: any) => {
  return {
    tabBarIcon: ({ color, size }: any) => {
      return (
        <TabView
          color={color}
          size={size}
          name={route.name}
        />
      )
    },
    tabBarInactiveTintColor: COLOR.UNSELECTED_COLOR,
    tabBarActiveTintColor: COLOR.PRIMARY_COLOR,
    ...NAVIGATION_STYLE,
  }
}

function createOptions(title: string, headerShown = false) {
  return {
    headerShown: headerShown,
    title: title,
    tabBarLabelStyle: {
      fontSize: fontSize(),
    },
  }
}

export const TabNavigation = () => {
  const [dayOption, monthOption, otherOption] = useMemo(() => {
    // Force re-computation when language changes by accessing Strings
    return [
      createOptions(Strings.DAY, false),
      createOptions(Strings.MONTH, false), 
      createOptions(Strings.OTHER, true),
    ]
  }, [])

  return (
    <Tab.Navigator
      screenOptions={TabNavigationConfig}
      initialRouteName={NAVIGATION_VIEW_ID.DAY_VIEW}>
      <Tab.Screen
        name={NAVIGATION_VIEW_ID.DAY_VIEW}
        component={DayView}
        options={dayOption}
      />
      <Tab.Screen
        name={NAVIGATION_VIEW_ID.MONTH_VIEW}
        component={MonthView}
        options={monthOption}
      />
      <Tab.Screen
        name={NAVIGATION_VIEW_ID.OTHER_VIEW}
        component={OtherView}
        options={otherOption}
      />
    </Tab.Navigator>
  )
}

