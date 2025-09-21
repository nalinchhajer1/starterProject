import { combineReducers } from '@reduxjs/toolkit';
import AppSlices from 'features/feature-app/redux/AppSlices';

const rootReducer = combineReducers({
    appState: AppSlices
});

export default rootReducer;
