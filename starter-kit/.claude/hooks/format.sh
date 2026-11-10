#!/usr/bin/env bash
# PostToolUse hook (matcher: Edit|Write). Formats the file Claude just changed. Never blocks.
input="$(cat)"
py="$(command -v python3 || command -v python || true)"
if [ -n "$py" ]; then
  file="$(printf '%s' "$input" | "$py" -c 'import sys,json; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)"
else
  file="$(printf '%s' "$input" | grep -o '"file_path" *: *"[^"]*' | head -1 | sed 's/^"file_path" *: *"//')"
fi
{ [ -z "$file" ] || [ ! -f "$file" ]; } && exit 0

case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md|*.html)
    npx --no-install prettier --write "$file" >/dev/null 2>&1 ;;
  *.py)
    (ruff format "$file" || black -q "$file") >/dev/null 2>&1 ;;
esac
exit 0
