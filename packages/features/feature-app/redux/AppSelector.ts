// App Selectors - Following existing project pattern
import { RootState } from '../../core/RootState';

// Selectors based on existing project
export const getHaveAskedForLocationFromState = (state: RootState) => {
    return state.appState.dontAskForLocationOnLaunch || false;
};

export const getUserLocationFromState = (state: RootState) => {
    return state.appState.userLocation || null;
};

export const getSavedLocationFromState = (state: RootState) => {
    return state.appState.savedLocation || null;
};

// Selectors matching your existing project structure

export const getLanguageFromState = (state: RootState) => {
    return state.appState.language;
};

export const getLatestVersionFromState = (state: RootState) => {
    return state.appState.latestVersion;
};

export const getDontAskForLocationFromState = (state: RootState) => {
    return state.appState.dontAskForLocationOnLaunch;
};

export const getNumberOfTimeAppOpenedFromState = (state: RootState) => {
    return state.appState.numberOfTimeAppOpened;
};
