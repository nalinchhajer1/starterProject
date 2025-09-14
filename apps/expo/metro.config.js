// Learn more https://docs.expo.dev/guides/monorepos
// Learn more https://docs.expo.io/guides/customizing-metro
/**
 * @type {import('expo/metro-config')}
 */
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Add the workspace root to watchFolders along with Expo's defaults
config.watchFolders = [...config.watchFolders, workspaceRoot];

// Configure resolver for monorepo with pnpm support
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules'), path.resolve(workspaceRoot, 'node_modules')];

// Add resolver configuration for better module resolution
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.sourceExts = ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'json'];

// Handle package resolution issues with hoisted dependencies
config.resolver.unstable_enablePackageExports = false;
config.resolver.unstable_enableSymlinks = false;

module.exports = config;
