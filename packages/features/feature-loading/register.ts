// No state to register for loading feature yet
export function registerLoadingFeature(
    injectReducer: (key: string, reducer: any, meta?: { persist?: any }) => void,
    injectSaga: (key: string, saga: any) => void
) {
    // Future: Register loading state and sagas here when needed
}
