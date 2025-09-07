import { createSlice } from '@reduxjs/toolkit';
import { VIEW_TYPE } from './ViewTypes';

// Placeholder for getCurrentDateMoment - you'll replace this when copying your utils
const getCurrentDateMoment = () => {
    // Mock implementation - replace with your actual getCurrentDateMoment function
    return new Date().toISOString();
};

export interface ViewState {
    selectedDate: any; // You can type this more specifically based on your moment object
    fetchingLocation: boolean;
    currentPlayingAudio: any | null;
    fetchingLocationError: string | null;
}

const initialState: ViewState = {
    selectedDate: getCurrentDateMoment(),
    fetchingLocation: false,
    currentPlayingAudio: null,
    fetchingLocationError: null
};

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {},
    // Handle your existing action types using extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(VIEW_TYPE.SET_SELECTED_DATE as any, (state, action: any) => {
                state.selectedDate = action.date;
            })
            .addCase(VIEW_TYPE.RESET_SELECTED_DATE as any, (state) => {
                state.selectedDate = null;
            })
            .addCase(VIEW_TYPE.SET_FETCHING_LOCATION as any, (state, action: any) => {
                state.fetchingLocation = action.payload;
                state.fetchingLocationError = action.error ?? null;
            })
            .addCase(VIEW_TYPE.SET_CURRENT_PLAYING_AUDIO as any, (state, action: any) => {
                state.currentPlayingAudio = action.track;
            });
    }
});

// No RTK slice actions exported since we're using traditional action creators
// export const {} = viewSlice.actions
export default viewSlice.reducer;
