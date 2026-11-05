---
description: Pre-merge / pre-demo gate - review, security, docs, then commit and open a PR
---
Run the release gate on the current branch. Stop and report if any step finds a blocking issue.

1. Code review of the full diff vs main: bugs, spec mismatches, missing tests, dead code, naming. Report file:line, issue, fix. (Use the code-review plugin or /review if available.)
2. Security pass (same as /security-review): secrets in client code or git, missing auth or authorization checks, missing RLS policies, injection (SQL, XSS, prompt injection in AI inputs), unsafe CORS, missing rate limits on AI or auth endpoints, risky new dependencies.
3. AI-specific checks: every LLM call is server-side, has a timeout, validated output and a fallback; prompts don't include unnecessary PII; cost per request is bounded.
4. Make sure `.env.example` lists every env var and README explains setup, decisions and what's out of scope.
5. If everything passes: commit, push the branch, and open a PR whose description lists what changed, how it was verified, and known limitations. Never push to main directly.
