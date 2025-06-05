"use client"

// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
import jest from "jest"

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    return null
  }
  unobserve() {
    return null
  }
  disconnect() {
    return null
  }
}

global.IntersectionObserver = MockIntersectionObserver

// Mock fetch
global.fetch = jest.fn()

// Mock next/router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: "/",
      query: {},
    }
  },
  useSearchParams() {
    return {
      get: jest.fn(),
    }
  },
  usePathname() {
    return "/"
  },
}))

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />
  },
}))

// Mock NextAuth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { user: { id: "test-user-id", name: "Test User", email: "test@example.com" } },
    status: "authenticated",
  })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }) => <div>{children}</div>,
}))

jest.mock("next-auth/next", () => ({
  getServerSession: jest.fn(() => ({
    user: { id: "test-user-id", name: "Test User", email: "test@example.com" },
  })),
}))

// Mock React Query
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    data: undefined,
    isLoading: false,
    error: null,
  })),
  QueryClient: jest.fn(() => ({
    prefetchQuery: jest.fn(),
  })),
  QueryClientProvider: ({ children }) => <div>{children}</div>,
}))
