---
description: Install the Vibe Coding Playbook stack (skills, plugins, connectors, commands, hooks) into this project
argument-hint: "[core | interview | ai | full]"
---
# Vibe Coding Playbook: one-file setup

You are Claude Code. The user wants their vibe coding stack set up in the **current project folder**. Carry out the steps below in order, running the commands yourself in the terminal. Only stop to ask where a step says so.

Every command in this file was tested on Claude Code 2.1 in November 2026.

**Rules**
- Never use `sudo` or install system software (Node, Git, Python, uv) without asking first. Show the command and let the user decide.
- Every step must be safe to re-run. Check first, skip anything already installed, and record it as "already there".
- If a command fails, retry it once. If it still fails, record the error, carry on with the remaining steps, and include it in the final report. One failure must not stop the whole setup.
- Never print, read or commit secrets (`.env` files, tokens, API keys). Never ask the user to paste a token into the chat.
- Keep progress updates to one line per step.

## Step 1: Choose the profile

If the user named a profile (as an argument to this command, or in their message), use it. Otherwise ask once, recommending **core**:

| Profile | For |
|---|---|
| **core** (recommended) | Everyday building: PRD, spec-driven flow, UI, TDD, debugging, review, security, docs and browser connectors, Supabase |
| **interview** | A lean set for a live interview laptop: UI design and audit, live docs, browser check, components, Supabase, code review |
| **ai** | core + AI and agent building: Claude API, LangGraph, n8n, MCP builder, research, deploy, GitHub, React performance, Postgres rules, commit commands, skill-creator |
| **full** | ai + Figma, Stripe, Sentry, Linear or Jira, Notion, Office documents |

## Step 2: Check the machine

1. Detect the OS and shell. On Windows, check that you are in **Git Bash** or **WSL**. If you aren't, tell the user to switch the VS Code terminal to Git Bash (the ⌄ next to **+** in the terminal bar), then run this again.
2. Run `<tool> --version` for each of these:

| Tool | Needed for | If missing |
|---|---|---|
| `claude` | plugins and connectors | Ask, then run `curl -fsSL https://claude.ai/install.sh \| bash` (on Windows PowerShell: `irm https://claude.ai/install.ps1 \| iex`) |
| `node` 18+ and `npx` | skills, most connectors | Ask, then point the user to https://nodejs.org (LTS) |
| `git` | copying the starter kit | Ask, then point the user to https://git-scm.com |
| `python3` or `python` | optional (the hooks work without it) | Skip |
| `uv` | Spec Kit only | Ask, then run `curl -LsSf https://astral.sh/uv/install.sh \| sh` (Windows: `powershell -c "irm https://astral.sh/uv/install.ps1 \| iex"`) |

If a required tool is still missing, skip the steps that need it and say so in the report.

## Step 3: Copy the starter kit

1. Make a temporary folder **outside** the project, then run `git clone --depth 1 https://github.com/SWAGATAMBAZ/vibe-coding-playbook "<tmp>/vcp"`.
2. Copy everything from `<tmp>/vcp/starter-kit/` (including the hidden `.claude/` folder and `.mcp.json`) into the project root. Never overwrite the user's files:
   - **`CLAUDE.md` already exists:** keep it. Append only the starter sections it's missing (Stack, Commands, How we work, Conventions, Gotchas) under a `## From Vibe Coding Playbook` heading.
   - **`.mcp.json` or `.claude/settings.json` already exists:** merge the JSON. Keep every existing key. Add our `mcpServers` entries, `permissions.allow`/`deny` items and `hooks` entries, without duplicating any.
   - **A command, hook, agent or `install.sh` with the same name exists:** keep the user's version and list it in the report.
3. Run `chmod +x .claude/hooks/*.sh install.sh`.
4. Install this file as a personal command so `/setup-vibe-stack` works in every project on this computer: create `~/.claude/commands/` if needed, then copy `<tmp>/vcp/SETUP.md` to `~/.claude/commands/setup-vibe-stack.md`.
5. Delete the temporary folder.
6. If the project isn't a git repository yet, run `git init`. The test hook and Spec Kit expect git.

## Step 4: Plugins

Use the terminal CLI (not the interactive `/plugin` menu). First check what's already installed with `claude plugin list`.

1. Run `claude plugin marketplace add anthropics/claude-plugins-official`. It's fine if it's already there.
2. Install each plugin for the chosen profile with `claude plugin install <plugin>@claude-plugins-official`:

| Plugin | core | interview | ai | full |
|---|---|---|---|---|
| frontend-design | ✓ | ✓ | ✓ | ✓ |
| code-review | ✓ | ✓ | ✓ | ✓ |
| security-guidance | ✓ |   | ✓ | ✓ |
| commit-commands |   |   | ✓ | ✓ |

3. **ai and full:** run `claude plugin marketplace add czlonkowski/n8n-skills`, then `claude plugin install n8n-mcp-skills@n8n-mcp-skills`.
4. **full only:** run `claude plugin marketplace add anthropics/skills`, then `claude plugin install document-skills@anthropic-agent-skills`. This installs Word, PowerPoint, Excel and PDF skills.

Plugins install for the user, so they also work in the user's other projects.

## Step 5: Skills

Install each skill with:

```
npx -y skills@latest add <repo> --skill <skill> -a claude-code --yes
```

They go into this project's `.claude/skills/`. Skip any whose `.claude/skills/<skill>/SKILL.md` already exists.

