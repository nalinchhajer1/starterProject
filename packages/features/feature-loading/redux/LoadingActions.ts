import { createAction } from '@reduxjs/toolkit';

// Loading View Actions - Add your actions here
export const setLoadingMessage = createAction<string>('loadingView/setLoadingMessage');