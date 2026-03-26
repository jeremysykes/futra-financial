# Spacing Tokens Design Spec

> **Status:** Not implemented. After evaluation, we decided to use Tailwind's built-in spacing scale. See `docs/decisions/spacing-tokens.md` for the rationale. This spec is preserved as a reference for future implementation if BU-specific density becomes a concrete requirement.

## Context

The Futra Financial design system currently handles **color tokens only** — 118 DTCG primitives flowing through Style Dictionary into a two-layer semantic architecture (primitives → semantic overrides per BU). All spacing uses Tailwind defaults or hardcoded values, with no centralized control, no BU-specific density, and no Figma alignment.

This spec adds spacing tokens to the existing pipeline, enabling:
- **Cross-BU consistency** — a single spacing scale as the source of truth
- **BU-specific spacing density** — Plan (data-dense) tightens, Together (warm) loosens
- **Design-code alignment** — Figma consumes the same DTCG spacing tokens as code

## Architecture

Two-layer model, mirroring colors exactly:

```
tokens.json (DTCG primitives: spacing-1 through spacing-16)
  ↓ [Style Dictionary: css/variables, zero config change]
primitives.css (--spacing-1: 0.25rem; etc. in :root)
  ↓ [Vite module resolution]
tailwind.css (@theme: semantic tokens xs/sm/md/lg/xl/2xl → primitives)
  ↓ [@layer base: BU overrides remap semantics to different primitives]
Components (use Tailwind utilities: gap-md, p-lg, m-sm)
```

## Primitive Spacing Scale

Added as a `spacing` group in `packages/tokens/src/tokens.json` using DTCG `$type: "dimension"`:

| Token | Value | Pixels | Use case |
|-------|-------|--------|----------|
| `spacing-1` | `0.25rem` | 4px | Tight inline gaps, icon padding |
| `spacing-2` | `0.5rem` | 8px | Input padding, compact list gaps |
| `spacing-3` | `0.75rem` | 12px | Button padding, small card gaps |
| `spacing-4` | `1rem` | 16px | Standard content gaps |
| `spacing-5` | `1.25rem` | 20px | Card padding |
| `spacing-6` | `1.5rem` | 24px | Section gaps |
| `spacing-8` | `2rem` | 32px | Large section gaps |
| `spacing-10` | `2.5rem` | 40px | Page gutters |
| `spacing-12` | `3rem` | 48px | Hero spacing |
| `spacing-16` | `4rem` | 64px | Major section breaks |

4px base, Tailwind-aligned numbering (number × 4px = pixel value). Skips 7, 9, 11, 13-15 to keep the scale practical.

### DTCG format

```json
{
  "spacing": {
    "1":  { "$value": "0.25rem", "$type": "dimension" },
    "2":  { "$value": "0.5rem",  "$type": "dimension" },
    "3":  { "$value": "0.75rem", "$type": "dimension" },
    "4":  { "$value": "1rem",    "$type": "dimension" },
    "5":  { "$value": "1.25rem", "$type": "dimension" },
    "6":  { "$value": "1.5rem",  "$type": "dimension" },
    "8":  { "$value": "2rem",    "$type": "dimension" },
    "10": { "$value": "2.5rem",  "$type": "dimension" },
    "12": { "$value": "3rem",    "$type": "dimension" },
    "16": { "$value": "4rem",    "$type": "dimension" }
  }
}
```

Generated output in `primitives.css`:

```css
:root {
  /* ...existing color primitives... */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
}
```

## Semantic Spacing Tokens

Role-based tokens in `apps/web/src/tailwind.css` `@theme` block. Components reference these; BUs override them.

| Semantic Token | Default Mapping | Intent |
|----------------|-----------------|--------|
| `--spacing-xs` | `var(--spacing-1)` (4px) | Tight gaps: icon-to-label, inline elements |
| `--spacing-sm` | `var(--spacing-2)` (8px) | Compact: input padding, list item gaps |
| `--spacing-md` | `var(--spacing-4)` (16px) | Standard: card padding, content gaps |
| `--spacing-lg` | `var(--spacing-6)` (24px) | Generous: section gaps, modal padding |
| `--spacing-xl` | `var(--spacing-8)` (32px) | Large: page gutters, hero sections |
| `--spacing-2xl` | `var(--spacing-12)` (48px) | Major breaks: section dividers, page-level separation |

