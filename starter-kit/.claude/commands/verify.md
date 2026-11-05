---
description: Prove the app meets the spec - tests, types, lint, browser walk-through, edge cases
---
Verify the current state against `specs/spec.md`. Don't fix anything in this pass; just report.

1. Run tests, typecheck, lint and build. Paste the summary lines.
2. For each acceptance criterion, check it in the running app (Playwright) and mark PASS / FAIL with evidence (what you did, what you saw).
3. Try these edge cases: empty input, very long input, special characters, double submit, slow or failed AI call, logged-out user, mobile width (375px).
4. List console errors and failed network requests.
5. Output a table: criterion / edge case · result · evidence · suggested fix. End with the 3 most important fixes.
