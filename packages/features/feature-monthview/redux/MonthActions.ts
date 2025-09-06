import { createAction } from '@reduxjs/toolkit';

// Month View Actions - Add your actions here
export const setSelectedMonth = createAction<Date>('monthView/setSelectedMonth');