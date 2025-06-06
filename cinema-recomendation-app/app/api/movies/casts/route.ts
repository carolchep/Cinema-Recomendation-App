import { NextResponse } from "next/server"
import { getFeaturedCasts } from "@/lib/tmdb"

export async function GET() {
  try {
    const casts = await getFeaturedCasts()
    return NextResponse.json(casts)
  } catch (error) {
    console.error("Featured casts API error:", error)
    return NextResponse.json({ error: "Failed to fetch featured casts" }, { status: 500 })
  }
}
