# Token Architecture Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure design tokens in tailwind.css from flat hardcoded values into a two-layer primitive + semantic architecture where BU themes reference named primitives instead of repeating hex values.

**Architecture:** Primitives at `:root` (raw palette, no Tailwind utilities generated), semantic tokens in `@theme` (referencing primitives via `var()`), BU overrides in `@layer base` (reassigning semantic tokens to different primitives). No component code changes.

**Tech Stack:** CSS custom properties, Tailwind v4, Playwright for visual regression

**Spec:** `docs/superpowers/specs/2026-03-22-token-architecture-design.md`

---

## File Map

| File                                              | Change                                                                                               |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `src/tailwind.css`                                | Full restructure: add `:root` primitives, rewrite `@theme` and all BU blocks to reference primitives |
| `src/stories/foundation/DesignTokens.stories.tsx` | Update to show primitive and semantic layers                                                         |
| `DESIGN.md`                                       | Update token architecture description                                                                |

---

## Task 1: Take Before Screenshots

**Files:** None — Playwright screenshots only

- [ ] **Step 1: Screenshot all 5 BUs in light mode**

Use Playwright to navigate to each BU page and take a full-page screenshot:

- `http://localhost:5173/spend` → `before-spend-light.png`
- `http://localhost:5173/save` → `before-save-light.png`
- `http://localhost:5173/credit` → `before-credit-light.png`
- `http://localhost:5173/plan` → `before-plan-light.png`
- `http://localhost:5173/together` → `before-together-light.png`

- [ ] **Step 2: Switch to dark mode and screenshot all 5 BUs**

Click the dark mode toggle on each page and screenshot:

- `before-spend-dark.png`
- `before-save-dark.png`
- `before-credit-dark.png`
- `before-plan-dark.png`
- `before-together-dark.png`

---

## Task 2: Restructure tailwind.css

**Files:**

- Modify: `src/tailwind.css`

This is the core refactor. The entire file is rewritten but the structure is mechanical: extract values into primitives, replace values with `var()` references.

- [ ] **Step 1: Add `:root` primitive block before `@theme`**

After `@custom-variant dark` and before `@theme`, add the complete `:root` block with all primitives from the spec. This includes:

