import { RootState } from 'state/src/types/AppTypes';

// Month View Selectors - Add your selectors here
export const selectSelectedMonth = (state: RootState) => state.monthView.selectedMonth;