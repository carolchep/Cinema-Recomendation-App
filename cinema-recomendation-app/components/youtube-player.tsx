"use client"

import { useState, useRef } from "react"
import { Play, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface YouTubePlayerProps {
  videoId: string
  title?: string
  className?: string
  autoPlay?: boolean
  showTitle?: boolean
  thumbnail?: string
}

export function YouTubePlayer({
  videoId,
  title,
  className,
  autoPlay = false,
  showTitle = true,
  thumbnail,
}: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const loadVideo = () => {
    setIsLoaded(true)
  }

  const openInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank")
  }

  const handleImageError = () => {
    setError(true)
  }

  if (error) {
    return (
      <div className={cn("relative bg-muted rounded-lg overflow-hidden", className)}>
        <div className="flex items-center justify-center h-full min-h-[200px]">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Video unavailable</p>
            <Button variant="outline" onClick={openInYouTube}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in YouTube
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative bg-black rounded-lg overflow-hidden group", className)}>
      {!isLoaded ? (
        <div className="relative cursor-pointer" onClick={loadVideo}>
          <img
            src={thumbnailUrl || "/placeholder.svg"}
            alt={title || "Video thumbnail"}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 transition-colors">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
          {showTitle && title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-medium line-clamp-2">{title}</h3>
            </div>
          )}
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0&modestbranding=1`}
          title={title || "YouTube video"}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={() => setError(true)}
        />
      )}

      {/* External link button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={openInYouTube}
      >
        <ExternalLink className="w-4 h-4" />
      </Button>
    </div>
  )
}
