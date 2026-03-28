# Token Architecture Restructure — Design Spec

## Overview

Restructure the design token architecture in `tailwind.css` from a flat structure (semantic tokens with hardcoded hex/oklch values) into a two-layer system: primitive tokens define the raw palette, semantic tokens define intent and reference primitives. BU theme switching overrides semantic token values by pointing them to different primitives.

## Current Problem

Every BU theme block repeats raw hex values. For example, `#6c6fe4` (Indigo) appears 20+ times across BU blocks. Changing a primitive color requires finding and updating every occurrence. There's no single source of truth for the raw palette — values are inlined directly into semantic token assignments.

Additionally, the default/white-label theme uses oklch values while BU themes use hex. The refactor should normalize this.

## Token Layers

### Layer 1 — Primitives

Raw named color values. The project's color dictionary. Components never reference primitives directly — they exist solely to give semantic tokens named values to point to.

**Naming convention:** `--{name}` — the value-based naming already implies primitive nature. No prefix needed.

**Where primitives live:** Declared at `:root` scope outside the `@theme` block. This prevents Tailwind from generating utility classes for them (e.g., `bg-indigo`), which would violate the rule that components never reference primitives. Semantic tokens inside `@theme` reference primitives via `var()`.

```css
:root {
  /* ─── Shared palette ─── */
  --white: #ffffff;
  --black: #000000;
  --indigo: #6c6fe4;
  --indigo-hover: #5b5ed0;
  --indigo-light: #7b7eee;
  --teal: #2abfa3;
  --coral: #e4746c;
  --amber: #e8a838;

  /* ─── Spend palette ─── */
  --spend-void: #0f0f12;
  --spend-ink: #1a1a1f;
  --spend-cloud: #f5f5f8;
  --spend-muted: #8b8b9a;
  --spend-secondary: #f0f0f5;
  --spend-secondary-hover: #e5e5ee;
  --spend-secondary-dark: #252530;
  --spend-border: rgba(0, 0, 0, 0.08);
  --spend-border-dark: rgba(255, 255, 255, 0.08);

  /* ─── Save palette ─── */
  --save-linen: #f7f5f0;
  --save-ink: #1c1c1a;
  --save-grove: #4a7c59;
  --save-grove-light: #5a8c69;
  --save-sage: #a8c5b0;
  --save-mist: #e8f0eb;
  --save-mist-hover: #d8e8dd;
  --save-muted: #7a7a72;
  --save-muted-dark: #9a9a90;
  --save-surface-dark: #2a2a26;
  --save-secondary-dark: #2a3a2e;
  --save-secondary-dark-hover: #354538;
  --save-border: rgba(74, 124, 89, 0.15);
  --save-border-dark: rgba(74, 124, 89, 0.2);

  /* ─── Credit palette ─── */
  --credit-iris: #f9f7ff;
  --credit-lavender: #eeeaff;
  --credit-lavender-hover: #e0daff;
  --credit-midnight: #1a1830;
  --credit-slate: #9896c8;
  --credit-slate-dark: #7b79b0;
  --credit-periwinkle: #d4d2ee;
  --credit-muted: #6b6880;
  --credit-surface-dark: #252340;
  --credit-secondary-dark: #3a3860;
  --credit-secondary-dark-hover: #454370;
  --credit-border: rgba(108, 111, 228, 0.15);
  --credit-border-dark: rgba(108, 111, 228, 0.2);

  /* ─── Plan palette ─── */
  --plan-cloud: #f0f4f8;
  --plan-abyss: #0c1017;
  --plan-deep: #151e2b;
  --plan-surface-dark: #1f2d3d;
  --plan-surface-dark-hover: #2a3a4d;
  --plan-steel: #a0aec0;
  --plan-muted: #64748b;
  --plan-secondary: #e8edf2;
  --plan-secondary-hover: #d8dfe8;
  --plan-fg-dark: #e2e8f0;
  --plan-teal: #1fa88e;
  --plan-caution: #d4962e;
  --plan-border: rgba(12, 16, 23, 0.1);
  --plan-border-dark: rgba(255, 255, 255, 0.08);

  /* ─── Together palette ─── */
  --together-warm: #fff9f5;
  --together-espresso: #1c1a18;
  --together-terracotta: #c4622d;
  --together-terracotta-light: #d4724a;
  --together-blush: #f2e4da;
  --together-blush-hover: #e8d6ca;
  --together-clay: #9e8e84;
  --together-surface-dark: #2a2622;
  --together-secondary-dark: #3a322c;
  --together-secondary-dark-hover: #453c35;
  --together-grove: #4a7c59;
  --together-grove-light: #5a8c69;
  --together-border: rgba(196, 98, 45, 0.15);
  --together-border-dark: rgba(196, 98, 45, 0.2);
}
```

### Layer 2 — Semantic Tokens

Contextual meanings that components reference via Tailwind classes. Defined inside `@theme` so Tailwind generates utility classes for them. These are BU-agnostic — the same token names exist everywhere. BU theme switching overrides their values.

```css
@theme {
  --color-background: var(--white);
  --color-foreground: var(--black);
  --color-surface: var(--white);

  --color-primary: var(--indigo);
  --color-primary-hover: var(--indigo-hover);
  --color-primary-foreground: var(--white);

  --color-secondary: #f2f2f2;
  --color-secondary-hover: #e5e5e5;
  --color-secondary-foreground: var(--black);

  --color-muted: #eeeeee;
  --color-muted-foreground: #717171;

  --color-border: #d7d7d7;
  --color-ring: var(--indigo);

  --color-accent: var(--indigo);
  --color-positive: var(--teal);
  --color-negative: var(--coral);
  --color-caution: var(--amber);

  --color-destructive: #d40924;
  --color-destructive-foreground: var(--white);

  --animate-interval: 100ms;
  --animate-accordion-down: accordion-down 300ms ease-out;
  --animate-accordion-up: accordion-up 200ms ease-out;
}
```

