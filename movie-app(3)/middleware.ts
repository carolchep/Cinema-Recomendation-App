import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

const protectedPaths = ["/profile", "/favorites", "/settings"]

const authPaths = ["/auth/signin", "/auth/signup"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))

  if (!isProtectedPath && !isAuthPath) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request })


  if (isProtectedPath && !token) {
    const url = new URL("/auth/signin", request.url)
    url.searchParams.set("callbackUrl", encodeURI(request.url))
    return NextResponse.redirect(url)
  }

  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that don't require auth
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api/movies|logo.svg).*)",
  ],
}
