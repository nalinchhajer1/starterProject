# Features Registry

This package serves as the central registry for all application features, managing their Redux state, sagas, and persistence configuration.

## Overview

The features-registry follows a modular architecture where each feature is self-contained and registered centrally. This approach provides:

- **Centralized State Management**: All Redux reducers and sagas are registered in one place
- **Automatic Persistence**: Features can be configured for persistence without manual setup
- **Type Safety**: Full TypeScript support for all feature interactions
- **Modular Architecture**: Features are independent and can be easily added/removed

## Creating a New Feature

### 1. Create Feature Structure

Create a new feature directory under `packages/features/`:

```
packages/features/feature-[name]/
├── register.ts          # Feature registration
├── redux/               # Redux logic
│   ├── [Name]Types.ts   # Action types
│   ├── [Name]Slices.ts  # Redux Toolkit slices
│   ├── [Name]Saga.ts    # Redux Saga
│   ├── [Name]Actions.ts # Action creators
│   └── [Name]Selector.ts # Selectors
├── View/                # React components
│   └── [Name]View.tsx
└── README.md           # Feature documentation
```

### 2. Create Feature Registration

Create `packages/features/feature-[name]/register.ts`:

```typescript
import { [Name]Slices } from './redux/[Name]Slices';
import { [name]Saga } from './redux/[Name]Saga';

export function register[Name]Feature(
    injectReducer: (key: string, reducer: any) => void,
    injectSaga: (key: string, saga: any) => void
) {
    // Register the feature reducer (persistence handled automatically by state-core)
    injectReducer('[name]State', [Name]Slices);

    // Register the feature saga
    injectSaga('[name]Saga', [name]Saga());
}
```

**Example - User Feature:**

```typescript
import UserSlices from './redux/UserSlices';
import { userSaga } from './redux/UserSaga';

export function registerUserFeature(
    injectReducer: (key: string, reducer: any) => void,
    injectSaga: (key: string, saga: any) => void
) {
    // Register the user reducer
    injectReducer('userState', UserSlices);

    // Register the user saga
    injectSaga('userSaga', userSaga());
}
```

### 3. Update Features Registry

Add your feature to `packages/features-registry/src/index.ts`:

```typescript
import { registerAppFeature } from 'features/feature-app/register';
import { registerLoadingFeature } from 'features/feature-loading/register';
import { registerPageOneFeature } from 'features/feature-pageone/register';
import { registerUserFeature } from 'features/feature-user/register'; // Add your feature

// Feature views
import { PageOneView } from 'features/feature-pageone/View/PageOneView';
import { LoadingView } from 'features/feature-loading/View/LoadingView';
import { UserView } from 'features/feature-user/View/UserView'; // Add your view

// Feature selectors
import { getLanguageFromState } from 'features/feature-app/redux/AppSelector';
import { getUserFromState } from 'features/feature-user/redux/UserSelector'; // Add your selectors

// Called once during app bootstrap
export const registerAppStates = (
    injectReducer: (key: string, reducer: any, meta?: { persist?: any }) => void,
    injectSaga: (key: string, saga: any) => void
) => {
    // Register all feature states and sagas
    registerAppFeature(injectReducer, injectSaga);
    registerLoadingFeature(injectReducer, injectSaga);
    registerPageOneFeature(injectReducer, injectSaga);
    registerUserFeature(injectReducer, injectSaga); // Add your feature registration
};

// Export individual feature views for direct use in apps
export const views = {
    PageOneView,
    LoadingView,
    UserView // Add your view
};

// Export selectors for use in app providers
export const selectors = {
    getLanguageFromState,
    getUserFromState // Add your selectors
};
```

## Configuring Persistence

### 1. Update Persistence Configuration

Add your feature's persistence configuration to `packages/state-core/src/persistConfiguration.ts`:

```typescript
// Per-slice persist configurations
export const slicePersistConfigs: Record<string, PersistConfig<any>> = {
    appState: {
        key: 'appState',
        storage,
        version: 1,
        whitelist: ['language', 'numberOfTimeAppOpened']
    },
    userState: { // Add your feature state
        key: 'userState',
        storage,
        version: 1,
        whitelist: ['profile', 'preferences', 'settings'] // Specify which fields to persist
    }
};
```

### 2. Persistence Options

You can configure different persistence strategies:

```typescript
// Full state persistence
userState: {
    key: 'userState',
    storage,
    version: 1
    // No whitelist = persist entire state
}

// Selective field persistence
userState: {
    key: 'userState',
    storage,
    version: 1,
    whitelist: ['profile', 'preferences'] // Only persist these fields
}

// Blacklist specific fields
userState: {
    key: 'userState',
    storage,
    version: 1,
    blacklist: ['temporaryData'] // Persist everything except these fields
}
```

## Feature Development Best Practices

### 1. State Structure

Follow this pattern for your Redux slices:

