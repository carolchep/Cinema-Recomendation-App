# Contributing to Movie Recommendation App

Thank you for considering contributing to our movie recommendation application! This document provides guidelines and instructions for contributing.

## Development Process

We use a feature branch workflow:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests locally (`npm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Pull Request Process

1. Ensure your code passes all tests and linting
2. Update documentation if necessary
3. Add a clear description of the changes
4. Link any related issues
5. Request review from maintainers

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code changes that neither fix bugs nor add features
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Changes to the build process or auxiliary tools

## Code Style

- Follow the ESLint configuration
- Write tests for new features
- Maintain type safety with TypeScript

## Setting Up Development Environment

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with required environment variables
4. Start the development server: `npm run dev`

## Running Tests

- Run all tests: `npm test`
- Run tests in watch mode: `npm run test:watch`
- Check test coverage: `npm run test:coverage`

## CI/CD Pipeline

Our GitHub Actions workflow automatically:

1. Runs linting checks
2. Executes tests
3. Builds the application
4. Deploys to Vercel (preview for PRs, production for main branch)

## Questions?

If you have any questions, feel free to open an issue or contact the maintainers.
