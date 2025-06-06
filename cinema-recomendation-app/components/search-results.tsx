import { MovieCard } from "@/components/movie-card"
import { Pagination } from "@/components/pagination"
import { searchMovies } from "@/lib/tmdb"

interface SearchResultsProps {
  query: string
  page: number
}

export async function SearchResults({ query, page }: SearchResultsProps) {
  const results = await searchMovies(query, page)

  if (!results.results || results.results.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No results found</h2>
        <p className="text-muted-foreground mt-2">Try searching for something else</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-6">
        Found {results.total_results} results for &quot;{query}&quot;
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {results.results.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={Math.min(results.total_pages, 500)}
        baseUrl={`/search?q=${encodeURIComponent(query)}&page=`}
        className="mt-8"
      />
    </div>
  )
}
