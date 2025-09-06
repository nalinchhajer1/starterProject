// App Action Types based on existing project
export const APP_TYPE = {
    // App Actions
    ON_APP_INITIALIZE: 'ON_APP_INITIALIZE',
    SET_APP_LANGUAGE: 'SET_APP_LANGUAGE',
    SET_USER_LOCATION: 'SET_USER_LOCATION',
    SET_LATEST_APP_VERSION: 'SET_LATEST_APP_VERSION',
    SET_LOCATION_ASKED: 'SET_LOCATION_ASKED',
    CHANGE_LOCATION_ACTION: 'CHANGE_LOCATION_ACTION',

    // View Actions
    RESET_SELECTED_DATE: 'RESET_SELECTED_DATE',
    SET_SELECTED_DATE: 'SET_SELECTED_DATE',
    SET_FETCHING_LOCATION: 'SET_FETCHING_LOCATION',
    SET_CURRENT_PLAYING_AUDIO: 'SET_CURRENT_PLAYING_AUDIO',

    // Saga Actions
    REFRESH_USER_CURRENT_LOCATION: 'REFRESH_USER_CURRENT_LOCATION',
    PLAY_AUDIO_TRACK: 'PLAY_AUDIO_TRACK',
    STOP_AUDIO_TRACK: 'STOP_AUDIO_TRACK',
    PERFORM_APP_DEVELOPER_ACTION: 'PERFORM_APP_DEVELOPER_ACTION'
} as const;

// Selectors based on existing project
export const getHaveAskedForLocationFromState = (state: any) => {
    return state.appState?.dontAskForLocationOnLaunch || false;
};

export const getUserLocationFromState = (state: any) => {
    return state.appState?.userLocation || null;
};

export const getCurrentAudioFromState = (state: any) => {
    return state.viewState?.currentPlayingAudio || null;
};

export const getFetchingLocationFromState = (state: any) => {
    return state.viewState?.fetchingLocation || false;
};

export const getSelectedDateFromState = (state: any) => {
    return state.viewState?.selectedDate || null;
};

export const getSavedLocationFromState = (state: any) => {
    return state.appState?.savedLocation || null;
};
