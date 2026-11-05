# CLAUDE.md

<!-- Keep this file under ~150 lines. It is read at the start of every session.
     Facts and conventions go here; rules that must ALWAYS hold go in .claude/settings.json hooks. -->

## Product
- What: [one sentence: product, user, job to be done]
- Current spec: @specs/spec.md   <!-- or specs/<feature>/spec.md if you use Spec Kit -->
- Success metric: [north-star] · Guardrail: [e.g. AI suggestion rejection rate < 30%]

## Stack
- Next.js (App Router) + TypeScript (strict) + Tailwind + shadcn/ui
- Supabase: Postgres, auth, storage. Row-level security on EVERY table.
- AI calls only in server code (`app/api/**` or server actions). Keys from `process.env`, never in client code.
- LLM output is validated with zod; every AI call has a timeout and a non-AI fallback.
- Deploy: Vercel. Env vars documented in `.env.example`.

## Commands
- `pnpm dev` · `pnpm test` · `pnpm lint` · `pnpm typecheck` · `pnpm build`
- E2E: `pnpm exec playwright test`

## How we work
- Workflow lane: [Spec Kit | SDD-lite with /kickoff → /slice → /verify → /ship]. Don't mix lanes.
- Plan before multi-file changes. Ask when the spec is ambiguous instead of guessing.
- One task at a time from `tasks.md`; tick it when its acceptance criteria pass.
- Write or update tests for every acceptance criterion. Never say "done" without running them.
- Find the root cause before fixing a bug. If a fix fails twice, stop and propose alternatives.
- Small commits with clear messages after each working step.
- Don't add dependencies without saying why. Prefer boring, well-documented libraries.

## Conventions
- Components in `components/`, server logic in `lib/server/`, DB types generated from Supabase.
- Accessible by default: labels, focus states, keyboard navigation, AA contrast.
- Every list has an empty state; every async action has loading and error states.

## Gotchas
- [Add things Claude got wrong more than once, e.g. "use the Supabase server client in route handlers"]
