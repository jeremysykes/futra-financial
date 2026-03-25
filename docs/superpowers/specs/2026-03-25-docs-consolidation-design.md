# Documentation Consolidation — Design Spec

## Overview

Consolidate the split documentation structure into canonical locations so the repo tells a coherent story. Design specs, implementation plans, and AI tooling prompts become first-class tracked artifacts — curated for signal, not completeness.

## Context

Specs and plans are currently split across two locations (`docs/specs/` and `docs/superpowers/specs/`), with a `.gitignore` rule partially blocking `docs/superpowers/` and `docs/prompts/`. This leaves valuable design documentation untracked and the directory structure inconsistent.

## Key Decisions

- **Specs and plans are portfolio artifacts** — they demonstrate how the author decomposes problems (specs) and sequences execution (plans). Both are valuable signals worth surfacing.
- **`docs/superpowers/` namespace stays** — the superpowers plugin generates files here. The namespace reflects the tooling, and the AI-forward workflow is intentional.
- **Curate, don't include everything** — specs and plans that don't demonstrate architectural thinking are deleted. Quality over quantity.
- **Figma Make prompts are tracked** — directing AI tooling to produce accurate design output is part of the workflow and worth documenting.

## Execution Order

Steps must be executed in order: the gitignore change (Step 1) must precede the file moves (Step 2) to avoid moving files into a gitignored directory. All changes land in a single commit.

## Changes

### 1. Remove gitignore rules

Remove this block (comment + two path rules) from `.gitignore`:

```diff
- # AI workflow artifacts
- docs/superpowers/
- docs/prompts/
```

All files in `docs/superpowers/` and `docs/prompts/` become trackable.

### 2. Move files from `docs/specs/` to canonical locations

| Source | Destination |
|--------|------------|
| `docs/specs/2026-03-23-page-transitions-design.md` | `docs/superpowers/specs/2026-03-23-page-transitions-design.md` |
| `docs/specs/2026-03-23-interactive-token-grid-design.md` | `docs/superpowers/specs/2026-03-23-interactive-token-grid-design.md` |
| `docs/specs/2026-03-23-page-transitions-plan.md` | `docs/superpowers/plans/2026-03-23-page-transitions.md` |
| `docs/specs/2026-03-23-interactive-token-grid-plan.md` | `docs/superpowers/plans/2026-03-23-interactive-token-grid.md` |

Plan files drop the `-plan` suffix to match the naming convention used in `docs/superpowers/plans/` (date + topic, no suffix).

Delete `docs/specs/` after the moves.

### 3. Delete low-signal files

| File | Reason |
|------|--------|
| `docs/superpowers/specs/2026-03-22-process-steps-design.md` | Narrow single-component spec — doesn't demonstrate systems-level thinking |
| `docs/superpowers/plans/2026-03-22-process-steps-plan.md` | Pairs with deleted spec |

### 4. Track all remaining files

After the gitignore change, deletions, and moves, `git add` everything in `docs/superpowers/` and `docs/prompts/`. This captures all previously-untracked files plus the moved files in one pass. The full set of newly tracked files is visible in the Final Directory Structure below.

### 5. Update CLAUDE.md

**Project Structure section** — replace the generic `docs/` line with explicit paths:

```markdown
## Project Structure

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

**Canonical Documents section** — update the example reference. The current example mentions `docs/design-audit.md` which doesn't exist; replace with files that do:

```markdown
- Operational docs belong in `docs/` (e.g., `docs/image-requirements.md`, `docs/testing.md`)
```

## Final Directory Structure

```
docs/
├── assets/readme/              # BU SVG logos
├── superpowers/
│   ├── specs/                  # Design specs
│   │   ├── 2026-03-20-futra-save-and-demo-switcher-design.md
│   │   ├── 2026-03-22-aria-accessibility-audit-design.md
│   │   ├── 2026-03-22-atomic-design-templates-design.md
│   │   ├── 2026-03-22-token-architecture-design.md
│   │   ├── 2026-03-23-mobile-responsive-layouts-design.md
│   │   ├── 2026-03-23-page-transitions-design.md
│   │   ├── 2026-03-23-interactive-token-grid-design.md
│   │   ├── 2026-03-25-docs-consolidation-design.md
│   │   ├── 2026-03-25-figma-components-design.md
│   │   └── 2026-03-25-figma-ui-library-design.md
│   └── plans/
│       ├── 2026-03-20-futra-spend-integration.md
│       ├── 2026-03-20-futra-save-and-demo-switcher.md
│       ├── 2026-03-22-aria-accessibility-audit.md
│       ├── 2026-03-22-atomic-design-templates.md
│       ├── 2026-03-22-token-architecture.md
│       ├── 2026-03-23-mobile-responsive-layouts.md
│       ├── 2026-03-23-page-transitions.md
│       ├── 2026-03-23-interactive-token-grid.md
│       ├── 2026-03-25-figma-components.md
│       └── 2026-03-25-figma-ui-library.md
├── prompts/
│   ├── figma-make-credit.md
│   ├── figma-make-plan.md
│   ├── figma-make-save.md
│   ├── figma-make-spend.md
│   └── figma-make-together.md
├── figma-library-workflow.md
├── futra-financial.md
├── image-requirements.md
└── testing.md
```
