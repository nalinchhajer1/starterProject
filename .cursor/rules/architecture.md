# Architecture & File Structure

## 📁 File Location Patterns

### Apps (`apps/`)

- `apps/expo/App.tsx`: Main mobile app entry point
- `apps/next/app/page.tsx`: Web app home page
- `apps/next/app/layout.tsx`: Web app layout wrapper

### Packages (`packages/`)

#### App Package (`packages/app/`)
- `provider/index.tsx`: Main provider wrapper
- `provider/navigation/`: Navigation provider setup
- `provider/safe-area/`: Safe area handling

#### Navigation Package (`packages/navigation/`)
- `navigators.tsx`: Main navigation configuration
- `screens.tsx`: Screen definitions
- `components.tsx`: Screen components
- `types.ts`: Navigation type definitions

#### Features Package (`packages/features/`)
- `feature-app/`: App-level features and Redux state
- `feature-view/`: View-level features and Redux state
- Direct imports from specific feature files (no index.ts needed)

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

#### State Package (`packages/state/`)
- `store.ts`: Redux store configuration
- `slices/`: Redux slices (appSlice, viewSlice)
- `sagas/`: Redux sagas for side effects
- `actions/`: Redux actions and selectors

#### UI Package (`packages/ui/`)
- `theme.ts`: Theme definitions (PDLightTheme, PDDarkTheme)
- `FontIcon/`: Icon component system
- `theme-utils.ts`: Theme utility functions

#### Utils Package (`packages/utils/`)
- `platform.ts`: Platform detection utilities
- `device.ts`: Device information utilities
- `language.ts`: Localization utilities
- `colors.ts`: Color definitions
- `storage.ts`: Storage utilities

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
