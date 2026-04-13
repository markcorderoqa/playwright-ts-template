# Testing Standards

## Core Principles
- Prefer user-facing locators (`getByRole`, `getByLabel`) over CSS selectors.
- Never use hard waits (`waitForTimeout`).
- Keep tests deterministic: setup and teardown must not depend on execution order.
- Use fixtures and page/component objects for reuse.

## Required Quality Gates
- `npm run lint`
- `npm run typecheck`
- `npm test`

## Naming and Taxonomy
- Smoke tests in `tests/smoke`.
- Critical user journeys in `tests/e2e`.
- Endpoint checks in `tests/api` with `@api`.
- Visual baseline tests in `tests/visual` with `@visual`.
- Accessibility tests in `tests/a11y` with `@a11y`.

## Visual and Accessibility Rules
- Visual checks are mandatory for:
  - Core landing pages and high-traffic user journeys after UI layout/theme changes.
  - Shared components whose regressions impact multiple pages.
- Accessibility checks are mandatory for:
  - New pages or major page rewrites.
  - New interactive components (buttons, forms, dialogs, navigation).
- Scope visual snapshots to stable containers (`main`, component roots), and mask known dynamic elements.
- Scope a11y scans to meaningful regions when full-page scans are noisy, and document scope in test attachments.
- If visual/a11y coverage is skipped, add a PR note with reason and follow-up task.

## Reliability and Flake Control
- Retry policy is suite-based, not global:
  - E2E: retries allowed.
  - API: minimal retries.
  - Visual: no retries.
  - A11y: minimal retries.
- Keep visual and a11y suites non-parallel where determinism is required.
- Required failure artifacts are trace, screenshot, and video on failures.
- Any flaky test must include triage notes in PR with:
  - failure signature
  - reproduction command
  - stabilization action or follow-up issue
- Use `npm run test:reliability` before merging high-risk UI changes.

## Pull Request Checklist
- Tests include assertions on expected outcomes.
- Flake risk documented when retry is needed.
- New selectors follow locator policy.
