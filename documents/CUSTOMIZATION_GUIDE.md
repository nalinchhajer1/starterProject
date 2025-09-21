# 🎨 Customization Guide

This guide provides detailed instructions for customizing the Starter Project template for your specific needs.

## 📋 Customization Checklist

### 1. **Project Identity** ⭐ **CRITICAL**

#### Root Package Configuration
**File:** `package.json`
```json
{
  "name": "your-project-name",           // Change from "starter-project"
  "private": true,
  "packageManager": "pnpm@9.0.0"
}
```

#### Expo App Configuration
**File:** `apps/expo/package.json`
```json
{
  "name": "your-expo-app-name",         // Change from "expo-app"
  "version": "1.0.0"
}
```

**File:** `apps/expo/app.json`
```json
{
  "expo": {
    "name": "Your App Name",            // Change from "solito-blank"
    "slug": "your-app-slug",           // Change from "solito-blank"
    "version": "1.0.0",
    "scheme": "yourapp",                // Change from "solito-blank"
    "platforms": ["ios", "android"],
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"  // Change from "com.solito.blank"
    },
    "android": {
      "package": "com.yourcompany.yourapp"          // Change from "com.solito.blank"
    }
  }
}
```

#### Next.js App Configuration
**File:** `apps/next/package.json`
```json
{
  "name": "your-next-app-name",         // Change from "next-app"
  "version": "0.1.0"
}
```

### 2. **Navigation Structure** ⭐ **CRITICAL**

#### Update Screen Definitions
**File:** `packages/navigation/src/screens.tsx`
```typescript
// Replace default screens with your app's screens
export const screens = {
  // Remove these default screens:
  // PageOne: 'PageOne',
  // PageTwo: 'PageTwo', 
  // Other: 'Other',
  
  // Add your custom screens:
  Home: 'Home',
  Profile: 'Profile',
  Settings: 'Settings',
  // ... your screens
}
```

#### Update Navigation Types
**File:** `packages/navigation/src/types.ts`
```typescript
// Update RootStackParamList with your screens
export type RootStackParamList = {
  // Remove default screens and add your screens
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
  // ... your screen types
}

// Update TabParamList
export type TabParamList = {
  // Replace default tabs with your tabs
  HomeTab: undefined;
  ProfileTab: undefined;
  SettingsTab: undefined;
}
```

#### Update Navigation Configuration
**File:** `packages/navigation/src/navigators.tsx`
```typescript
// Update tab navigation structure
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator>
      {/* Replace default tabs with your tabs */}
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

#### Update Screen Components
**File:** `packages/navigation/src/components.tsx`
```typescript
// Remove default component exports and add your components
export { HomeScreen } from './screens/HomeScreen';
export { ProfileScreen } from './screens/ProfileScreen';
export { SettingsScreen } from './screens/SettingsScreen';
```

### 3. **Features Package** ⭐ **CRITICAL**

#### Current Simplified Structure
The project now has a minimal structure with only essential features:
- `feature-app/` - Core app functionality (keep this)
- `feature-pageone/` - Example feature (replace with your features)
- `feature-loading/` - Loading component (keep this)

#### Remove Example Features
```bash
# Remove the example feature (keep feature-app and feature-loading):
rm -rf packages/features/feature-pageone
```

#### Create Your Features
```bash
# Create your custom features
mkdir -p packages/features/feature-home/View
mkdir -p packages/features/feature-home/redux
mkdir -p packages/features/feature-profile/View
mkdir -p packages/features/feature-profile/redux
```

#### Feature Structure Template
Each feature should follow this structure:
```
feature-yourname/
├── View/
│   ├── YourComponent.tsx
│   ├── YourComponent.styles.ts
│   └── index.ts
├── redux/
│   ├── YourActions.ts
│   ├── YourSlices.ts
│   ├── YourSelector.ts
│   ├── YourTypes.ts
│   └── index.ts
└── README.md
```

#### Update Features Index
**File:** `packages/features/index.ts`
```typescript
// Export your custom features
export * from './feature-home';
export * from './feature-profile';
export * from './feature-settings';

// Keep core features (these are essential)
export * from './feature-app';
export * from './feature-loading';
```

### 4. **State Management** ⭐ **CRITICAL**

#### Update Global State Slices
**File:** `packages/state/src/slices.ts`
```typescript
// The current simplified structure only has appState
// Add your custom state slices here
import { combineReducers } from '@reduxjs/toolkit';
import AppSlices from 'features/feature-app/redux/AppSlices';
// Import your custom slices
import HomeSlices from 'features/feature-home/redux/HomeSlices';
import ProfileSlices from 'features/feature-profile/redux/ProfileSlices';

