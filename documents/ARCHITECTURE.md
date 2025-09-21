# Starter Project - Monorepo Architecture

## 📋 Overview

This is a **Solito-based monorepo** for a cross-platform starter application that supports both **React Native (Expo)** and **Next.js (Web)** platforms. The architecture follows a **shared codebase approach** with platform-specific optimizations and a three-tab navigation structure.

## 🏗️ Monorepo Structure

```
starterProject/
├── apps/                    # Platform-specific applications
│   ├── expo/               # React Native (Expo) app
│   └── next/               # Next.js web app
├── packages/               # Shared packages
│   ├── app/                # Core app configuration & providers
│   ├── navigation/         # Navigation logic & screens
│   ├── features/           # Feature-based components & Redux
│   ├── state/              # Redux state management
│   ├── ui/                 # UI components & theming
│   ├── utils/              # Utility functions & helpers
│   └── firebase/           # Firebase configuration
├── package.json            # Root package configuration
├── nx.json                 # Nx configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.js       # ESLint configuration
└── .prettierrc            # Prettier configuration
```

## 🎯 Core Technologies

- **Monorepo Management**: pnpm Workspaces + Nx
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

### 2. **`packages/navigation`** - Navigation & Screen Components

**Purpose**: Application navigation structure and screen components

**Key Responsibilities**:

- Navigation stack configuration
- Screen definitions and routing
- Tab navigation setup
- Screen components without Redux integration

**Dependencies**:

- `@react-navigation/stack` - Stack navigation
- `@react-navigation/bottom-tabs` - Tab navigation
- `@react-navigation/native-stack` - Native stack

**Key Files**:

- `navigators.tsx` - Main navigation configuration
- `screens.tsx` - Screen definitions
- `components.tsx` - Screen components
- `types.ts` - Navigation type definitions

### 3. **`packages/features`** - Feature-Based Components & Redux

**Purpose**: Feature-based components with isolated Redux state management

**Key Responsibilities**:

- Feature-specific components and views
- Feature-specific Redux state (actions, slices, selectors, types)
- Feature documentation and requirements
- Cross-platform feature implementation

**Dependencies**:

- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React Redux integration

**Key Files**:

- `feature-app/` - App-level features and state
- `feature-view/` - View-level features and state
- `index.ts` - Feature exports

**Feature Structure**:

```
features/
├── feature-app/
│   ├── View/           # AppView component and styles
│   ├── redux/          # App-specific Redux (Actions, Slices, Selectors, Types)
│   └── README.md       # Feature requirements and documentation
├── feature-view/
│   ├── View/           # ViewView component and styles
│   ├── redux/          # View-specific Redux
│   └── README.md       # Feature requirements
└── [future-features]/
    ├── View/           # Feature component and styles
    ├── redux/          # Feature-specific Redux
    └── README.md       # Feature requirements
```

**Navigation Structure**:

```
RootStack
├── Tab (Bottom Tabs)
│   ├── PageOne View - First tab content
│   ├── PageTwo View - Second tab content
│   └── Other View - Third tab content
├── Modal Screens
│   ├── Settings - App configuration
│   └── Three View - Additional features
└── Stack Screens
    └── [Future Features]
        ├── Additional Views
        ├── Feature Screens
        └── [Custom Views]
```

### 4. **`packages/state`** - State Management

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

### 5. **`packages/ui`** - UI Components & Theming

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
(TYPE_SECTION,
    TYPE_CARD,
    TYPE_TEXT,
    TYPE_BUTTON,
    // Themes
    etc.PDLightTheme); // Light theme
PDDarkTheme; // Dark theme
```

### 6. **`packages/utils`** - Utilities & Helpers

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

### 7. **`packages/firebase`** - Firebase Integration

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
        <PageOneView />
    </Suspense>
</StylesProvider>
```

## 🔧 Development Workflow

### **Scripts Available**:

