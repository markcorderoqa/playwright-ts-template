# Framework Maintenance Playbook

## Weekly
- Review flaky test trend in CI artifacts and reports.
- Verify no new locator policy violations were introduced.
- Re-run `npm run test:reliability` for unstable feature areas.

## Monthly
- Update dependencies (`npm outdated`) and apply safe upgrades.
- Rebaseline visual snapshots only for approved UI changes.
- Audit a11y scan summaries and track recurring violations.

## Release Readiness
- Run full suite: `npm test`.
- Generate quality summary: `npm run report:quality`.
- Confirm CI pipeline green on shard matrix.
- Ensure docs are updated for new patterns or standards.

## Incident Response (Flaky/Failing Tests)
1. Capture failure signature from trace/video/screenshot.
2. Reproduce with focused command (`npm run test:e2e -- --grep "..."`).
3. Apply stabilization change (selector, wait strategy, test data isolation).
4. Document root cause and fix in PR.
5. Add follow-up hardening task if unresolved.
