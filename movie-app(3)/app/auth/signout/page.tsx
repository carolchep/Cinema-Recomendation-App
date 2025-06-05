"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SignOutPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut({ callbackUrl: "/" })
  }

  const handleCancel = () => {
    router.back()
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
                <div className="rounded-full bg-amber-900/20 p-3">
                  <LogOut className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <CardTitle className="text-center">Sign Out</CardTitle>
              <CardDescription className="text-center">Are you sure you want to sign out?</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center space-x-4">
              <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleSignOut} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-r-transparent" />
                    Signing out...
                  </>
                ) : (
                  "Sign Out"
                )}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-center text-sm text-muted-foreground">
                You will be redirected to the home page after signing out.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
