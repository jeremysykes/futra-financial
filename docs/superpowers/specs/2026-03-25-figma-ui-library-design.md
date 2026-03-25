# Figma UI Library via MCP — Design Spec

> Build a Figma component library from the existing Storybook source code using Claude + Figma MCP, organized for Zeroheight integration.

## Context

Futra Financial has a code-first component library in Storybook with 5 business unit themes. There is no Figma UI library. The goal is to create one programmatically using the Figma Plugin API via MCP (`use_figma`), so it can be connected to Zeroheight as a design system source.

**Figma file:** `https://www.figma.com/design/pMroF1oVmzBSUY99ZnmeIl/Futra-Financial---UI-Library`
**File key:** `pMroF1oVmzBSUY99ZnmeIl`

## Critical Requirement

Each component must be on its own individually named layer/frame — not collapsed onto a single layer. The Figma file must have clear, labeled hierarchy for Zeroheight annotation.

## File Structure

### Pages (9 total)

| # | Page Name | Contents |
|---|-----------|----------|
| 1 | Foundations | Color token swatches, typography scale, logo |
| 2 | Button | primary/inverse × sm/md across 5 BUs |
| 3 | Badge | square/rounded/circle × sm/md/lg, icon/text/image content across 5 BUs |
| 4 | Avatar | sm/md/lg × none/accent/primary ring across 5 BUs |
| 5 | Card | accent positions (none/left/top/right/bottom) across 5 BUs |
| 6 | NavLink | sm/base sizes across 5 BUs |
| 7 | Accordion | default/compact spacing, expanded + collapsed across 5 BUs |
| 8 | ProgressCard | default/compact at various fill percentages across 5 BUs |
| 9 | StatItem | foreground/accent value colors across 5 BUs |

### Per-Component Page Layout

Each component page contains **5 top-level named frames**:

```
{Component} / Spend
{Component} / Save
{Component} / Credit
{Component} / Plan
{Component} / Together
```

Each frame:
- Uses auto-layout (vertical, 24px gap)
- Shows the BU in its **default mode** (Spend: dark, Save: light, Credit: light, Plan: dark, Together: light)
- Uses the correct BU background color for that mode
- Contains all variants for that BU with text labels
- Variants are grouped in rows using horizontal auto-layout
- Standard frame width: 1200px

### Foundations Page Layout

**Colors section:**
- One horizontal row per BU (Spend, Save, Credit, Plan, Together)
- Colors sourced from `src/tailwind.css` CSS primitives (not DESIGN.md visual tables, since they differ slightly)
- Each swatch: 80×80 rectangle with rounded corners, hex code label below, color name label
- Shared colors (Indigo, Teal, Coral, Amber) shown in a separate "Shared" row

**Typography section:**
- Inter: Regular (400), Medium (500), Semibold (600), Bold (700), Black (900 — wordmark only)
- JetBrains Mono: Medium (500)
- Each weight shown at heading (24px) and body (16px) sizes
- Sample text: "Futra Financial" for headings, "The quick brown fox..." for body

**Logo section:**
- FUTRA wordmark on light background
- FUTRA wordmark on dark background

## BU Theme Reference

All values sourced from `src/tailwind.css` CSS variable declarations.

Each BU frame renders in that BU's **default mode**.

| BU | Default Mode | Background | Foreground | Surface | Accent | Primary | Border | Muted | Muted Foreground |
|----|-------------|-----------|------------|---------|--------|---------|--------|-------|-----------------|
| Spend | Dark | #0F0F12 | #FFFFFF | #1A1A1F | #6C6FE4 | #6C6FE4 | rgba(255,255,255,0.08) | #1A1A1F | #8B8B9A |
| Save | Light | #F7F5F0 | #1C1C1A | #FFFFFF | #4A7C59 | #6C6FE4 | rgba(74,124,89,0.15) | #E8F0EB | #7A7A72 |
| Credit | Light | #F9F7FF | #1A1830 | #EEEAFF | #9896C8 | #6C6FE4 | rgba(108,111,228,0.15) | #D4D2EE | #6B6880 |
| Plan | Dark | #0C1017 | #E2E8F0 | #151E2B | #6C6FE4 | #6C6FE4 | rgba(255,255,255,0.08) | #1F2D3D | #A0AEC0 |
| Together | Light | #FFF9F5 | #1C1A18 | #FFFFFF | #C4622D | #6C6FE4 | rgba(196,98,45,0.15) | #F2E4DA | #9E8E84 |

**Key distinction:** `primary` is always #6C6FE4 (Indigo) for buttons. `accent` varies by BU and is used for decorative/highlight colors. The inverse button uses `text-accent`, so its text color varies per BU.

## Component Specifications

All values extracted directly from source CVA definitions in `src/stories/`.

### Button
Source: `src/stories/button/Button.tsx`

- **Variants:** intent (primary, inverse) × size (sm, md)
- **Base:** `rounded-[10px]`, `font-semibold` (600), Inter
- **Primary:** `bg-primary text-primary-foreground` → bg #6C6FE4, text white
- **Inverse:** `bg-white text-accent` → bg white, text accent color (varies per BU — Indigo for Spend/Plan, Grove for Save, Slate for Credit, Terracotta for Together)
- **sm:** `text-sm px-5 py-2` → font 14px, padding 20px horizontal / 8px vertical
- **md:** `text-base px-8 py-3` → font 16px, padding 32px horizontal / 12px vertical
- Corner radius: **10px**

### Badge
Source: `src/stories/badge/Badge.tsx`

