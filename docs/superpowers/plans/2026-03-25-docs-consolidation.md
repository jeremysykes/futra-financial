# Documentation Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate specs, plans, and prompts into canonical tracked locations and remove the split directory structure.

**Architecture:** File-operations only — gitignore edit, git mv, rm, git add, CLAUDE.md update. All changes land in a single commit.

**Tech Stack:** Git, shell commands. No code changes.

**Spec:** `docs/superpowers/specs/2026-03-25-docs-consolidation-design.md`

---

### Task 1: Remove gitignore rules

**Files:**
- Modify: `.gitignore` (lines 34-36)

- [ ] **Step 1: Remove the AI workflow artifacts block**

Remove these three lines from `.gitignore`:

```
# AI workflow artifacts
docs/superpowers/
docs/prompts/
```

- [ ] **Step 2: Verify the change**

Run: `git diff .gitignore`
Expected: Shows the three lines removed, nothing else changed.

---

### Task 2: Move files from `docs/specs/` to canonical locations

**Files:**
- Move: `docs/specs/2026-03-23-page-transitions-design.md` → `docs/superpowers/specs/`
- Move: `docs/specs/2026-03-23-interactive-token-grid-design.md` → `docs/superpowers/specs/`
- Move: `docs/specs/2026-03-23-page-transitions-plan.md` → `docs/superpowers/plans/2026-03-23-page-transitions.md`
- Move: `docs/specs/2026-03-23-interactive-token-grid-plan.md` → `docs/superpowers/plans/2026-03-23-interactive-token-grid.md`
- Delete: `docs/specs/` (directory)

- [ ] **Step 1: Move design specs (keep filenames)**

```bash
git mv docs/specs/2026-03-23-page-transitions-design.md docs/superpowers/specs/
git mv docs/specs/2026-03-23-interactive-token-grid-design.md docs/superpowers/specs/
```

- [ ] **Step 2: Move plans (drop `-plan` suffix)**

```bash
git mv docs/specs/2026-03-23-page-transitions-plan.md docs/superpowers/plans/2026-03-23-page-transitions.md
git mv docs/specs/2026-03-23-interactive-token-grid-plan.md docs/superpowers/plans/2026-03-23-interactive-token-grid.md
```

- [ ] **Step 3: Delete the now-empty `docs/specs/` directory**

```bash
rmdir docs/specs
```

- [ ] **Step 4: Verify moves**

Run: `git status`
Expected: Four renamed files, `docs/specs/` gone.

---

### Task 3: Delete low-signal files

**Files:**
- Delete: `docs/superpowers/specs/2026-03-22-process-steps-design.md`
- Delete: `docs/superpowers/plans/2026-03-22-process-steps-plan.md`

- [ ] **Step 1: Delete the process-steps spec and plan**

```bash
rm docs/superpowers/specs/2026-03-22-process-steps-design.md
rm docs/superpowers/plans/2026-03-22-process-steps-plan.md
```

- [ ] **Step 2: Verify deletions**

Run: `ls docs/superpowers/specs/ docs/superpowers/plans/`
Expected: No process-steps files in either directory.

---

### Task 4: Track all remaining files

**Files:**
- Stage: everything in `docs/superpowers/` and `docs/prompts/`

- [ ] **Step 1: Add all files in both directories**

```bash
git add docs/superpowers/ docs/prompts/
```

- [ ] **Step 2: Verify staging**

Run: `git status`
Expected: All specs, plans, and prompts appear as new or renamed files. No untracked files remain under `docs/superpowers/` or `docs/prompts/`.

---

### Task 5: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md` (lines 12, 32-37)

- [ ] **Step 1: Update Canonical Documents example**

Replace line 12:
```
- Operational docs belong in `docs/` (e.g., `docs/design-audit.md`, `docs/image-requirements.md`)
```
With:
```
- Operational docs belong in `docs/` (e.g., `docs/image-requirements.md`, `docs/testing.md`)
```

- [ ] **Step 2: Update Project Structure section**

Replace lines 32-37:
```
- `src/components/{bu}/` — BU-specific page components
- `src/components/AppShell.tsx` — Router, theme state, DemoSwitcher wrapper
- `src/components/DemoSwitcher.tsx` — Global demo navigation bar
- `src/stories/{bu}/` — Storybook stories per BU
- `docs/` — Operational documents (audit, specs, plans, image requirements)
- `.claude/skills/` — Project-specific Claude skills
```
With:
```
- `src/components/{bu}/` — BU-specific page components
- `src/components/AppShell.tsx` — Router, theme state, DemoSwitcher wrapper
- `src/components/DemoSwitcher.tsx` — Global demo navigation bar
- `src/stories/{bu}/` — Storybook stories per BU
- `docs/superpowers/specs/` — Design specs (brainstormed and reviewed before implementation)
- `docs/superpowers/plans/` — Implementation plans (step-by-step execution checklists)
- `docs/prompts/` — AI tooling prompts (Figma Make, etc.)
- `docs/` — Operational documents (testing, image requirements, workflows)
- `.claude/skills/` — Project-specific Claude skills
```

- [ ] **Step 3: Verify CLAUDE.md**

Run: `grep -n 'docs/' CLAUDE.md`
Expected: New paths visible, no reference to `docs/design-audit.md` or standalone `docs/specs/`.

---

### Task 6: Commit

- [ ] **Step 1: Stage remaining changes**

```bash
git add .gitignore CLAUDE.md
```

- [ ] **Step 2: Final status check**

Run: `git status`
Expected: All changes staged — gitignore edit, file moves, deletions, new files, CLAUDE.md update. No unstaged changes.

- [ ] **Step 3: Commit**

```bash
git commit -m "docs: consolidate specs, plans, and prompts into canonical locations

Move docs/specs/ content into docs/superpowers/specs/ and docs/superpowers/plans/.
Remove gitignore rules blocking docs/superpowers/ and docs/prompts/.
Delete low-signal process-steps spec and plan.
Track all previously-untracked design documentation and Figma Make prompts.
Update CLAUDE.md with canonical documentation paths."
```
