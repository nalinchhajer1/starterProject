import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OtherViewState } from './OtherTypes';

const initialState: OtherViewState = {
    viewMode: 'default'
};

const otherViewSlice = createSlice({
    name: 'otherView',
    initialState,
    reducers: {
        setOtherViewMode: (state, action: PayloadAction<'default' | 'settings' | 'about'>) => {
            state.viewMode = action.payload;
        }
    }
});

export const { setOtherViewMode } = otherViewSlice.actions;
export default otherViewSlice.reducer;