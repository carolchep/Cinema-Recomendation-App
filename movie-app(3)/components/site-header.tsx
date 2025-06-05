"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { SearchDialog } from "@/components/search-dialog"
import { useState } from "react"
import { AuthButton } from "@/components/auth/auth-button"

export function SiteHeader() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/logo.svg" alt="CineRec Logo" width={120} height={40} className="h-8 w-auto" />
        </Link>
        <nav className="flex flex-1 items-center space-x-1 sm:space-x-2">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              pathname === "/" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              pathname?.startsWith("/movies") ? "text-foreground" : "text-foreground/60",
            )}
          >
            Movies
          </Link>
          <Link
            href="/search"
            className={cn(
              "text-sm font-medium transition-colors hover:text-foreground/80",
              pathname?.startsWith("/search") ? "text-foreground" : "text-foreground/60",
            )}
          >
            Search
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            className="text-foreground/60 hover:text-foreground"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <AuthButton />
        </div>
      </div>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
