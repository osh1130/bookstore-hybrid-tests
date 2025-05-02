# Bookstore Hybrid Tests (Playwright + TypeScript)

This repository contains a modular and maintainable automated testing framework that covers both API and UI layers using Playwright and TypeScript. Designed for scalability and team collaboration, the project integrates seamlessly into CI/CD pipelines via GitHub Actions.

## Project Highlights

- Hybrid test structure: API, UI, and end-to-end workflows
- Role-based test isolation (Admin, User, Guest)
- Storage state reuse for authenticated sessions
- Page Object Model (POM) and injected fixtures
- CI/CD integration via GitHub Actions

## Project Structure

```
tests/
├── specs/           # Test cases
│   ├── api/         # API-only tests
│   ├── ui/          # UI-only tests
│   └── hybrid/      # Combined API + UI scenarios
│
├── fixtures/        # Contexts and reusable setup
│   ├── api/         # Low-level API capabilities
│   ├── roles/       # Role-specific context injection
│   └── ui/          # Page Object fixture bindings
│
├── api/             # Low-level HTTP logic
│   ├── endpoints/   # Individual endpoint wrappers
│   └── requests/    # Combined operations (e.g., addBookAndVerify)
│
├── pages/           # Page Object Models
├── data/            # Static test data (users, books, etc.)
├── utils/           # Helpers, constants, environment variables
```

## Key Features

### Authentication & Role Context

- Fixtures manage session and token reuse via `storageState`
- Custom helpers like `loginAsAdmin()` or `createUser()` for test setup
- Role-specific fixtures (admin, user, guest) allow isolated, reusable test contexts

### Testing Strategy

- Full status code validation: 200, 400, 401, 403, 404
- Field validation: required fields, invalid formats, boundary values
- Authorization checks: valid token, missing token, mismatched token
- Visual regression testing using Playwright snapshot features
- Data-driven tests using inline parameterization and static test data

### Page Object Model (POM)

UI interactions are encapsulated in `pages/` using clear, reusable APIs:
```ts
await loginPage.goto();
await loginPage.login('username', 'password');
```

### CI/CD Integration

- GitHub Actions workflow configured for automated testing
- All tests triggered on PRs and main branch commits
- HTML test reports generated for failures and diagnostics

## Common Commands

Run all tests:
```
npx playwright test
```

Run only smoke tests:
```
npx playwright test --project=smoke
```

Show HTML test report:
```
npx playwright show-report
```

## Environment Variables

Define your environment-specific variables in a `.env` file:
```
BASE_URL=https://demoqa.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=adminPass123
```

## Test Coverage Strategy

### API Coverage
- 100% test coverage for all documented API endpoints (GET, POST, PUT, DELETE)
- Each feature is covered with both happy-path and edge-case tests

### Status Code Handling
- Validates correct responses for success and common error scenarios:
  - 200 OK
  - 400 Bad Request
  - 401 Unauthorized
  - 403 Forbidden
  - 404 Not Found

### Parameter Validation
- Tests for required fields, boundary limits, and incorrect data formats

### Authorization Logic
- Verifies behavior with valid/invalid tokens, or with tokens from other users

### Workflow Testing
- Full end-to-end flow coverage:
  - Add book → Query list → Delete book → Confirm deletion
  - Multiple add/delete cycles to verify state consistency

## Design Principles

- Layered structure: `endpoints` → `requests` → `fixtures` → `specs`
- Clear separation of responsibilities
- High reusability of test logic and utilities
- Minimized setup code in test files using fixtures and helpers
- Scalable and CI-ready

## Results

- Reduced manual regression time by over 70%
- Stable integration with CI/CD workflows
- Improved onboarding speed with well-structured templates and fixtures

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Configure the `.env` file
4. Execute tests using `npx playwright test`

## Author

Maintained by Vivi Zhao. Designed for advanced Playwright testing scenarios, including multi-role systems and hybrid workflows.
