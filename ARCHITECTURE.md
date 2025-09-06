# Padmodaya Jain Calendar - Monorepo Architecture

## 📋 Overview

This is a **Solito-based monorepo** for a Jain Calendar application that supports both **React Native (Expo)** and **Next.js (Web)** platforms. The architecture follows a **shared codebase approach** with platform-specific optimizations.

## 🏗️ Monorepo Structure

```
starterProject/
├── apps/                    # Platform-specific applications
│   ├── expo/               # React Native (Expo) app
│   └── next/               # Next.js web app
├── packages/               # Shared packages
│   ├── app/                # Core app configuration & providers
│   ├── navigation/         # Navigation logic & screens
│   ├── state/              # Redux state management
│   ├── ui/                 # UI components & theming
│   ├── utils/              # Utility functions & helpers
│   └── firebase/           # Firebase configuration
├── package.json            # Root package configuration
├── turbo.json             # Turborepo configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
└── .prettierrc            # Prettier configuration
```

## 🎯 Core Technologies

- **Monorepo Management**: Yarn Workspaces + Turborepo
- **Cross-Platform**: Solito (React Native + Next.js)
- **State Management**: Redux Toolkit + Redux Saga + Redux Persist
- **Navigation**: React Navigation v7
- **Styling**: React Native StyleSheet + CSS (web)
- **TypeScript**: Strict mode with path mapping
- **Code Quality**: ESLint + Prettier
- **Mobile**: Expo SDK 53
- **Web**: Next.js 15

## 📦 Package Architecture

### 1. **`packages/app`** - Core Application Layer
**Purpose**: Main application configuration and provider setup

**Key Responsibilities**:
- Application providers (Redux, Navigation, SafeArea)
- Cross-platform app initialization
- Solito integration for web/mobile compatibility

**Dependencies**:
- `@react-navigation/native` - Navigation core
- `react-redux` - State management
- `redux-persist` - State persistence
- `solito` - Cross-platform routing

**Key Files**:
- `provider/index.tsx` - Main provider wrapper
- `provider/navigation/` - Navigation provider setup
- `provider/safe-area/` - Safe area handling

### 2. **`packages/navigation`** - Navigation & Screens
**Purpose**: Application navigation structure and screen components

**Key Responsibilities**:
- Navigation stack configuration
- Screen definitions and routing
- Tab navigation setup
- Screen components (DayView, MonthView, etc.)

**Dependencies**:
- `@react-navigation/stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/native-stack` - Native stack

**Key Files**:
- `navigators.tsx` - Main navigation configuration
- `screens.tsx` - Screen definitions
- `components/` - Screen components
- `types.ts` - Navigation type definitions

**Navigation Structure**:
```
RootStack
├── Tab (Bottom Tabs)
│   ├── Day View
│   ├── Month View
│   └── Other View
├── Modal Screens
│   ├── Settings
│   └── Select Location
└── Stack Screens
    ├── Tithi View
    ├── Jain Parv
    ├── Chogadiya
    └── [Various Jain Calendar Views]
```

### 3. **`packages/state`** - State Management
**Purpose**: Global state management using Redux ecosystem

**Key Responsibilities**:
- Redux store configuration
- State slices (app, view)
- Redux Saga for side effects
- State persistence with migrations

**Dependencies**:
- `@reduxjs/toolkit` - Modern Redux
- `redux-saga` - Side effect management
- `redux-persist` - State persistence

**Key Files**:
- `store.ts` - Store configuration
- `slices/` - Redux slices
- `sagas/` - Redux sagas
- `migrations.ts` - State migration logic

**State Structure**:
```typescript
RootState
├── appState     // App configuration, theme, language
└── viewState    // UI state, navigation state
```

### 4. **`packages/ui`** - UI Components & Theming
**Purpose**: Shared UI components and theming system

**Key Responsibilities**:
- Theme definitions (light/dark)
- Reusable UI components
- Icon system (FontIcon)
- Calendar components

**Dependencies**:
- `react-native-vector-icons` - Icon library
- `react-native-calendar-strip` - Calendar component
- `react-icomoon` - Custom icon system

**Key Files**:
- `theme.ts` - Theme definitions
- `FontIcon/` - Icon component system
- `theme-utils.ts` - Theme utilities

**Theme System**:
```typescript
// Theme types
TYPE_SECTION, TYPE_CARD, TYPE_TEXT, TYPE_BUTTON, etc.

// Themes
PDLightTheme  // Light theme
PDDarkTheme   // Dark theme
```

### 5. **`packages/utils`** - Utilities & Helpers
**Purpose**: Shared utility functions and platform-specific helpers

**Key Responsibilities**:
- Platform detection (web/mobile)
- Device information
- Localization (English/Hindi)
- Storage utilities
- Permission management

**Dependencies**:
- `react-native-device-info` - Device information
- `react-native-permissions` - Permission handling
- `moment-timezone` - Date/time utilities
- `react-localization` - Internationalization

