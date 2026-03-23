# Interactive Token Grid — Design Spec

## Overview

Replace the existing `DesignTokens.stories.tsx` with an interactive token grid that shows every semantic token's resolved value across all 5 business units simultaneously. Designers verify brand differentiation at a glance; devs look up Tailwind classes and variable chains.

## Audience

Both designers and developers. Lives in Storybook as the single source of truth for token documentation.

## Story Structure

The story replaces `src/stories/foundation/DesignTokens.stories.tsx` and consists of four parts:

### 1. Intro Block

A short paragraph (3-4 sentences) explaining the primitive-to-semantic token architecture. Condensed from the existing story's explanation. Includes a small inline example showing `var(--teal)` → `var(--color-accent)` → `bg-accent`.

### 2. Mode Toggle Bar

Three-way segmented control at the top of the grid:

- **BU Defaults** — Each BU column uses its default mode per `UNIT_DEFAULTS`: Spend = dark, Save = light, Credit = light, Plan = dark, Together = light
- **All Light** — Forces all 5 columns to light mode
- **All Dark** — Forces all 5 columns to dark mode

React state: `'bu-defaults' | 'all-light' | 'all-dark'`. On change, the grid re-renders with the appropriate `light` or `dark` values from the pre-resolved cache. No DOM reads on toggle.

### 3. Token Matrix

A single `<table>` with:

- **6 columns**: Token name + 5 BU columns (Spend, Save, Credit, Plan, Together)
- **Column headers**: BU name colored in its accent, with a small label showing the currently active mode ("dark" / "light") that updates with the toggle
- **Category divider rows**: Styled `<tr>` headers in indigo uppercase text, with a top border separator. Categories: Backgrounds, Foregrounds, Brand & Interactive, Status, Borders
- **Token rows**: CSS variable name on the left, 24px rounded swatches per BU column. Rows highlight on hover to indicate clickability
- **No search or filter**: With ~13-20 semantic tokens, the flat grouped list is sufficient

### 4. Drill-Down Panel

Clicking a token row toggles an expansion panel directly below it:

- **44px swatches** per BU with hex value and BU name label underneath
- **Tailwind utility class** (e.g., `bg-surface`, `text-accent`) — derived from the token name by stripping the `--color-` prefix
- **CSS variable chain** per BU (e.g., `var(--color-surface) → var(--spend-ink)`) — parsed from the stylesheet

Multiple rows can be expanded simultaneously. State is a `Set<string>` of expanded token names. Clicking an expanded row collapses it.

## Token Resolution Mechanism

### Upfront Resolution

On mount, the story resolves all tokens for all BUs in both modes and caches the results. The mode toggle indexes into cached values — no DOM reads after init.

**Steps:**

1. Render 10 hidden resolver elements: 5 BUs × 2 modes. Each resolver is a `<div class="dark">` wrapper (or not, for light mode) containing a child `<div data-business-unit="spend">`. This two-element structure satisfies both compound selectors (`.dark[data-business-unit]`) and descendant selectors (`.dark [data-business-unit]`) in the CSS. The outermost wrapper is `position: absolute; opacity: 0; pointer-events: none`.
2. For each div, call `getComputedStyle(div).getPropertyValue(token)` for every discovered semantic token.
3. Store results in state:

```ts
type ResolvedTokens = Record<
  string, // CSS variable name, e.g. '--color-accent'
  Record<BusinessUnit, { light: string; dark: string }>
>;
```

4. Remove the hidden divs from the DOM.
5. When the mode toggle changes, the grid re-renders by selecting `light` or `dark` from the cached values. For `bu-defaults`, each column uses its BU's default mode from the existing `UNIT_DEFAULTS` map.

### Dynamic Token Discovery

Tokens are discovered automatically from `document.styleSheets` — no manual registry required. Adding a new token to `tailwind.css` makes it appear in the grid automatically.

**Discovery steps:**

1. **Semantic tokens** — Iterate `document.styleSheets`, find all CSS rules on `:root`, `.dark`, or `[data-business-unit]` selectors that declare properties matching `--color-*`. The `@theme` directive is compiled away at build time by Tailwind v4; semantic tokens appear as standard custom properties in the output CSS. The `--color-` prefix reliably distinguishes semantic tokens from primitives (which use names like `--indigo`, `--spend-void`, etc.).
2. **Primitive chains** — Parsing `var()` references from `cssText` at runtime is unreliable (browsers may resolve values, and build-time compilation may strip `var()` wrappers). Instead, import `tailwind.css` as a raw string at build time (via Vite's `?raw` import suffix) and parse the `var()` references from the source CSS. This is deterministic and works regardless of browser behavior. If a chain cannot be resolved (e.g., the token was added in a way that doesn't follow the `var(--primitive)` pattern), the drill-down gracefully shows "direct value" instead of a chain.
3. **Per-BU overrides** — From the same raw CSS import, parse rules matching `[data-business-unit='*']` selectors to find which primitives each BU maps its semantic tokens to.
4. **Tailwind class** — The stripped token name (minus `--color-` prefix) is the base utility name. Display it with common prefixes: `bg-{name}` for background-like tokens, `text-{name}` for foreground-like tokens, `border-{name}` for border tokens, `ring-{name}` for ring. The category assignment informs which prefix is shown as the primary usage.

### Category Grouping

Categories are derived from token name prefixes. A static prefix map is the only hardcoded data:

Matching uses the **first segment** of the token name after stripping `--color-`. For compound names like `--color-muted-foreground`, the first segment is `muted`, but a special rule applies: if the name ends with `-foreground`, it is categorized as Foregrounds regardless of its first segment.

```ts
const CATEGORY_MAP: Record<string, string> = {
  'background|surface|secondary|muted': 'Backgrounds',
  'foreground': 'Foregrounds',
  'primary|accent|ring': 'Brand & Interactive',
  'positive|negative|caution|destructive': 'Status',
  'border': 'Borders',
};

// Special rule: any token ending in '-foreground' goes to Foregrounds
// e.g., --color-muted-foreground, --color-secondary-foreground, --color-destructive-foreground, --color-primary-foreground
```

Tokens that don't match any prefix fall into an "Other" category. This map only needs updating if an entirely new category of semantic tokens is introduced — individual token additions within existing categories are automatic.

## Decorator Usage

- Uses `withStoryDisplay()` with no options (full width, default padding)
- The global `withThemeContext` decorator still applies but is effectively bypassed — the story resolves all themes internally via hidden containers rather than relying on the Storybook toolbar's BU/theme selection

## Visual Design

- Dark background (`bg-background` from default theme)
- Category headers: indigo (`#6c6fe4`), uppercase, 10px, letter-spaced, with 2px top border
- Collapsed rows: 24px swatches with 6px border-radius, subtle hover highlight
- Expanded rows: indigo-tinted background, 44px swatches with 8px border-radius
- Drill-down text: monospace, muted colors, Tailwind class in a small pill badge
- Mode toggle: segmented control with active state in indigo
- Column headers: BU name in its accent color, mode label in muted text below

## File Changes

| File | Action |
|------|--------|
| `src/stories/foundation/DesignTokens.stories.tsx` | Replace entirely |

No new files. No changes to `tailwind.css`, decorators, or other stories.

## Non-Goals

- Accessibility contrast ratios (future story)
- Animation token visualization
- Primitive-layer display (the existing story showed these; the new grid focuses on semantic tokens only)
- Search, filter, or text-based token lookup
- Reusable component extraction (Storybook-only for now)
