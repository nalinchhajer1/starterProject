import { createAction } from '@reduxjs/toolkit';

// Other View Actions - Add your actions here
export const setOtherViewMode = createAction<'default' | 'settings' | 'about'>('otherView/setOtherViewMode');