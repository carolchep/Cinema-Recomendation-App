import { NextResponse } from "next/server"
import { getUpcomingMovies } from "@/lib/tmdb"

export async function GET() {
  try {
    const movies = await getUpcomingMovies()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("Upcoming movies API error:", error)
    return NextResponse.json({ error: "Failed to fetch upcoming movies" }, { status: 500 })
  }
}
