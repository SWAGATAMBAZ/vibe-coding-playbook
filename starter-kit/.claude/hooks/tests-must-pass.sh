#!/usr/bin/env bash
# Stop hook. If code changed and a test script exists, run tests before Claude may finish.
# Exit 2 = Claude must keep working; stderr tells it why. stop_hook_active prevents infinite loops.
input="$(cat)"
active="$(printf '%s' "$input" | python3 -c 'import sys,json; print(json.load(sys.stdin).get("stop_hook_active",False))' 2>/dev/null)"
[ "$active" = "True" ] && exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
git diff --quiet HEAD -- . 2>/dev/null && exit 0          # nothing changed: nothing to check
[ -f package.json ] && grep -q '"test"' package.json || exit 0

if ! out="$(npm test --silent 2>&1)"; then
  echo "Tests are failing. Fix them (find the root cause first) before saying you're done." >&2
  printf '%s\n' "$out" | tail -40 >&2
  exit 2
fi
exit 0
