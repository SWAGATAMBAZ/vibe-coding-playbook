#!/usr/bin/env bash
# Vibe Coding Playbook: core stack installer. Run from the root of a project.
# Installs: one skill/plugin per task (core set) + the three always-on connectors.
# Remote MCP servers (Supabase) ask you to log in: run /mcp inside Claude Code afterwards.
set -e

command -v claude >/dev/null || { echo "Install Claude Code first: curl -fsSL https://claude.ai/install.sh | bash"; exit 1; }

echo "── Plugins from Anthropic's official marketplace"
claude plugin marketplace add anthropics/claude-plugins-official 2>/dev/null || true
claude plugin install frontend-design@claude-plugins-official
claude plugin install code-review@claude-plugins-official
claude plugin install security-guidance@claude-plugins-official

echo "── Skills (one per task)"
npx -y skills add mattpocock/skills --skill grill-me --agent claude-code
npx -y skills add deanpeters/Product-Manager-Skills --skill prd-development --agent claude-code
npx -y skills add vercel-labs/agent-skills --skill web-design-guidelines --agent claude-code
npx -y skills add obra/superpowers --skill test-driven-development --agent claude-code
npx -y skills add obra/superpowers --skill systematic-debugging --agent claude-code

echo "── Connectors"
claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp || true
claude mcp add --scope project playwright -- npx @playwright/mcp@latest || true
claude mcp add --scope project --transport http supabase https://mcp.supabase.com/mcp || true

echo "── Spec Kit (spec-driven development)"
if command -v uv >/dev/null; then
  uv tool install specify-cli --from git+https://github.com/github/spec-kit.git || true
  echo "Run: specify init . --ai claude"
else
  echo "Install uv (https://docs.astral.sh/uv/) to use Spec Kit, or use the SDD-lite commands in .claude/commands."
fi

echo "Done. Open Claude Code and run /mcp to log in to remote servers, then /help to see your commands."
