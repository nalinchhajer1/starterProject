import { VIEW_TYPE } from './ViewTypes';

// View Actions - Following existing project pattern with traditional action creators

export function setSelectedDate(date: any) {
    return { type: VIEW_TYPE.SET_SELECTED_DATE, date };
}

export function resetSelectedDate() {
    return { type: VIEW_TYPE.RESET_SELECTED_DATE };
}

export function setFetchingLocation(isFetching: boolean, error: string | null = null) {
    return { type: VIEW_TYPE.SET_FETCHING_LOCATION, payload: isFetching, error };
}

export function setCurrentAudio(track: any) {
    return { type: VIEW_TYPE.SET_CURRENT_PLAYING_AUDIO, track };
}

export function playAudio(track: any) {
    return { type: VIEW_TYPE.PLAY_AUDIO_TRACK, track };
}

export function stopAudio() {
    return { type: VIEW_TYPE.STOP_AUDIO_TRACK };
}