### Tailwind integration

```css
@theme {
  /* ...existing color semantics... */
  --spacing-xs: var(--spacing-1);
  --spacing-sm: var(--spacing-2);
  --spacing-md: var(--spacing-4);
  --spacing-lg: var(--spacing-6);
  --spacing-xl: var(--spacing-8);
  --spacing-2xl: var(--spacing-12);
}
```

Tailwind generates utilities: `gap-xs`, `p-md`, `m-lg`, `space-x-sm`, etc.

## BU Overrides

Each BU remaps semantic tokens to different primitives in `@layer base`, using the same CSS cascade pattern as colors.

### Default (no override needed — uses @theme defaults)

### Spend (dark-first, precise)

```css
[data-business-unit='spend'] {
  --spacing-sm: var(--spacing-1);   /* 4px — tighter compact spacing */
  --spacing-md: var(--spacing-3);   /* 12px — slightly tighter standard */
}
```

### Save (goal-oriented, balanced)

No overrides — uses defaults.

### Credit (clinical, measured)

```css
[data-business-unit='credit'] {
  --spacing-sm: var(--spacing-1);   /* 4px — clinical precision */
  --spacing-md: var(--spacing-3);   /* 12px — tighter data tables */
}
```

### Plan (data-dense, Bloomberg energy)

```css
[data-business-unit='plan'] {
  --spacing-sm: var(--spacing-1);   /* 4px — very tight */
  --spacing-md: var(--spacing-3);   /* 12px — compact standard */
  --spacing-lg: var(--spacing-4);   /* 16px — tighter sections */
  --spacing-xl: var(--spacing-6);   /* 24px — reduced page gutters */
}
```

### Together (warm, domestic, generous)

```css
[data-business-unit='together'] {
  --spacing-md: var(--spacing-5);   /* 20px — roomier standard */
  --spacing-lg: var(--spacing-8);   /* 32px — generous sections */
  --spacing-xl: var(--spacing-10);  /* 40px — wide gutters */
}
```

## Pipeline Changes

### Files modified

| File | Change |
|------|--------|
| `packages/tokens/src/tokens.json` | Add `spacing` group with 10 dimension primitives |
| `apps/web/src/tailwind.css` | Add 6 semantic spacing tokens to `@theme`, add BU overrides to `@layer base` |
| `DESIGN.md` | Document spacing scale, semantic tokens, and BU density patterns |
| `docs/design-token-pipeline.md` | Add dimension token flow documentation |

### Files unchanged

| File | Why |
|------|-----|
| `packages/tokens/config/style-dictionary.config.ts` | Default `css/variables` format handles `$type: "dimension"` with no config changes |
| `turbo.json` | Same `^build` dependency chain works |
| `packages/tokens/package.json` | Same `primitives.css` export |

## Component Usage

Components use semantic Tailwind utilities, never primitive variables:

```tsx
// Correct — uses semantic token
<div className="p-md gap-sm">

// Wrong — references primitive directly
<div className="p-[var(--spacing-4)]">

// Wrong — hardcoded value
<div className="p-4">
```

Existing components continue to work with Tailwind's default spacing. Migration to semantic spacing tokens is incremental — no big-bang refactor required.

## Verification

1. Run `pnpm build` from root — confirms Style Dictionary generates spacing variables in `primitives.css`
2. Check `primitives.css` contains `--spacing-1` through `--spacing-16`
3. Start Storybook — verify Tailwind utilities `gap-md`, `p-lg` etc. resolve correctly
4. Toggle BU themes in DemoSwitcher — confirm spacing changes per BU
5. Inspect computed styles in DevTools — confirm semantic tokens resolve through to correct pixel values
