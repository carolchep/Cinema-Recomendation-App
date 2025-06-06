import { NextResponse } from "next/server"
import { getExclusiveVideos } from "@/lib/tmdb"

export async function GET() {
  try {
    const videos = await getExclusiveVideos()
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Exclusive videos API error:", error)
    return NextResponse.json({ error: "Failed to fetch exclusive videos" }, { status: 500 })
  }
}
