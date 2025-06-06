import {
  fetchFeaturedMovies,
  fetchNewReleases,
  fetchExclusiveVideos,
  fetchFeaturedCasts,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieRecommendations,
} from "@/lib/api"
import jest from "jest" // Declare the jest variable

// Mock the global fetch function
global.fetch = jest.fn()

describe("Client API Functions", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()

    // Mock successful response
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ results: [{ id: 1, title: "Test Movie" }] }),
    })
  })

  it("fetchFeaturedMovies calls the correct endpoint", async () => {
    await fetchFeaturedMovies()

    expect(global.fetch).toHaveBeenCalledWith("/api/movies/featured")
  })

  it("fetchNewReleases calls the correct endpoint", async () => {
    await fetchNewReleases()

    expect(global.fetch).toHaveBeenCalledWith("/api/movies/new")
  })

  it("fetchExclusiveVideos calls the correct endpoint", async () => {
    await fetchExclusiveVideos()

    expect(global.fetch).toHaveBeenCalledWith("/api/movies/exclusive")
  })

  it("fetchFeaturedCasts calls the correct endpoint", async () => {
    await fetchFeaturedCasts()

    expect(global.fetch).toHaveBeenCalledWith("/api/movies/casts")
  })

  it("fetchMovieDetails calls the correct endpoint with movie ID", async () => {
    await fetchMovieDetails(123)

    expect(global.fetch).toHaveBeenCalledWith("/api/movies/123")
  })

  it("fetchMovieCredits calls the correct endpoint with movie ID", async () => {
    await fetchMovieCredits(123)

    expect(global.fetch).toHaveBeenCalledWith("/api/movies/123/credits")
  })

  it("fetchMovieRecommendations calls the correct endpoint with movie ID", async () => {
    await fetchMovieRecommendations(123)

    expect(global.fetch).toHaveBeenCalledWith("/api/movies/123/recommendations")
  })

  it("throws an error when fetch fails", async () => {
    // Mock a failed response
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    })

    await expect(fetchFeaturedMovies()).rejects.toThrow("Failed to fetch featured movies")
  })

  it("returns JSON data on successful fetch", async () => {
    const mockData = { results: [{ id: 2, title: "Another Movie" }] }

    // Mock a successful response with specific data
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const result = await fetchFeaturedMovies()

    expect(result).toEqual(mockData)
  })
})
