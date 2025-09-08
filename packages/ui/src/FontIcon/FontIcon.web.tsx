import React, { useMemo } from 'react';
import IcoMoon from 'react-icomoon';
import { COLOR } from 'utils/src/colors';

// Import the icon set - we'll need to copy it to a TypeScript-friendly location
const iconSet = require('../../../assets/fonts/selection.json');

interface FontIconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
    [key: string]: any;
}

const FontIcon: React.FC<FontIconProps> = ({ name, size = 24, color = COLOR.PRIMARY_COLOR, style, ...props }) => {
    // For web, we don't need StyleSheet.flatten, just pass the style directly
    const computedStyle = useMemo(() => {
        if (Array.isArray(style)) {
            return Object.assign({}, ...style);
        }
        return style;
    }, [style]);

    return <IcoMoon iconSet={iconSet} icon={name} size={size} color={color} style={computedStyle} {...props} />;
};

export default FontIcon;
