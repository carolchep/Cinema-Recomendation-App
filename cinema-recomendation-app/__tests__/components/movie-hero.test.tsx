import { render, screen, act } from "@testing-library/react"
import { MovieHero } from "@/components/movie-hero"
import { useQuery } from "@tanstack/react-query"
import jest from "jest" // Declare the jest variable

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}))

describe("MovieHero", () => {
  const mockMovies = [
    {
      id: 1,
      title: "Test Movie 1",
      overview: "This is test movie 1",
      backdrop_path: "/backdrop1.jpg",
    },
    {
      id: 2,
      title: "Test Movie 2",
      overview: "This is test movie 2",
      backdrop_path: "/backdrop2.jpg",
    },
  ]

  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it("renders loading skeleton when data is loading", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    })

    render(<MovieHero />)

    // Check if skeleton is rendered
    expect(screen.getByTestId("hero-skeleton")).toBeInTheDocument()
  })

  it("renders fallback content when there is an error", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to fetch"),
    })

    render(<MovieHero />)

    // Check if fallback content is rendered
    expect(screen.getByText("Discover Movies")).toBeInTheDocument()
    expect(screen.getByText("Find your next favorite movie with personalized recommendations")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Browse Movies" })).toBeInTheDocument()
  })

  it("renders fallback content when there are no movies", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    })

    render(<MovieHero />)

    // Check if fallback content is rendered
    expect(screen.getByText("Discover Movies")).toBeInTheDocument()
  })

  it("renders movie hero with first movie initially", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
      error: null,
    })

    render(<MovieHero />)

    // Check if first movie is rendered
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument()
    expect(screen.getByText("This is test movie 1")).toBeInTheDocument()
  })

  it("rotates to next movie after interval", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
      error: null,
    })

    render(<MovieHero />)

    // Initially shows first movie
    expect(screen.getByText("Test Movie 1")).toBeInTheDocument()

    // Advance timer to trigger rotation
    act(() => {
      jest.advanceTimersByTime(8000)
    })

    // Should now show second movie
    expect(screen.getByText("Test Movie 2")).toBeInTheDocument()
  })

  it("truncates long movie overviews", () => {
    const moviesWithLongOverview = [
      {
        id: 1,
        title: "Test Movie",
        overview:
          "This is a very long overview that should be truncated because it exceeds the character limit. It contains a lot of information about the movie that would not fit in the hero section without making it look cluttered.",
        backdrop_path: "/backdrop1.jpg",
      },
    ]
    ;(useQuery as jest.Mock).mockReturnValue({
      data: moviesWithLongOverview,
      isLoading: false,
      error: null,
    })

    render(<MovieHero />)

    // Check if overview is truncated
    expect(screen.getByText(/This is a very long overview/)).toBeInTheDocument()
    expect(screen.getByText(/This is a very long overview/)).not.toHaveTextContent(moviesWithLongOverview[0].overview)
    expect(screen.getByText(/This is a very long overview/)).toHaveTextContent(/\.\.\.$/)
  })
})
