import { combineReducers } from '@reduxjs/toolkit';
import AppSlices from 'features/feature-app/redux/AppSlices';
import ViewSlices from 'features/feature-view/redux/ViewSlices';

const rootReducer = combineReducers({
    appState: AppSlices,
    viewState: ViewSlices
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
