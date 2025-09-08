import { useTheme } from '@react-navigation/native';
import { TYPE_BUTTON_TEXT } from './theme';

// Custom hook to get theme colors with proper typing
export const useAppTheme = () => {
    const theme = useTheme();

    return {
        ...theme,
        colors: {
            ...theme.colors,
            buttonText: theme.colors[TYPE_BUTTON_TEXT]
        }
    };
};

// Type definitions for theme colors
export type AppThemeColors = ReturnType<typeof useAppTheme>['colors'];
