'use client'

import Image from 'next/image'
import type { ComponentProps } from 'react'
import { cloudinaryLoader, isCloudinaryImage } from '@/lib/cloudinary'

type OptimizedImageProps = ComponentProps<typeof Image>

export function OptimizedImage({ loader, ...props }: OptimizedImageProps) {
  const source = typeof props.src === 'string' ? props.src : ''
  return (
    <Image
      {...props}
      loader={loader ?? (isCloudinaryImage(source) ? cloudinaryLoader : undefined)}
    />
  )
}
