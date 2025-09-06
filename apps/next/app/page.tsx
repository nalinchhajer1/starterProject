'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const DayView = lazy(() => import('../../../packages/features/feature-dayview/View/DayView'));
const LoadingView = lazy(() => import('../../../packages/features/feature-loading/View/LoadingView'));

export default function Page() {
    return (
        <Suspense fallback={<LoadingView message="Loading Day View..." />}>
            <DayView />
        </Suspense>
    );
}
