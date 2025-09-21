# 🚀 Starter Project Setup Guide

This guide will help you set up your new project based on this starter template. Follow these steps to customize the project for your needs.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js**: 18.x or higher
- **pnpm**: Install globally with `npm install -g pnpm`
- **Expo CLI**: Install globally with `npm install -g @expo/cli`
- **Git**: For version control

## 🎯 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd your-project-name

# Install dependencies
pnpm install

# Verify everything is working
pnpm nx show projects
```

### 2. Initial Setup

```bash
# Start development servers to verify setup
pnpm native    # Start Expo development server
pnpm web       # Start Next.js development server
```

## 🔧 Customization Checklist

### Essential Customizations

#### 1. **Project Identity** ⭐ **REQUIRED**

**Files to update:**
- `package.json` (root)
- `apps/expo/package.json`
- `apps/next/package.json`
- `apps/expo/app.json`

**Changes needed:**
```json
// package.json (root)
{
  "name": "your-project-name",  // Change from "starter-project"
  "private": true
}

// apps/expo/package.json
{
  "name": "your-expo-app-name",  // Change from "expo-app"
  "version": "1.0.0"
}

// apps/next/package.json
{
  "name": "your-next-app-name",  // Change from "next-app"
  "version": "0.1.0"
}

// apps/expo/app.json
{
  "expo": {
    "name": "Your App Name",           // Change from "solito-blank"
    "slug": "your-app-slug",          // Change from "solito-blank"
    "scheme": "your-app-scheme",       // Change from "solito-blank"
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp"  // Change from "com.solito.blank"
    },
    "android": {
      "package": "com.yourcompany.yourapp"  // Change from "com.solito.blank"
    }
  }
}
```

#### 2. **App Configuration** ⭐ **REQUIRED**

**Files to update:**
- `apps/expo/app.json` - App metadata
- `apps/next/app/layout.tsx` - Web app metadata

**Key changes:**
- App name and display name
- Bundle identifier (iOS/Android)
- App scheme for deep linking
- App icons and splash screens

#### 3. **Navigation Structure** ⭐ **REQUIRED**

**Files to update:**
- `packages/navigation/src/screens.tsx`
- `packages/navigation/src/navigators.tsx`
- `packages/navigation/src/types.ts`

**Default structure to replace:**
- PageOne, PageTwo, Other views → Your custom screens
- Tab navigation structure → Your app's navigation
- Screen names and routes → Your app's routes

#### 4. **Features Package** ⭐ **REQUIRED**

**Current simplified structure:**
- `packages/features/feature-app/` → Core app functionality (keep this)
- `packages/features/feature-loading/` → Loading component (keep this)
- `packages/features/feature-pageone/` → Example feature (replace with your features)

**Default features to replace:**
- `packages/features/feature-pageone/` → Your first feature

**Each feature contains:**
- `View/` - React components
- `redux/` - Redux state management
- `README.md` - Feature documentation

#### 5. **State Management** ⭐ **REQUIRED**

**Files to update:**
- `packages/state/src/slices.ts` - Global state slices
- `packages/state/src/store.ts` - Store configuration
- Feature-specific Redux files in `packages/features/*/redux/`

**Current simplified state:**
- App state (theme, language, etc.) - keep this
- Feature-specific state - add your own

#### 6. **UI Components** ⭐ **REQUIRED**

**Files to update:**
- `packages/ui/src/theme.ts` - Your app's theme
- `packages/ui/src/FontIcon/` - Your icon system
- `packages/ui/src/` - Your UI components

**Default UI to replace:**
- Color scheme and themes
- Icon system
- Component library
- Typography

#### 7. **Firebase Configuration** ⚠️ **OPTIONAL**

**Files to update:**
- `packages/firebase/src/config.ts` - Firebase config
- `packages/firebase/src/analytics.ts` - Analytics setup
- `packages/firebase/src/crashlytics.ts` - Crash reporting

**If using Firebase:**
- Update Firebase project configuration
- Configure analytics, crashlytics, messaging
- Update app identifiers

#### 8. **Utilities** ⚠️ **OPTIONAL**

**Files to update:**
- `packages/utils/src/language.ts` - Localization
- `packages/utils/src/colors.ts` - Color definitions
- `packages/utils/src/` - Your utility functions

### Development Workflow

#### 1. **Replace Default Features**

```bash
# Remove default features
rm -rf packages/features/feature-pageone
rm -rf packages/features/feature-pagetwo  
rm -rf packages/features/feature-otherview

# Create your features
mkdir -p packages/features/feature-yourfeature/View
mkdir -p packages/features/feature-yourfeature/redux
```

#### 2. **Update Navigation**

```typescript
// packages/navigation/src/screens.tsx
export const screens = {
  // Replace default screens with your screens
  Home: 'Home',
  Profile: 'Profile',
  Settings: 'Settings',
  // ... your screens
}
```

#### 3. **Update State Management**

```typescript
// packages/state/src/slices.ts
// Replace default slices with your app's state structure
```

#### 4. **Update UI Theme**

```typescript
// packages/ui/src/theme.ts
// Replace default theme with your app's design system
```

## 🧹 Cleanup Script

Run this script to help clean up default features:

```bash
# Make the cleanup script executable
chmod +x scripts/cleanup-defaults.sh

# Run the cleanup script
./scripts/cleanup-defaults.sh
```

## ✅ Verification Steps

After customization, verify everything works:

```bash
# 1. Install dependencies
pnpm install

# 2. Run linting
pnpm lint

# 3. Run tests
pnpm test

# 4. Start development servers
pnpm native    # Should open Expo dev tools
pnpm web       # Should open Next.js dev server

# 5. Build projects
pnpm build:expo
pnpm build:next
```

## 🚨 Common Issues

### 1. **Bundle Identifier Conflicts**
- Ensure unique bundle identifiers for iOS/Android
- Update in `apps/expo/app.json`

### 2. **Navigation Errors**
- Update all screen references in navigation files
- Ensure screen components exist

### 3. **State Management Issues**
- Update Redux store configuration
- Check feature Redux exports

### 4. **Build Errors**
- Clear Nx cache: `pnpm nx reset`
- Reinstall dependencies: `pnpm install --force`

## 📚 Next Steps

1. **Design System**: Set up your app's design system in `packages/ui`
2. **API Integration**: Add your API layer in `packages/utils` or new package
3. **Authentication**: Implement auth flow in `packages/features`
4. **Testing**: Add comprehensive tests for your features
5. **Deployment**: Set up CI/CD for your platforms

## 🆘 Need Help?

- Check the [Architecture Guide](./ARCHITECTURE.md) for detailed technical information
- Review [Solito Documentation](https://solito.dev/) for cross-platform development
- Check [Expo Documentation](https://docs.expo.dev/) for mobile development
- Review [Next.js Documentation](https://nextjs.org/docs) for web development

---

**Happy coding! 🎉** Your starter project is now ready for development.
