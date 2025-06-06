import { NextResponse } from "next/server"
import { getMovieRecommendations } from "@/lib/tmdb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const movieId = Number.parseInt(params.id)

    if (isNaN(movieId)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
    }

    const recommendations = await getMovieRecommendations(movieId)
    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Movie recommendations API error:", error)
    return NextResponse.json({ error: "Failed to fetch movie recommendations" }, { status: 500 })
  }
}
