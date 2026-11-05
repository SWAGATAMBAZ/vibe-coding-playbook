#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash). Blocks destructive or secret-leaking shell commands.
# Exit code 2 = block the tool call; stderr is shown to Claude so it can choose another approach.
input="$(cat)"
cmd="$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("command",""))' 2>/dev/null)"

block() { echo "Blocked by .claude/hooks/block-dangerous.sh: $1. Ask the user to run it themselves if it is really needed." >&2; exit 2; }

case "$cmd" in
  *"rm -rf /"*|*"rm -rf ~"*|*"rm -rf ."*|*"rm -rf *"*) block "recursive delete" ;;
  *"git push --force"*|*"git push -f"*)               block "force push" ;;
  *"git reset --hard"*|*"git clean -fd"*)             block "discards uncommitted work" ;;
  *"git push"*" main"*|*"git push"*" master"*)        block "direct push to main; open a PR instead" ;;
  *"DROP TABLE"*|*"drop table"*|*"TRUNCATE"*)         block "destructive SQL" ;;
  *"cat .env"*|*"printenv"*|*"echo \$"*KEY*)           block "could print secrets into the transcript" ;;
  *"curl"*"| bash"*|*"curl"*"| sh"*)                  block "piping a remote script into a shell" ;;
esac
exit 0
