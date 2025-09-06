import { RootState } from 'state/src/types/AppTypes';

// Other View Selectors - Add your selectors here
export const selectViewMode = (state: RootState) => state.otherView.viewMode;