import { createAction } from '@reduxjs/toolkit';

// Day View Actions - Add your actions here
export const setSelectedDate = createAction<Date>('dayView/setSelectedDate');