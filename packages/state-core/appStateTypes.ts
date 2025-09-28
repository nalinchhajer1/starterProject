// Shared app state types that can be imported by both state-core and features
// This avoids circular dependencies

export interface AppState {
    language: string;
    userLocation: {
        address: string;
        latitude: number;
        longitude: number;
    } | null;
    latestVersion: any | null;
    dontAskForLocationOnLaunch: boolean | null;
    adIndex: number | null;
    savedLocation: any | null;
}
