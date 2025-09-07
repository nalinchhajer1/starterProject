'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const PageOneView = lazy(() => import('features/feature-pageone/View/PageOneView'));
const LoadingView = lazy(() => import('features/feature-loading/View/LoadingView'));

export default function DayPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading..." />}>
            <PageOneView />
        </Suspense>
    );
}
