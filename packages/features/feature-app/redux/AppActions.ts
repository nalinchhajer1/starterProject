import { APP_TYPE } from './AppTypes';

// App Actions - Following existing project pattern with traditional action creators

export function onAppInitialize() {
    return { type: APP_TYPE.ON_APP_INITIALIZE };
}

export function setAppLanguage(language: string) {
    return { type: APP_TYPE.SET_APP_LANGUAGE, language };
}

export function setUserLocation(location: any) {
    return { type: APP_TYPE.SET_USER_LOCATION, payload: location };
}

export function setLatestVersion(version: any) {
    return { type: APP_TYPE.SET_LATEST_APP_VERSION, payload: version };
}

export function setLocationAsked(dontAsk: boolean) {
    return { type: APP_TYPE.SET_LOCATION_ASKED, payload: dontAsk };
}

export function changeLocationAction(newLocation: any) {
    return { type: APP_TYPE.CHANGE_LOCATION_ACTION, payload: newLocation };
}

export function refreshCurrentLocation() {
    return { type: APP_TYPE.REFRESH_USER_CURRENT_LOCATION };
}

export function setFetchingLocation(isFetching: boolean, error: string | null = null) {
    return { type: APP_TYPE.SET_FETCHING_LOCATION, payload: isFetching, error };
}

export function playAudio(track: any) {
    return { type: APP_TYPE.PLAY_AUDIO_TRACK, track };
}

export function stopAudio() {
    return { type: APP_TYPE.STOP_AUDIO_TRACK };
}

export function setCurrentAudio(track: any) {
    return { type: APP_TYPE.SET_CURRENT_PLAYING_AUDIO, track };
}

export function performAppDeveloperAction(actionType: string) {
    return { type: APP_TYPE.PERFORM_APP_DEVELOPER_ACTION, actionType };
}
