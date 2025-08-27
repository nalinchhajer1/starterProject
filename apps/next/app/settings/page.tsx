'use client'

import { Suspense, lazy } from 'react'

// Lazy load components for optimal tree shaking
const SettingsView = lazy(() => 
  import('navigation/src/components').then(module => ({ 
    default: module.SettingsView 
  }))
)
const LoadingView = lazy(() => import('navigation/src/components/LoadingView'))

export default function SettingsPage() {
  return (
    <Suspense fallback={<LoadingView message="Loading Settings..." />}>
      <SettingsView />
    </Suspense>
  )
}