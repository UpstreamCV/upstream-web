# Commit log

Reverse chronological. Newest at top. Every commit updates this file
(plus any relevant docs) in the same commit, per the Upstream repo
policy.

---

## 2026-10-27 — chore: public-release prep (license, stop vendoring the impeccable skill)

**Type:** repo hygiene + license.

- `LICENSE` (new) — copyright Upstream Vision, Inc., all rights reserved; visible for reference only.
- `.agents/skills/impeccable/` (58 files) — no longer tracked. It is a third-party skill (`pbakaus/impeccable`) that was committed without its license; `skills-lock.json` still pins it, so reinstall it from there. `.gitignore` now ignores `.agents/`.
- `docs/commit-log.md` (new) — this file.
