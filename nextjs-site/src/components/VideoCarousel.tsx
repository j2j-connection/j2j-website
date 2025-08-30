'use client'

import { useState, useEffect, useRef } from 'react'

const videos = [
  {
    src: '/videos/Diverse_Bikers_at_Golden_Hour.mp4',
    alt: 'Diverse Bikers at Golden Hour'
  },
  {
    src: '/videos/Clean_Energy_Future_Scene_Generated.mp4', 
    alt: 'Clean Energy Future Scene'
  },
  {
    src: '/videos/Bike_Shop_Video_Generation.mp4',
    alt: 'Bike Shop Scene'
  }
]

export default function VideoCarousel() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [videosLoaded, setVideosLoaded] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }, 6000) // Change video every 6 seconds

    return () => clearInterval(interval)
  }, [])

  const handleVideoLoad = () => {
    setVideosLoaded(true)
  }

  const handleVideoError = () => {
    console.error('Video failed to load')
  }

  return (
    <div className="absolute inset-0 overflow-hidden z-10">
      {videos.map((video, index) => (
        <video
          key={index}
          ref={(el) => { videoRefs.current[index] = el }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentVideo ? 'opacity-80 md:opacity-70' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ))}
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
    </div>
  )
}