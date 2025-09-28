'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const PageOneView = lazy(() => import('features-registry/src/index').then((m) => ({ default: m.views.PageOneView })));
const LoadingView = lazy(() => import('features-registry/src/index').then((m) => ({ default: m.views.LoadingView })));

export default function DayPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading..." />}>
            <PageOneView />
        </Suspense>
    );
}
