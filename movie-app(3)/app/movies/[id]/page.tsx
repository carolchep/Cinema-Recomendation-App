import { Suspense } from "react"
import { notFound } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MovieDetails } from "@/components/movie-details"
import { MovieRecommendations } from "@/components/movie-recommendations"
import { MovieCast } from "@/components/movie-cast"
import { MovieVideos } from "@/components/movie-videos"
import { Skeleton } from "@/components/ui/skeleton"
import { getMovieDetails } from "@/lib/tmdb"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const movieId = Number.parseInt(params.id)
    if (isNaN(movieId)) return notFound()

    const movie = await getMovieDetails(movieId)

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">
          <Suspense fallback={<MovieDetailsSkeleton />}>
            <MovieDetails movie={movie} />
          </Suspense>

          <div className="container px-4 py-6 md:px-6 md:py-12 space-y-12">
            <Suspense fallback={<VideosSkeleton />}>
              <MovieVideos movieId={movieId} />
            </Suspense>

            <Suspense fallback={<CastSkeleton />}>
              <MovieCast movieId={movieId} />
            </Suspense>

            <Suspense fallback={<RecommendationsSkeleton />}>
              <MovieRecommendations movieId={movieId} />
            </Suspense>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  } catch (error) {
    console.error("Error loading movie:", error)
    return notFound()
  }
}

function MovieDetailsSkeleton() {
  return (
    <div className="w-full">
      <div className="relative h-[70vh] w-full bg-muted/20">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}

function VideosSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-40" />
      </div>
      <Skeleton className="aspect-video w-full rounded-lg" />
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

function CastSkeleton() {
  return (
    <div className="my-8">
      <Skeleton className="h-10 w-40 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] rounded-md" />
          ))}
      </div>
    </div>
  )
}

function RecommendationsSkeleton() {
  return (
    <div className="my-8">
      <Skeleton className="h-10 w-60 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] rounded-md" />
          ))}
      </div>
    </div>
  )
}
