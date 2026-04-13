# Playwright TypeScript Starter Template

Reusable Playwright + TypeScript framework template for quickly bootstrapping automation in a new project.

This repository keeps:
- Example tests across `smoke`, `e2e`, `api`, `visual`, and `a11y`
- Sample data/factories in `src/data`
- Page Object + component structure
- CI workflow and quality scripts

## Use This Template

### Option 1: GitHub Template Repository (Recommended)

1. Push this folder to a GitHub repository (for example: `playwright-ts-starter-template`).
2. In GitHub repo settings, enable **Template repository**.
3. When starting a new automation project, click **Use this template**.
4. Clone your newly created project repo and start implementing tests.

### Option 2: Clone Directly

1. Create a new GitHub repository from this folder.
2. Clone it locally:
   - `git clone <your-new-repo-url>`
3. Install dependencies:
   - `npm ci`
4. Install Playwright browser:
   - `npx playwright install chromium`
5. Run the full suite:
   - `npm test`

## Recommended GitHub Repository Settings

- Add branch protection on `main` (require pull request + passing checks).
- Keep `.github/workflows/playwright.yml` enabled for CI validation.
- Enable Dependabot/version update PRs if your org allows it.
- Use repository labels for test work types (`smoke`, `e2e`, `api`, `a11y`, `visual`).

## Setup For A New Project

1. Update project metadata in `package.json` (`name`, `description`, `author`, `license`).
2. Set your target environments in `src/config/env.ts`.
3. Update projects/browsers/tags in `src/config/projects.ts` and `playwright.config.ts`.
4. Replace or extend page objects in `src/pages` and components in `src/components`.
5. Keep example tests as references, then add new specs under `tests/*`.

## Helpful Commands

- `npm run lint`
- `npm run lint:all`
- `npm run typecheck`
- `npm run test:smoke`
- `npm run test:e2e`
- `npm run test:api`
- `npm run test:visual`
- `npm run test:a11y`
- `npm run test:ui`
- `npm run report:quality`

## Folder Guide

- `src/config` - environment and project configuration
- `src/pages` - page objects
- `src/components` - shared component abstractions
- `src/fixtures` - custom Playwright fixtures
- `src/api` - API clients for hybrid flows
- `src/data` - test data factories/builders
- `src/assertions` - custom assertions
- `tests` - executable examples by test type
- `docs` - architecture, standards, and maintenance docs
- `scripts` - policy and CI helper scripts

## Notes

- Do not commit `.env`; use `.env.example` as the baseline.
- Keep quality checks (`lint`, `typecheck`, `test`) green before pushing.
- Keep example tests/data so new team members can follow the framework pattern quickly.
