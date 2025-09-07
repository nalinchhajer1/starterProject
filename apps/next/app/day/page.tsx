'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const DayView = lazy(() => import('features/feature-dayview/View/DayView'));
const LoadingView = lazy(() => import('features/feature-loading/View/LoadingView'));

export default function DayPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading Day View..." />}>
            <DayView />
        </Suspense>
    );
}
