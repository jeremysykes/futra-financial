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
| 3 | Badge | square/rounded/circle × sm/md/lg, icon/text content across 5 BUs |
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
- Has the correct BU background color (dark BUs: dark bg, light BUs: light bg)
- Contains all variants for that BU with text labels
- Variants are grouped in rows using horizontal auto-layout

### Foundations Page Layout

**Colors section:**
- One horizontal row per BU (Spend, Save, Credit, Plan, Together)
- Each swatch: 80×80 rectangle with rounded corners, hex code label below, color name label
- Shared colors (Indigo, Teal, Coral, Amber) shown in a separate "Shared" row

**Typography section:**
- Inter: Regular (400), Medium (500), Semibold (600), Bold (700), Black (900)
- JetBrains Mono: Medium (500)
- Each weight shown at heading (24px) and body (16px) sizes
- Sample text: "Futra Financial" for headings, "The quick brown fox..." for body

**Logo section:**
- FUTRA wordmark on light background
- FUTRA wordmark on dark background

## BU Theme Reference

Colors sourced from `src/tailwind.css` and `DESIGN.md`.

| BU | Default Mode | Background (Light) | Background (Dark) | Accent | Text (Light) | Text (Dark) |
|----|-------------|--------------------|--------------------|--------|-------------|-------------|
| Spend | Dark | #F5F5F7 | #0F0F12 | #6C6FE4 | #0F0F12 | #FFFFFF |
| Save | Light | #F7F5F0 | #1C1C1A | #4A7C59 | #1C1C1A | #F7F5F0 |
| Credit | Light | #F9F7FF | #1A1830 | #9896C8 | #1A1830 | #F9F7FF |
| Plan | Dark | #E8EDF2 | #0C1017 | #6C6FE4 | #0C1017 | #E8EDF2 |
| Together | Light | #FFF9F5 | #1C1A18 | #C4622D | #1C1A18 | #FFF9F5 |

All BUs share primary action color: **#6C6FE4** (Indigo) for buttons and CTAs.

## Component Specifications

### Button
- **Variants:** intent (primary, inverse) × size (sm, md)
- **Properties:** Corner radius 8px, font Inter Medium
- **Primary:** bg #6C6FE4, text white
- **Inverse:** bg transparent, border 1px, text foreground
- **sm:** h 32px, px 12px, text 14px
- **md:** h 40px, px 16px, text 16px

### Badge
- **Variants:** shape (square, rounded, circle) × size (sm, md, lg) × content (icon, text)
- **Properties:** Centered content, bg accent color per BU
- **sm:** 20×20, **md:** 28×28, **lg:** 36×36
- **square:** radius 4px, **rounded:** radius 6px, **circle:** full radius

### Avatar
- **Variants:** size (sm, md, lg) × ring (none, accent, primary)
- **Properties:** Circle clip, initials fallback
- **sm:** 32×32, **md:** 40×40, **lg:** 56×56
- **ring:** 2px border with color per variant

### Card
- **Variants:** accent (none, left, top, right, bottom)
- **Properties:** bg surface, border 1px border-color, radius 12px, padding 24px
- **Accent:** 3px accent-colored border on specified side

### NavLink
- **Variants:** size (sm, base)
- **Properties:** Text with hover underline indicator
- **sm:** text 14px, **base:** text 16px

### Accordion
- **Variants:** spacing (default, compact) × state (expanded, collapsed)
- **Properties:** Chevron indicator, border-bottom divider
- **default:** 16px gap, **compact:** 8px gap

### ProgressCard
- **Variants:** size (default, compact) × percentage (25%, 50%, 75%, 100%)
- **Properties:** Goal name, target/current amounts, progress bar
- **Progress bar:** bg muted track, accent-colored fill, rounded ends

### StatItem
- **Variants:** valueColor (foreground, accent)
- **Properties:** Large value text (JetBrains Mono), small label text (Inter)

## Execution Strategy

1. Start with Foundations page to validate the approach and layer naming
2. Build one component page (Button) as a proof of concept
3. If structure is correct, proceed with remaining components
4. Each `use_figma` call creates one page or section — never the entire file in one call

## Out of Scope

- Interactive states (hover, focus, active) — static only
- Charts and data visualizations (DashboardPreview, ScoreDisplay, etc.)
- Responsive variants — one breakpoint per component
- Figma component variants/properties system — using frames with labels instead for simplicity
- Organisms (Navbar, Footer, HeroSection, etc.) — can be added in a future pass
