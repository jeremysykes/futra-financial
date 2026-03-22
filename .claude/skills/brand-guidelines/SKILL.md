---
name: brand-guidelines
description: Futra Financial brand identity, color palettes, and typography for all five business units. Use when building UI, choosing colors, applying themes, or making any visual design decision across Spend, Save, Credit, Plan, or Together.
---

# Futra Financial — Brand Guidelines

## Overview

Futra Financial is a consumer neobank ecosystem with five distinct product surfaces. Each serves a different demographic and emotional register, but all share a common design system. Use this skill when making visual design decisions for any Futra product.

**Keywords**: branding, colors, palette, typography, theme, design system, visual identity, Futra, Spend, Save, Credit, Plan, Together

## Shared Design Principles

- **Universal action color**: Indigo `#6C6FE4` is the primary action color across ALL five products — buttons, links, interactive elements
- **Typography**: Inter (sans-serif) for all UI text, JetBrains Mono (monospace) for data/numbers
- **Theming**: Each product maps semantic tokens (`bg-background`, `text-foreground`, `bg-surface`, etc.) to its own palette via `data-business-unit` attributes in `tailwind.css`
- **Light/dark**: Every product supports both modes. Default mode varies by product.

## Typography

| Role               | Font           | Weight         | Notes                                     |
| ------------------ | -------------- | -------------- | ----------------------------------------- |
| Headings (H1–H2)   | Inter          | Bold (700)     | Tight letter-spacing (-0.01em to -0.02em) |
| Headings (H3–H4)   | Inter          | Semibold (600) | Standard spacing                          |
| Body               | Inter          | Regular (400)  | Line height 1.6–1.7                       |
| Captions/Overlines | Inter          | Medium (500)   | Uppercase, letter-spacing 0.08em          |
| Data/Numbers       | JetBrains Mono | Medium (500)   | Monetary values, percentages, scores      |

**Tailwind classes**: `font-sans` for Inter, `font-mono` for JetBrains Mono. Never use inline `fontFamily` styles.

---

## Business Unit Palettes

### Futra Spend — "The daily driver."

| Token      | Light              | Dark (default)           | Usage                      |
| ---------- | ------------------ | ------------------------ | -------------------------- |
| Background | `#F5F5F8`          | `#0F0F12` (Void)         | Page background            |
| Surface    | `#FFFFFF`          | `#1A1A1F`                | Cards, elevated containers |
| Primary    | `#6C6FE4`          | `#6C6FE4` (Indigo)       | Buttons, actions           |
| Muted text | `#8B8B9A`          | `#8B8B9A`                | Secondary text             |
| Positive   | `#2ABFA3` (Teal)   | `#2ABFA3`                | Incoming transactions      |
| Negative   | `#E4746C` (Coral)  | `#E4746C`                | Outgoing transactions      |
| Border     | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | Subtle borders             |

**Demographic**: 22–30, urban, salaried. Glanceable, fast, dark-first.
**Emotional register**: Terminal-like precision. High contrast, zero decoration.
**Default mode**: Dark.

---

### Futra Save — "Build toward something."

| Token      | Light (default)        | Dark                  | Usage                             |
| ---------- | ---------------------- | --------------------- | --------------------------------- |
| Background | `#F7F5F0` (Linen)      | `#1C1C1A`             | Warm off-white page bg            |
| Surface    | `#FFFFFF`              | `#2A2A26`             | Cards                             |
| Accent     | `#4A7C59` (Grove)      | `#5A8C69`             | Progress bars, growth indicators  |
| Secondary  | `#A8C5B0` (Sage)       | `#3D6B4A`             | Softer fills                      |
| Muted bg   | `#E8F0EB` (Mist)       | `#2A3A2E`             | Highlight backgrounds             |
| Foreground | `#1C1C1A` (Ink)        | `#F7F5F0`             | Primary text                      |
| Muted text | `#7A7A72`              | `#9A9A90`             | Secondary text                    |
| Primary    | `#6C6FE4` (Indigo)     | `#6C6FE4`             | Buttons (never green for buttons) |
| Border     | `rgba(74,124,89,0.15)` | `rgba(74,124,89,0.2)` | Subtle green-tinted borders       |

**Demographic**: 24–34, goal-oriented. Planning mindset.
**Emotional register**: Calm, warm, motivating. Like a journal you feel good about updating.
**Default mode**: Light.
**Key rule**: Progress bars use Grove green fill on Mist track. Never use red/amber for incomplete progress.

---

### Futra Credit — "Know where you stand."

| Token      | Light (default)          | Dark                    | Usage                     |
| ---------- | ------------------------ | ----------------------- | ------------------------- |
| Background | `#F9F7FF` (Iris White)   | `#1A1830` (Midnight)    | Faint lavender page bg    |
| Surface    | `#EEEAFF` (Lavender)     | `#252340`               | Cards, secondary surfaces |
| Primary    | `#6C6FE4` (Indigo)       | `#6C6FE4`               | Buttons, score gauge fill |
| Accent     | `#9896C8` (Slate)        | `#7B79B0`               | Supporting elements       |
| Caution    | `#E8A838` (Amber)        | `#E8A838`               | Caution states ONLY       |
| Foreground | `#1A1830` (Midnight)     | `#F9F7FF`               | Primary text              |
| Muted text | `#6B6880`                | `#9896C8`               | Secondary text            |
| Border     | `rgba(108,111,228,0.15)` | `rgba(108,111,228,0.2)` | Periwinkle borders        |

