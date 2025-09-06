// Selectors for state access
import { RootState } from '../slices';

// Selectors matching your existing project structure

export const getLanguageFromState = (state: RootState) => {
    return state.appState.language;
};

export const getUserLocationFromState = (state: RootState) => {
    return state.appState.userLocation;
};

export const getSelectedDateFromState = (state: RootState) => {
    return state.viewState.selectedDate;
};

export const getFetchingLocationFromState = (state: RootState) => {
    return state.viewState.fetchingLocation;
};

export const getCurrentPlayingAudioFromState = (state: RootState) => {
    return state.viewState.currentPlayingAudio;
};

export const getSavedLocationFromState = (state: RootState) => {
    return state.appState.savedLocation;
};

export const getLatestVersionFromState = (state: RootState) => {
    return state.appState.latestVersion;
};

export const getDontAskForLocationFromState = (state: RootState) => {
    return state.appState.dontAskForLocationOnLaunch;
};
