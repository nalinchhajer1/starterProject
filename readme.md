# Starter Project🕴

A comprehensive starter application built with Solito, supporting both React Native (Expo) and Next.js platforms.

## 🚀 Quick Start

```sh
# Clone the repository
git clone <repository-url>
cd starterProject

# Install dependencies
pnpm install

# Start development servers
pnpm native    # Start Expo development server
pnpm web       # Start Next.js development server
```

## 🎯 Using as a Template

This project is designed as a **starter template** for new cross-platform applications. Before starting development:

1. **Read the Setup Guide**: See `documents/SETUP_GUIDE.md` for step-by-step setup instructions
2. **Customize Project Identity**: Update app names, bundle identifiers, and configuration
3. **Replace Default Features**: Remove example features and add your own
4. **Update Navigation**: Customize the navigation structure for your app
5. **Configure State Management**: Set up Redux state for your application needs

**Important**: This template includes example features (PageOne, PageTwo, Other) that should be replaced with your actual application features.

### 🧹 Quick Cleanup

Use the provided cleanup script to remove default features:

```bash
# Run the cleanup script
./scripts/cleanup-defaults.sh
```

This interactive script will help you remove default features and prepare your project for customization.

## 🔦 About

This monorepo is a **Starter application** built with modern cross-platform technologies. It provides a comprehensive template with features like:

- **Tab Navigation**: Three main tabs with PageOne, PageTwo, and Other views
- **Cross-Platform**: Native mobile (iOS/Android) and web applications
- **Feature-Based Architecture**: Modular feature structure for easy development
- **State Management**: Redux-based state management with persistence
- **Multi-language Support**: English and Hindi localization
- **Modern Stack**: Latest React Native, Next.js, and development tools

The architecture follows a **feature-based approach** with shared business logic across platforms.

## 📦 Technology Stack

### Core Technologies
- **Monorepo Management**: pnpm Workspaces + Nx
- **Cross-Platform**: Solito (React Native + Next.js)
- **State Management**: Redux Toolkit + Redux Saga + Redux Persist
- **Navigation**: React Navigation v7
- **Styling**: React Native StyleSheet + CSS (web)
- **TypeScript**: Strict mode with path mapping
- **Code Quality**: ESLint + Prettier

### Platform Versions
- **Mobile**: Expo SDK 54 with React Native 0.81.4
- **Web**: Next.js 15 with React 19.1.1
- **Package Manager**: pnpm with workspace support
- **Build System**: Nx for optimized builds and caching

