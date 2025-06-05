import { NextResponse } from "next/server"
import { getMovieVideos } from "@/lib/tmdb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const movieId = Number.parseInt(params.id)

    if (isNaN(movieId)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 })
    }

    const videos = await getMovieVideos(movieId)
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Movie videos API error:", error)
    return NextResponse.json({ error: "Failed to fetch movie videos" }, { status: 500 })
  }
}
