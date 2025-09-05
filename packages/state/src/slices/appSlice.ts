import { createSlice } from '@reduxjs/toolkit'
import { APP_TYPE } from '../types/AppTypes'

// Placeholder for DEFAULT_LANGUAGE - you'll replace this when copying your constants
const DEFAULT_LANGUAGE = 'en'

// Placeholder for calculateAdIndex - you'll replace this when copying your utils
const calculateAdIndex = (currentIndex: number | null) => {
  // Mock implementation - replace with your actual calculateAdIndex function
  return currentIndex ? currentIndex + 1 : 1
}

export interface AppState {
  language: string
  userLocation: {
    address: string
    latitude: number
    longitude: number
  } | null
  latestVersion: any | null
  dontAskForLocationOnLaunch: boolean | null
  adIndex: number | null
  savedLocation: any | null
}

const initialState: AppState = {
  language: DEFAULT_LANGUAGE,
  userLocation: null,
  latestVersion: null,
  dontAskForLocationOnLaunch: null,
  adIndex: null,
  savedLocation: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  // Handle your existing action types
  extraReducers: (builder) => {
    builder
      .addCase(APP_TYPE.SET_APP_LANGUAGE as any, (state, action: any) => {
        state.language = action.language
      })
      .addCase(APP_TYPE.SET_USER_LOCATION as any, (state, action: any) => {
        state.userLocation = action.payload
      })
      .addCase(APP_TYPE.SET_LATEST_APP_VERSION as any, (state, action: any) => {
        state.latestVersion = action.payload
      })
      .addCase(APP_TYPE.SET_LOCATION_ASKED as any, (state, action: any) => {
        state.dontAskForLocationOnLaunch = action.payload
      })
      .addCase(APP_TYPE.ON_APP_INITIALIZE as any, (state) => {
        state.adIndex = calculateAdIndex(state.adIndex)
      })
      .addCase(APP_TYPE.CHANGE_LOCATION_ACTION as any, (state, action: any) => {
        state.savedLocation = action.payload
      })
  },
})

// No RTK slice actions exported since we're using traditional action creators
// export const {} = appSlice.actions
export default appSlice.reducer