For more, see the [compatibility docs](https://solito.dev/compatibility).

## 🗂 Project Structure

```
starterProject/
├── apps/                    # Platform-specific applications
│   ├── expo/               # React Native (Expo) mobile app
│   └── next/               # Next.js web app
├── packages/               # Shared packages
│   ├── app/                # Core app configuration & providers
│   ├── navigation/         # Navigation logic & screens
│   ├── features/           # Feature-based components & Redux
│   ├── state/              # Redux state management
│   ├── ui/                 # UI components & theming
│   ├── utils/              # Utility functions & helpers
│   ├── firebase/           # Firebase configuration
│   └── types/              # Shared TypeScript types
├── package.json            # Root package configuration
├── nx.json                 # Nx configuration
├── tsconfig.json          # TypeScript configuration
└── eslint.config.js       # ESLint configuration
```

### Package Descriptions

- **`apps/expo`**: React Native mobile app with Expo SDK 53
- **`apps/next`**: Next.js web application with App Router
- **`packages/app`**: Core app configuration and provider setup
- **`packages/navigation`**: Navigation logic and screen components
- **`packages/features`**: Feature-based components with isolated Redux state
- **`packages/state`**: Global Redux state management
- **`packages/ui`**: Shared UI components and theming system
- **`packages/utils`**: Utility functions and platform-specific helpers
- **`packages/firebase`**: Firebase services configuration
- **`packages/types`**: Shared TypeScript type definitions

## 🏁 Development Commands

### Prerequisites
- **Node.js**: 18.x or higher
- **pnpm**: Install globally with `npm install -g pnpm`
- **Expo CLI**: Install globally with `npm install -g @expo/cli`

### Installation & Setup
```bash
# Install all dependencies
pnpm install

# Verify Nx projects are recognized
pnpm nx show projects
```

### Development Servers
```bash
# Start Next.js web development server
pnpm web

# Start Expo mobile development server
pnpm native

# Run on specific platforms
pnpm android    # Run on Android device/emulator
pnpm ios        # Run on iOS device/simulator
```

### Mobile Development Setup
```bash
# For Expo development:
# 1. Build a dev client onto your device or simulator
cd apps/expo
expo run:ios     # For iOS
expo run:android # For Android

# 2. After building the dev client, from the root:
pnpm native      # Runs expo start --dev-client
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

## 📦 Adding New Packages/Modules

### Creating a New Package

To add a new package to the monorepo, use the Nx generator:

```bash
# Generate a new TypeScript library
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

### Required Configuration Updates

After generating a new package, you must update these configuration files:

#### 1. **Jest Configuration**
Update both `jest.config.js` and `jest.config.base.js`:
```javascript
moduleNameMapper: {
  // ... existing mappings
  '^your-package-name/(.*)$': '<rootDir>/packages/your-package-name/$1'
}
```

#### 2. **TypeScript Configuration**
Update `tsconfig.json`:
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

#### 3. **Package Configuration**
Update the generated `packages/your-package-name/project.json`:
```json
{
  "name": "your-package-name",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/your-package-name/src",
  "projectType": "library",
  "tags": ["type:lib", "scope:shared"],
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/packages/your-package-name",
        "main": "packages/your-package-name/src/index.ts",
        "tsConfig": "packages/your-package-name/tsconfig.lib.json",
        "assets": ["packages/your-package-name/*.md"]
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "outputs": ["{options.outputFile}"],
      "options": {
        "lintFilePatterns": ["packages/your-package-name/**/*.{ts,tsx,js,jsx}"]
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "packages/your-package-name/jest.config.js",
        "passWithNoTests": true
      }
    }
  }
}
```

#### 4. **Jest Configuration for Package**
Create `packages/your-package-name/jest.config.js`:
```javascript
const baseConfig = require('../../jest.config');

module.exports = {
    ...baseConfig,
    displayName: 'your-package-name',
    rootDir: '../../',
    testMatch: ['<rootDir>/packages/your-package-name/**/?(*.)+(spec|test).[tj]s?(x)']
};
```

#### 5. **TypeScript Library Configuration**
Update `packages/your-package-name/tsconfig.lib.json`:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "declaration": true,
    "lib": ["es2015", "dom", "dom.iterable"],
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "baseUrl": ".",
    "paths": {
      "types": ["../../packages/types"]
    },
    "types": ["react"]
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["jest.config.ts", "**/*.spec.ts", "**/*.test.ts"]
}
```

### Verification Steps

After creating a new package, verify it works:

```bash
# Test the new package
pnpm nx test your-package-name

# Build the new package
pnpm nx build your-package-name

# Lint the new package
pnpm nx lint your-package-name

# Run all tests to ensure nothing is broken
pnpm test
```

### Example: Native Package Creation

See `tasksummary/added-new-module-using-nx.md` for a complete example of creating the `native` package.

### Cursor AI Assistant

For detailed development guidelines and module creation instructions, see the `.cursor/rules/` directory:
- **`.cursor/rules/development.md`** - Complete module creation guide and development patterns
- **`.cursor/rules/README.md`** - Overview of all available cursor rules

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

## 📚 Documentation

- **Setup Guide**: See `documents/SETUP_GUIDE.md` for getting started with your new project
- **Customization Guide**: See `documents/CUSTOMIZATION_GUIDE.md` for detailed customization instructions
- **Template Overview**: See `documents/TEMPLATE_README.md` for comprehensive template information
- **Architecture**: See `documents/ARCHITECTURE.md` for detailed monorepo architecture
- **Solito**: [Cross-platform React Native + Next.js](https://solito.dev/)
- **Expo**: [Mobile development documentation](https://docs.expo.dev/)
- **Next.js**: [Web development documentation](https://nextjs.org/docs)
- **Nx**: [Monorepo build system](https://nx.dev/)

## 🎙 About the creator

Follow Fernando Rojo on Twitter: [@FernandoTheRojo](https://twitter.com/fernandotherojo)

## 🧐 Why use Expo + Next.js?

This architecture provides several key benefits:

- **Code Reusability**: Share business logic and components across platforms
- **Type Safety**: Full TypeScript support with strict mode
- **Performance**: Optimized builds with Nx caching and parallel execution
- **Developer Experience**: Hot reload, linting, formatting, and comprehensive tooling
- **Scalability**: Easy to add new features with consistent structure
- **Cross-Platform**: Single codebase for web and mobile applications

See Fernando Rojo's talk about this topic at Next.js Conf 2021:

<a href="https://www.youtube.com/watch?v=0lnbdRweJtA"><img width="1332" alt="image" src="https://user-images.githubusercontent.com/13172299/157299915-b633e083-f271-48c6-a262-7b7eef765be5.png">
</a>
