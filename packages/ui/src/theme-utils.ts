import { useTheme } from '@react-navigation/native'
import { 
  TYPE_SECTION,
  TYPE_CARD,
  TYPE_ALTERNATE_CARD,
  TYPE_DIVIDER,
  TYPE_TIME,
  TYPE_TEXT,
  TYPE_SECONDARY_TEXT,
  TYPE_BUTTON,
  TYPE_BUTTON_TEXT,
  TYPE_PLACEHOLDER_TEXT
} from './theme'

// Custom hook to get theme colors with proper typing
export const useAppTheme = () => {
  const theme = useTheme()
  
  return {
    ...theme,
    colors: {
      ...theme.colors,
      section: theme.colors[TYPE_SECTION],
      card: theme.colors[TYPE_CARD],
      alternateCard: theme.colors[TYPE_ALTERNATE_CARD],
      divider: theme.colors[TYPE_DIVIDER],
      time: theme.colors[TYPE_TIME],
      text: theme.colors[TYPE_TEXT],
      secondaryText: theme.colors[TYPE_SECONDARY_TEXT],
      button: theme.colors[TYPE_BUTTON],
      buttonText: theme.colors[TYPE_BUTTON_TEXT],
      placeholderText: theme.colors[TYPE_PLACEHOLDER_TEXT],
    }
  }
}

// Type definitions for theme colors
export type AppThemeColors = ReturnType<typeof useAppTheme>['colors']
