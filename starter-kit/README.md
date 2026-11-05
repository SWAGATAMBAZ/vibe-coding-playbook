# Starter kit

Copy everything in this folder (including the hidden `.claude/` folder and `.mcp.json`) into the root of a new project, then:

```bash
chmod +x .claude/hooks/*.sh install.sh
./install.sh          # core skills, plugins and connectors
claude                # then /mcp to log in to remote servers
```

| File | What it does |
|---|---|
| `CLAUDE.md` | Project memory template: product, stack, commands, how we work, gotchas |
| `.mcp.json` | Shared connectors: Playwright, shadcn, Supabase |
| `.claude/settings.json` | Pre-approved safe commands, denied secrets/destructive commands, and 3 hooks |
| `.claude/hooks/block-dangerous.sh` | Blocks `rm -rf`, force-push, `reset --hard`, pushes to main, destructive SQL, printing secrets |
| `.claude/hooks/format.sh` | Formats every file Claude edits (Prettier / Ruff / Black) |
| `.claude/hooks/tests-must-pass.sh` | Claude can't finish while tests fail |
| `.claude/commands/kickoff.md` | `/kickoff <prompt>`: clarify → spec.md → tasks.md (SDD-lite) |
| `.claude/commands/slice.md` | `/slice`: implement the next task test-first, verify, tick, commit |
| `.claude/commands/verify.md` | `/verify`: prove every acceptance criterion and edge case |
| `.claude/commands/ship.md` | `/ship`: review + security + docs gate, then PR |
| `.claude/commands/demo.md` | `/demo`: 90-second demo script, metrics, risks, next steps |
| `.claude/commands/metrics.md` | `/metrics`: metric tree + analytics events + queries |
| `.claude/commands/handoff.md` | `/handoff`: save progress before `/clear` |
| `.claude/agents/reviewer.md` | Independent reviewer subagent (read-only) |
| `install.sh` | One-shot installer for the core stack |

The hooks use `python3` to read the JSON Claude Code passes on stdin. Full explanations: https://swagatambaz.github.io/vibe-coding-playbook/starter.html
