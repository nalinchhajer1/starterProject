# Platform-Specific Guidelines

## 🔍 Key Considerations

### Platform-Specific Code

- Use `utils/src/platform` for platform detection
- Implement platform-specific components when needed
- Test thoroughly on both platforms
- Maintain consistent user experience across platforms

### State Management

- Keep state minimal and normalized
- Use Redux Persist for user preferences
- Implement proper migration logic for state changes
- Handle offline scenarios gracefully

### Navigation

- Use type-safe navigation with React Navigation v7
- Implement proper deep linking support
- Handle navigation state persistence
- Ensure consistent navigation patterns across platforms

### Theming

- Use the centralized theme system
- Support both light and dark themes
- Maintain consistent color schemes
- Test theme switching functionality

### Localization

- Support English and Hindi languages
- Use proper localization utilities
- Test language switching functionality
- Maintain template terminology accuracy

## 🔗 Key Integrations & APIs

### Platform-Specific Integrations

- **Mobile**: Expo modules, native device features, app store deployment
- **Web**: Next.js SSR/SSG, SEO optimization, web deployment
- **Location Services**: Geographic location services
- **Audio**: Audio playback capabilities

### External Services

- **External APIs**: Third-party services and integrations
- **Location APIs**: Geographic location services
- **Audio Services**: Audio content delivery

## 📚 Documentation References

- **Architecture Document**: `ARCHITECTURE.md` - Complete monorepo architecture overview
- **Solito Documentation**: Cross-platform React Native + Next.js development
- **Expo SDK 53**: Mobile development and native module integration
- **Next.js 15**: App Router, Server Components, and web optimization
- **React Navigation v7**: Navigation patterns and type-safe routing
- **Redux Toolkit**: State management patterns and best practices
- **TypeScript**: Type definitions and advanced typing patterns

## 🚨 Important Notes

- **Tree Shaking**: The `packages/app/index.ts` is intentionally blank to prevent Next.js tree shaking issues
- **Platform Detection**: Use `utils/src/platform` for platform-specific code
- **State Persistence**: Redux state is persisted with migration support
- **Navigation**: Uses React Navigation v7 with type-safe navigation
- **Theming**: Supports light/dark themes with consistent color system
