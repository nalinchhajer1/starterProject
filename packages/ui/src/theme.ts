import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { COLOR } from 'utils/src/colors';

// Theme type constants
export const TYPE_TEXT = 'text';
export const TYPE_BUTTON_TEXT = 'button_text';

export const PDLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        [TYPE_TEXT]: COLOR.BLACK
    }
};

export const PDDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        [TYPE_TEXT]: COLOR.WHITE
    }
};

// Export additional theme utilities
export const getTheme = (isDark: boolean) => (isDark ? PDDarkTheme : PDLightTheme);
