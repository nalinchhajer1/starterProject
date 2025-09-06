import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MonthViewState } from './MonthTypes';

const initialState: MonthViewState = {
    selectedMonth: new Date()
};

const monthViewSlice = createSlice({
    name: 'monthView',
    initialState,
    reducers: {
        setSelectedMonth: (state, action: PayloadAction<Date>) => {
            state.selectedMonth = action.payload;
        }
    }
});

export const { setSelectedMonth } = monthViewSlice.actions;
export default monthViewSlice.reducer;