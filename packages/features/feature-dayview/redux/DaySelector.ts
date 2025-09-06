import { RootState } from 'state/src/types/AppTypes';

// Day View Selectors - Add your selectors here
export const selectSelectedDate = (state: RootState) => state.dayView.selectedDate;