- **Variants:** shape (square, rounded, circle) × size (sm, md, lg) × content (icon, text, image)
- **Base:** `bg-muted`, centered content
- **square:** `rounded-none` → radius 0px
- **rounded:** `rounded-2xl` → radius 16px
- **circle:** `rounded-full` → 50%
- **sm:** `w-10 h-10` → 40×40
- **md:** `w-14 h-14` → 56×56
- **lg:** `w-16 h-16` → 64×64
- **text content:** `font-mono font-semibold` (JetBrains Mono, 600)
- **image content:** `overflow-hidden` (clip to shape)

### Avatar
Source: `src/stories/avatar/Avatar.tsx` (composes Badge with `shape="circle"`)

- **Variants:** size (sm, md, lg) × ring (none, accent, primary)
- **Sizes** (from Badge): **sm:** 40×40, **md:** 56×56, **lg:** 64×64
- **ring: none** → no ring
- **ring: accent** → `ring-2 ring-accent` → 2px ring, accent color per BU
- **ring: primary** → `ring-2 ring-primary` → 2px ring, primary color (#6C6FE4)
- Initials text: `text-accent`
- Shape: always circle

### Card
Source: `src/stories/card/Card.tsx`

- **Variants:** accent (none, left, top, right, bottom)
- **Base:** `rounded-xl bg-surface border border-border p-6` → radius 12px, padding 24px, 1px border
- **accent: left** → `border-l-4 border-l-accent` → 4px left accent border
- **accent: top** → `border-t-2 border-t-accent` → 2px top accent border
- **accent: right** → `border-r-4 border-r-accent` → 4px right accent border
- **accent: bottom** → `border-b-2 border-b-accent` → 2px bottom accent border
- Note: side accents are 4px, top/bottom accents are 2px (asymmetric by design)

### NavLink
Source: `src/stories/nav-link/NavLink.tsx`

- **Variants:** size (sm, base)
- **Base:** `font-medium text-muted-foreground` → Inter Medium (500), muted foreground color
- **Hover:** `hover:text-accent` → color change to accent (no underline)
- **sm:** `text-sm` → 14px
- **base:** `text-base` → 16px

### Accordion
Source: `src/stories/accordion/Accordion.tsx`, `src/stories/accordion-item/AccordionItem.tsx`

- **Container variants:** spacing (default, compact)
- **default:** `space-y-3` → 12px gap between items
- **compact:** `space-y-2` → 8px gap between items
- **Item:** `border border-border rounded-xl` → 1px border, 12px radius (rounded cards, NOT dividers)
- **Trigger:** `px-6 py-4 min-h-[44px]` → padding 24px/16px, min-height 44px
- **Trigger text:** `font-semibold text-base` → Inter Semibold (600), 16px. Opens: `text-primary`
- **Chevron:** 18px, `text-muted-foreground`, rotates 180° when open
- **Content area:** `px-6 pb-4` → padding 24px horizontal, 16px bottom
- **States to show:** expanded and collapsed for each spacing variant
- **Expanded content sample text:** "Lorem ipsum dolor sit amet, consectetur adipiscing elit."

### ProgressCard
Source: `src/stories/progress-card/ProgressCard.tsx`

- **Variants:** size (default, compact) × percentage (25%, 50%, 75%, 100%)
- **Base:** `rounded-xl bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]`
- **default:** `p-5` → padding 20px
- **compact:** `p-4` → padding 16px
- **Goal name:** `font-semibold text-[15px] text-foreground` → Inter Semibold, 15px
- **Percentage badge:** `font-mono font-medium text-[13px] text-accent` → JetBrains Mono, 13px
- **Progress track:** `h-2 rounded-full bg-muted mb-3` → height 8px, full radius, 12px bottom margin
- **Progress fill:** `h-full rounded-full bg-accent` → accent colored fill, full radius both ends
- **Current amount:** `font-mono font-medium text-sm text-foreground` → JetBrains Mono, 14px
- **Target label:** `font-mono font-medium text-[13px] text-muted-foreground` → JetBrains Mono, 13px

### StatItem
Source: `src/stories/stat-item/StatItem.tsx`

- **Variants:** valueColor (foreground, accent)
- **Container:** `text-center`
- **Value:** `font-mono font-medium text-[clamp(28px,4vw,40px)]` → JetBrains Mono Medium (500), render at 36px in Figma (midpoint of clamp)
- **valueColor: foreground** → `text-foreground`
- **valueColor: accent** → `text-accent` (default)
- **Value margin:** `mb-2` → 8px bottom
- **Label:** `uppercase font-medium text-xs tracking-[0.08em] text-muted-foreground` → Inter Medium (500), 12px, uppercase, 0.08em letter-spacing

## Execution Strategy

1. Start with Foundations page to validate the approach and layer naming
2. Build one component page (Button) as a proof of concept
3. Review with user — confirm layer structure is correct before proceeding
4. Build remaining component pages
5. Each `use_figma` call creates one BU frame — estimated ~45 calls total (9 pages × 5 BU frames, plus Foundations sections)

## Out of Scope

- Interactive states (hover, focus, active) — static only
- Charts and data visualizations (DashboardPreview, ScoreDisplay, etc.)
- Responsive variants — one breakpoint per component
- Figma component variants/properties system — using named frames with labels instead for simplicity
- Organisms (Navbar, Footer, HeroSection, etc.) — can be added in a future pass
- Card `interactive` variant — visual difference is hover-only, static representation is identical to non-interactive
