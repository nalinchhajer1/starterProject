// App Selectors - Following existing project pattern
import { RootState } from 'types';

// Selectors based on existing project
export const getHaveAskedForLocationFromState = (state: RootState) => {
    return state.appState?.dontAskForLocationOnLaunch || false;
};

export const getUserLocationFromState = (state: RootState) => {
    return state.appState?.userLocation || null;
};

export const getCurrentAudioFromState = (state: RootState) => {
    return state.viewState?.currentPlayingAudio || null;
};

export const getFetchingLocationFromState = (state: RootState) => {
    return state.viewState?.fetchingLocation || false;
};

export const getSelectedDateFromState = (state: RootState) => {
    return state.viewState?.selectedDate || null;
};

export const getSavedLocationFromState = (state: RootState) => {
    return state.appState?.savedLocation || null;
};

// Selectors matching your existing project structure

export const getLanguageFromState = (state: RootState) => {
    return state.appState.language;
};

export const getCurrentPlayingAudioFromState = (state: RootState) => {
    return state.viewState.currentPlayingAudio;
};

export const getLatestVersionFromState = (state: RootState) => {
    return state.appState.latestVersion;
};

export const getDontAskForLocationFromState = (state: RootState) => {
    return state.appState.dontAskForLocationOnLaunch;
};
