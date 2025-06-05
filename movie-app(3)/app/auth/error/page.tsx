"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  const getErrorMessage = () => {
    switch (error) {
      case "Configuration":
        return "There is a problem with the server configuration. Please contact support."
      case "AccessDenied":
        return "Access denied. You do not have permission to sign in."
      case "Verification":
        return "The verification link is invalid or has expired."
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
        return "There was a problem with the authentication service. Please try again."
      case "OAuthAccountNotLinked":
        return "This email is already associated with another account. Please sign in using the original provider."
      case "EmailSignin":
        return "The email could not be sent. Please try again."
      case "CredentialsSignin":
        return "The sign in details you provided were invalid. Please check your details and try again."
      case "SessionRequired":
        return "You must be signed in to access this page."
      default:
        return "An unexpected error occurred. Please try again."
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="mb-6">
              <Image src="/logo.svg" alt="CineRec Logo" width={120} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <div className="flex items-center justify-center mb-2">
                <div className="rounded-full bg-red-900/20 p-3">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-center">Authentication Error</CardTitle>
              <CardDescription className="text-center">There was a problem signing you in</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">{getErrorMessage()}</p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/auth/signin">Try Again</Link>
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
