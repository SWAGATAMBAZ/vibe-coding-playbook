---
description: Install the Vibe Coding Playbook stack (skills, plugins, connectors, commands, hooks) into this project
argument-hint: "[core | interview | ai | full]"
---
# Vibe Coding Playbook: one-file setup

You are Claude Code. The user has asked you to set up their vibe coding stack in the **current project folder**. Follow these steps in order. Work through them yourself using the terminal; only stop to ask where a step says so.

**Rules**
- Never use `sudo` or install system software (Node, Git, Python, uv) without asking first. Show the command and let the user decide.
- Every step must be safe to re-run. Skip anything already installed and say "already installed".
- If a command fails, try once more. If it still fails, note the error, continue with the remaining steps, and include it in the final report. Don't stop the whole setup for one failure.
- Never print, read or commit secrets (`.env`, tokens, API keys).
- Keep updates short: one line per step.

## Step 1: Choose the profile

If the user named a profile (as an argument to this command, or in their message), use it. Otherwise ask once, with **core** as the recommended answer:

| Profile | What it adds |
|---|---|
| **core** (recommended) | The everyday stack: PRD, spec-driven flow, UI, testing, debugging, review, security, docs and browser connectors, Supabase |
| **interview** | A lighter set for a live interview laptop: UI, docs, browser check, components, Supabase, review |
| **ai** | core + AI and agent building: Claude API, LangGraph/LangChain, n8n, MCP builder, research, deploy, GitHub, React performance, Postgres best practices, commit commands, skill-creator |
| **full** | ai + Figma, Stripe, Sentry, Linear, Notion, Office documents |

## Step 2: Check the machine

Detect the OS and shell. On Windows, check that the shell is Git Bash or WSL. If it isn't, tell the user to switch the VS Code terminal to Git Bash and run this again. Then check for these (run `<tool> --version`):

- `claude`: required for plugins and connectors.
- `node` 18 or newer, with `npx`: required for skills and most connectors.
- `git`: required.
- `python3`: used by the starter-kit hooks.
- `uv`: optional, only needed for Spec Kit.

If a required tool is missing, show the official install command for this OS and ask whether to run it. If the user says no, skip the steps that need that tool.

## Step 3: Copy the starter kit

1. Clone `https://github.com/SWAGATAMBAZ/vibe-coding-playbook` with `--depth 1` into a temporary folder outside the project.
2. Copy everything from its `starter-kit/` folder (including the hidden `.claude/` folder and `.mcp.json`) into the project root. Don't overwrite files that already exist:
   - If `CLAUDE.md` exists, keep the user's file and append only the starter template sections it's missing (Stack, Commands, How we work, Conventions, Gotchas) under a `## From Vibe Coding Playbook` heading.
   - If `.mcp.json` or `.claude/settings.json` exists, merge the JSON. Keep the user's entries and add ours.
   - For anything else that already exists (commands, hooks, agents), keep the user's version and list it in the report.
3. Make the hooks and installer executable: `chmod +x .claude/hooks/*.sh install.sh`.
4. Delete the temporary clone.
5. Install this setup file as a personal command, so `/setup-vibe-stack` works in every project on this computer: copy `SETUP.md` from the clone to `~/.claude/commands/setup-vibe-stack.md`. Create the folder if it doesn't exist. Do this copy before step 4 deletes the clone.

## Step 4: Plugins

First run `claude plugin marketplace add anthropics/claude-plugins-official` (it's fine if it's already there). Then install the plugins for the chosen profile with `claude plugin install <name>@claude-plugins-official`:

| Plugin | core | interview | ai | full |
|---|---|---|---|---|
| frontend-design | ✓ | ✓ | ✓ | ✓ |
| code-review | ✓ | ✓ | ✓ | ✓ |
| security-guidance | ✓ |   | ✓ | ✓ |
| commit-commands |   |   | ✓ | ✓ |

