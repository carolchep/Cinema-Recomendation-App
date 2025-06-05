import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface MovieCardProps {
  movie: {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
    release_date?: string
    genre_ids?: number[]
  }
  className?: string
}

export function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className={cn("overflow-hidden transition-all hover:scale-105 hover:shadow-lg", className)}>
        <div className="aspect-[2/3] relative">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.svg?height=450&width=300"
            }
            alt={movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium line-clamp-1">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
