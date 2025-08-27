'use client'

import { Suspense, lazy } from 'react'

// Lazy load components for optimal tree shaking
const DayView = lazy(() => import('navigation/src/components/DayView'))
const LoadingView = lazy(() => import('navigation/src/components/LoadingView'))

export default function DayPage() {
  return (
    <Suspense fallback={<LoadingView message="Loading Day View..." />}>
      <DayView />
    </Suspense>
  )
}