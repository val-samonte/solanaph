import React, { Suspense, useState, useEffect, ReactNode } from 'react'

interface ImageLoaderProps {
  src: string
  fallback?: React.ReactNode
  children: React.ReactNode
}

const fetchImage = async (src: string): Promise<string> => {
  const response = await fetch(src)
  if (!response.ok) throw new Error('Image not found')
  const blob = await response.blob()
  return URL.createObjectURL(blob)
}

// Image Component wrapped with Suspense
const AsyncImage: React.FC<ImageLoaderProps> = ({ src, children }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    fetchImage(src)
      .then((blobUrl) => {
        if (isMounted) setImageSrc(blobUrl)
      })
      .catch(() => {
        if (isMounted) setError(true)
      })

    return () => {
      isMounted = false
      if (imageSrc) URL.revokeObjectURL(imageSrc) // Cleanup Blob URL
    }
  }, [src])

  if (error || !imageSrc) return <>{children}</>
  return (
    <img
      src={imageSrc}
      alt='Loaded content'
      className='object-contain max-w-sm w-full'
    />
  )
}

export const ImageLoader = (
  props: ImageLoaderProps & { fallback?: ReactNode }
) => {
  return (
    <Suspense fallback={props.fallback || 'Loading'}>
      <AsyncImage {...props} />
    </Suspense>
  )
}
