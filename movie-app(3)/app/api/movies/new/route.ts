import { NextResponse } from "next/server"
import { getNewReleases } from "@/lib/tmdb"

export async function GET() {
  try {
    const movies = await getNewReleases()
    return NextResponse.json(movies)
  } catch (error) {
    console.error("New releases API error:", error)
    return NextResponse.json({ error: "Failed to fetch new releases" }, { status: 500 })
  }
}