For **full**, also run `claude plugin marketplace add anthropics/skills`, then tell the user to pick **document-skills** from `/plugin` (it's an interactive choice).

## Step 5: Skills

Install each one with `npx -y skills add <repo> --skill <name> --agent claude-code`. When the CLI asks a question, accept the default for this project.

| Repo | Skill | core | interview | ai | full |
|---|---|---|---|---|---|
| mattpocock/skills | grill-me | ✓ | ✓ | ✓ | ✓ |
| deanpeters/Product-Manager-Skills | prd-development | ✓ |   | ✓ | ✓ |
| vercel-labs/agent-skills | web-design-guidelines | ✓ | ✓ | ✓ | ✓ |
| obra/superpowers | test-driven-development | ✓ |   | ✓ | ✓ |
| obra/superpowers | systematic-debugging | ✓ |   | ✓ | ✓ |
| vercel-labs/agent-skills | react-best-practices |   |   | ✓ | ✓ |
| supabase/agent-skills | supabase-postgres-best-practices |   |   | ✓ | ✓ |
| anthropics/skills | claude-api |   |   | ✓ | ✓ |
| anthropics/skills | mcp-builder |   |   | ✓ | ✓ |
| anthropics/skills | skill-creator |   |   | ✓ | ✓ |
| langchain-ai/langchain-skills | `'*'` (all, add `--yes`) |   |   | ✓ | ✓ |

For **ai** and **full**, also run `claude plugin marketplace add czlonkowski/n8n-skills`, then tell the user to install **n8n-mcp-skills** from `/plugin`.

## Step 6: Connectors (MCP)

Run `claude mcp list` first and skip anything already configured.

| Connector | Command | core | interview | ai | full |
|---|---|---|---|---|---|
| context7 | `claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp` | ✓ | ✓ | ✓ | ✓ |
| playwright | already in `.mcp.json` (project) | ✓ | ✓ | ✓ | ✓ |
| shadcn | already in `.mcp.json` (project) | ✓ | ✓ | ✓ | ✓ |
| supabase | already in `.mcp.json` (project) | ✓ | ✓ | ✓ | ✓ |
| firecrawl | `claude mcp add --scope project --transport http firecrawl https://mcp.firecrawl.dev/v2/mcp-oauth` |   |   | ✓ | ✓ |
| vercel | `claude mcp add --scope project --transport http vercel https://mcp.vercel.com` |   |   | ✓ | ✓ |
| github | `claude mcp add --scope user --transport http github https://api.githubcopilot.com/mcp/` (the user must add a token header later; tell them) |   |   | ✓ | ✓ |
| n8n-mcp | `claude mcp add n8n-mcp -e MCP_MODE=stdio -e LOG_LEVEL=error -- npx n8n-mcp` (works without an n8n instance; add `N8N_API_URL` and `N8N_API_KEY` later to manage workflows) |   |   | ✓ | ✓ |
| figma | `claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp` |   |   |   | ✓ |
| stripe | `claude mcp add --scope project --transport http stripe https://mcp.stripe.com` |   |   |   | ✓ |
| sentry | `claude mcp add --scope project --transport http sentry https://mcp.sentry.dev/mcp` |   |   |   | ✓ |
| linear | `claude mcp add --scope user --transport http linear https://mcp.linear.app/mcp` (ask: Linear or Jira? For Jira use `https://mcp.atlassian.com/v2/mcp` instead) |   |   |   | ✓ |
| notion | `claude mcp add --scope user --transport http notion https://mcp.notion.com/mcp` |   |   |   | ✓ |

For the **interview** profile, remove the `supabase` entry from `.mcp.json` only if the user says they won't need a database.

## Step 7: Spec Kit (core, ai, full)

If `uv` exists: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git`, then ask before running `specify init . --ai claude`, because it adds files to the project. If `uv` is missing, say Spec Kit was skipped and that the `/kickoff` → `/slice` commands do the same job in a lighter way.

## Step 8: Report

Finish with:

1. A table: item, type (plugin / skill / connector / command / hook), status (installed / already there / skipped / failed + error).
2. These next steps for the user, word for word:
   - **Reload so the new tools load:** in VS Code press Ctrl+Shift+P → "Reload Window"; in a terminal, exit and run `claude` again.
   - **Log in to connectors:** type `/mcp` and log in to each one marked "needs authentication" (Supabase first).
   - **Check:** type `/` to see `/kickoff`, `/slice`, `/verify`, `/ship`, `/demo`, `/metrics`, `/handoff`, and `/setup-vibe-stack` for future projects.
   - **Start:** `/kickoff <your product idea>`.
