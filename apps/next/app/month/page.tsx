'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const PageTwoView = lazy(() => import('features/feature-pagetwo/View/PageTwoView'));
const LoadingView = lazy(() => import('features/feature-loading/View/LoadingView'));

export default function PageTwoPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading..." />}>
            <PageTwoView />
        </Suspense>
    );
}