```bash
# Development
pnpm native    # Start Expo development server
pnpm web       # Start Next.js development server
pnpm android   # Run on Android
pnpm ios       # Run on iOS

# Code Quality
pnpm lint      # Run ESLint across all projects
pnpm lint:fix  # Run ESLint with auto-fix
pnpm format    # Format code with Prettier
pnpm format:check  # Check formatting

# Build
pnpm build     # Build all apps (via Nx)
pnpm build:expo # Build Expo app only
pnpm build:next # Build Next.js app only

# Testing
pnpm test      # Run tests across all projects

# Nx specific
pnpm graph     # Show dependency graph
pnpm reset     # Reset Nx cache
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

### **3. Feature-Based Component Architecture**

- Each feature has its own folder with View and Redux subfolders
- Consistent naming convention: `feature-[name]/View/` and `feature-[name]/redux/`
- Redux files follow pattern: `[Feature]Actions.ts`, `[Feature]Slices.ts`, `[Feature]Selector.ts`, `[Feature]Types.ts`
- Each feature includes comprehensive README.md with product requirements

### **4. Redux Pattern Standards**

- **Traditional Action Creators**: Use function-based action creators, not RTK createAction
- **Action Type Constants**: Define action types in `[Feature]Types.ts` as const objects
- **State Interface Definition**: Define state interfaces directly in `[Feature]Slices.ts` files, not in Types files
- **extraReducers Pattern**: Use extraReducers in slices to handle traditional actions
- **Function-based Selectors**: Use function selectors with RootState typing
- **Mixed State Structure**: Support both appState and viewState in RootState
- **No RTK Actions Export**: Don't export slice actions when using traditional action creators

### **5. Cross-Platform Compatibility**

- Solito for navigation compatibility
- Platform-specific implementations when needed
- Shared business logic and UI components

### **6. State Management Pattern**

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

### **Nx Configuration**:

- Optimized build caching with distributed caching
- Parallel task execution
- Dependency-aware builds
- Project graph visualization
- Code generation and migration tools
- Advanced linting and testing capabilities

### **Platform-Specific Builds**:

- **Expo**: `expo build` for mobile app stores
- **Next.js**: `next build` for web deployment

## 📱 Application Features

Based on the navigation structure, this Starter Project includes:

- **Tab Navigation**: Three main tabs with PageOne, PageTwo, and Other views
- **Settings**: App configuration and preferences
- **Additional Views**: Three View for extended functionality
- **Localization**: English/Hindi support
- **Theme System**: Light/dark theme support
- **Cross-Platform**: Mobile and web compatibility

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
    - Export from `View/index.ts`

3. **Add Redux Structure** (Following existing pattern):
    - `redux/[Feature]Actions.ts` - Traditional action creators (function-based)
    - `redux/[Feature]Types.ts` - Action type constants only (no state interfaces)
    - `redux/[Feature]Slices.ts` - Redux slice with extraReducers for traditional actions + state interface definition
    - `redux/[Feature]Selector.ts` - Function-based selectors with RootState typing
    - Export all from `redux/index.ts`

4. **Add Documentation**:
    - Create comprehensive `README.md` with product requirements
    - Document all features, technical requirements, and integration points

5. **Update Navigation**:
    - Add to navigation types in `packages/navigation/src/types.ts`
    - Update navigation configuration in `packages/navigation/src/navigators.tsx`
    - Export from `packages/features/index.ts`

6. **Integration**:
    - Update `packages/navigation/src/components.tsx` to re-export new feature
    - Add to main Redux store in `packages/state/src/slices.ts` if needed
    - Test on both mobile and web platforms

### **Feature Naming Convention**

- Feature folders: `feature-[name]` (e.g., `feature-pageone`)
- Redux files: `[Feature][Type].ts` (e.g., `PageOneActions.ts`, `PageOneSlices.ts`)
- Components: `[FeatureName].tsx` (e.g., `PageOneView.tsx`)
- Styles: `[FeatureName].styles.ts` (e.g., `PageOneView.styles.ts`)

## 🔍 Key Benefits of This Architecture

1. **Code Reusability**: Shared business logic across platforms
2. **Type Safety**: Full TypeScript support with strict mode
3. **Performance**: Optimized builds with Nx
4. **Maintainability**: Clear package separation and feature-based organization
5. **Scalability**: Easy to add new features with consistent structure
6. **Developer Experience**: Hot reload, linting, formatting
7. **Cross-Platform**: Single codebase for web and mobile
8. **Feature Isolation**: Each feature is self-contained with its own Redux state
9. **Documentation**: Comprehensive README for each feature

## 🚨 Important Notes

- **Tree Shaking**: The `packages/app/index.ts` is intentionally blank to prevent Next.js tree shaking issues
- **Platform Detection**: Use `utils/src/platform` for platform-specific code
- **State Persistence**: Redux state is persisted with migration support
- **Navigation**: Uses React Navigation v7 with type-safe navigation
- **Theming**: Supports light/dark themes with consistent color system

This architecture provides a solid foundation for a cross-platform starter application with excellent developer experience and maintainability.
