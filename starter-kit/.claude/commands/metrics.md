---
description: Define success metrics and instrument them (events + a simple dashboard query)
argument-hint: "[product goal]"
---
Goal: $ARGUMENTS (if empty, read it from specs/spec.md).

1. Propose a metric tree: north-star → 3 input metrics → 2 guardrails. Each must be measurable from events we can log.
2. Define the analytics events (name, when it fires, properties) in a table. Never include raw PII or free-text notes in properties.
3. Add the event calls to the code behind a single `track()` helper (PostHog if configured, otherwise a console/DB logger).
4. Write the SQL (or PostHog insight description) for the north-star and one guardrail.
5. Propose one experiment to move the north-star: hypothesis, variant, success criterion, minimum sample/duration.
