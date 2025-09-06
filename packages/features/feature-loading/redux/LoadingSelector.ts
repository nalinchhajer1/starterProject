import { RootState } from 'state/src/types/AppTypes';

// Loading View Selectors - Add your selectors here
export const selectLoadingMessage = (state: RootState) => state.loadingView.message;