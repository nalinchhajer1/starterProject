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
   - Import directly from specific Redux files (no index.ts needed)

4. **Add Documentation**:
   - Create comprehensive `README.md` with product requirements
   - Document all features, technical requirements, and integration points

5. **Update Navigation**:
   - Add to navigation types in `packages/navigation/src/types.ts`
   - Update navigation configuration in `packages/navigation/src/navigators.tsx`
   - Import directly from component files (no index.ts needed)

6. **Integration**:
   - Import directly from component files in navigation
   - Add to main Redux store in `packages/state/src/slices.ts` if needed
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
6. **Global State**: Add to main store in `packages/state/src/slices.ts` if needed
7. **Redux Saga**: Add side effects if needed
8. **Persistence**: Implement persistence if needed
9. **Migration**: Add migration logic for state changes
10. **Imports**: Import directly from specific Redux files (no index.ts needed)

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

### Theme System Updates

1. Add new theme constants in `packages/ui/src/theme.ts`
2. Update both light and dark themes
3. Add utility functions in `packages/ui/src/theme-utils.ts`
4. Update color definitions in `packages/utils/src/colors.ts`
5. Test theme switching functionality
