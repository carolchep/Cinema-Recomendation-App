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
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <MovieSection title="Featured Movies" endpoint="/api/movies/featured" />
          <MovieSection title="New Arrivals" endpoint="/api/movies/new" className="mt-12" />
          <MovieSection title="Exclusive Videos" endpoint="/api/movies/exclusive" className="mt-12" variant="video" />
          <MovieSection title="Featured Casts" endpoint="/api/movies/casts" className="mt-12" variant="cast" />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
