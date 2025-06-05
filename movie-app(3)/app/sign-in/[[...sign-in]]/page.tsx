import { SignIn } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-sm">
          <div className="mb-6 flex flex-col items-center space-y-2 text-center">
            <Link href="/" className="mb-6">
              <Image src="/logo.svg" alt="CineRec Logo" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-sm text-muted-foreground">Enter your email below to sign in to your account</p>
          </div>
          <div className="grid gap-4">
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  socialButtonsBlockButton: "bg-muted hover:bg-muted/80 text-white",
                  formFieldInput: "bg-muted border-zinc-800 text-white",
                  formButtonPrimary: "bg-primary hover:bg-primary/90",
                  footerActionText: "text-muted-foreground",
                  footerActionLink: "text-primary hover:text-primary/90",
                },
              }}
            />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
