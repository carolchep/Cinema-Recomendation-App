import { render, screen, fireEvent } from "@testing-library/react"
import { YouTubePlayer } from "@/components/youtube-player"
import jest from "jest"

// Mock window.open
const mockOpen = jest.fn()
Object.defineProperty(window, "open", {
  writable: true,
  value: mockOpen,
})

describe("YouTubePlayer", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders thumbnail initially", () => {
    render(<YouTubePlayer videoId="abc123" title="Test Video" />)

    // Should show thumbnail image
    const thumbnail = screen.getByRole("img")
    expect(thumbnail).toHaveAttribute("alt", "Test Video")
    expect(thumbnail).toHaveAttribute("src", expect.stringContaining("abc123"))

    // Should show play button
    expect(screen.getByRole("button")).toBeInTheDocument()

    // Should show title
    expect(screen.getByText("Test Video")).toBeInTheDocument()
  })

  it("loads YouTube iframe when clicked", () => {
    render(<YouTubePlayer videoId="abc123" title="Test Video" />)

    // Click to load video
    fireEvent.click(screen.getByRole("img"))

    // Should now show iframe
    const iframe = screen.getByTitle("Test Video")
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute("src", expect.stringContaining("abc123"))
  })

  it("opens YouTube link when external link button is clicked", () => {
    render(<YouTubePlayer videoId="abc123" title="Test Video" />)

    // Find and click the external link button
    const externalButton = screen.getAllByRole("button")[1] // Second button is external link
    fireEvent.click(externalButton)

    expect(mockOpen).toHaveBeenCalledWith("https://www.youtube.com/watch?v=abc123", "_blank")
  })

  it("handles autoplay correctly", () => {
    render(<YouTubePlayer videoId="abc123" title="Test Video" autoPlay={true} />)

    // Click to load video
    fireEvent.click(screen.getByRole("img"))

    // Should show iframe with autoplay=1
    const iframe = screen.getByTitle("Test Video")
    expect(iframe).toHaveAttribute("src", expect.stringContaining("autoplay=1"))
  })

  it("hides title when showTitle is false", () => {
    render(<YouTubePlayer videoId="abc123" title="Test Video" showTitle={false} />)

    // Title should not be visible
    expect(screen.queryByText("Test Video")).not.toBeInTheDocument()
  })

  it("shows error state when image fails to load", () => {
    render(<YouTubePlayer videoId="abc123" title="Test Video" />)

    // Simulate image error
    const thumbnail = screen.getByRole("img")
    fireEvent.error(thumbnail)

    // Should show error message
    expect(screen.getByText("Video unavailable")).toBeInTheDocument()
    expect(screen.getByText("Open in YouTube")).toBeInTheDocument()
  })
})
