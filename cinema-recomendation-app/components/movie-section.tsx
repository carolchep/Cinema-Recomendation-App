"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { MovieCard } from "@/components/movie-card"
import { VideoCard } from "@/components/video-card"
import { CastCard } from "@/components/cast-card"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"

interface MovieSectionProps {
  title: string
  endpoint: string
  className?: string
  variant?: "movie" | "video" | "cast"
}

export function MovieSection({ title, endpoint, className, variant = "movie" }: MovieSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error("Failed to fetch data")
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const scrollContainer = (direction: "left" | "right") => {
    const container = document.getElementById(`scroll-container-${title.replace(/\s+/g, "-").toLowerCase()}`)
    if (!container) return

    const scrollAmount = 320
    const maxScroll = container.scrollWidth - container.clientWidth

    if (direction === "left") {
      const newPosition = Math.max(0, scrollPosition - scrollAmount)
      setScrollPosition(newPosition)
      container.scrollTo({ left: newPosition, behavior: "smooth" })
    } else {
      const newPosition = Math.min(maxScroll, scrollPosition + scrollAmount)
      setScrollPosition(newPosition)
      container.scrollTo({ left: newPosition, behavior: "smooth" })
    }
  }

  return (
    <section
      className={cn("relative", className)}
      role="region"
      aria-labelledby={`section-title-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" id={`section-title-${title.replace(/\s+/g, "-").toLowerCase()}`}>
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scrollContainer("left")}
            disabled={scrollPosition <= 0 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scrollContainer("right")}
            disabled={isLoading}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        </div>
      </div>

      <div
        id={`scroll-container-${title.replace(/\s+/g, "-").toLowerCase()}`}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex-shrink-0">
                {variant === "movie" && <Skeleton className="h-[300px] w-[200px] rounded-md" />}
                {variant === "video" && <Skeleton className="h-[180px] w-[320px] rounded-md" />}
                {variant === "cast" && (
                  <div className="flex flex-col items-center space-y-2">
                    <Skeleton className="h-[120px] w-[120px] rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                )}
              </div>
            ))
        ) : data && data.length > 0 ? (
          data.map((item: any) => (
            <div key={item.id} className="flex-shrink-0">
              {variant === "movie" && <MovieCard movie={item} />}
              {variant === "video" && <VideoCard video={item} />}
              {variant === "cast" && <CastCard cast={item} />}
            </div>
          ))
        ) : (
          <div className="flex h-[200px] w-full items-center justify-center">
            <p className="text-muted-foreground">No items found</p>
          </div>
        )}
      </div>
    </section>
  )
}
