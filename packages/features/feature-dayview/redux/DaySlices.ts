import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DayViewState } from './DayTypes';

const initialState: DayViewState = {
    selectedDate: new Date()
};

const dayViewSlice = createSlice({
    name: 'dayView',
    initialState,
    reducers: {
        setSelectedDate: (state, action: PayloadAction<Date>) => {
            state.selectedDate = action.payload;
        }
    }
});

export const { setSelectedDate } = dayViewSlice.actions;
export default dayViewSlice.reducer;