#!/usr/bin/env bash
# PostToolUse hook (matcher: Edit|Write). Formats the file Claude just changed. Never blocks.
input="$(cat)"
file="$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)"
[ -z "$file" ] || [ ! -f "$file" ] && exit 0

case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md|*.html)
    npx --no-install prettier --write "$file" >/dev/null 2>&1 ;;
  *.py)
    (ruff format "$file" || black -q "$file") >/dev/null 2>&1 ;;
esac
exit 0
