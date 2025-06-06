"use client"

import { useQuery } from "@tanstack/react-query"
import { MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"

interface MovieRecommendationsProps {
  movieId: number
}

export function MovieRecommendations({ movieId }: MovieRecommendationsProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["movieRecommendations", movieId],
    queryFn: async () => {
      const res = await fetch(`/api/movies/${movieId}/recommendations`)
      if (!res.ok) throw new Error("Failed to fetch recommendations")
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
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

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.slice(0, 8).map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
