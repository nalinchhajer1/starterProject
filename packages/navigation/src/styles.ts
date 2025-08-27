import { StackNavigationOptions } from '@react-navigation/stack'
import { COLOR } from 'utils/src/colors'
import { fontSize, FONT_SIZE } from 'utils/src/font'

export const NAVIGATION_STYLE: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: COLOR.NAVIGATION_COLOR,
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: fontSize(FONT_SIZE.LARGE),
  },
}