**Demographic**: 23–35, building or repairing credit. Financial anxiety is real.
**Emotional register**: Clinical but humane. Precise, calm, reassuring.
**Default mode**: Light.
**CRITICAL RULE**: **NO RED, NO GREEN for status indication.** No color-coding of credit scores. Use Indigo for the score gauge fill, Amber sparingly for caution only. Structure and labels communicate status, not color.

---

### Futra Plan — "Your money, mapped."

| Token      | Light                | Dark (default)           | Usage                             |
| ---------- | -------------------- | ------------------------ | --------------------------------- |
| Background | `#F0F4F8`            | `#0C1017` (Abyss)        | Deepest dark bg                   |
| Surface    | `#FFFFFF`            | `#151E2B` (Deep)         | Cards                             |
| Secondary  | `#E8EDF2`            | `#1F2D3D` (Surface)      | Elevated containers               |
| Primary    | `#6C6FE4` (Indigo)   | `#6C6FE4`                | Primary data series + actions     |
| Positive   | `#1FA88E` (Teal)     | `#2ABFA3`                | Secondary data, positive variance |
| Caution    | `#D4962E` (Amber)    | `#E8A838`                | Negative variance, alerts         |
| Foreground | `#0C1017`            | `#E2E8F0`                | Primary text                      |
| Muted text | `#64748B`            | `#A0AEC0` (Steel)        | Axis labels, secondary text       |
| Border     | `rgba(12,16,23,0.1)` | `rgba(255,255,255,0.08)` | Very subtle borders               |

**Demographic**: 27–40, analytically inclined. Spreadsheet replacers.
**Emotional register**: Dense, precise, data-rich. Bloomberg terminal energy without the chaos.
**Default mode**: Dark.
**Three-color data vocabulary**: Indigo (primary series), Teal (positive/secondary), Amber (caution/negative). No other colors in charts. This is sacrosanct.

---

### Futra Together — "Shared money, shared life."

| Token      | Light (default)        | Dark                  | Usage                        |
| ---------- | ---------------------- | --------------------- | ---------------------------- |
| Background | `#FFF9F5` (Warm White) | `#1C1A18`             | Warm-tinted page bg          |
| Surface    | `#FFFFFF`              | `#2A2622`             | Cards                        |
| Accent     | `#C4622D` (Terracotta) | `#D4724A`             | User A attribution           |
| Primary    | `#6C6FE4` (Indigo)     | `#6C6FE4`             | User B attribution + actions |
| Secondary  | `#F2E4DA` (Blush)      | `#3A322C`             | Warm secondary fills         |
| Foreground | `#1C1A18` (Espresso)   | `#FFF9F5`             | Primary text                 |
| Muted text | `#9E8E84` (Clay)       | `#9E8E84`             | Secondary text               |
| Border     | `rgba(196,98,45,0.15)` | `rgba(196,98,45,0.2)` | Warm-tinted borders          |

**Demographic**: 25–38, cohabitating couples. Shared-screen usage.
**Emotional register**: Warm, domestic, collaborative. The only surface using warm neutrals.
**Default mode**: Light.
**Key rule**: No visual hierarchy between users. Indigo and Terracotta are equally weighted — no warm/cool implication of positive/negative.

---

## Design System Architecture

The theme system uses CSS custom properties in `tailwind.css`, switched via `data-business-unit` attributes:

```html
<div data-business-unit="spend" class="dark">
  <!-- Spend components resolve tokens to Spend dark palette -->
</div>
```

**Semantic token mapping** (Tailwind classes → CSS variables):

- `bg-background` — page background
- `bg-surface` — card/container background
- `bg-secondary` — elevated/highlight areas
- `bg-primary` / `text-primary` — action color (always Indigo)
- `text-foreground` — primary text
- `text-muted-foreground` — secondary text
- `text-accent` — accent color (varies by product)
- `text-positive` — positive status
- `text-negative` — negative status
- `text-caution` — warning/caution
- `border-border` — borders

**Never use hardcoded hex colors in components.** Always use the semantic token classes so themes switch automatically between light/dark and across business units.

## Component Patterns

- **Wordmark**: `FUTRA | {unit}` — Inter Black (900) for "FUTRA", thin bar separator, Inter Medium (500) lowercase for unit name
- **Buttons**: Always `bg-primary text-primary-foreground` (Indigo). Never use accent colors for buttons.
- **Cards**: `bg-surface border border-border` with minimal shadow
- **Footers**: Always dark, hardcoded (not theme-aware) — each uses the darkest color from its palette
- **Navbars**: `fixed top-9` (below DemoSwitcher), scroll-aware `bg-surface/95 backdrop-blur-sm`