**Shared palette:** `--white`, `--black`, `--indigo`, `--indigo-hover`, `--indigo-light`, `--teal`, `--coral`, `--amber`, `--destructive-red` (#d40924)

**Default theme primitives** (oklch converted to hex — use a tool or browser devtools to convert):

- `--default-bg`: oklch(1 0 0) → #ffffff (same as `--white`)
- `--default-fg`: oklch(0.15 0 0) → approximate hex
- `--default-secondary`: oklch(0.96 0 0) → approximate hex
- `--default-secondary-hover`: oklch(0.91 0 0) → approximate hex
- `--default-secondary-fg`: oklch(0.2 0 0) → approximate hex
- `--default-muted`: oklch(0.95 0 0) → approximate hex
- `--default-muted-fg`: oklch(0.55 0 0) → approximate hex
- `--default-border`: oklch(0.88 0 0) → approximate hex
- `--default-ring`: oklch(0.45 0 0) → approximate hex
- `--default-accent`: oklch(0.5 0.2 265) → approximate hex
- `--default-positive`: oklch(0.6 0.15 170) → approximate hex
- `--default-negative`: oklch(0.65 0.16 25) → approximate hex
- `--default-caution`: oklch(0.75 0.15 75) → approximate hex
- `--default-destructive`: oklch(0.55 0.22 25) → approximate hex

**Default dark primitives** (oklch dark mode values → hex):

- `--default-dark-bg`: oklch(0.13 0 0) → approximate hex
- `--default-dark-fg`: oklch(0.95 0 0) → approximate hex
- `--default-dark-surface`: oklch(0.18 0 0) → approximate hex
- ... (all dark mode oklch values)

**Per-BU primitives:** Use the exact hex values from the spec for Spend, Save, Credit, Plan, Together.

**Important:** To convert oklch values to hex, create a temp HTML page that sets each oklch value as a `background-color` and reads the computed RGB via JavaScript, then convert to hex. Or use the browser devtools color picker.

- [ ] **Step 2: Rewrite `@theme` block to reference primitives**

Replace all oklch values in the `@theme` block with `var()` references to primitives:

```css
@theme {
  --color-background: var(--white);
  --color-foreground: var(--default-fg);
  --color-surface: var(--white);

  --color-primary: var(--default-ring);
  --color-primary-hover: var(--default-primary-hover);
  --color-primary-foreground: var(--white);

  --color-secondary: var(--default-secondary);
  --color-secondary-hover: var(--default-secondary-hover);
  --color-secondary-foreground: var(--default-secondary-fg);

  --color-muted: var(--default-muted);
  --color-muted-foreground: var(--default-muted-fg);

  --color-border: var(--default-border);
  --color-ring: var(--default-ring);

  --color-accent: var(--default-accent);
  --color-positive: var(--default-positive);
  --color-negative: var(--default-negative);
  --color-caution: var(--default-caution);

  --color-destructive: var(--default-destructive);
  --color-destructive-foreground: var(--white);

  --animate-interval: 100ms;
  --animate-accordion-down: accordion-down 300ms ease-out;
  --animate-accordion-up: accordion-up 200ms ease-out;
}
```

- [ ] **Step 3: Rewrite `.dark` default block**

Replace all oklch values with `var()` references to dark default primitives.

- [ ] **Step 4: Rewrite Spend light + dark blocks**

Replace all hex values with `var()` references. Example:

```css
[data-business-unit='spend'] {
  --color-background: var(--spend-cloud);
  --color-foreground: var(--spend-ink);
  --color-surface: var(--white);
  --color-primary: var(--indigo);
  --color-primary-hover: var(--indigo-hover);
  --color-primary-foreground: var(--white);
  --color-secondary: var(--spend-secondary);
  --color-secondary-hover: var(--spend-secondary-hover);
  --color-secondary-foreground: var(--spend-ink);
  --color-muted: var(--spend-secondary);
  --color-muted-foreground: var(--spend-muted);
  --color-border: var(--spend-border);
  --color-ring: var(--indigo);
  --color-accent: var(--indigo);
  --color-positive: var(--teal);
  --color-negative: var(--coral);
  --color-caution: var(--amber);
}

[data-business-unit='spend'].dark,
.dark [data-business-unit='spend'] {
  --color-background: var(--spend-void);
  --color-foreground: var(--white);
  --color-surface: var(--spend-ink);
  --color-primary: var(--indigo);
  --color-primary-hover: var(--indigo-hover);
  --color-primary-foreground: var(--white);
  --color-secondary: var(--spend-ink);
  --color-secondary-hover: var(--spend-secondary-dark);
  --color-secondary-foreground: var(--white);
  --color-muted: var(--spend-ink);
  --color-muted-foreground: var(--spend-muted);
  --color-border: var(--spend-border-dark);
  --color-ring: var(--indigo);
  --color-accent: var(--indigo);
  --color-positive: var(--teal);
  --color-negative: var(--coral);
  --color-caution: var(--amber);
}
```

- [ ] **Step 5: Rewrite Save light + dark blocks**

Same pattern — replace all hex with `var()` references to Save primitives.

- [ ] **Step 6: Rewrite Credit light + dark blocks**

Same pattern with Credit primitives.

- [ ] **Step 7: Rewrite Plan light + dark blocks**

Same pattern with Plan primitives.

- [ ] **Step 8: Rewrite Together light + dark blocks**

Same pattern with Together primitives.

- [ ] **Step 9: Verify no raw hex/oklch/rgba values remain in semantic or theme blocks**

Search the file. The only raw values should be:

- Inside the `:root` primitives block
- Animation values (keyframes, durations)
- The `:focus-visible` rule (references `var(--color-ring)` — correct)

```bash
# This should only match lines inside :root { ... }
grep -n '#[0-9a-fA-F]' src/tailwind.css
grep -n 'oklch' src/tailwind.css
grep -n 'rgba' src/tailwind.css
```

- [ ] **Step 10: Build and verify**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 11: Commit**

```bash
git add src/tailwind.css
git commit -m "refactor: restructure design tokens into primitive + semantic layers"
```

---

## Task 3: Take After Screenshots and Compare

- [ ] **Step 1: Screenshot all 5 BUs in light and dark mode**

Same as Task 1 but with `after-` prefix filenames.

- [ ] **Step 2: Visually compare before/after screenshots**

Compare each pair. BU-themed pages should look identical. The default/white-label theme may have minor sub-pixel differences from oklch-to-hex conversion — this is acceptable.

If any BU page has visible regressions, fix the primitive reference in tailwind.css before proceeding.

- [ ] **Step 3: Clean up screenshot files**

```bash
rm -f before-*.png after-*.png
```

---

## Task 4: Update Foundation/Design Tokens Story

**Files:**

- Modify: `src/stories/foundation/DesignTokens.stories.tsx`

- [ ] **Step 1: Add a Primitives section to the token table**

The DesignTokens story currently shows semantic tokens only. Add a new section at the top showing all primitive tokens read from `:root`. Group them by palette (Shared, Spend, Save, Credit, Plan, Together).

For primitives, show:

- Token name (e.g., `--indigo`)
- Resolved value (hex)
- Color swatch

Primitives don't have Tailwind classes or semantic descriptions — they're just the palette dictionary.

- [ ] **Step 2: Add a visual separator between primitive and semantic sections**

Add a heading and description explaining the two layers:

- "Primitives — raw palette values, never referenced by components"
- "Semantic Tokens — intent-based tokens, referenced via Tailwind classes"

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/stories/foundation/DesignTokens.stories.tsx
git commit -m "feat: show primitive and semantic token layers in Design Tokens story"
```

---

## Task 5: Update DESIGN.md

**Files:**

- Modify: `DESIGN.md`

- [ ] **Step 1: Update the Token Architecture section**

Find the existing token architecture description (around line 30-35) and update to reflect the new two-layer structure:

```markdown
### Token Architecture

The theme system uses a two-layer token structure in `tailwind.css`:

**Primitives** (`:root`) — Named color values that form the raw palette. Components never reference these directly. Each BU has its own primitive set alongside shared values like `--indigo` and `--teal`.

**Semantic tokens** (`@theme`) — Intent-based tokens (`--color-background`, `--color-primary`, `--color-accent`) that reference primitives via `var()`. Components use Tailwind utility classes mapped to these tokens. BU theme switching overrides semantic values to point at different primitives.
```

Primitives (raw palette) → --indigo: #6c6fe4
--save-grove: #4a7c59
Semantic tokens (intent) → --color-primary: var(--indigo)
--color-accent: var(--indigo)
Theme overrides (BU switch) → [data-business-unit='save'] {
--color-accent: var(--save-grove);
}

```

```

- [ ] **Step 2: Commit**

```bash
git add DESIGN.md
git commit -m "docs: update token architecture to reflect primitive + semantic layers"
```
