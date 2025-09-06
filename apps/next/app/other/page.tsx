'use client';

import { Suspense, lazy } from 'react';

// Lazy load components for optimal tree shaking
const OtherView = lazy(() => import('../../../../packages/features/feature-otherview/View/OtherView'));
const LoadingView = lazy(() => import('../../../../packages/features/feature-loading/View/LoadingView'));

export default function OtherPage() {
    return (
        <Suspense fallback={<LoadingView message="Loading Other View..." />}>
            <OtherView />
        </Suspense>
    );
}
