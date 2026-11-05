---
description: Save progress to HANDOFF.md so a fresh session (after /clear) can continue cleanly
---
Write `HANDOFF.md` (overwrite it) with:
- Goal and the active spec file
- Done so far (tasks ticked, with commit hashes)
- In progress: exact state, what was being tried, what failed and why
- Decisions made and the reason for each
- Next 3 steps, in order
- Gotchas discovered (also propose any that belong in CLAUDE.md)

Under 60 lines. Then tell me: "Run /clear, then say: read HANDOFF.md and continue."
