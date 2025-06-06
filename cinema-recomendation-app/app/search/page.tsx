import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SearchResults } from "@/components/search-results"
import { SearchForm } from "@/components/search-form"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchPageProps {
  searchParams: {
    q?: string
    page?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const page = Number.parseInt(searchParams.page || "1")

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Search Movies</h1>
            <SearchForm initialQuery={query} />
          </div>

          {query ? (
            <Suspense key={query + page} fallback={<SearchResultsSkeleton />}>
              <SearchResults query={query} page={page} />
            </Suspense>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Enter a search term to find movies</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function SearchResultsSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-full max-w-md mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-[2/3] rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
      </div>
    </div>
  )
}
