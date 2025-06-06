# Movie Recommendation Application

A modern movie recommendation application built with Next.js, React Query, and shadcn/ui components. This application allows users to browse movies, search for specific titles, view detailed information, and get personalized recommendations.

## Features

- **Authentication**: User authentication with Next-auth
- **Movie Browsing**: Browse featured movies, new releases, and exclusive content
- **Movie Details**: View comprehensive information about movies including cast, crew, and recommendations
- **Search Functionality**: Search for movies by title or keyword with pagination
- **Responsive Design**: Fully responsive UI that works on all device sizes
- **Performance Optimized**: Efficient data fetching and caching with React Query
- **Comprehensive Testing**: Unit tests for components and services

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Next-auth
- **Data Fetching**: React Query (TanStack Query)
- **API**: TMDB (The Movie Database)
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 
- TMDB API key

3. Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

Run the test suite:
\`\`\`bash
npm test
\`\`\`

Run tests with coverage:
\`\`\`bash
npm run test:coverage
\`\`\`

## Deployment

The application is automatically deployed to Vercel when changes are pushed to the main branch. The CI/CD pipeline runs linting, tests, and builds before deployment.

## Project Structure

\`\`\`
├── app/                  # Next.js App Router
│   ├── api/              # API routes
│   ├── movies/           # Movie details pages
│   ├── search/           # Search page
│   ├── sign-in/          # Authentication pages
│   └── sign-up/
├── components/           # React components
├── lib/                  # Utility functions and API clients
├── public/               # Static assets
└── __tests__/            # Test files
\`\`\`
