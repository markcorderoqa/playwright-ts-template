# Test Taxonomy and Naming

## Suite Types
- `tests/smoke`: minimal critical-path checks for fast confidence.
- `tests/e2e`: full user journeys and cross-feature behavior.
- `tests/api`: endpoint and HTTP contract checks.
- `tests/visual`: snapshot-based regression checks.
- `tests/a11y`: accessibility checks with scoped axe scans.

## Tagging Conventions
- `@api`: tests that run in the API project.
- `@visual`: tests that run in visual project.
- `@a11y`: tests that run in accessibility project.
- `@smoke`: core checks for quick post-change confidence.

## Naming Standards
- Test files: `<feature>.<type>.spec.ts`
  - Examples: `home.visual.spec.ts`, `home.a11y.spec.ts`
- Test titles follow behavior format:
  - `Given ... When ... Then ...` or concise user-outcome phrasing.
- `test.step` descriptions should describe business intent, not selectors.

## Ownership and Review
- Every new test should declare clear suite placement and expected runtime profile.
- Any flaky test must include a stabilization note in PR and a linked follow-up task.
