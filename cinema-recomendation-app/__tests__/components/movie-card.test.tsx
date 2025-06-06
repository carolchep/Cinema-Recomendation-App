import { render, screen } from "@testing-library/react"
import { MovieCard } from "@/components/movie-card"

describe("MovieCard", () => {
  const mockMovie = {
    id: 1,
    title: "Test Movie",
    poster_path: "/test-poster.jpg",
    vote_average: 8.5,
    release_date: "2023-01-01",
    genre_ids: [28, 12],
  }

  it("renders movie card with correct data", () => {
    render(<MovieCard movie={mockMovie} />)

    // Check if title is rendered
    expect(screen.getByText("Test Movie")).toBeInTheDocument()

    // Check if rating is rendered
    expect(screen.getByText("8.5")).toBeInTheDocument()

    // Check if release year is rendered
    expect(screen.getByText("2023")).toBeInTheDocument()

    // Check if image is rendered with correct src
    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("src")
    expect(image).toHaveAttribute("alt", "Test Movie")
  })

  it("renders placeholder image when poster_path is null", () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: null,
    }

    render(<MovieCard movie={movieWithoutPoster} />)

    // Check if title is still rendered
    expect(screen.getByText("Test Movie")).toBeInTheDocument()

    // Image should still be rendered, but with placeholder
    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()
  })

  it("applies custom className when provided", () => {
    render(<MovieCard movie={mockMovie} className="custom-class" />)

    // The card should have the custom class
    const card = screen.getByRole("link").firstChild
    expect(card).toHaveClass("custom-class")
  })
})
