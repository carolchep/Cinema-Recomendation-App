import { NextResponse } from "next/server"
import { getMovieCredits } from "@/lib/tmdb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const movieId = Number.parseInt(params.id)

    if (isNaN(movieId)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
    }

    const credits = await getMovieCredits(movieId)
    return NextResponse.json(credits)
  } catch (error) {
    console.error("Movie credits API error:", error)
    return NextResponse.json({ error: "Failed to fetch movie credits" }, { status: 500 })
  }
}
