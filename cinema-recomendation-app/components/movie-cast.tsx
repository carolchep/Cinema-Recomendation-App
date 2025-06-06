"use client"

import { useQuery } from "@tanstack/react-query"
import { CastCard } from "@/components/cast-card"
import { Skeleton } from "@/components/ui/skeleton"

interface MovieCastProps {
  movieId: number
}

export function MovieCast({ movieId }: MovieCastProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["movieCredits", movieId],
    queryFn: async () => {
      const res = await fetch(`/api/movies/${movieId}/credits`)
      if (!res.ok) throw new Error("Failed to fetch credits")
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <Skeleton className="h-[120px] w-[120px] rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
        </div>
      </div>
    )
  }

  if (!data || !data.cast || data.cast.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Cast</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {data.cast.slice(0, 12).map((cast: any) => (
          <CastCard key={cast.id} cast={cast} />
        ))}
      </div>
    </div>
  )
}
