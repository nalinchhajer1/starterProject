import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingViewState } from './LoadingTypes';

const initialState: LoadingViewState = {
    message: 'Loading...'
};

const loadingViewSlice = createSlice({
    name: 'loadingView',
    initialState,
    reducers: {
        setLoadingMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        }
    }
});

export const { setLoadingMessage } = loadingViewSlice.actions;
export default loadingViewSlice.reducer;