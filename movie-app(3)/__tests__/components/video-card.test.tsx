import { render, screen, fireEvent } from "@testing-library/react"
import { VideoCard } from "@/components/video-card"
import jest from "jest" // Import jest to fix the undeclared variable error

// Mock window.open
const mockOpen = jest.fn()
Object.defineProperty(window, "open", {
  writable: true,
  value: mockOpen,
})

describe("VideoCard", () => {
  const mockYouTubeVideo = {
    id: "1",
    key: "abc123",
    name: "Test Trailer",
    site: "YouTube",
    type: "Trailer",
  }

  const mockVimeoVideo = {
    id: "2",
    key: "xyz789",
    name: "Test Teaser",
    site: "Vimeo",
    type: "Teaser",
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders video card with correct data", () => {
    render(<VideoCard video={mockYouTubeVideo} />)

    // Check if title is rendered
    expect(screen.getByText("Test Trailer")).toBeInTheDocument()

    // Check if type is rendered
    expect(screen.getByText("Trailer")).toBeInTheDocument()

    // Check if image is rendered with correct src
    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("alt", "Test Trailer")
  })

  it("opens YouTube link when YouTube video is clicked", () => {
    render(<VideoCard video={mockYouTubeVideo} />)

    // Click on the video card
    fireEvent.click(screen.getByRole("img"))

    // Check if window.open was called with the correct YouTube URL
    expect(mockOpen).toHaveBeenCalledWith("https://www.youtube.com/watch?v=abc123", "_blank")
  })

  it("opens Vimeo link when Vimeo video is clicked", () => {
    render(<VideoCard video={mockVimeoVideo} />)

    // Click on the video card
    fireEvent.click(screen.getByRole("img"))

    // Check if window.open was called with the correct Vimeo URL
    expect(mockOpen).toHaveBeenCalledWith("https://vimeo.com/xyz789", "_blank")
  })

  it("uses thumbnail from video object if provided", () => {
    const videoWithThumbnail = {
      ...mockYouTubeVideo,
      thumbnail: "https://example.com/custom-thumbnail.jpg",
    }

    render(<VideoCard video={videoWithThumbnail} />)

    // Check if image has the custom thumbnail
    const image = screen.getByRole("img")
    expect(image).toHaveAttribute("src", expect.stringContaining("custom-thumbnail.jpg"))
  })

  it("applies custom className when provided", () => {
    render(<VideoCard video={mockYouTubeVideo} className="custom-class" />)

    // The card should have the custom class
    const card = screen.getByRole("img").closest("div")
    expect(card?.parentElement).toHaveClass("custom-class")
  })
})
