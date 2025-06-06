import { render, screen } from "@testing-library/react"
import { MovieSection } from "@/components/movie-section"
import { useQuery } from "@tanstack/react-query"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}))

// Mock the child components
jest.mock("@/components/movie-card", () => ({
  MovieCard: ({ movie }) => <div data-testid={`movie-card-${movie.id}`}>{movie.title}</div>,
}))

jest.mock("@/components/video-card", () => ({
  VideoCard: ({ video }) => <div data-testid={`video-card-${video.id}`}>{video.name}</div>,
}))

jest.mock("@/components/cast-card", () => ({
  CastCard: ({ cast }) => <div data-testid={`cast-card-${cast.id}`}>{cast.name}</div>,
}))

describe("MovieSection", () => {
  const mockMovies = [
    { id: 1, title: "Movie 1" },
    { id: 2, title: "Movie 2" },
    { id: 3, title: "Movie 3" },
    { id: 4, title: "Movie 4" },
    { id: 5, title: "Movie 5" },
  ]

  const mockVideos = [
    { id: "1", key: "video1", name: "Video 1", site: "YouTube", type: "Trailer" },
    { id: "2", key: "video2", name: "Video 2", site: "YouTube", type: "Teaser" },
  ]

  const mockCasts = [
    { id: 1, name: "Actor 1", profile_path: "/actor1.jpg" },
    { id: 2, name: "Actor 2", profile_path: "/actor2.jpg" },
  ]

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks()

    // Default mock implementation for useQuery
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
    })
  })

  it("renders section title correctly", () => {
    render(<MovieSection title="Featured Movies" endpoint="/api/movies/featured" />)

    expect(screen.getByText("Featured Movies")).toBeInTheDocument()
  })

  it("renders movie cards when variant is movie", () => {
    render(<MovieSection title="Featured Movies" endpoint="/api/movies/featured" />)

    // Check if all movie cards are rendered
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument()
    })
  })

  it("renders video cards when variant is video", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockVideos,
      isLoading: false,
    })

    render(<MovieSection title="Exclusive Videos" endpoint="/api/movies/exclusive" variant="video" />)

    // Check if all video cards are rendered
    mockVideos.forEach((video) => {
      expect(screen.getByText(video.name)).toBeInTheDocument()
    })
  })

  it("renders cast cards when variant is cast", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockCasts,
      isLoading: false,
    })

    render(<MovieSection title="Featured Casts" endpoint="/api/movies/casts" variant="cast" />)

    // Check if all cast cards are rendered
    mockCasts.forEach((cast) => {
      expect(screen.getByText(cast.name)).toBeInTheDocument()
    })
  })

  it("renders loading skeletons when isLoading is true", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    })

    render(<MovieSection title="Featured Movies" endpoint="/api/movies/featured" />)

    // Check if skeletons are rendered
    // We can't easily test for the Skeleton component directly,
    // but we can check that no movie cards are rendered
    expect(screen.queryByTestId(/movie-card-/)).not.toBeInTheDocument()
  })

  it("renders empty state when no data is available", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    })

    render(<MovieSection title="Featured Movies" endpoint="/api/movies/featured" />)

    // Check if empty state message is rendered
    expect(screen.getByText("No items found")).toBeInTheDocument()
  })

  it("applies custom className when provided", () => {
    render(<MovieSection title="Featured Movies" endpoint="/api/movies/featured" className="custom-class" />)

    // The section should have the custom class
    const section = screen.getByRole("region")
    expect(section).toHaveClass("custom-class")
  })
})
