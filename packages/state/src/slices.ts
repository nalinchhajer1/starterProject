import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import viewReducer from './slices/viewSlice';

const rootReducer = combineReducers({
    appState: appReducer,
    viewState: viewReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
