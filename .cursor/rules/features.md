# Feature Development Guidelines

## 🔧 Adding New Features

### **Feature Development Workflow**

1. **Create Feature Structure**:
   ```bash
   mkdir -p packages/features/feature-[name]/View
   mkdir -p packages/features/feature-[name]/redux
   ```

2. **Add View Components**:
   - Create main component in `View/[FeatureName].tsx`
   - Add styles in `View/[FeatureName].styles.ts`
   - Export directly from component files (no index.ts needed)

3. **Add Redux Structure** (Following existing pattern):
   - `redux/[Feature]Actions.ts` - Traditional action creators (function-based)
   - `redux/[Feature]Types.ts` - Action type constants only (no state interfaces)
   - `redux/[Feature]Slices.ts` - Redux slice with extraReducers for traditional actions + state interface definition
   - `redux/[Feature]Selector.ts` - Function-based selectors with RootState typing
   - `redux/[Feature]Saga.ts` - Redux Saga for side effects
   - Import directly from specific Redux files (no index.ts needed)

4. **Create Feature Registration**:
   - Create `register.ts` file in feature directory
   - Register reducer and saga with provided injectors
   - Follow pattern: `injectReducer('[name]State', [Name]Slices)`
   - Follow pattern: `injectSaga('[name]Saga', [name]Saga())`

5. **Update Features Registry**:
   - Add feature import to `packages/features-registry/src/index.ts`
   - Add feature registration to `registerAppStates` function
   - Add feature view to `views` export object
   - Add feature selectors to `selectors` export object

6. **Configure Persistence** (if needed):
   - Add feature state to `packages/state-core/src/persistConfiguration.ts`
   - Configure `slicePersistConfigs` with key, storage, version, and whitelist/blacklist
   - Increment version when state structure changes

7. **Add Documentation**:
   - Create comprehensive `README.md` with product requirements
   - Document all features, technical requirements, and integration points

8. **Update Navigation**:
   - Add to navigation types in `packages/navigation/src/types.ts`
   - Update navigation configuration in `packages/navigation/src/navigators.tsx`
   - Import directly from component files (no index.ts needed)

9. **Integration**:
   - Import directly from component files in navigation
   - Test on both mobile and web platforms

### Cross-Platform Component Development

1. **Feature-Based Development**: Create components within feature folders
2. **View Structure**: Place components in `View/` folder with separate styles file
3. **Redux Integration**: Add feature-specific Redux state in `redux/` folder
4. **Use React Native StyleSheet** for styling
5. **Add platform-specific code** using `utils/src/platform`
6. **Implement proper TypeScript interfaces** in `redux/[Feature]Types.ts`
7. **Add to theme system** if needed
8. **Test on both mobile and web platforms**

### Feature Naming Convention
- **Feature folders**: `feature-[name]` (e.g., `feature-pageone`)
- **Redux files**: `[Feature][Type].ts` (e.g., `PageOneActions.ts`, `PageOneSlices.ts`)
- **Components**: `[FeatureName].tsx` (e.g., `PageOneView.tsx`)
- **Styles**: `[FeatureName].styles.ts` (e.g., `PageOneView.styles.ts`)

### State Management Implementation

1. **Feature-Specific Redux**: Create Redux structure in `packages/features/feature-[name]/redux/`
2. **Actions**: Define traditional action creators in `[Feature]Actions.ts` (function-based, not RTK createAction)
3. **Types**: Define action type constants only in `[Feature]Types.ts` (no state interfaces)
4. **Slices**: Create slice with extraReducers in `[Feature]Slices.ts` to handle traditional actions + define state interface
5. **Selectors**: Add function-based selectors with RootState typing in `[Feature]Selector.ts`
6. **Sagas**: Add Redux Saga for side effects in `[Feature]Saga.ts`
7. **Registration**: Create `register.ts` to register reducer and saga
8. **Registry**: Add feature to `packages/features-registry/src/index.ts`
9. **Persistence**: Configure in `packages/state-core/src/persistConfiguration.ts`
10. **Imports**: Import directly from specific Redux files (no index.ts needed)

### Centralized Architecture Patterns