**Key Files**:
- `platform.ts` - Platform detection
- `device.ts` - Device utilities
- `language.ts` - Localization
- `storage.ts` - Storage utilities
- `colors.ts` - Color definitions

### 6. **`packages/firebase`** - Firebase Integration
**Purpose**: Firebase services configuration and integration

**Key Responsibilities**:
- Firebase app initialization
- Analytics tracking
- Crashlytics reporting
- Push notifications
- Remote config

**Dependencies**:
- `@react-native-firebase/app` - Core Firebase
- `@react-native-firebase/analytics` - Analytics
- `@react-native-firebase/crashlytics` - Crash reporting
- `@react-native-firebase/messaging` - Push notifications

## 🚀 Applications

### **`apps/expo`** - React Native Mobile App
**Platform**: iOS & Android via Expo

**Key Features**:
- Native mobile experience
- Platform-specific optimizations
- Native modules integration
- App store deployment ready

**Entry Point**: `App.tsx`
```typescript
<Provider>
    <RootStackScreen />
</Provider>
```

### **`apps/next`** - Next.js Web App
**Platform**: Web browsers

**Key Features**:
- Server-side rendering (SSR)
- Static site generation (SSG)
- Web-optimized performance
- SEO-friendly

**Entry Point**: `app/layout.tsx` + `app/page.tsx`
```typescript
<StylesProvider>
    <Suspense fallback={<LoadingView />}>
        <DayView />
    </Suspense>
</StylesProvider>
```

## 🔧 Development Workflow

### **Scripts Available**:
```bash
# Development
yarn native    # Start Expo development server
yarn web       # Start Next.js development server
yarn android   # Run on Android
yarn ios       # Run on iOS

# Code Quality
yarn lint      # Run ESLint
yarn format    # Format code with Prettier
yarn format:check  # Check formatting

# Build
yarn build     # Build all apps (via Turborepo)
```

### **Path Mapping** (TypeScript):
```json
{
  "app/*": ["../../packages/app/*"],
  "navigation/*": ["../../packages/navigation/*"],
  "state/*": ["../../packages/state/*"],
  "ui/*": ["../../packages/ui/*"],
  "utils/*": ["../../packages/utils/*"],
  "firebase-config/*": ["../../packages/firebase/*"]
}
```

## 🎨 Design Patterns

### **1. Provider Pattern**
- Centralized provider setup in `packages/app`
- Redux, Navigation, and SafeArea providers
- Platform-specific provider implementations

### **2. Feature-Based Organization**
- Each package represents a feature domain
- Clear separation of concerns
- Reusable across platforms

### **3. Cross-Platform Compatibility**
- Solito for navigation compatibility
- Platform-specific implementations when needed
- Shared business logic and UI components

### **4. State Management Pattern**
- Redux Toolkit for state management
- Redux Saga for side effects
- Redux Persist for state persistence
- Type-safe state with TypeScript

## 🔄 Data Flow

```
User Interaction
    ↓
Screen Component (navigation package)
    ↓
Redux Action (state package)
    ↓
Redux Saga (side effects)
    ↓
API/Storage (utils/firebase packages)
    ↓
State Update
    ↓
UI Re-render
```

## 🛠️ Build & Deployment

### **Turborepo Configuration**:
- Optimized build caching
- Parallel task execution
- Dependency-aware builds

### **Platform-Specific Builds**:
- **Expo**: `expo build` for mobile app stores
- **Next.js**: `next build` for web deployment

## 📱 Application Features

Based on the navigation structure, this Jain Calendar app includes:

- **Calendar Views**: Day, Month, Year views
- **Jain Events**: Tithi, Jain Parv, Chogadiya
- **Audio Content**: Pachkkan Audio, Manglik Audio
- **Settings**: Theme, location selection
- **Developer Info**: App developer, sponsors
- **Localization**: English/Hindi support

## 🔍 Key Benefits of This Architecture

1. **Code Reusability**: Shared business logic across platforms
2. **Type Safety**: Full TypeScript support with strict mode
3. **Performance**: Optimized builds with Turborepo
4. **Maintainability**: Clear package separation
5. **Scalability**: Easy to add new features or platforms
6. **Developer Experience**: Hot reload, linting, formatting
7. **Cross-Platform**: Single codebase for web and mobile

## 🚨 Important Notes

- **Tree Shaking**: The `packages/app/index.ts` is intentionally blank to prevent Next.js tree shaking issues
- **Platform Detection**: Use `utils/src/platform` for platform-specific code
- **State Persistence**: Redux state is persisted with migration support
- **Navigation**: Uses React Navigation v7 with type-safe navigation
- **Theming**: Supports light/dark themes with consistent color system

This architecture provides a solid foundation for a cross-platform Jain Calendar application with excellent developer experience and maintainability.
