import Image from "next/image"
import { Star, Clock, Calendar, Film } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface MovieDetailsProps {
  movie: any
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/60 z-10" />
      {movie.backdrop_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          priority
          className="object-cover"
        />
      )}

      <div className="container relative z-20 px-4 py-12 md:py-24 md:px-6">
        <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] items-start">
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-xl">
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/placeholder.svg?height=525&width=350"
              }
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{movie.title}</h1>
              {movie.tagline && <p className="mt-2 text-xl italic text-muted-foreground">{movie.tagline}</p>}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((genre: any) => (
                <Badge key={genre.id} variant="outline">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              {movie.vote_average && (
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{movie.vote_average.toFixed(1)}/10</span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}

              {movie.release_date && (
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                </div>
              )}

              {movie.original_language && (
                <div className="flex items-center">
                  <Film className="mr-1 h-4 w-4" />
                  <span>{movie.original_language.toUpperCase()}</span>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">{movie.overview}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button>Watch Trailer</Button>
              <Button variant="outline">Add to Watchlist</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
