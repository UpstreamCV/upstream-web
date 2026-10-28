# Commit log

Reverse chronological. Newest at top. Every commit updates this file
(plus any relevant docs) in the same commit, per the Upstream repo
policy.

---

## 2026-10-27 — chore: stop Dependabot version updates

**Type:** repo hygiene. The project is finished and published for reference, so nobody is
left to review automated dependency-update PRs. Removes
`.github/dependabot.yml`; the open Dependabot PRs are closed.

- `.github/dependabot.yml` — deleted.
- `docs/commit-log.md` — this entry.

## 2026-10-27 — chore: public-release prep (license, stop vendoring the impeccable skill)

**Type:** repo hygiene + license.

- `LICENSE` (new) — copyright Upstream Vision, Inc., all rights reserved; visible for reference only.
- `.agents/skills/impeccable/` (58 files) — no longer tracked. It is a third-party skill (`pbakaus/impeccable`) that was committed without its license; `skills-lock.json` still pins it, so reinstall it from there. `.gitignore` now ignores `.agents/`.
- `docs/commit-log.md` (new) — this file.
