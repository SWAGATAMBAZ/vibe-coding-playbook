---
description: Turn a one-line product prompt into a scoped SDD-lite spec (interview or new feature)
argument-hint: "<one-line product prompt>"
---
We're starting: $ARGUMENTS

Do NOT write code yet. Work with me in this order, one short message per step, and wait for my answer each time:

1. Restate the prompt in one sentence and ask me the business goal (acquisition, engagement, retention, revenue, cost).
2. Offer 3 user segments with their main pain in a compact table. I pick one.
3. Offer 3 solution directions for that pain. I pick or edit one.
4. Propose must-haves (max 4) and an explicit out-of-scope list. I confirm.
5. Write `specs/spec.md` with: What & why (user, pain, goal, success metric, guardrail metric) · Stories with Given/When/Then acceptance criteria (max 5) · Edge cases · Where AI is used + fallback when it's wrong · Data model · Out of scope · [ASSUMPTION] markers.
6. Write `tasks.md`: ordered, vertical slices, each small enough to build and verify in one go, first one = happy path with mock data.

Keep each message short. Recommend an answer with each question so I can just say "yes".
