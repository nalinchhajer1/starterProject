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
- **Centralized Architecture**: Features register themselves with the store automatically
- **Persistence**: Centralized persistence configuration in `state-core`
- **Forms**: Controlled components with proper validation
- **Modals**: Modal presentation for settings and location selection
- **Platform Detection**: Use `utils/src/platform` for platform-specific code
- **Localization**: Use `utils/src/language` for multi-language support
- **Imports**: Use direct imports from component files (no index.ts files for View components)

### Centralized Architecture

#### **Feature Registration**
- Features register themselves via `register.ts` files
- All features are registered in `packages/features-registry/src/index.ts`
- Persistence is configured centrally in `packages/state-core/src/persistConfiguration.ts`

#### **State Management Flow**
1. **Feature Development**: Create Redux slices, sagas, and selectors
2. **Registration**: Create `register.ts` to register reducer and saga
3. **Registry**: Add feature to `features-registry/src/index.ts`
4. **Persistence**: Configure in `state-core/src/persistConfiguration.ts`
5. **Integration**: Feature is automatically available across the app

#### **Benefits**
- **Automatic Setup**: Features register themselves without manual store configuration
- **Centralized Persistence**: All persistence rules in one place
- **Type Safety**: Full TypeScript support with proper typing
- **Performance**: Batch registration prevents unnecessary rebuilds
- **Maintainability**: Clear separation of concerns and easy feature management

## 📦 Adding New Packages/Modules

### Quick Reference for Creating New Modules

When creating a new package in this monorepo, follow these steps:

#### 1. **Generate the Package**
```bash
npx nx generate @nx/js:library \
  --directory=packages \
  --name=your-package-name \
  --bundler=tsc \
  --linter=eslint \
  --unitTestRunner=jest \
  --tags="type:lib,scope:shared" \
  --publishable=false \
  --buildable=true \
  --strict=true \
  --skipFormat=false \
  --skipPackageJson=false \
  --skipTsConfig=false \
  --setParserOptionsProject=false \
  --config=project \
  --minimal=false \
  --simpleName=false \
  --useProjectJson=true
```

#### 2. **Required Configuration Updates**

**Always update these files after generating a new package:**

1. **jest.config.js** - Add path mapping:
   ```javascript
   moduleNameMapper: {
     // ... existing mappings
     '^your-package-name/(.*)$': '<rootDir>/packages/your-package-name/$1'
   }
   ```

2. **jest.config.base.js** - Add path mapping:
   ```javascript
   moduleNameMapper: {
     // ... existing mappings
     '^your-package-name/(.*)$': '<rootDir>/packages/your-package-name/$1'
   }
   ```

3. **tsconfig.json** - Add path mapping:
   ```json
   {
     "compilerOptions": {
       "paths": {
         // ... existing paths
         "your-package-name/*": ["../../packages/your-package-name/*"]
       }
     }
   }
   ```

4. **packages/your-package-name/project.json** - Update paths and configuration
5. **packages/your-package-name/jest.config.js** - Create following the pattern
6. **packages/your-package-name/tsconfig.lib.json** - Update for React Native compatibility

#### 3. **Verification Commands**
```bash
pnpm nx test your-package-name    # Test the package
pnpm nx build your-package-name    # Build the package
pnpm nx lint your-package-name     # Lint the package
pnpm test                          # Run all tests
```

### Package Development Best Practices

1. **Follow existing patterns** in other packages
2. **Use consistent naming conventions**
3. **Include proper TypeScript types**
4. **Add comprehensive tests**
5. **Update documentation**

### Common Issues & Solutions

#### Package Creation Issues
- **Path mapping errors**: Ensure all config files are updated
- **TypeScript errors**: Use React Native types, not Node.js types
- **Jest errors**: Follow the base config pattern
- **Build errors**: Check tsconfig.lib.json configuration

#### Testing Issues
- **Module resolution**: Verify path mappings in jest configs
- **Type errors**: Check tsconfig.json paths
- **Import errors**: Ensure package exports are correct

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
