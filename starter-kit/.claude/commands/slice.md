---
description: Implement the next unchecked task in tasks.md, test it, verify it, tick it, commit
argument-hint: "[optional task number]"
---
Read `specs/spec.md` (or the active specs/<feature>/spec.md) and `tasks.md`.
Pick task $ARGUMENTS, or the first unchecked task if none was given.

1. In 3–5 bullets, say which files you'll touch and how you'll verify the task against its acceptance criteria. Wait for "go" only if the plan touches more than 5 files.
2. Write or update tests for the acceptance criteria first and run them to see them fail.
3. Implement the minimum to pass. Don't touch unrelated code or add unrequested features.
4. Run tests, lint and typecheck. If a check fails, find the root cause before changing code.
5. If the task has UI, open it with Playwright, walk the flow, and check the console for errors.
6. Tick the task in tasks.md, then commit with a clear message.
7. Report: what changed, how it was verified, anything I should look at.