| Repo | Skill | core | interview | ai | full |
|---|---|---|---|---|---|
| mattpocock/skills | grill-me | ✓ | ✓ | ✓ | ✓ |
| deanpeters/Product-Manager-Skills | prd-development | ✓ |   | ✓ | ✓ |
| vercel-labs/agent-skills | web-design-guidelines | ✓ | ✓ | ✓ | ✓ |
| obra/superpowers | test-driven-development | ✓ |   | ✓ | ✓ |
| obra/superpowers | systematic-debugging | ✓ |   | ✓ | ✓ |
| vercel-labs/agent-skills | vercel-react-best-practices |   |   | ✓ | ✓ |
| supabase/agent-skills | supabase-postgres-best-practices |   |   | ✓ | ✓ |
| anthropics/skills | claude-api |   |   | ✓ | ✓ |
| anthropics/skills | mcp-builder |   |   | ✓ | ✓ |
| anthropics/skills | skill-creator |   |   | ✓ | ✓ |
| langchain-ai/langchain-skills | langgraph-fundamentals, langgraph-persistence, langgraph-human-in-the-loop, langchain-rag, eval-engineering (pass several `--skill` flags in one command) |   |   | ✓ | ✓ |

## Step 6: Connectors (MCP)

Run `claude mcp list` first, and skip any server that's already configured. Playwright, shadcn and Supabase come from the copied `.mcp.json`, so don't add them again. The others:

| Connector | Command | core | interview | ai | full |
|---|---|---|---|---|---|
| context7 | `claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp` | ✓ | ✓ | ✓ | ✓ |
| firecrawl | `claude mcp add --scope project --transport http firecrawl https://mcp.firecrawl.dev/v2/mcp-oauth` |   |   | ✓ | ✓ |
| vercel | `claude mcp add --scope project --transport http vercel https://mcp.vercel.com` |   |   | ✓ | ✓ |
| github | `claude mcp add-json --scope project github '{"type":"http","url":"https://api.githubcopilot.com/mcp/","headers":{"Authorization":"Bearer ${GITHUB_PAT}"}}'` (keep the single quotes so `${GITHUB_PAT}` is stored literally) |   |   | ✓ | ✓ |
| n8n-mcp | `claude mcp add --scope user n8n-mcp -e MCP_MODE=stdio -e LOG_LEVEL=error -- npx n8n-mcp` |   |   | ✓ | ✓ |
| figma | `claude mcp add --scope user --transport http figma https://mcp.figma.com/mcp` |   |   |   | ✓ |
| stripe | `claude mcp add --scope project --transport http stripe https://mcp.stripe.com` |   |   |   | ✓ |
| sentry | `claude mcp add --scope project --transport http sentry https://mcp.sentry.dev/mcp` |   |   |   | ✓ |
| linear **or** jira | ask which one the team uses. Linear: `claude mcp add --scope user --transport http linear https://mcp.linear.app/mcp`. Jira/Confluence: `claude mcp add --scope user --transport http atlassian https://mcp.atlassian.com/v1/mcp` |   |   |   | ✓ |
| notion | `claude mcp add --scope user --transport http notion https://mcp.notion.com/mcp` |   |   |   | ✓ |

**For the interview profile:** ask whether they'll need a database. If not, remove the `supabase` entry from `.mcp.json`.

**About the GitHub connector:** it can't log in through the browser from Claude Code; it needs a personal access token. Tell the user to create a fine-grained token at https://github.com/settings/personal-access-tokens and set it as an environment variable named `GITHUB_PAT` in their shell profile. For example, add `export GITHUB_PAT=...` to `~/.bashrc`, then restart VS Code. Until then the connector shows as failed, and the `gh` CLI is a fine alternative.

## Step 7: Spec Kit (core, ai, full)

1. If `uv` is available and `specify --version` fails, run `uv tool install specify-cli`. If `specify` still isn't found, run `uv tool update-shell` and tell the user to reopen the terminal. Then continue with step 8 and mention it in the report.
2. Ask before running `specify init --here --integration claude --force`, because it adds a `.specify/` folder and `/speckit-*` skills to the project. `--force` only skips the "folder not empty" prompt; in testing it left `CLAUDE.md`, `.mcp.json` and `.claude/settings.json` unchanged.
3. If `uv` is missing, say Spec Kit was skipped, and that `/kickoff` → `/slice` → `/verify` → `/ship` cover the same flow.

## Step 8: Verify, then report

Run these checks:
- `claude plugin list` shows the profile's plugins as enabled.
- `ls .claude/skills` contains the profile's skills (and the `speckit-*` skills if step 7 ran).
- `ls .claude/commands` contains kickoff, slice, verify, ship, demo, metrics and handoff.
- `claude mcp list` shows the profile's connectors. Remote ones normally say "needs authentication" at this point, which is expected.
- Each hook runs: `echo '{"tool_input":{"command":"git reset --hard"}}' | .claude/hooks/block-dangerous.sh` must exit with code 2.

Finish with:

1. A table: item · type (plugin / skill / connector / command / hook) · status (installed / already there / skipped / failed: error).
2. These next steps for the user, word for word:
   - **Reload so everything loads:** in VS Code press Ctrl+Shift+P and run "Reload Window"; in a terminal, exit and start `claude` again.
   - **Approve project connectors:** the first time you open the project, Claude asks to approve the servers in `.mcp.json`. Approve them.
   - **Log in:** type `/mcp` and sign in to each connector marked "needs authentication". Start with Supabase. GitHub uses the `GITHUB_PAT` token instead.
   - **Check:** type `/` and you should see `/kickoff`, `/slice`, `/verify`, `/ship`, `/demo`, `/metrics`, `/handoff`, the `/speckit-*` commands, and `/setup-vibe-stack` for future projects.
   - **Start:** `/kickoff <your product idea>`.