**Note on oklch:** The current default theme uses oklch values. During migration, these will be converted to hex primitives. The BU themes already use hex, so this normalizes the color space. Slight sub-pixel rendering differences between oklch and hex are acceptable for the default/white-label theme — it's only used as a fallback, never in production BU pages.

### Theme Overrides

BU switching reassigns semantic tokens to different primitives. Light/dark mode is a separate axis. All values are `var()` references to primitives — no raw hex or oklch.

```css
[data-business-unit='save'] {
  --color-background: var(--save-linen);
  --color-foreground: var(--save-ink);
  --color-surface: var(--white);
  --color-secondary: var(--save-mist);
  --color-secondary-hover: var(--save-mist-hover);
  --color-secondary-foreground: var(--save-ink);
  --color-muted: var(--save-mist);
  --color-muted-foreground: var(--save-muted);
  --color-border: var(--save-border);
  --color-ring: var(--save-grove);
  --color-accent: var(--save-grove);
  --color-positive: var(--save-grove);
  /* primary stays as default (Indigo) */
}

[data-business-unit='save'].dark,
.dark [data-business-unit='save'] {
  --color-background: var(--save-ink);
  --color-foreground: var(--save-linen);
  --color-surface: var(--save-surface-dark);
  --color-secondary: var(--save-secondary-dark);
  --color-secondary-hover: var(--save-secondary-dark-hover);
  --color-secondary-foreground: var(--save-linen);
  --color-muted: var(--save-secondary-dark);
  --color-muted-foreground: var(--save-muted-dark);
  --color-border: var(--save-border-dark);
  --color-ring: var(--save-grove-light);
  --color-accent: var(--save-grove-light);
  --color-positive: var(--save-grove-light);
}
```

## Handling Special Cases

### Border values with alpha

Border primitives include the full rgba value (e.g., `--save-border: rgba(74, 124, 89, 0.15)`). The alpha channel is part of the primitive — not composed at the semantic layer. This is the simplest approach that avoids CSS `color-mix()` complexity.

### Destructive tokens

`--color-destructive` and `--color-destructive-foreground` are semantic tokens that need primitives. The destructive red will be added as a shared primitive.

### Plan-specific accent colors

Plan's `--plan-teal: #1fa88e` is distinct from the shared `--teal: #2abfa3`. In Plan's dark mode, `--color-positive` maps to the shared `--teal`, not `--plan-teal`. This is intentional — Plan uses different teal shades for light vs. dark contexts.

## What Changes

### File changes

- `src/tailwind.css` — restructure into `:root` primitives + `@theme` semantic defaults + `@layer base` BU overrides referencing primitives
- `src/stories/foundation/DesignTokens.stories.tsx` — update to show both layers
- `src/stories/foundation/Colors.stories.tsx` — no change needed (reads semantic tokens at runtime)
- `DESIGN.md` — update token architecture description

### What stays the same

- All Tailwind classes (`bg-background`, `text-accent`, etc.) — unchanged
- All component code — unchanged, components reference semantic tokens only
- Visual output — near-identical (minor sub-pixel differences possible from oklch-to-hex normalization in default theme only)

## Rules

1. **Components never reference primitives.** Components use Tailwind classes that map to semantic tokens. Primitives are internal to `tailwind.css`.
2. **Semantic token names are universal.** The same `--color-background`, `--color-accent`, etc. exist for every BU. Only their values change.
3. **Primitives are the single source of truth for color values.** No hex/oklch/rgba values should appear in semantic or theme override blocks — only `var()` references to primitives.
4. **No artificial scales.** Primitives are named values (`--indigo`, `--save-grove`), not numbered scales, unless the project actually has gradations.
5. **Primitives live at `:root`, semantic tokens live in `@theme`.** This prevents Tailwind from generating utility classes for primitives.
6. **Alpha channels are part of the primitive.** Border tokens include rgba alpha directly in the primitive value rather than composing alpha at the semantic layer.
7. **Adding new colors:** Define the primitive first at `:root`, then reference it from semantic tokens in `@theme` or BU override blocks.

## Migration Strategy

This is a safe refactor because:

- No component code changes — Tailwind class names don't change
- Visual output should be identical (with minor oklch-to-hex tolerance for the default theme)
- Testable with Playwright — screenshot every BU page before and after

### Steps

1. Take "before" Playwright screenshots (all 5 BUs, light + dark = 10 screenshots)
2. Define all primitive tokens in `:root` at the top of `tailwind.css`
3. Rewrite the `@theme` block — semantic tokens reference primitives via `var()`
4. Rewrite each BU override block — all values become `var()` references
5. Build and verify — `npm run build` must pass
6. Take "after" Playwright screenshots and compare
7. If any visual regressions, fix before merging
8. Update Foundation/Design Tokens story to show both layers
9. Update DESIGN.md token architecture description

## Success Criteria

- Near-zero visual regressions across all 5 BUs in light and dark mode
- No raw color values (hex/oklch/rgba) in semantic or theme override blocks — only `var()` references
- Foundation/Design Tokens page shows primitive and semantic layers
- All existing Tailwind classes continue working unchanged
- Primitives at `:root` do not generate Tailwind utility classes
