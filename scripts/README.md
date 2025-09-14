# Dependency Validation Scripts

This directory contains scripts to help validate and manage dependencies across the monorepo.

## validate-dependencies.js

A comprehensive script that analyzes all `package.json` files in the monorepo to find version conflicts and inconsistencies.

### Usage

```bash
# Run the validation script
pnpm run validate-deps

# Or run directly
node scripts/validate-dependencies.js

# Run from a specific directory
node scripts/validate-dependencies.js /path/to/monorepo
```

### What it checks

1. **Version Conflicts**: Finds dependencies that have different versions across packages
2. **Inconsistencies**: Identifies packages using different version ranges for the same dependency
3. **Overrides**: Shows current pnpm overrides configuration
4. **Recommendations**: Provides suggestions for standardizing versions

### Output

The script provides:
- ✅ Success message if no conflicts are found
- ❌ Detailed list of conflicts with specific versions and packages
- 💡 Recommendations for fixing conflicts
- 🔧 Helpful pnpm commands
- 📋 Current pnpm overrides

### Exit Codes

- `0`: No conflicts found
- `1`: Conflicts detected

## pnpm Commands for Dependency Management

### View all installed versions
```bash
pnpm run check-deps
# or
pnpm list --recursive --depth 0
```

### Check for outdated packages
```bash
pnpm outdated --recursive
```

### Remove duplicate dependencies
```bash
pnpm dedupe
```

### Install with specific version overrides
Add to root `package.json`:
```json
{
  "pnpm": {
    "overrides": {
      "react-native-gesture-handler": "2.28.0",
      "react-native-reanimated": "4.1.0"
    }
  }
}
```

## ✅ Issues Resolved

All dependency version conflicts have been fixed:

1. **React Native packages** - Standardized to Expo versions:
   - `react-native-gesture-handler`: 2.28.0
   - `react-native-reanimated`: 4.1.0
   - `react-native-safe-area-context`: 5.6.1
   - `react-native-screens`: 4.16.0

2. **TypeScript versions** - Updated to latest:
   - All packages now use TypeScript 5.9.2

3. **React types** - Standardized:
   - All packages now use `@types/react` 19.1.13

## 🎯 Current Status

- ✅ No version conflicts detected
- ✅ All dependencies are consistent across packages
- ✅ Pre-commit hooks are configured and working

## 🐕 Husky Pre-commit Hooks

Husky is configured to run the following checks before each commit:

1. **Prettier** - Code formatting check
2. **ESLint** - Code linting across all packages
3. **Dependency Validation** - Ensures no version conflicts

### Pre-commit Hook Configuration

The pre-commit hook (`.husky/pre-commit`) runs:
```bash
echo "🔍 Running pre-commit checks..."
echo "📝 Running Prettier..."
pnpm run format:check
echo "🔧 Running ESLint..."
pnpm run lint
echo "📦 Validating dependencies..."
pnpm run validate-deps
echo "✅ All pre-commit checks passed!"
```

### Manual Testing

You can test the pre-commit hook manually:
```bash
.husky/pre-commit
```

### Bypassing Hooks (Not Recommended)

If you need to bypass the pre-commit hooks (not recommended):
```bash
git commit --no-verify -m "your commit message"
```

## Integration with CI/CD

Add to your CI pipeline:
```yaml
- name: Validate Dependencies
  run: pnpm run validate-deps
```

This will fail the build if version conflicts are detected, ensuring consistency across the monorepo.
