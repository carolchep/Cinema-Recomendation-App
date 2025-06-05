"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { Card } from "@/components/ui/card"
import { VideoModal } from "@/components/video-modal"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  video: {
    id: string
    key: string
    name: string
    site: string
    type: string
    thumbnail?: string
  }
  className?: string
  onClick?: () => void
}

export function VideoCard({ video, className, onClick }: VideoCardProps) {
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setShowModal(true)
    }
  }

  const getThumbnailUrl = () => {
    if (video.thumbnail) return video.thumbnail

    if (video.site === "YouTube") {
      return `https://img.youtube.com/vi/${video.key}/mqdefault.jpg`
    }

    if (video.site === "Vimeo") {
      return `https://vumbnail.com/${video.key}.jpg`
    }

    return "/placeholder.svg?height=180&width=320"
  }

  return (
    <>
      <Card
        className={cn(
          "group relative overflow-hidden cursor-pointer transition-all hover:scale-105 hover:shadow-lg",
          className,
        )}
        onClick={handleClick}
      >
        <div className="aspect-video relative w-[320px]">
          <Image src={getThumbnailUrl() || "/placeholder.svg"} alt={video.name} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="rounded-full bg-red-600/90 p-3 group-hover:bg-red-600 transition-colors">
              <Play className="h-6 w-6 fill-white text-white ml-0.5" />
            </div>
          </div>

          {/* Video type badge */}
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{video.type}</div>
        </div>

        <div className="p-3">
          <h3 className="text-sm font-medium line-clamp-2">{video.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{video.site}</p>
        </div>
      </Card>

      {showModal && <VideoModal isOpen={showModal} onClose={() => setShowModal(false)} video={video} />}
    </>
  )
}
