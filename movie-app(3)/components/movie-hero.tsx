"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { fetchFeaturedMovies } from "@/lib/api"

export function MovieHero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredMovies"],
    queryFn: fetchFeaturedMovies,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    if (!movies || movies.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [movies])

  if (isLoading) {
    return <HeroSkeleton />
  }

  if (error || !movies || movies.length === 0) {
    return (
      <div className="relative h-[70vh] w-full bg-muted/20">
        <div className="container relative z-10 flex h-full flex-col items-start justify-center px-4 py-6 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">Discover Movies</h1>
          <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
            Find your next favorite movie with personalized recommendations
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/search">Browse Movies</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const movie = movies[currentIndex]

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        fill
        priority
        className="object-cover"
      />
      <div className="container relative z-20 flex h-full flex-col items-start justify-center px-4 py-6 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">{movie.title}</h1>
        <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
          {movie.overview.length > 150 ? `${movie.overview.substring(0, 150)}...` : movie.overview}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href={`/movies/${movie.id}`}>
              <Play className="mr-2 h-4 w-4" />
              Watch Now
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/movies/${movie.id}`}>More Info</Link>
          </Button>
        </div>
        <div className="mt-8 flex space-x-2">
          {movies.map((_, i) => (
            <button
              key={i}
              className={`h-2 w-2 rounded-full ${i === currentIndex ? "bg-primary" : "bg-muted"}`}
              onClick={() => setCurrentIndex(i)}
            >
              <span className="sr-only">Go to slide {i + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroSkeleton() {
  return (
    <div className="relative h-[70vh] w-full bg-muted/20" data-testid="hero-skeleton">
      <div className="container relative z-10 flex h-full flex-col items-start justify-center px-4 py-6 md:px-6">
        <Skeleton className="h-14 w-[300px] sm:h-16 sm:w-[400px] md:h-20 md:w-[500px] lg:h-24 lg:w-[600px]" />
        <Skeleton className="mt-4 h-6 w-[500px] md:h-8" />
        <Skeleton className="mt-2 h-6 w-[400px] md:h-8" />
        <div className="mt-8 flex gap-3">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}
