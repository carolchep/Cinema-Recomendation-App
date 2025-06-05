import { NextResponse } from "next/server"
import { getTopRatedMovies } from "@/lib/tmdb"

export async function GET() {
  try {
    const movies = await getTopRatedMovies()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Top rated movies API error:", error)
    return NextResponse.json({ error: "Failed to fetch top rated movies" }, { status: 500 })
  }
}
