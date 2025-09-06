'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const OtherView = lazy(() => import('navigation/src/components/OtherView'));
const LoadingView = lazy(() => import('navigation/src/components/LoadingView'));

export default function OtherPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading Other View..." />}>
            <OtherView />
        </Suspense>
    );
}
