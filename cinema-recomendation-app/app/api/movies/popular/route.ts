import { NextResponse } from "next/server"
import { getPopularMovies } from "@/lib/tmdb"

export async function GET() {
  try {
    const movies = await getPopularMovies()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Popular movies API error:", error)
    return NextResponse.json({ error: "Failed to fetch popular movies" }, { status: 500 })
  }
}
