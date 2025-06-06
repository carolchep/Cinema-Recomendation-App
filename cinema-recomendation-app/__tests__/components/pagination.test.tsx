import { render, screen, fireEvent } from "@testing-library/react"
import { Pagination } from "@/components/pagination"
import { useRouter } from "next/navigation"
import jest from "jest"

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("Pagination", () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    // Setup the mock for useRouter
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders pagination with correct page numbers", () => {
    render(<Pagination currentPage={5} totalPages={10} baseUrl="/search?q=test&page=" />)

    // Should show first page, current page and neighbors, and last page
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("4")).toBeInTheDocument()
    expect(screen.getByText("5")).toBeInTheDocument()
    expect(screen.getByText("6")).toBeInTheDocument()
    expect(screen.getByText("10")).toBeInTheDocument()
  })

  it("highlights current page", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/search?q=test&page=" />)

    // Current page button should have default variant (highlighted)
    const currentPageButton = screen.getByText("3")
    expect(currentPageButton).toHaveClass("bg-primary")
  })

  it("disables previous button on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} baseUrl="/search?q=test&page=" />)

    const prevButton = screen.getByLabelText("Previous page")
    expect(prevButton).toBeDisabled()
  })

  it("disables next button on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} baseUrl="/search?q=test&page=" />)

    const nextButton = screen.getByLabelText("Next page")
    expect(nextButton).toBeDisabled()
  })

  it("navigates to previous page when previous button is clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/search?q=test&page=" />)

    const prevButton = screen.getByLabelText("Previous page")
    fireEvent.click(prevButton)

    expect(mockPush).toHaveBeenCalledWith("/search?q=test&page=2")
  })

  it("navigates to next page when next button is clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/search?q=test&page=" />)

    const nextButton = screen.getByLabelText("Next page")
    fireEvent.click(nextButton)

    expect(mockPush).toHaveBeenCalledWith("/search?q=test&page=4")
  })

  it("navigates to specific page when page number is clicked", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/search?q=test&page=" />)

    const pageButton = screen.getByText("5")
    fireEvent.click(pageButton)

    expect(mockPush).toHaveBeenCalledWith("/search?q=test&page=5")
  })

  it("does not render pagination when totalPages is 1", () => {
    const { container } = render(<Pagination currentPage={1} totalPages={1} baseUrl="/search?q=test&page=" />)

    // Container should be empty
    expect(container.firstChild).toBeNull()
  })

  it("applies custom className when provided", () => {
    render(<Pagination currentPage={3} totalPages={5} baseUrl="/search?q=test&page=" className="custom-class" />)

    // The pagination container should have the custom class
    const paginationContainer = screen.getByRole("navigation")
    expect(paginationContainer).toHaveClass("custom-class")
  })
})
