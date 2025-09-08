# Available Commands

## ⚡️ Available Commands

### Development
```bash
# Start development servers
pnpm native    # Start Expo development server
pnpm web       # Start Next.js development server
pnpm android   # Run on Android device/emulator
pnpm ios       # Run on iOS device/simulator
```

### Building
```bash
# Build all projects
pnpm build         # Build all projects
pnpm build:expo    # Build Expo app only
pnpm build:next    # Build Next.js app only

# Build specific packages
pnpm nx build features
pnpm nx build state
pnpm nx build ui
```

### Code Quality
```bash
# Linting and formatting
pnpm lint          # Run ESLint across all projects
pnpm lint:fix      # Run ESLint with auto-fix
pnpm format        # Format code with Prettier
pnpm format:check  # Check formatting without changes

# Lint specific packages
pnpm nx lint features
pnpm nx lint state
pnpm nx lint next-app
```

### Testing
```bash
# Run tests
pnpm test          # Test all projects
pnpm nx test features
pnpm nx test state
```

### Nx Specific Commands
```bash
# Project management
pnpm nx show projects           # List all projects
pnpm nx graph                  # Show dependency graph
pnpm nx reset                  # Reset Nx cache

# Affected commands (build only changed projects)
pnpm nx affected:build         # Build affected projects
pnpm nx affected:test          # Test affected projects
pnpm nx affected:lint          # Lint affected projects

# Run commands for specific projects
pnpm nx run features:build
pnpm nx run state:test
pnpm nx run next-app:lint
```

### Package-Specific Commands
```bash
# Navigation package
pnpm nx build navigation
pnpm nx test navigation
pnpm nx lint navigation

# State package
pnpm nx build state
pnpm nx test state
pnpm nx lint state

# UI package
pnpm nx build ui
pnpm nx test ui
pnpm nx lint ui

# Utils package
pnpm nx build utils
pnpm nx test utils
pnpm nx lint utils
```

## 🔧 Troubleshooting

### Common Issues

1. **Node Modules Issues**
   ```bash
   pnpm install --frozen-lockfile
   ```

2. **Cache Issues**
   ```bash
   pnpm reset
   pnpm nx reset
   ```

3. **Build Issues**
   ```bash
   pnpm nx build --verbose
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
pnpm nx show projects

# Check build status
pnpm nx run-many --target=build --all

# Verify linting
pnpm nx run-many --target=lint --all
```

## 🆕 Adding Dependencies

### Pure JavaScript Dependencies

For JavaScript-only dependencies used across platforms, install in the appropriate package:

```bash
# For shared utilities (used across platforms)
cd packages/utils
pnpm add date-fns
cd ../..

# For UI components
cd packages/ui
pnpm add react-native-vector-icons
cd ../..

# Install all dependencies
pnpm install
```

### Native Dependencies

For libraries with native code, install in `apps/expo`:

```bash
cd apps/expo
pnpm add react-native-reanimated
cd ../..

# Install all dependencies
pnpm install
```

### Workspace Dependencies

For internal package dependencies, use workspace protocol:

```bash
# In package.json
"dependencies": {
  "utils": "workspace:*",
  "ui": "workspace:*"
}
```

**Important**: When installing the same library in multiple packages, ensure exact version matching to avoid conflicts.
