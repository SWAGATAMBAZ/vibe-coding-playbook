# Vibe Coding Playbook

**Live site:** https://swagatambaz.github.io/vibe-coding-playbook/

Master vibe coding with Claude Code as an AI PM: clear vibe coding interviews and build any AI product (personalization trackers, RAG assistants, agents, dashboards) with a lean, non-overlapping set of skills and MCP connectors and a spec-driven workflow.

## What's inside (17 pages)

| Section | Pages |
|---|---|
| Start | 4-week roadmap, tool-by-moment table, 10-minute setup |
| Interview | 5-step framework (Clarify → Spec → Build → Verify → Metrics) with a minute-by-minute plan and self-scoring rubric · 45-min timed drill with 40 mock prompts and curveballs · copy-paste prompt library |
| Claude Code | Essentials (CLAUDE.md, plan mode, commands, subagents, hooks) · **the skill stack: one pick per task** with an install-script builder · MCP & connectors (by job and by industry, safety, build your own server) · spec-driven development with GitHub Spec Kit · starter kit |
| Build | Default stack (Next.js, Tailwind, shadcn/ui, Supabase, Vercel) and the safe LLM call pattern · system design and the API gateway · database chooser · AI agents with n8n, LangGraph and the Claude Agent SDK · security for vibe-coded apps |
| Solutions | Fully worked AI personalization tracker · 18 blueprints by industry |
| Reference | One-page cheat sheet and sources |

## One-file setup (any laptop)

In your project folder's terminal:

```bash
curl -fsSL https://raw.githubusercontent.com/SWAGATAMBAZ/vibe-coding-playbook/main/SETUP.md -o SETUP.md
```

Then tell Claude Code: `Follow @SETUP.md with the core profile`. Profiles: `core`, `interview`, `ai`, `full`. It also installs itself as `/setup-vibe-stack`, so later projects on the same computer only need `/setup-vibe-stack core`.

## Starter kit

[`starter-kit/`](starter-kit/) holds files to copy into any project: a `CLAUDE.md` template, 7 custom commands (`/kickoff`, `/slice`, `/verify`, `/ship`, `/demo`, `/metrics`, `/handoff`), 3 hooks (block dangerous commands, auto-format, tests must pass), a reviewer subagent, a shared `.mcp.json` and `install.sh`.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

`starter.html` is generated from the starter-kit files: edit them, then run `python3 tools/build.py`.

Sister playbooks: [Deep Learning](https://swagatambaz.github.io/deep-learning-playbook/) · [ML Interview](https://swagatambaz.github.io/ml-interview-playbook/) · [DSA](https://swagatambaz.github.io/dsa-playbook/) · [SQL Interview Lab](https://swagatambaz.github.io/sql-interview-lab/)
