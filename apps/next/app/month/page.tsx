'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const MonthView = lazy(() => import('features/feature-monthview/View/MonthView'));
const LoadingView = lazy(() => import('features/feature-loading/View/LoadingView'));

export default function MonthPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading Month View..." />}>
            <MonthView />
        </Suspense>
    );
}
