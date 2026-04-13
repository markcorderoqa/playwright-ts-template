# Test Review Template

Use this checklist during PR review for test changes.

## Scope
- What behavior is covered?
- Which suite(s) changed (`smoke`, `e2e`, `api`, `visual`, `a11y`)?

## Quality Checklist
- [ ] Uses page/component abstractions (no selector plumbing in test body).
- [ ] No hard waits or brittle selectors.
- [ ] Deterministic setup/teardown.
- [ ] Assertions validate user outcome (not just action completion).
- [ ] Locator policy checks pass.

## Reliability Checklist
- [ ] Retry usage is justified for this suite.
- [ ] Failure artifacts are available (trace/screenshot/video).
- [ ] Flaky behavior (if any) includes triage notes and mitigation plan.

## CI Checklist
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] Relevant suite command(s) pass.
- [ ] CI artifacts and quality summary are attached.

## Reviewer Verdict
- Decision: `APPROVE` / `CHANGES_REQUESTED`
- Notes:
  - ...
