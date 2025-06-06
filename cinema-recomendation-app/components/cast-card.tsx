import Image from "next/image"
import { cn } from "@/lib/utils"

interface CastCardProps {
  cast: {
    id: number
    name: string
    profile_path: string | null
    character?: string
  }
  className?: string
}

export function CastCard({ cast, className }: CastCardProps) {
  return (
    <div className={cn("flex flex-col items-center space-y-2 text-center", className)}>
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
        <Image
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
              : "/placeholder.svg?height=120&width=120"
          }
          alt={cast.name}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium line-clamp-1">{cast.name}</h3>
        {cast.character && <p className="text-xs text-muted-foreground line-clamp-1">{cast.character}</p>}
      </div>
    </div>
  )
}
