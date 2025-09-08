# Development Guidelines

## 🛠️ Development Guidelines

### Code Style & Architecture

- **Cross-Platform First**: Write code that works on both mobile and web
- **TypeScript**: Strict typing with proper interfaces and type definitions
- **Functional Programming**: Prefer pure functions and immutability
- **Package Separation**: Clear boundaries between packages with minimal coupling
- **Error Handling**: Comprehensive error boundaries and user-friendly messages
- **Performance**: Optimize for mobile performance and web loading

### UI/UX Standards

- **React Native StyleSheet**: Use StyleSheet.create() for mobile styling
- **CSS**: Use CSS for web-specific styling in Next.js
- **Theme System**: Use the centralized theme system (PDLightTheme/PDDarkTheme)
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Loading States**: Proper loading indicators for async operations

### Common Patterns

- **Navigation**: React Navigation v7 with type-safe navigation
- **State Management**: Redux Toolkit slices with Redux Saga for side effects
- **Forms**: Controlled components with proper validation
- **Modals**: Modal presentation for settings and location selection
- **Platform Detection**: Use `utils/src/platform` for platform-specific code
- **Localization**: Use `utils/src/language` for multi-language support
- **Imports**: Use direct imports from component files (no index.ts files for View components)

## ⚡ Common Commands

### Development Commands

```bash
# Start development servers
pnpm native    # Start Expo development server
pnpm web       # Start Next.js development server
pnpm android   # Run on Android device/emulator
pnpm ios       # Run on iOS device/simulator

# Code Quality
pnpm lint      # Run ESLint across all packages
pnpm lint:fix  # Run ESLint with auto-fix
pnpm format    # Format code with Prettier
pnpm format:check  # Check formatting without changes

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

### Package-Specific Commands

```bash
# Navigation package
nx build navigation
nx test navigation
nx lint navigation

# State package
nx build state
nx test state
nx lint state

# UI package
nx build ui
nx test ui
nx lint ui

# Utils package
nx build utils
nx test utils
nx lint utils

# Or use Nx affected commands
nx affected:build
nx affected:test
nx affected:lint
```

## 🚀 Development Workflow

### Package Development

- Each package should be independently buildable and testable
- Use proper peer dependencies to avoid version conflicts
- Follow the established package structure and naming conventions
- Add proper TypeScript exports and type definitions

### Cross-Platform Testing

- Test changes on both mobile (Expo) and web (Next.js) platforms
- Use platform detection utilities for platform-specific code
- Ensure consistent behavior across platforms
- Test theme switching and localization

### State Management

- Use Redux Toolkit for state management
- Implement Redux Saga for side effects
- Use Redux Persist for state persistence
- Add proper migration logic for state changes
- Keep state normalized and minimal
