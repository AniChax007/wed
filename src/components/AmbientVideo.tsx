import { useEffect, useRef, useState } from 'react'

interface AmbientVideoProps {
  src: string
  poster: string
  className: string
}

function AmbientVideo({ src, poster, className }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
        if (entry.isIntersecting) setHasEntered(true)
      },
      { rootMargin: '120px' }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasEntered) return

    if (isVisible) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [hasEntered, isVisible])

  return (
    <video
      ref={videoRef}
      src={hasEntered ? src : undefined}
      poster={poster}
      preload="none"
      loop
      muted
      playsInline
      aria-hidden="true"
      className={className}
    />
  )
}

export default AmbientVideo