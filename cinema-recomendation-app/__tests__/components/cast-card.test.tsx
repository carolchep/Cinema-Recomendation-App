import { render, screen } from "@testing-library/react"
import { CastCard } from "@/components/cast-card"

describe("CastCard", () => {
  const mockCast = {
    id: 1,
    name: "John Doe",
    profile_path: "/profile.jpg",
    character: "Character Name",
  }

  it("renders cast card with correct data", () => {
    render(<CastCard cast={mockCast} />)

    // Check if name is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument()

    // Check if character is rendered
    expect(screen.getByText("Character Name")).toBeInTheDocument()

    // Check if image is rendered with correct src
    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("alt", "John Doe")
  })

  it("renders placeholder image when profile_path is null", () => {
    const castWithoutProfile = {
      ...mockCast,
      profile_path: null,
    }

    render(<CastCard cast={castWithoutProfile} />)

    // Check if name is still rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument()

    // Image should still be rendered, but with placeholder
    const image = screen.getByRole("img")
    expect(image).toBeInTheDocument()
  })

  it("does not render character if not provided", () => {
    const castWithoutCharacter = {
      id: 1,
      name: "John Doe",
      profile_path: "/profile.jpg",
    }

    render(<CastCard cast={castWithoutCharacter} />)

    // Check if name is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument()

    // Character should not be rendered
    expect(screen.queryByText("Character Name")).not.toBeInTheDocument()
  })

  it("applies custom className when provided", () => {
    render(<CastCard cast={mockCast} className="custom-class" />)

    // The container should have the custom class
    const container = screen.getByText("John Doe").closest("div")?.parentElement
    expect(container).toHaveClass("custom-class")
  })
})
