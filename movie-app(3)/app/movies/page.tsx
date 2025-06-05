import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MovieSection } from "@/components/movie-section"
import { SearchForm } from "@/components/search-form"
import { Skeleton } from "@/components/ui/skeleton"
import { Film } from "lucide-react"

export default function MoviesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Film className="h-8 w-8" />
              <div>
                <h1 className="text-3xl font-bold">Browse Movies</h1>
                <p className="text-muted-foreground">Discover your next favorite movie</p>
              </div>
            </div>
            <div className="w-full md:w-auto md:min-w-[400px]">
              <SearchForm />
            </div>
          </div>

          {/* Movie Sections */}
          <div className="space-y-12">
            <Suspense fallback={<MovieSectionSkeleton title="Trending Now" />}>
              <MovieSection title="Trending Now" endpoint="/api/movies/featured" />
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton title="New Releases" />}>
              <MovieSection title="New Releases" endpoint="/api/movies/new" />
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton title="Popular Movies" />}>
              <MovieSection title="Popular Movies" endpoint="/api/movies/popular" />
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton title="Top Rated" />}>
              <MovieSection title="Top Rated" endpoint="/api/movies/top-rated" />
            </Suspense>

            <Suspense fallback={<MovieSectionSkeleton title="Upcoming Movies" />}>
              <MovieSection title="Upcoming Movies" endpoint="/api/movies/upcoming" />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function MovieSectionSkeleton({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-[200px] flex-shrink-0 rounded-md" />
          ))}
      </div>
    </div>
  )
}