#### **Feature Registration Pattern**
```typescript
// packages/features/feature-[name]/register.ts
import [Name]Slices from './redux/[Name]Slices';
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

#### **Features Registry Pattern**
```typescript
// packages/features-registry/src/index.ts
import { register[Name]Feature } from 'features/feature-[name]/register';
import { [Name]View } from 'features/feature-[name]/View/[Name]View';
import { get[Name]FromState } from 'features/feature-[name]/redux/[Name]Selector';

export const registerAppStates = (
    injectReducer: (key: string, reducer: any) => void,
    injectSaga: (key: string, saga: any) => void
) => {
    // Add your feature registration here
    register[Name]Feature(injectReducer, injectSaga);
};

export const views = {
    [Name]View // Add your feature view
};

export const selectors = {
    get[Name]FromState // Add your feature selectors
};
```

#### **Persistence Configuration Pattern**
```typescript
// packages/state-core/src/persistConfiguration.ts
export const slicePersistConfigs: Record<string, PersistConfig<any>> = {
    // Add your feature persistence configuration
    [name]State: {
        key: '[name]State',
        storage,
        version: 1,
        whitelist: ['field1', 'field2'] // Specify which fields to persist
    }
};
```

### Redux Pattern Standards

- **Traditional Action Creators**: Use function-based action creators, not RTK createAction
- **Action Type Constants**: Define action types in `[Feature]Types.ts` as const objects
- **State Interface Definition**: Define state interfaces directly in `[Feature]Slices.ts` files, not in Types files
- **extraReducers Pattern**: Use extraReducers in slices to handle traditional actions
- **Function-based Selectors**: Use function selectors with RootState typing
- **Mixed State Structure**: Support both appState and viewState in RootState
- **No RTK Actions Export**: Don't export slice actions when using traditional action creators

### Navigation Updates

1. Update `RootStackParamList` in `packages/navigation/src/types.ts`
2. Add new screen component
3. Update navigation configuration in `packages/navigation/src/navigators.tsx`
4. Add proper screen options and titles
5. Update localization strings if needed

### Persistence Configuration Best Practices

#### **Persistence Options**
```typescript
// Full state persistence
featureState: {
    key: 'featureState',
    storage,
    version: 1
    // No whitelist/blacklist = persist entire state
}

// Selective field persistence (recommended)
featureState: {
    key: 'featureState',
    storage,
    version: 1,
    whitelist: ['field1', 'field2'] // Only persist these fields
}

// Exclude specific fields
featureState: {
    key: 'featureState',
    storage,
    version: 1,
    blacklist: ['temporaryData'] // Persist everything except these
}
```

#### **Version Management**
- **Increment version** when state structure changes
- **Add migration logic** in `packages/state-core/src/migrations.ts` for complex changes
- **Test migrations** thoroughly before deployment

#### **Persistence Guidelines**
- **Use whitelist** for better control over what persists
- **Avoid persisting** large objects or arrays
- **Consider blacklist** for temporary data
- **Document** any complex state changes

### Theme System Updates

1. Add new theme constants in `packages/ui/src/theme.ts`
2. Update both light and dark themes
3. Add utility functions in `packages/ui/src/theme-utils.ts`
4. Update color definitions in `packages/utils/src/colors.ts`
5. Test theme switching functionality

### Testing Features

#### **Unit Tests**
```typescript
// Test Redux slices
describe('[Feature]Slices', () => {
    it('should handle action correctly', () => {
        const initialState = { /* initial state */ };
        const action = { type: '[FEATURE]_ACTION', payload: data };
        const newState = featureReducer(initialState, action);
        expect(newState).toEqual(expectedState);
    });
});
```

#### **Integration Tests**
```typescript
// Test feature components
describe('[Feature]View', () => {
    it('renders correctly', () => {
        render(<[Feature]View />);
        expect(screen.getByText('Expected Text')).toBeInTheDocument();
    });
});
```

### Troubleshooting

#### **Common Issues**
1. **Feature not registered**: Check `packages/features-registry/src/index.ts`
2. **Persistence not working**: Verify configuration in `packages/state-core/src/persistConfiguration.ts`
3. **TypeScript errors**: Ensure proper imports and type definitions
4. **Saga not running**: Verify saga registration and action dispatching

#### **Debug Tips**
- Use Redux DevTools to inspect state changes
- Add console.log statements in sagas to track execution
- Check browser's Application tab for persisted data
- Verify selectors return expected data
