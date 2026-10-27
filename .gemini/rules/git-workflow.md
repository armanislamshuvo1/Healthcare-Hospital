# Git Commit Workflow

Whenever the user asks to commit, push, or "commit n push":
1. Automatically apply the `git-commit-message` skill conventions.
2. Inspect `git diff --cached` (or stage modified files).
3. Generate a Conventional Commits message (`type: subject ≤50 chars` + body explaining *why*).
4. Execute `git commit` with the generated message and `git push origin <branch>`.
