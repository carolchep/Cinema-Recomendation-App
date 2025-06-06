import { render, screen, fireEvent } from "@testing-library/react"
import { SearchForm } from "@/components/search-form"
import { useRouter } from "next/navigation"
import jest from "jest" // Declare the jest variable

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("SearchForm", () => {
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

  it("renders search form with empty input by default", () => {
    render(<SearchForm />)

    // Check if input is rendered
    const input = screen.getByPlaceholderText("Search for movies...")
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue("")

    // Check if button is rendered
    const button = screen.getByRole("button", { name: "Search" })
    expect(button).toBeInTheDocument()
  })

  it("renders search form with initial query when provided", () => {
    render(<SearchForm initialQuery="star wars" />)

    // Check if input has the initial value
    const input = screen.getByPlaceholderText("Search for movies...")
    expect(input).toHaveValue("star wars")
  })

  it("updates input value when user types", () => {
    render(<SearchForm />)

    const input = screen.getByPlaceholderText("Search for movies...")

    // Simulate user typing
    fireEvent.change(input, { target: { value: "inception" } })

    // Check if input value is updated
    expect(input).toHaveValue("inception")
  })

  it("navigates to search page on form submission", () => {
    render(<SearchForm />)

    const input = screen.getByPlaceholderText("Search for movies...")
    const form = screen.getByRole("search")

    // Simulate user typing and submitting the form
    fireEvent.change(input, { target: { value: "inception" } })
    fireEvent.submit(form)

    // Check if router.push was called with the correct URL
    expect(mockPush).toHaveBeenCalledWith("/search?q=inception")
  })

  it("does not navigate if search query is empty", () => {
    render(<SearchForm />)

    const form = screen.getByRole("search")

    // Submit the form without entering any query
    fireEvent.submit(form)

    // Check that router.push was not called
    expect(mockPush).not.toHaveBeenCalled()
  })

  it("trims whitespace from search query", () => {
    render(<SearchForm />)

    const input = screen.getByPlaceholderText("Search for movies...")
    const form = screen.getByRole("search")

    // Simulate user typing with extra spaces
    fireEvent.change(input, { target: { value: "  inception  " } })
    fireEvent.submit(form)

    // Check if router.push was called with the trimmed query
    expect(mockPush).toHaveBeenCalledWith("/search?q=inception")
  })
})
