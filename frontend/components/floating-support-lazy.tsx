'use client'

import dynamic from 'next/dynamic'

const FloatingSupport = dynamic(
  () => import('@/components/floating-support').then((mod) => mod.FloatingSupport),
  { ssr: false },
)

export function FloatingSupportLazy() {
  return <FloatingSupport />
}
