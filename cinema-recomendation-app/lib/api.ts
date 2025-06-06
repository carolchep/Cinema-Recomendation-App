// Client-side API functions for React Query

export async function fetchFeaturedMovies() {
  const res = await fetch("/api/movies/featured")
  if (!res.ok) throw new Error("Failed to fetch featured movies")
  return res.json()
}

export async function fetchNewReleases() {
  const res = await fetch("/api/movies/new")
  if (!res.ok) throw new Error("Failed to fetch new releases")
  return res.json()
}

export async function fetchExclusiveVideos() {
  const res = await fetch("/api/movies/exclusive")
  if (!res.ok) throw new Error("Failed to fetch exclusive videos")
  return res.json()
}

export async function fetchFeaturedCasts() {
  const res = await fetch("/api/movies/casts")
  if (!res.ok) throw new Error("Failed to fetch featured casts")
  return res.json()
}

export async function fetchMovieDetails(movieId: number) {
  const res = await fetch(`/api/movies/${movieId}`)
  if (!res.ok) throw new Error("Failed to fetch movie details")
  return res.json()
}

export async function fetchMovieCredits(movieId: number) {
  const res = await fetch(`/api/movies/${movieId}/credits`)
  if (!res.ok) throw new Error("Failed to fetch movie credits")
  return res.json()
}

export async function fetchMovieRecommendations(movieId: number) {
  const res = await fetch(`/api/movies/${movieId}/recommendations`)
  if (!res.ok) throw new Error("Failed to fetch movie recommendations")
  return res.json()
}
