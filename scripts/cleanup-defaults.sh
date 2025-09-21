#!/bin/bash

# Cleanup script for Starter Project
# This script helps remove default features and prepare the project for customization

echo "🧹 Starting cleanup of default features..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "packages/features" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

echo "📋 This script will help you clean up default features. You can choose what to remove:"
echo ""

# Default features to potentially remove
DEFAULT_FEATURES=(
    "feature-pageone"
    "feature-pagetwo" 
    "feature-otherview"
    "feature-extras"
    "feature-loading"
)

# Ask user what to remove
echo "Which default features would you like to remove?"
echo ""

for feature in "${DEFAULT_FEATURES[@]}"; do
    if [ -d "packages/features/$feature" ]; then
        read -p "Remove $feature? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo "Removing $feature..."
            rm -rf "packages/features/$feature"
            print_status "Removed $feature"
        else
            print_warning "Keeping $feature"
        fi
    fi
done

# Ask about keeping feature-app and feature-view
echo ""
echo "Feature-app and feature-view contain core app functionality."
echo "You may want to keep these and modify them instead of removing them."
echo ""

read -p "Remove feature-app? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "packages/features/feature-app"
    print_status "Removed feature-app"
else
    print_warning "Keeping feature-app (recommended)"
fi

read -p "Remove feature-view? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "packages/features/feature-view"
    print_status "Removed feature-view"
else
    print_warning "Keeping feature-view (recommended)"
fi

# Update features index file
echo ""
echo "📝 Updating features index file..."

# Create new index file
cat > packages/features/index.ts << 'EOF'
// Export your custom features here
// Example:
// export * from './feature-yourfeature';

// Core features (uncomment if you kept them)
// export * from './feature-app';
// export * from './feature-view';
EOF

print_status "Updated features index file"

# Update navigation screens
echo ""
echo "📝 Navigation cleanup needed:"
print_warning "You need to manually update the following files:"
echo "  - packages/navigation/src/screens.tsx"
echo "  - packages/navigation/src/navigators.tsx" 
echo "  - packages/navigation/src/types.ts"
echo "  - packages/navigation/src/components.tsx"

# Update state management
echo ""
echo "📝 State management cleanup needed:"
print_warning "You need to manually update the following files:"
echo "  - packages/state/src/slices.ts"
echo "  - packages/state/src/store.ts"

# Update UI theme
echo ""
echo "📝 UI theme cleanup needed:"
print_warning "You need to manually update the following files:"
echo "  - packages/ui/src/theme.ts"
echo "  - packages/ui/src/ (your components)"

# Show next steps
echo ""
echo "🎉 Cleanup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Update app configuration (app.json, package.json files)"
echo "2. Create your custom features in packages/features/"
echo "3. Update navigation structure"
echo "4. Update state management"
echo "5. Update UI theme and components"
echo "6. Run 'pnpm install' to ensure dependencies are correct"
echo "7. Run 'pnpm lint' to check for any issues"
echo "8. Run 'pnpm test' to ensure tests pass"
echo ""
echo "📚 See SETUP_GUIDE.md for detailed customization instructions"
echo ""
print_status "Cleanup script completed successfully!"
