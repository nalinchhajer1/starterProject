'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const MonthView = lazy(() => import('../../../../packages/features/feature-monthview/View/MonthView'));
const LoadingView = lazy(() => import('../../../../packages/features/feature-loading/View/LoadingView'));

export default function MonthPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading Month View..." />}>
            <MonthView />
        </Suspense>
    );
}
