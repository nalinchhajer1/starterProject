import * as React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
// Use the assets from the shared packages folder
const iconSet = require('../../assets/fonts/selection.json');

const CustomIcon = createIconSetFromIcoMoon(iconSet, 'icomoon', 'icomoon.ttf');

interface FontIconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
}

const FontIcon: React.FC<FontIconProps> = ({ name, size = 24, color = '#000', style, ...props }) => {
    return <CustomIcon name={name} size={size} color={color} style={style} {...props} />;
};

export default FontIcon;
