const TMDB_API_KEY = process.env.TMDB_API_KEY
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

// Cache for API responses
const cache = new Map()
const CACHE_TTL = 1000 * 60 * 5 // 5 minutes

// Helper function to make API requests with caching
async function fetchWithCache(url: string) {
  const cacheKey = url

  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey)
    if (Date.now() - timestamp < CACHE_TTL) {
      return data
    }
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`)
  }

  const data = await response.json()
  cache.set(cacheKey, { data, timestamp: Date.now() })

  return data
}

// Get trending movies for the hero section
export async function getFeaturedMovies() {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/trending/movie/day?language=en-US`)
  return data.results.slice(0, 5)
}

// Get new releases
export async function getNewReleases() {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`)
  return data.results
}

// Get popular movies
export async function getPopularMovies() {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`)
  return data.results
}

// Get top rated movies
export async function getTopRatedMovies() {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`)
  return data.results
}

// Get upcoming movies
export async function getUpcomingMovies() {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`)
  return data.results
}

// Get exclusive videos (using popular movies with videos)
export async function getExclusiveVideos() {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`)

  const videos = []

  // Get videos for the first 5 popular movies
  for (const movie of data.results.slice(0, 5)) {
    try {
      const videoData = await fetchWithCache(`${TMDB_BASE_URL}/movie/${movie.id}/videos?language=en-US`)

      if (videoData.results && videoData.results.length > 0) {
        // Find a trailer or teaser
        const trailer = videoData.results.find((v: any) => v.type === "Trailer" || v.type === "Teaser")

        if (trailer) {
          videos.push({
            id: trailer.id,
            key: trailer.key,
            name: movie.title,
            site: trailer.site,
            type: trailer.type,
          })
        }
      }
    } catch (error) {
      console.error(`Error fetching videos for movie ${movie.id}:`, error)
    }
  }

  return videos
}

// Get featured cast members (using popular people)
export async function getFeaturedCasts() {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/person/popular?language=en-US&page=1`)
  return data.results
}

// Get movie details
export async function getMovieDetails(movieId: number) {
  return fetchWithCache(`${TMDB_BASE_URL}/movie/${movieId}?language=en-US&append_to_response=videos,images`)
}

// Get movie videos
export async function getMovieVideos(movieId: number) {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`)
  return data.results
}

// Get movie credits
export async function getMovieCredits(movieId: number) {
  return fetchWithCache(`${TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`)
}

// Get movie recommendations
export async function getMovieRecommendations(movieId: number) {
  const data = await fetchWithCache(`${TMDB_BASE_URL}/movie/${movieId}/recommendations?language=en-US&page=1`)
  return data.results
}

// Search movies
export async function searchMovies(query: string, page = 1) {
  return fetchWithCache(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
  )
}
