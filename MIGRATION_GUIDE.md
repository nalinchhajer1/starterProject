# Migration Guide: Yarn + Turborepo → pnpm + Nx

This guide outlines the migration from Yarn Workspaces + Turborepo to pnpm Workspaces + Nx for the Padmodaya Jain Calendar monorepo.

## 🚀 Migration Steps

### 1. Install pnpm and Nx

```bash
# Install pnpm globally
npm install -g pnpm

# Install Nx globally (optional, for CLI usage)
npm install -g nx
```

### 2. Remove Old Files

```bash
# Remove old lock file and node_modules
rm -rf yarn.lock
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules

# Remove old turbo configuration
rm turbo.json
```

### 3. Install Dependencies

```bash
# Install all dependencies with pnpm
pnpm install
```

### 4. Verify Installation

```bash
# Check that all projects are recognized
nx show projects

# Run a test build
pnpm build

# Start development servers
pnpm native  # Expo app
pnpm web     # Next.js app
```

## 📋 Key Changes

### Package Manager

- **Before**: `yarn` with `yarn.lock`
- **After**: `pnpm` with `pnpm-lock.yaml`

### Workspace Configuration

- **Before**: `package.json` workspaces + `turbo.json`
- **After**: `pnpm-workspace.yaml` + `nx.json`

### Dependency References

- **Before**: `"package-name": "*"`
- **After**: `"package-name": "workspace:*"`

### Build System

- **Before**: Turborepo with `turbo` commands
- **After**: Nx with `nx` commands

## 🎯 New Commands

### Development

```bash
pnpm native    # Start Expo development server
pnpm web       # Start Next.js development server
pnpm android   # Run on Android
pnpm ios       # Run on iOS
```

### Building

```bash
pnpm build         # Build all projects
pnpm build:expo    # Build Expo app only
pnpm build:next    # Build Next.js app only
```

### Code Quality

```bash
pnpm lint      # Lint all projects
pnpm lint:fix  # Lint with auto-fix
pnpm test      # Test all projects
```

### Nx Specific

```bash
pnpm graph     # Show dependency graph
pnpm reset     # Reset Nx cache
nx show projects  # List all projects
nx affected:build # Build affected projects
```

## 🔧 Project Structure

### Apps

- `apps/expo/` - React Native (Expo) mobile app
- `apps/next/` - Next.js web application

### Packages

- `packages/app/` - Core app configuration & providers
- `packages/navigation/` - Navigation logic & screens
- `packages/features/` - Feature-based components & Redux
- `packages/state/` - Redux state management
- `packages/ui/` - UI components & theming
- `packages/utils/` - Utility functions & helpers
- `packages/firebase/` - Firebase configuration

## 📦 Native Dependencies

The Expo app (`apps/expo`) includes all necessary native dependencies:

- **React Native**: 0.79.5
- **Expo SDK**: 53.0.0
- **Navigation**: React Navigation v7
- **State Management**: Redux Toolkit + Redux Saga
- **Native Modules**:
    - AsyncStorage
    - Geolocation
    - Vector Icons
    - Track Player
    - In-App Review
    - And more...

## 🚨 Important Notes

1. **Native Dependencies**: All React Native specific dependencies are properly configured in `apps/expo/package.json`

2. **Workspace References**: All internal package dependencies now use `workspace:*` protocol

3. **Nx Project Configuration**: Each app and package has a `project.json` file for Nx configuration

4. **TypeScript**: All packages have proper TypeScript configuration with `tsconfig.lib.json`

5. **Testing**: Jest configuration is set up for all packages

## 🔍 Troubleshooting

### Common Issues

1. **Node Modules Issues**

    ```bash
    pnpm install --frozen-lockfile
    ```

2. **Cache Issues**

    ```bash
    pnpm reset
    nx reset
    ```

3. **Build Issues**

    ```bash
    nx build --verbose
    ```

4. **Dependency Issues**
    ```bash
    pnpm install --force
    ```

### Verification Commands

```bash
# Check workspace structure
pnpm list --depth=0

# Verify Nx projects
nx show projects

# Check build status
nx run-many --target=build --all

# Verify linting
nx run-many --target=lint --all
```

## 📚 Additional Resources

- [pnpm Documentation](https://pnpm.io/)
- [Nx Documentation](https://nx.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

## ✅ Migration Checklist

- [ ] Install pnpm and Nx
- [ ] Remove old files (yarn.lock, turbo.json, node_modules)
- [ ] Run `pnpm install`
- [ ] Verify all projects are recognized: `nx show projects`
- [ ] Test builds: `pnpm build`
- [ ] Test development servers: `pnpm native` and `pnpm web`
- [ ] Verify native dependencies in Expo app
- [ ] Update CI/CD pipelines if applicable
- [ ] Update team documentation
- [ ] Train team on new commands

The migration is complete when all projects build successfully and development servers start without errors.

