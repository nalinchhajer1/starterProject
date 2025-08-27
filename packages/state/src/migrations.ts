export const migrations = {
  2: (state: any) => {
    return {
      ...state,
      appState: {
        ...state.appState,
        savedLocation: state.appState.userLocation,
      },
    }
  },
}
