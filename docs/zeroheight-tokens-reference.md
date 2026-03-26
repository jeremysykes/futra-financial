# Zeroheight Tokens Reference

> Copy-paste reference for populating the zeroheight Tokens and Spacing pages. Organized to match the zeroheight page structure.

---

## Foundations > Tokens

### Shared Primitives

| Token | Value | Preview |
|-------|-------|---------|
| `--white` | `#ffffff` | ![#ffffff](https://placehold.co/24x24/ffffff/ffffff) |
| `--black` | `#000000` | ![#000000](https://placehold.co/24x24/000000/000000) |
| `--indigo` | `#6c6fe4` | ![#6c6fe4](https://placehold.co/24x24/6c6fe4/6c6fe4) |
| `--indigo-hover` | `#5b5ed0` | ![#5b5ed0](https://placehold.co/24x24/5b5ed0/5b5ed0) |
| `--indigo-light` | `#7b7eee` | ![#7b7eee](https://placehold.co/24x24/7b7eee/7b7eee) |
| `--teal` | `#2abfa3` | ![#2abfa3](https://placehold.co/24x24/2abfa3/2abfa3) |
| `--coral` | `#e4746c` | ![#e4746c](https://placehold.co/24x24/e4746c/e4746c) |
| `--amber` | `#e8a838` | ![#e8a838](https://placehold.co/24x24/e8a838/e8a838) |
| `--destructive-red` | `#d40924` | ![#d40924](https://placehold.co/24x24/d40924/d40924) |

### Default Theme (Light)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--white` | `#ffffff` |
| `--color-foreground` | `--default-fg` | `#0b0b0b` |
| `--color-surface` | `--white` | `#ffffff` |
| `--color-primary` | `--default-primary` | `#555555` |
| `--color-primary-hover` | `--default-primary-hover` | `#3d3d3d` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--default-secondary` | `#f2f2f2` |
| `--color-secondary-hover` | `--default-secondary-hover` | `#e5e5e5` |
| `--color-secondary-foreground` | `--default-secondary-fg` | `#161616` |
| `--color-muted` | `--default-muted` | `#eeeeee` |
| `--color-muted-foreground` | `--default-muted-fg` | `#717171` |
| `--color-border` | `--default-border` | `#d7d7d7` |
| `--color-ring` | `--default-primary` | `#555555` |
| `--color-accent` | `--indigo` | `#6c6fe4` |
| `--color-positive` | `--teal` | `#2abfa3` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |
| `--color-destructive` | `--destructive-red` | `#d40924` |
| `--color-destructive-foreground` | `--white` | `#ffffff` |

### Default Theme (Dark)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--default-dark-bg` | `#080808` |
| `--color-foreground` | `--default-dark-fg` | `#eeeeee` |
| `--color-surface` | `--default-dark-surface` | `#121212` |
| `--color-primary` | `--default-dark-primary` | `#d4d4d4` |
| `--color-primary-hover` | `--default-dark-primary-hover` | `#e8e8e8` |
| `--color-primary-foreground` | `--default-dark-primary-fg` | `#080808` |
| `--color-secondary` | `--default-dark-secondary` | `#1a1a1a` |
| `--color-secondary-hover` | `--default-dark-secondary-hover` | `#252525` |
| `--color-secondary-foreground` | `--default-dark-secondary-fg` | `#e0e0e0` |
| `--color-muted` | `--default-dark-muted` | `#1a1a1a` |
| `--color-muted-foreground` | `--default-dark-muted-fg` | `#7a7a7a` |
| `--color-border` | `--default-dark-border` | `#2b2b2b` |
| `--color-ring` | `--default-dark-primary` | `#d4d4d4` |
| `--color-accent` | `--default-dark-accent` | `#5577ee` |
| `--color-positive` | `--default-dark-positive` | `#2ec4a0` |
| `--color-negative` | `--default-dark-negative` | `#e88070` |
| `--color-caution` | `--default-dark-caution` | `#e8b44c` |
| `--color-destructive` | `--default-dark-destructive` | `#e83030` |
| `--color-destructive-foreground` | `--white` | `#ffffff` |

---

### Spend Primitives

| Token | Value |
|-------|-------|
| `--spend-void` | `#0f0f12` |
| `--spend-ink` | `#1a1a1f` |
| `--spend-cloud` | `#f5f5f8` |
| `--spend-muted` | `#8b8b9a` |
| `--spend-secondary` | `#f0f0f5` |
| `--spend-secondary-hover` | `#e5e5ee` |
| `--spend-secondary-dark` | `#252530` |
| `--spend-border` | `#00000014` |
| `--spend-border-dark` | `#ffffff14` |

### Spend Theme (Light)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--spend-cloud` | `#f5f5f8` |
| `--color-foreground` | `--spend-ink` | `#1a1a1f` |
| `--color-surface` | `--white` | `#ffffff` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-hover` | `#5b5ed0` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--spend-secondary` | `#f0f0f5` |
| `--color-secondary-hover` | `--spend-secondary-hover` | `#e5e5ee` |
| `--color-secondary-foreground` | `--spend-ink` | `#1a1a1f` |
| `--color-muted` | `--spend-secondary` | `#f0f0f5` |
| `--color-muted-foreground` | `--spend-muted` | `#8b8b9a` |
| `--color-border` | `--spend-border` | `#00000014` |
| `--color-ring` | `--indigo` | `#6c6fe4` |
| `--color-accent` | `--indigo` | `#6c6fe4` |
| `--color-positive` | `--teal` | `#2abfa3` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

### Spend Theme (Dark)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--spend-void` | `#0f0f12` |
| `--color-foreground` | `--white` | `#ffffff` |
| `--color-surface` | `--spend-ink` | `#1a1a1f` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-hover` | `#5b5ed0` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--spend-ink` | `#1a1a1f` |
| `--color-secondary-hover` | `--spend-secondary-dark` | `#252530` |
| `--color-secondary-foreground` | `--white` | `#ffffff` |
| `--color-muted` | `--spend-ink` | `#1a1a1f` |
| `--color-muted-foreground` | `--spend-muted` | `#8b8b9a` |
| `--color-border` | `--spend-border-dark` | `#ffffff14` |
| `--color-ring` | `--indigo` | `#6c6fe4` |
| `--color-accent` | `--indigo` | `#6c6fe4` |
| `--color-positive` | `--teal` | `#2abfa3` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

---

### Save Primitives

| Token | Value |
|-------|-------|
| `--save-linen` | `#f7f5f0` |
| `--save-ink` | `#1c1c1a` |
| `--save-grove` | `#4a7c59` |
| `--save-grove-light` | `#5a8c69` |
| `--save-mist` | `#e8f0eb` |
| `--save-mist-hover` | `#d8e8dd` |
| `--save-muted` | `#7a7a72` |
| `--save-muted-dark` | `#9a9a90` |
| `--save-surface-dark` | `#2a2a26` |
| `--save-secondary-dark` | `#2a3a2e` |
| `--save-secondary-dark-hover` | `#354538` |
| `--save-border` | `#4a7c5926` |
| `--save-border-dark` | `#4a7c5933` |

### Save Theme (Light)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--save-linen` | `#f7f5f0` |
| `--color-foreground` | `--save-ink` | `#1c1c1a` |
| `--color-surface` | `--white` | `#ffffff` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-hover` | `#5b5ed0` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--save-mist` | `#e8f0eb` |
| `--color-secondary-hover` | `--save-mist-hover` | `#d8e8dd` |
| `--color-secondary-foreground` | `--save-ink` | `#1c1c1a` |
| `--color-muted` | `--save-mist` | `#e8f0eb` |
| `--color-muted-foreground` | `--save-muted` | `#7a7a72` |
| `--color-border` | `--save-border` | `#4a7c5926` |
| `--color-ring` | `--save-grove` | `#4a7c59` |
| `--color-accent` | `--save-grove` | `#4a7c59` |
| `--color-positive` | `--save-grove` | `#4a7c59` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

### Save Theme (Dark)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--save-ink` | `#1c1c1a` |
| `--color-foreground` | `--save-linen` | `#f7f5f0` |
| `--color-surface` | `--save-surface-dark` | `#2a2a26` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-hover` | `#5b5ed0` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--save-secondary-dark` | `#2a3a2e` |
| `--color-secondary-hover` | `--save-secondary-dark-hover` | `#354538` |
| `--color-secondary-foreground` | `--save-linen` | `#f7f5f0` |
| `--color-muted` | `--save-secondary-dark` | `#2a3a2e` |
| `--color-muted-foreground` | `--save-muted-dark` | `#9a9a90` |
| `--color-border` | `--save-border-dark` | `#4a7c5933` |
| `--color-ring` | `--save-grove-light` | `#5a8c69` |
| `--color-accent` | `--save-grove-light` | `#5a8c69` |
| `--color-positive` | `--save-grove-light` | `#5a8c69` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

---

### Credit Primitives

| Token | Value |
|-------|-------|
| `--credit-iris` | `#f9f7ff` |
| `--credit-lavender` | `#eeeaff` |
| `--credit-lavender-hover` | `#e0daff` |
| `--credit-midnight` | `#1a1830` |
| `--credit-slate` | `#9896c8` |
| `--credit-slate-dark` | `#7b79b0` |
| `--credit-periwinkle` | `#d4d2ee` |
| `--credit-muted` | `#6b6880` |
| `--credit-surface-dark` | `#252340` |
| `--credit-secondary-dark` | `#3a3860` |
| `--credit-secondary-dark-hover` | `#454370` |
| `--credit-border` | `#6c6fe426` |
| `--credit-border-dark` | `#6c6fe433` |

### Credit Theme (Light)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--credit-iris` | `#f9f7ff` |
| `--color-foreground` | `--credit-midnight` | `#1a1830` |
| `--color-surface` | `--credit-lavender` | `#eeeaff` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-hover` | `#5b5ed0` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--credit-lavender` | `#eeeaff` |
| `--color-secondary-hover` | `--credit-lavender-hover` | `#e0daff` |
| `--color-secondary-foreground` | `--credit-midnight` | `#1a1830` |
| `--color-muted` | `--credit-periwinkle` | `#d4d2ee` |
| `--color-muted-foreground` | `--credit-muted` | `#6b6880` |
| `--color-border` | `--credit-border` | `#6c6fe426` |
| `--color-ring` | `--indigo` | `#6c6fe4` |
| `--color-accent` | `--credit-slate` | `#9896c8` |
| `--color-positive` | `--indigo` | `#6c6fe4` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

### Credit Theme (Dark)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--credit-midnight` | `#1a1830` |
| `--color-foreground` | `--credit-iris` | `#f9f7ff` |
| `--color-surface` | `--credit-surface-dark` | `#252340` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-light` | `#7b7eee` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--credit-secondary-dark` | `#3a3860` |
| `--color-secondary-hover` | `--credit-secondary-dark-hover` | `#454370` |
| `--color-secondary-foreground` | `--credit-iris` | `#f9f7ff` |
| `--color-muted` | `--credit-secondary-dark` | `#3a3860` |
| `--color-muted-foreground` | `--credit-slate` | `#9896c8` |
| `--color-border` | `--credit-border-dark` | `#6c6fe433` |
| `--color-ring` | `--indigo` | `#6c6fe4` |
| `--color-accent` | `--credit-slate-dark` | `#7b79b0` |
| `--color-positive` | `--indigo` | `#6c6fe4` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

---

### Plan Primitives

| Token | Value |
|-------|-------|
| `--plan-cloud` | `#f0f4f8` |
| `--plan-abyss` | `#0c1017` |
| `--plan-deep` | `#151e2b` |
| `--plan-surface-dark` | `#1f2d3d` |
| `--plan-surface-dark-hover` | `#2a3a4d` |
| `--plan-steel` | `#a0aec0` |
| `--plan-muted` | `#64748b` |
| `--plan-secondary` | `#e8edf2` |
| `--plan-secondary-hover` | `#d8dfe8` |
| `--plan-fg-dark` | `#e2e8f0` |
| `--plan-teal` | `#1fa88e` |
| `--plan-caution` | `#d4962e` |
| `--plan-border` | `#0c10171a` |
| `--plan-border-dark` | `#ffffff14` |

### Plan Theme (Light)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--plan-cloud` | `#f0f4f8` |
| `--color-foreground` | `--plan-abyss` | `#0c1017` |
| `--color-surface` | `--white` | `#ffffff` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-hover` | `#5b5ed0` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--plan-secondary` | `#e8edf2` |
| `--color-secondary-hover` | `--plan-secondary-hover` | `#d8dfe8` |
| `--color-secondary-foreground` | `--plan-abyss` | `#0c1017` |
| `--color-muted` | `--plan-secondary` | `#e8edf2` |
| `--color-muted-foreground` | `--plan-muted` | `#64748b` |
| `--color-border` | `--plan-border` | `#0c10171a` |
| `--color-ring` | `--indigo` | `#6c6fe4` |
| `--color-accent` | `--indigo` | `#6c6fe4` |
| `--color-positive` | `--plan-teal` | `#1fa88e` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--plan-caution` | `#d4962e` |

### Plan Theme (Dark)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--plan-abyss` | `#0c1017` |
| `--color-foreground` | `--plan-fg-dark` | `#e2e8f0` |
| `--color-surface` | `--plan-deep` | `#151e2b` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-light` | `#7b7eee` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--plan-surface-dark` | `#1f2d3d` |
| `--color-secondary-hover` | `--plan-surface-dark-hover` | `#2a3a4d` |
| `--color-secondary-foreground` | `--plan-fg-dark` | `#e2e8f0` |
| `--color-muted` | `--plan-surface-dark` | `#1f2d3d` |
| `--color-muted-foreground` | `--plan-steel` | `#a0aec0` |
| `--color-border` | `--plan-border-dark` | `#ffffff14` |
| `--color-ring` | `--indigo` | `#6c6fe4` |
| `--color-accent` | `--indigo` | `#6c6fe4` |
| `--color-positive` | `--teal` | `#2abfa3` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

---

### Together Primitives

| Token | Value |
|-------|-------|
| `--together-warm` | `#fff9f5` |
| `--together-espresso` | `#1c1a18` |
| `--together-terracotta` | `#c4622d` |
| `--together-terracotta-light` | `#d4724a` |
| `--together-blush` | `#f2e4da` |
| `--together-blush-hover` | `#e8d6ca` |
| `--together-clay` | `#9e8e84` |
| `--together-surface-dark` | `#2a2622` |
| `--together-secondary-dark` | `#3a322c` |
| `--together-secondary-dark-hover` | `#453c35` |
| `--together-grove` | `#4a7c59` |
| `--together-grove-light` | `#5a8c69` |
| `--together-border` | `#c4622d26` |
| `--together-border-dark` | `#c4622d33` |

### Together Theme (Light)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--together-warm` | `#fff9f5` |
| `--color-foreground` | `--together-espresso` | `#1c1a18` |
| `--color-surface` | `--white` | `#ffffff` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-hover` | `#5b5ed0` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--together-blush` | `#f2e4da` |
| `--color-secondary-hover` | `--together-blush-hover` | `#e8d6ca` |
| `--color-secondary-foreground` | `--together-espresso` | `#1c1a18` |
| `--color-muted` | `--together-blush` | `#f2e4da` |
| `--color-muted-foreground` | `--together-clay` | `#9e8e84` |
| `--color-border` | `--together-border` | `#c4622d26` |
| `--color-ring` | `--together-terracotta` | `#c4622d` |
| `--color-accent` | `--together-terracotta` | `#c4622d` |
| `--color-positive` | `--together-grove` | `#4a7c59` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

### Together Theme (Dark)

| Token | Primitive | Resolved Value |
|-------|-----------|----------------|
| `--color-background` | `--together-espresso` | `#1c1a18` |
| `--color-foreground` | `--together-warm` | `#fff9f5` |
| `--color-surface` | `--together-surface-dark` | `#2a2622` |
| `--color-primary` | `--indigo` | `#6c6fe4` |
| `--color-primary-hover` | `--indigo-light` | `#7b7eee` |
| `--color-primary-foreground` | `--white` | `#ffffff` |
| `--color-secondary` | `--together-secondary-dark` | `#3a322c` |
| `--color-secondary-hover` | `--together-secondary-dark-hover` | `#453c35` |
| `--color-secondary-foreground` | `--together-warm` | `#fff9f5` |
| `--color-muted` | `--together-secondary-dark` | `#3a322c` |
| `--color-muted-foreground` | `--together-clay` | `#9e8e84` |
| `--color-border` | `--together-border-dark` | `#c4622d33` |
| `--color-ring` | `--together-terracotta-light` | `#d4724a` |
| `--color-accent` | `--together-terracotta-light` | `#d4724a` |
| `--color-positive` | `--together-grove-light` | `#5a8c69` |
| `--color-negative` | `--coral` | `#e4746c` |
| `--color-caution` | `--amber` | `#e8a838` |

---

## Foundations > Spacing

Futra Financial uses Tailwind CSS 4's built-in spacing scale. No custom spacing tokens are defined in the DTCG pipeline.

### Scale

Tailwind's default spacing uses a 4px (0.25rem) base multiplier. The utility class number multiplied by 4px gives the pixel value.

| Utility | Value | Pixels | Common Use |
|---------|-------|--------|------------|
| `1` | `0.25rem` | 4px | Tight inline gaps, icon padding |
| `1.5` | `0.375rem` | 6px | Small internal padding |
| `2` | `0.5rem` | 8px | Input padding, compact list gaps |
| `3` | `0.75rem` | 12px | Button padding, small card gaps |
| `4` | `1rem` | 16px | Standard content gaps |
| `5` | `1.25rem` | 20px | Card padding |
| `6` | `1.5rem` | 24px | Section gaps |
| `8` | `2rem` | 32px | Large section gaps |
| `10` | `2.5rem` | 40px | Page gutters |
| `12` | `3rem` | 48px | Hero spacing |
| `16` | `4rem` | 64px | Major section breaks |
| `20` | `5rem` | 80px | Large hero spacing |
| `24` | `6rem` | 96px | Page-level separation |

### Usage

Components use Tailwind's numeric utilities directly:

```
p-4        → 16px padding
gap-6      → 24px gap
m-8        → 32px margin
space-y-3  → 12px vertical spacing between children
```

### Why no custom spacing tokens?

All 5 business units currently share the same spacing scale. Custom tokens would only add value if BUs needed different spacing density (e.g., Plan tighter, Together more generous). Since this need is speculative, we use Tailwind's battle-tested defaults and avoid unnecessary indirection.

See `docs/decisions/spacing-tokens.md` for the full rationale.
