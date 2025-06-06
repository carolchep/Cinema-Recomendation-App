import { MovieHero } from "@/components/movie-hero"
import { MovieSection } from "@/components/movie-section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <MovieHero />
        <div className="w-full px-8 py-12 md:px-16 lg:px-24">
          <div className="space-y-16">
            <MovieSection title="Featured Movies" endpoint="/api/movies/featured" />
            <MovieSection title="New Arrivals" endpoint="/api/movies/new" />
            <MovieSection title="Exclusive Videos" endpoint="/api/movies/exclusive" variant="video" />
            <MovieSection title="Featured Casts" endpoint="/api/movies/casts" variant="cast" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
