#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Dependency Version Validator for Monorepo
 *
 * This script analyzes all package.json files in the monorepo to find:
 * 1. Duplicate dependencies with different versions
 * 2. Inconsistent version ranges
 * 3. Potential conflicts between packages
 */

class DependencyValidator {
    constructor(rootDir) {
        this.rootDir = rootDir;
        this.packageJsonPaths = [];
        this.dependencyMap = new Map();
        this.conflicts = [];
        this.warnings = [];
    }

    /**
     * Recursively find all package.json files
     */
    findPackageJsonFiles(dir) {
        try {
            const items = fs.readdirSync(dir);

            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                    this.findPackageJsonFiles(fullPath);
                } else if (item === 'package.json') {
                    this.packageJsonPaths.push(fullPath);
                }
            }
        } catch (error) {
            console.warn(`Warning: Could not read directory ${dir}: ${error.message}`);
        }
    }

    /**
     * Parse package.json and extract dependencies
     */
    parsePackageJson(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const packageJson = JSON.parse(content);

            const relativePath = path.relative(this.rootDir, filePath);
            const packageName = packageJson.name || path.basename(path.dirname(filePath));

            return {
                path: relativePath,
                name: packageName,
                dependencies: packageJson.dependencies || {},
                devDependencies: packageJson.devDependencies || {},
                peerDependencies: packageJson.peerDependencies || {},
                overrides: packageJson.pnpm?.overrides || {}
            };
        } catch (error) {
            console.warn(`Warning: Could not parse ${filePath}: ${error.message}`);
            return null;
        }
    }

    /**
     * Normalize version string for comparison
     */
    normalizeVersion(version) {
        // Remove workspace: and file: prefixes
        if (version.startsWith('workspace:') || version.startsWith('file:')) {
            return 'workspace';
        }

        // Remove version prefixes like ^, ~, >=, etc.
        return version.replace(/^[\^~>=<]+/, '');
    }

    /**
     * Check if two versions are compatible
     */
    areVersionsCompatible(version1, version2) {
        const normalized1 = this.normalizeVersion(version1);
        const normalized2 = this.normalizeVersion(version2);

        // Workspace dependencies are always compatible
        if (normalized1 === 'workspace' || normalized2 === 'workspace') {
            return true;
        }

        // Exact match
        if (normalized1 === normalized2) {
            return true;
        }

        // For now, we'll consider different versions as incompatible
        // In a more sophisticated version, we could use semver to check compatibility
        return false;
    }

    /**
     * Analyze all package.json files
     */
    analyze() {
        console.log('🔍 Finding package.json files...');
        this.findPackageJsonFiles(this.rootDir);
        console.log(`Found ${this.packageJsonPaths.length} package.json files\n`);

        // Parse all package.json files
        const packages = [];
        for (const filePath of this.packageJsonPaths) {
            const packageData = this.parsePackageJson(filePath);
            if (packageData) {
                packages.push(packageData);
            }
        }

        // Build dependency map
        for (const pkg of packages) {
            const allDeps = {
                ...pkg.dependencies,
                ...pkg.devDependencies
            };

            for (const [depName, version] of Object.entries(allDeps)) {
                if (!this.dependencyMap.has(depName)) {
                    this.dependencyMap.set(depName, []);
                }

                this.dependencyMap.get(depName).push({
                    package: pkg.name,
                    path: pkg.path,
                    version: version,
                    type: pkg.dependencies[depName] ? 'dependency' : 'devDependency'
                });
            }
        }

        // Find conflicts
        this.findConflicts();

        // Generate report
        this.generateReport();
    }

    /**
     * Find version conflicts
     */
    findConflicts() {
        for (const [depName, usages] of this.dependencyMap.entries()) {
            if (usages.length <= 1) continue;

            // Group by version
            const versionGroups = new Map();
            for (const usage of usages) {
                const normalizedVersion = this.normalizeVersion(usage.version);
                if (!versionGroups.has(normalizedVersion)) {
                    versionGroups.set(normalizedVersion, []);
                }
                versionGroups.get(normalizedVersion).push(usage);
            }

            // If we have multiple version groups, it's a conflict
            if (versionGroups.size > 1) {
                const conflict = {
                    dependency: depName,
                    versions: Array.from(versionGroups.entries()).map(([version, usages]) => ({
                        version,
                        usages
                    }))
                };
                this.conflicts.push(conflict);
            }
        }
    }

    /**
     * Generate detailed report
     */
    generateReport() {
        console.log('📊 DEPENDENCY VERSION ANALYSIS REPORT');
        console.log('=====================================\n');

        if (this.conflicts.length === 0) {
            console.log('✅ No version conflicts found! All dependencies are consistent across packages.\n');
            return;
        }

        console.log(`❌ Found ${this.conflicts.length} dependency(ies) with version conflicts:\n`);

        for (const conflict of this.conflicts) {
            console.log(`🔴 ${conflict.dependency}`);
            console.log('   Versions found:');

            for (const versionGroup of conflict.versions) {
                console.log(`   • ${versionGroup.version}:`);
                for (const usage of versionGroup.usages) {
                    console.log(`     - ${usage.package} (${usage.path}) [${usage.type}]`);
                }
            }
            console.log('');
        }

        // Generate recommendations
        this.generateRecommendations();
    }

    /**
     * Generate recommendations for fixing conflicts
     */
    generateRecommendations() {
        console.log('💡 RECOMMENDATIONS');
        console.log('==================\n');

        for (const conflict of this.conflicts) {
            console.log(`For ${conflict.dependency}:`);

            // Find the most common version
            const versionCounts = new Map();
            for (const versionGroup of conflict.versions) {
                versionCounts.set(versionGroup.version, versionGroup.usages.length);
            }

            const mostCommonVersion = Array.from(versionCounts.entries()).sort((a, b) => b[1] - a[1])[0][0];

            console.log(`  • Consider standardizing on version: ${mostCommonVersion}`);
            console.log(`  • Update packages using different versions:`);

            for (const versionGroup of conflict.versions) {
                if (versionGroup.version !== mostCommonVersion) {
                    for (const usage of versionGroup.usages) {
                        console.log(`    - ${usage.package}: ${usage.version} → ${mostCommonVersion}`);
                    }
                }
            }
            console.log('');
        }

        console.log('🔧 PNPM COMMANDS TO HELP:');
        console.log('==========================');
        console.log('• View all installed versions: pnpm list --recursive --depth 0');
        console.log('• Check for outdated packages: pnpm outdated --recursive');
        console.log('• Use pnpm overrides in root package.json to force specific versions');
        console.log('• Consider using pnpm dedupe to remove duplicate dependencies\n');
    }

    /**
     * Check for pnpm overrides usage
     */
    checkOverrides() {
        const rootPackagePath = path.join(this.rootDir, 'package.json');
        if (fs.existsSync(rootPackagePath)) {
            const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
            const overrides = rootPackage.pnpm?.overrides || {};

            if (Object.keys(overrides).length > 0) {
                console.log('📋 PNPM OVERRIDES DETECTED:');
                console.log('============================');
                for (const [dep, version] of Object.entries(overrides)) {
                    console.log(`  ${dep}: ${version}`);
                }
                console.log('');
            }
        }
    }
}

// Main execution
function main() {
    const rootDir = process.argv[2] || process.cwd();

    console.log('🚀 Starting dependency version validation...');
    console.log(`📁 Root directory: ${rootDir}\n`);

    const validator = new DependencyValidator(rootDir);
    validator.analyze();
    validator.checkOverrides();

    // Exit with error code if conflicts found
    if (validator.conflicts.length > 0) {
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = DependencyValidator;
