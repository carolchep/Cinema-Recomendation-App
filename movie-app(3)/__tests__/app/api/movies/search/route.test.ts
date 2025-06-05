import { GET } from "@/app/api/movies/search/route"
import { searchMovies } from "@/lib/tmdb"
import { NextResponse } from "next/server"
import jest from "jest"

// Mock the TMDB API function
jest.mock("@/lib/tmdb", () => ({
  searchMovies: jest.fn(),
}))

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({ data, options })),
  },
}))

describe("Search API Route", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("returns 400 if query parameter is missing", async () => {
    // Create a request with no query parameter
    const request = new Request("http://localhost:3000/api/movies/search")

    await GET(request)

    // Check if NextResponse.json was called with error message and 400 status
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "Query parameter is required" }, { status: 400 })
  })

  it("calls searchMovies with correct parameters", async () => {
    // Mock implementation for searchMovies
    ;(searchMovies as jest.Mock).mockResolvedValue({
      results: [{ id: 1, title: "Test Movie" }],
      total_results: 1,
      total_pages: 1,
    })

    // Create a request with query parameter
    const request = new Request("http://localhost:3000/api/movies/search?query=test&page=2")

    await GET(request)

    // Check if searchMovies was called with correct parameters
    expect(searchMovies).toHaveBeenCalledWith("test", 2)
  })

  it("returns search results on successful request", async () => {
    const mockResults = {
      results: [{ id: 1, title: "Test Movie" }],
      total_results: 1,
      total_pages: 1,
    }

    // Mock implementation for searchMovies
    ;(searchMovies as jest.Mock).mockResolvedValue(mockResults)

    // Create a request with query parameter
    const request = new Request("http://localhost:3000/api/movies/search?query=test")

    await GET(request)

    // Check if NextResponse.json was called with the search results
    expect(NextResponse.json).toHaveBeenCalledWith(mockResults)
  })

  it("returns 500 if searchMovies throws an error", async () => {
    // Mock implementation for searchMovies to throw an error
    ;(searchMovies as jest.Mock).mockRejectedValue(new Error("API error"))

    // Create a request with query parameter
    const request = new Request("http://localhost:3000/api/movies/search?query=test")

    await GET(request)

    // Check if NextResponse.json was called with error message and 500 status
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "Failed to search movies" }, { status: 500 })
  })

  it("uses default page 1 if page parameter is not provided", async () => {
    // Mock implementation for searchMovies
    ;(searchMovies as jest.Mock).mockResolvedValue({
      results: [],
      total_results: 0,
      total_pages: 0,
    })

    // Create a request with only query parameter
    const request = new Request("http://localhost:3000/api/movies/search?query=test")

    await GET(request)

    // Check if searchMovies was called with default page 1
    expect(searchMovies).toHaveBeenCalledWith("test", 1)
  })
})
