"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { YouTubePlayer } from "@/components/youtube-player"
import { VideoPlayer } from "@/components/video-player"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  video: {
    id: string
    key: string
    name: string
    site: string
    type: string
    src?: string
  }
}

export function VideoModal({ isOpen, onClose, video }: VideoModalProps) {
  const renderVideoPlayer = () => {
    if (video.site === "YouTube") {
      return <YouTubePlayer videoId={video.key} title={video.name} autoPlay={true} className="aspect-video w-full" />
    }

    if (video.site === "Vimeo") {
      return (
        <iframe
          src={`https://player.vimeo.com/video/${video.key}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0`}
          className="w-full aspect-video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      )
    }

    if (video.src) {
      return <VideoPlayer src={video.src} title={video.name} autoPlay={true} className="aspect-video w-full" />
    }

    return (
      <div className="aspect-video w-full bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Video format not supported</p>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          {renderVideoPlayer()}

          <div className="p-4 bg-black text-white">
            <h2 className="text-lg font-semibold">{video.name}</h2>
            <p className="text-sm text-gray-400">{video.type}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
