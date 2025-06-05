"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Play, Film } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { VideoModal } from "@/components/video-modal"
import { YouTubePlayer } from "@/components/youtube-player"
import { cn } from "@/lib/utils"

interface MovieVideosProps {
  movieId: number
  className?: string
}

interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  size: number
  published_at: string
}

export function MovieVideos({ movieId, className }: MovieVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const { data: videos, isLoading } = useQuery({
    queryKey: ["movieVideos", movieId],
    queryFn: async () => {
      const res = await fetch(`/api/movies/${movieId}/videos`)
      if (!res.ok) throw new Error("Failed to fetch videos")
      return res.json()
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-lg" />
            ))}
        </div>
      </div>
    )
  }

  if (!videos || videos.length === 0) {
    return null
  }

  // Sort videos by type priority (Trailer > Teaser > Clip > etc.)
  const sortedVideos = [...videos].sort((a, b) => {
    const typePriority = { Trailer: 0, Teaser: 1, Clip: 2, "Behind the Scenes": 3, Featurette: 4 }
    const aPriority = typePriority[a.type as keyof typeof typePriority] ?? 5
    const bPriority = typePriority[b.type as keyof typeof typePriority] ?? 5
    return aPriority - bPriority
  })

  const featuredVideo = sortedVideos[0]
  const otherVideos = sortedVideos.slice(1, 7) // Show up to 6 additional videos

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2">
        <Film className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Videos & Trailers</h2>
      </div>

      {/* Featured Video */}
      {featuredVideo && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Featured {featuredVideo.type}</h3>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <YouTubePlayer
                videoId={featuredVideo.key}
                title={featuredVideo.name}
                className="aspect-video"
                showTitle={false}
              />
              <div className="p-4">
                <h4 className="font-medium">{featuredVideo.name}</h4>
                <p className="text-sm text-muted-foreground">{featuredVideo.type}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other Videos */}
      {otherVideos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">More Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherVideos.map((video) => (
              <Card
                key={video.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedVideo(video)}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                      alt={video.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
                      <div className="bg-red-600 rounded-full p-2">
                        <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm line-clamp-2">{video.name}</h4>
                    <p className="text-xs text-muted-foreground">{video.type}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} video={selectedVideo} />
      )}
    </div>
  )
}
