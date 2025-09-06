'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const MonthView = lazy(() => import('navigation/src/components/MonthView'));
const LoadingView = lazy(() => import('navigation/src/components/LoadingView'));

export default function MonthPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading Month View..." />}>
            <MonthView />
        </Suspense>
    );
}
