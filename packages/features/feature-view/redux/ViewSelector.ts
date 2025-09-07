// View Selectors - Following existing project pattern
import { RootState } from 'state/src/slices';

// View-specific selectors
export const getSelectedDateFromState = (state: RootState) => {
    return state.viewState.selectedDate;
};

export const getFetchingLocationFromState = (state: RootState) => {
    return state.viewState.fetchingLocation;
};

export const getCurrentPlayingAudioFromState = (state: RootState) => {
    return state.viewState.currentPlayingAudio;
};
