"use client"

import { render, screen } from "@testing-library/react"
import { VideoModal } from "@/components/video-modal"
import jest from "jest"

// Mock the child components
jest.mock("@/components/youtube-player", () => ({
  YouTubePlayer: ({ videoId, title }: any) => (
    <div data-testid="youtube-player">
      YouTube Player: {videoId} - {title}
    </div>
  ),
}))

describe("VideoModal", () => {
  const mockVideo = {
    id: "1",
    key: "abc123",
    name: "Test Trailer",
    site: "YouTube",
    type: "Trailer",
  }

  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders YouTube player for YouTube videos", () => {
    render(<VideoModal isOpen={true} onClose={mockOnClose} video={mockVideo} />)

    expect(screen.getByTestId("youtube-player")).toBeInTheDocument()
    expect(screen.getByText("YouTube Player: abc123 - Test Trailer")).toBeInTheDocument()
  })

  it("renders Vimeo iframe for Vimeo videos", () => {
    const vimeoVideo = { ...mockVideo, site: "Vimeo", key: "123456789" }
    render(<VideoModal isOpen={true} onClose={mockOnClose} video={vimeoVideo} />)

    const iframe = screen.getByTitle("Test Trailer")
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute("src", expect.stringContaining("vimeo.com/video/123456789"))
  })

  it("shows unsupported message for unknown video types", () => {
    const unknownVideo = { ...mockVideo, site: "Unknown" }
    render(<VideoModal isOpen={true} onClose={mockOnClose} video={unknownVideo} />)

    expect(screen.getByText("Video format not supported")).toBeInTheDocument()
  })

  it("displays video title and type", () => {
    render(<VideoModal isOpen={true} onClose={mockOnClose} video={mockVideo} />)

    expect(screen.getByText("Test Trailer")).toBeInTheDocument()
    expect(screen.getByText("Trailer")).toBeInTheDocument()
  })

  it("does not render when isOpen is false", () => {
    render(<VideoModal isOpen={false} onClose={mockOnClose} video={mockVideo} />)

    expect(screen.queryByTestId("youtube-player")).not.toBeInTheDocument()
  })
})
