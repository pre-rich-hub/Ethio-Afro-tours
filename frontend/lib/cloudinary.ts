import type { ImageLoaderProps } from 'next/image'

const cloudinaryOrigin = 'https://res.cloudinary.com/q16lm8mo/image/upload/'

export function isCloudinaryImage(src: string): boolean {
  return src.startsWith(cloudinaryOrigin)
}

export function cloudinaryImageUrl(
  src: string,
  { width, quality }: { width: number; quality?: number },
): string {
  if (!isCloudinaryImage(src)) return src

  const selectedQuality = quality ? `q_${quality}` : 'q_auto:good'
  const transformation = `f_auto,${selectedQuality},c_limit,w_${width}`
  return src.replace(cloudinaryOrigin, `${cloudinaryOrigin}${transformation}/`)
}

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  return cloudinaryImageUrl(src, { width, quality })
}