```typescript
// packages/features/feature-user/redux/UserSlices.ts
import { createSlice } from '@reduxjs/toolkit';
import { USER_TYPE } from './UserTypes';

export interface UserState {
    profile: {
        id: string;
        name: string;
        email: string;
    } | null;
    preferences: {
        theme: 'light' | 'dark';
        language: string;
    };
    isLoading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    preferences: {
        theme: 'light',
        language: 'en'
    },
    isLoading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(USER_TYPE.SET_USER_PROFILE as any, (state, action: any) => {
                state.profile = action.payload;
            })
            .addCase(USER_TYPE.UPDATE_PREFERENCES as any, (state, action: any) => {
                state.preferences = { ...state.preferences, ...action.payload };
            });
    }
});

export default userSlice.reducer;
```

### 2. Action Types

Define your action types clearly:

```typescript
// packages/features/feature-user/redux/UserTypes.ts
export const USER_TYPE = {
    // User Actions
    SET_USER_PROFILE: 'SET_USER_PROFILE',
    UPDATE_PREFERENCES: 'UPDATE_PREFERENCES',
    CLEAR_USER_DATA: 'CLEAR_USER_DATA',
    
    // Async Actions
    FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
    UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE'
} as const;
```

### 3. Selectors

Create typed selectors for your feature:

```typescript
// packages/features/feature-user/redux/UserSelector.ts
import { RootState } from '../../core/RootState';

export const getUserProfileFromState = (state: RootState) => {
    return state.userState.profile;
};

export const getUserPreferencesFromState = (state: RootState) => {
    return state.userState.preferences;
};

export const getUserLoadingFromState = (state: RootState) => {
    return state.userState.isLoading;
};
```

### 4. Sagas

Implement your feature sagas:

```typescript
// packages/features/feature-user/redux/UserSaga.ts
import { all, takeLatest, call, put } from 'redux-saga/effects';
import { USER_TYPE } from './UserTypes';

function* fetchUserProfile() {
    try {
        // Your async logic here
        const profile = yield call(api.getUserProfile);
        yield put({ type: USER_TYPE.SET_USER_PROFILE, payload: profile });
    } catch (error) {
        yield put({ type: USER_TYPE.SET_ERROR, payload: error.message });
    }
}

export function* userSaga() {
    yield all([
        takeLatest(USER_TYPE.FETCH_USER_PROFILE as any, fetchUserProfile)
    ]);
}
```

## Testing Your Feature

### 1. Unit Tests

Create tests for your feature components and logic:

```typescript
// packages/features/feature-user/__tests__/UserView.test.tsx
import { render, screen } from '@testing-library/react';
import { UserView } from '../View/UserView';

describe('UserView', () => {
    it('renders user profile correctly', () => {
        render(<UserView />);
        expect(screen.getByText('User Profile')).toBeInTheDocument();
    });
});
```

### 2. Integration Tests

Test your feature's integration with the store:

```typescript
// packages/features/feature-user/__tests__/UserSlices.test.ts
import userReducer from '../redux/UserSlices';
import { USER_TYPE } from '../redux/UserTypes';

describe('UserSlices', () => {
    it('should handle SET_USER_PROFILE', () => {
        const initialState = { profile: null, preferences: { theme: 'light', language: 'en' }, isLoading: false, error: null };
        const action = { type: USER_TYPE.SET_USER_PROFILE, payload: { id: '1', name: 'John', email: 'john@example.com' } };
        const newState = userReducer(initialState, action);
        expect(newState.profile).toEqual(action.payload);
    });
});
```

## Migration and Versioning

When updating your feature's state structure, update the version in `persistConfiguration.ts`:

```typescript
userState: {
    key: 'userState',
    storage,
    version: 2, // Increment version when state structure changes
    whitelist: ['profile', 'preferences', 'settings']
}
```

Create migration logic in `packages/state-core/src/migrations.ts` if needed.

## Troubleshooting

### Common Issues

1. **Feature not registered**: Ensure your feature is added to `registerAppStates` in `features-registry/src/index.ts`

2. **Persistence not working**: Check that your feature is added to `slicePersistConfigs` in `persistConfiguration.ts`

3. **TypeScript errors**: Ensure all imports use the correct paths and types are properly exported

4. **Saga not running**: Verify that your saga is properly registered and the action is being dispatched

### Debug Tips

- Use Redux DevTools to inspect state changes
- Add console.log statements in sagas to track execution
- Check the browser's Application tab for persisted data
- Verify that selectors are returning the expected data

## Examples

See the existing features for reference:
- `feature-app`: Complete example with state, sagas, and persistence
- `feature-loading`: Minimal feature structure
- `feature-pageone`: View-only feature

## Support

For questions or issues, refer to:
- Redux Toolkit documentation
- Redux Saga documentation
- Redux Persist documentation
- Project architecture documentation in `documents/ARCHITECTURE.md`