const rootReducer = combineReducers({
    appState: AppSlices,
    // Add your custom state slices
    homeState: HomeSlices,
    profileState: ProfileSlices,
});

export default rootReducer;
```

#### Update Store Configuration
**File:** `packages/state/src/store.ts`
```typescript
// The store is already configured with the simplified structure
// Add your custom reducers to the store configuration
export const store = configureStore({
  reducer: {
    appState: AppSlices,
    // Add your custom reducers
    home: homeSlice.reducer,
    profile: profileSlice.reducer,
  },
  // ... middleware configuration
});
```

### 5. **UI Components & Theme** ⭐ **IMPORTANT**

#### Update Theme
**File:** `packages/ui/src/theme.ts`
```typescript
// Replace default theme with your app's design system
export const YourLightTheme = {
  colors: {
    primary: '#your-primary-color',
    secondary: '#your-secondary-color',
    background: '#your-background-color',
    // ... your color palette
  },
  typography: {
    // ... your typography system
  },
  spacing: {
    // ... your spacing system
  }
};
```

#### Update Icon System
**File:** `packages/ui/src/FontIcon/`
- Replace default icons with your app's icon set
- Update icon mappings
- Add your custom icons

#### Update UI Components
**File:** `packages/ui/src/`
- Replace default components with your design system
- Add your custom components
- Update component exports

### 6. **Firebase Configuration** ⚠️ **OPTIONAL**

#### Update Firebase Config
**File:** `packages/firebase/src/config.ts`
```typescript
// Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

#### Update App Identifiers
Update bundle identifiers in:
- `apps/expo/app.json`
- Firebase project settings
- Analytics configuration
- Crashlytics configuration

### 7. **Utilities & Helpers** ⚠️ **OPTIONAL**

#### Update Localization
**File:** `packages/utils/src/language.ts`
```typescript
// Replace default languages with your supported languages
export const supportedLanguages = ['en', 'es', 'fr']; // Your languages
```

#### Update Color System
**File:** `packages/utils/src/colors.ts`
```typescript
// Replace default colors with your app's color system
export const colors = {
  primary: '#your-primary',
  secondary: '#your-secondary',
  // ... your color definitions
};
```

## 🧪 Testing Your Customizations

### 1. **Run Linting**
```bash
pnpm lint
```

### 2. **Run Tests**
```bash
pnpm test
```

### 3. **Start Development Servers**
```bash
# Mobile development
pnpm native

# Web development  
pnpm web
```

### 4. **Build Projects**
```bash
# Build Expo app
pnpm build:expo

# Build Next.js app
pnpm build:next
```

## 🚨 Common Issues & Solutions

### 1. **Navigation Errors**
**Problem:** Screen not found errors
**Solution:** 
- Update all screen references in navigation files
- Ensure screen components are properly exported
- Check screen names match exactly

### 2. **State Management Errors**
**Problem:** Redux state errors
**Solution:**
- Update store configuration with your slices
- Check feature Redux exports
- Verify state interfaces match

### 3. **Build Errors**
**Problem:** Build failures
**Solution:**
- Clear Nx cache: `pnpm nx reset`
- Reinstall dependencies: `pnpm install --force`
- Check for missing dependencies

### 4. **TypeScript Errors**
**Problem:** Type errors
**Solution:**
- Update type definitions
- Check import/export statements
- Verify path mappings in tsconfig.json

## 📚 Best Practices

### 1. **Feature Development**
- Keep features self-contained
- Follow the established Redux pattern
- Document each feature thoroughly
- Test features in isolation

### 2. **State Management**
- Use Redux Toolkit for modern Redux
- Keep state normalized
- Use selectors for computed state
- Implement proper error handling

### 3. **Navigation**
- Use type-safe navigation
- Keep navigation structure simple
- Implement proper deep linking
- Test navigation on both platforms

### 4. **UI Components**
- Create reusable components
- Follow design system principles
- Implement proper theming
- Test components across platforms

## 🎯 Next Steps

1. **Design System**: Implement your app's design system
2. **API Integration**: Add your backend integration
3. **Authentication**: Implement user authentication
4. **Testing**: Add comprehensive test coverage
5. **Deployment**: Set up CI/CD pipelines
6. **Documentation**: Document your app's architecture

---

**Happy customizing! 🎉** Your app is now ready for development.
