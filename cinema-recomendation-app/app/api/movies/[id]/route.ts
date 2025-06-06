import { NextResponse } from "next/server"
import { getMovieDetails } from "@/lib/tmdb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const movieId = Number.parseInt(params.id)

    if (isNaN(movieId)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
    }

    const movie = await getMovieDetails(movieId)
    return NextResponse.json(movie)
  } catch (error) {
    console.error("Movie details API error:", error)
    return NextResponse.json({ error: "Failed to fetch movie details" }, { status: 500 })
  }
}
