'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const SettingsView = lazy(() =>
    import('features/feature-extras/View/components').then((module) => ({
        default: module.SettingsView
    }))
);
const LoadingView = lazy(() => import('features/feature-loading/View/LoadingView'));

export default function SettingsPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading Settings..." />}>
            <SettingsView />
        </Suspense>
    );
}
