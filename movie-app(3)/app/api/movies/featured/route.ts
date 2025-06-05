import { NextResponse } from "next/server"
import { getFeaturedMovies } from "@/lib/tmdb"

export async function GET() {
  try {
    const movies = await getFeaturedMovies()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Featured movies API error:", error)
    return NextResponse.json({ error: "Failed to fetch featured movies" }, { status: 500 })
  }
}
