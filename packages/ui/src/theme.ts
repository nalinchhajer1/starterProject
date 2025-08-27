import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { COLOR } from 'utils/src/colors'

// Theme type constants
export const TYPE_SECTION = 'section'
export const TYPE_CARD = 'card'
export const TYPE_ALTERNATE_CARD = 'alternate_card'
export const TYPE_DIVIDER = 'divider'
export const TYPE_TIME = 'time'
export const TYPE_TEXT = 'text'
export const TYPE_SECONDARY_TEXT = 'secondary_text'
export const TYPE_BUTTON = 'button'
export const TYPE_BUTTON_TEXT = 'button_text'
export const TYPE_PLACEHOLDER_TEXT = 'placeholder_text'

export const PDLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    [TYPE_TEXT]: COLOR.BLACK,
    [TYPE_CARD]: COLOR.WHITE,
    [TYPE_SECTION]: COLOR.SILVER,
    [TYPE_ALTERNATE_CARD]: COLOR.ROMANCE,
    [TYPE_DIVIDER]: COLOR.GEITATO,
    [TYPE_TIME]: COLOR.WHISPER,
    [TYPE_SECONDARY_TEXT]: COLOR.SECONDARY_TEXT_COLOR,
    [TYPE_BUTTON]: COLOR.PRIMARY_COLOR,
    [TYPE_BUTTON_TEXT]: COLOR.WHITE,
    [TYPE_PLACEHOLDER_TEXT]: COLOR.UNSELECTED_COLOR,
  },
}

export const PDDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    [TYPE_TEXT]: COLOR.WHITE,
    [TYPE_CARD]: COLOR.BLACK,
    [TYPE_SECTION]: COLOR.NIGHT_RIDER,
    [TYPE_ALTERNATE_CARD]: COLOR.BLACK,
    [TYPE_DIVIDER]: COLOR.NERO,
    [TYPE_TIME]: COLOR.NERO,
    [TYPE_SECONDARY_TEXT]: COLOR.NOBEL_GERY,
    [TYPE_BUTTON]: COLOR.PRIMARY_COLOR,
    [TYPE_BUTTON_TEXT]: COLOR.WHITE,
    [TYPE_PLACEHOLDER_TEXT]: COLOR.UNSELECTED_COLOR,
  },
}

// Export additional theme utilities
export const getTheme = (isDark: boolean) => isDark ? PDDarkTheme : PDLightTheme
