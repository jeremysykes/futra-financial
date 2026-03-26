# Decision: Spacing Tokens

**Date:** 2026-03-26
**Status:** Decided — use Tailwind defaults, no custom spacing tokens
**Revisit when:** BU-specific spacing density becomes a concrete product requirement

## Context

We evaluated adding custom spacing tokens to the DTCG pipeline, mirroring the two-layer architecture used for color tokens (primitives in `tokens.json` + semantic overrides per BU in `tailwind.css`).

## Decision

Use Tailwind's built-in spacing scale (`p-4` = 16px, `gap-6` = 24px, etc.) for all spacing. Do not add custom spacing tokens to the DTCG pipeline.

## Why

**Custom spacing tokens only add value if BUs need different spacing density** (e.g., Plan is data-dense/tight, Together is warm/generous). This need is speculative — no BU currently requires density differentiation.

Without BU-specific density, custom tokens add cost with no benefit:

- **Indirection cost.** Developers must learn `p-md` instead of `p-4`. Tailwind's numeric scale is universally understood.
- **Debugging cost.** BU overrides make spacing values harder to trace ("why is this 12px not 16px?").
- **Namespace risk.** Tailwind v4 reserves `--spacing-*` in `@theme` for its spacing utility system. Custom primitives named `--spacing-N` coexist with Tailwind's `calc(var(--spacing) * N)` today, but this relies on an implicit contract with Tailwind's internals.
- **Migration cost.** Once components use semantic spacing utilities, reverting to Tailwind defaults requires touching every component.

**Colors are different.** Custom color tokens are essential because each BU has a distinct visual identity — different palettes, different emotional registers. Spacing doesn't have this differentiation today.

## What we'd need to revisit

If BU-specific density becomes a real requirement, the path is:

1. Add primitives to `tokens.json` using a `space` group (not `spacing`, to avoid Tailwind's namespace) with `$type: "dimension"`
2. Add semantic tokens (`--spacing-xs` through `--spacing-2xl`) in the `@theme` block — this namespace gives native Tailwind utility generation (`p-xs`, `gap-md`, etc.)
3. Add BU overrides in `@layer base`, same pattern as colors
4. The pipeline (Style Dictionary config, Turborepo, package exports) requires zero changes

A prototype of this full implementation was built and verified during this evaluation. The spec is preserved at `docs/superpowers/specs/2026-03-26-spacing-tokens-design.md` for reference.
