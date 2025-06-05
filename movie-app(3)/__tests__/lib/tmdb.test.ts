import {
  getFeaturedMovies,
  getNewReleases,
  getFeaturedCasts,
  getMovieDetails,
  getMovieCredits,
  getMovieRecommendations,
  searchMovies,
} from "@/lib/tmdb"
import jest from "jest"

// Mock the global fetch function
global.fetch = jest.fn()

describe("TMDB API Functions", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()

    // Mock successful response
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ id: 1, title: "Test Movie" }] }),
    })
  })

  it("getFeaturedMovies fetches trending movies", async () => {
    const result = await getFeaturedMovies()

    // Check if fetch was called with the correct URL
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/trending/movie/day"), expect.any(Object))

    // Check if the result is as expected
    expect(result).toEqual([{ id: 1, title: "Test Movie" }])
  })

  it("getNewReleases fetches now playing movies", async () => {
    await getNewReleases()

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/movie/now_playing"), expect.any(Object))
  })

  it("getFeaturedCasts fetches popular people", async () => {
    await getFeaturedCasts()

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/person/popular"), expect.any(Object))
  })

  it("getMovieDetails fetches details for a specific movie", async () => {
    await getMovieDetails(123)

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/movie/123"), expect.any(Object))
  })

  it("getMovieCredits fetches credits for a specific movie", async () => {
    await getMovieCredits(123)

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/movie/123/credits"), expect.any(Object))
  })

  it("getMovieRecommendations fetches recommendations for a specific movie", async () => {
    await getMovieRecommendations(123)

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/movie/123/recommendations"), expect.any(Object))
  })

  it("searchMovies fetches movies matching a query", async () => {
    await searchMovies("test query")

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/search/movie?query=test%20query"),
      expect.any(Object),
    )
  })

  it("searchMovies includes page parameter when provided", async () => {
    await searchMovies("test query", 3)

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/search/movie?query=test%20query") && expect.stringContaining("page=3"),
      expect.any(Object),
    )
  })

  it("handles API errors gracefully", async () => {
    // Mock a failed response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    await expect(getFeaturedMovies()).rejects.toThrow("TMDB API error: 404")
  })

  it("uses cache for repeated requests", async () => {
    // First call should make a fetch request
    await getFeaturedMovies()

    // Second call to the same endpoint should use cached data
    await getFeaturedMovies()

    // Fetch should only be called once
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
