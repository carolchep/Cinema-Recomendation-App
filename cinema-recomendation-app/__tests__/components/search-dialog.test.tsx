import { render, screen, fireEvent } from "@testing-library/react"
import { SearchDialog } from "@/components/search-dialog"
import { useRouter } from "next/navigation"
import jest from "jest" // Declare the jest variable

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("SearchDialog", () => {
  const mockPush = jest.fn()
  const mockOnOpenChange = jest.fn()

  beforeEach(() => {
    // Setup the mock for useRouter
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders search dialog when open is true", () => {
    render(<SearchDialog open={true} onOpenChange={mockOnOpenChange} />)

    // Check if dialog title is rendered
    expect(screen.getByText("Search Movies")).toBeInTheDocument()

    // Check if search input is rendered
    expect(screen.getByPlaceholderText("Search for movies...")).toBeInTheDocument()

    // Check if search button is rendered
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })

  it("does not render dialog content when open is false", () => {
    render(<SearchDialog open={false} onOpenChange={mockOnOpenChange} />)

    // Dialog content should not be in the document
    expect(screen.queryByText("Search Movies")).not.toBeInTheDocument()
  })

  it("updates input value when user types", () => {
    render(<SearchDialog open={true} onOpenChange={mockOnOpenChange} />)

    const input = screen.getByPlaceholderText("Search for movies...")

    // Simulate user typing
    fireEvent.change(input, { target: { value: "inception" } })

    // Check if input value is updated
    expect(input).toHaveValue("inception")
  })

  it("navigates to search page and closes dialog on form submission", () => {
    render(<SearchDialog open={true} onOpenChange={mockOnOpenChange} />)

    const input = screen.getByPlaceholderText("Search for movies...")
    const form = screen.getByRole("form")

    // Simulate user typing and submitting the form
    fireEvent.change(input, { target: { value: "inception" } })
    fireEvent.submit(form)

    // Check if router.push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/search?q=inception")

    // Check if onOpenChange was called to close the dialog
    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it("does not navigate or close dialog if search query is empty", () => {
    render(<SearchDialog open={true} onOpenChange={mockOnOpenChange} />)

    const form = screen.getByRole("form")

    // Submit the form without entering any query
    fireEvent.submit(form)

    // Check that router.push was not called
    expect(mockPush).not.toHaveBeenCalled()

    // Check that onOpenChange was not called
    expect(mockOnOpenChange).not.toHaveBeenCalled()
  })

  it("trims whitespace from search query", () => {
    render(<SearchDialog open={true} onOpenChange={mockOnOpenChange} />)

    const input = screen.getByPlaceholderText("Search for movies...")
    const form = screen.getByRole("form")

    // Simulate user typing with extra spaces
    fireEvent.change(input, { target: { value: "  inception  " } })
    fireEvent.submit(form)

    // Check if router.push was called with the trimmed query
    expect(mockPush).toHaveBeenCalledWith("/search?q=inception")
  })
})
