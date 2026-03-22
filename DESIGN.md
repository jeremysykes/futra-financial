# FUTRA FINANCIAL — Design System & Visual Identity Guide

> **This is a canonical document.** Do not add audit findings, improvement plans, task lists, or temporary content here. This file defines the official brand identity and design system. Operational documents belong in `docs/`.

---

## Brand Foundation

### Typography

| Role               | Font           | Weight         | Tailwind                  | Notes                                |
| ------------------ | -------------- | -------------- | ------------------------- | ------------------------------------ |
| Headings H1–H2     | Inter          | Bold (700)     | `font-sans font-bold`     | Tight tracking (-0.01em to -0.02em)  |
| Headings H3–H4     | Inter          | Semibold (600) | `font-sans font-semibold` | Standard spacing                     |
| Body               | Inter          | Regular (400)  | `font-sans`               | Line height 1.6–1.7                  |
| Captions/Overlines | Inter          | Medium (500)   | `font-sans font-medium`   | Uppercase, tracking 0.08em           |
| Data/Numbers       | JetBrains Mono | Medium (500)   | `font-mono font-medium`   | Monetary values, scores, percentages |

**Rules:**

- Use `font-sans` and `font-mono` Tailwind classes — never inline `fontFamily` styles
- All fonts loaded via `src/index.css`

### Universal Action Color

**Indigo `#6C6FE4`** is the primary action color across ALL five products. Buttons, links, and interactive CTAs always use Indigo regardless of business unit.

### Token Architecture

The theme system uses CSS custom properties in `tailwind.css`, switched via `data-business-unit` attributes. Components use semantic Tailwind classes (`bg-background`, `text-foreground`, `bg-surface`, etc.) that resolve to different values per BU.

```
Primitive values → Semantic tokens → Component classes
(raw hex)         (--color-*)        (bg-background, text-accent)
```

**Never use hardcoded hex colors in components.** Always use semantic token classes so themes switch automatically between light/dark and across business units. The only exception is footers (always dark, hardcoded).

---

## Business Unit Palettes

### Spend — "The daily driver."

**Demographic:** 22–30, urban, salaried. Glanceable, fast, dark-first.
**Emotional register:** Terminal-like precision. High contrast, zero decoration.
**Default mode:** Dark

<table>
  <tr>
    <td bgcolor="#0F0F12" align="center" width="100"><code style="color:#ffffff">#0F0F12</code><br><strong style="color:#ffffff">Void</strong></td>
    <td bgcolor="#1A1A1F" align="center" width="100"><code style="color:#ffffff">#1A1A1F</code><br><strong style="color:#ffffff">Surface</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#FFFFFF" align="center" width="100"><code style="color:#c9b379">#FFFFFF</code><br><strong style="color:#c9b379">Primary</strong></td>
    <td bgcolor="#8B8B9A" align="center" width="100"><code style="color:#ffffff">#8B8B9A</code><br><strong style="color:#ffffff">Muted</strong></td>
    <td bgcolor="#E4746C" align="center" width="100"><code style="color:#ffffff">#E4746C</code><br><strong style="color:#ffffff">Debit</strong></td>
    <td bgcolor="#2ABFA3" align="center" width="100"><code style="color:#ffffff">#2ABFA3</code><br><strong style="color:#ffffff">Credit</strong></td>
  </tr>
</table>

**Signature component:** PhoneMockup (transaction feed)
**Key rule:** Teal (#2ABFA3) for incoming, Coral (#E4746C) for outgoing. Never alarming.

---

### Save — "Build toward something."

**Demographic:** 24–34, goal-oriented. Planning mindset.
**Emotional register:** Calm, warm, motivating. Like a journal you feel good about updating.
**Default mode:** Light

<table>
  <tr>
    <td bgcolor="#F7F5F0" align="center" width="100"><code style="color:#c9b379">#F7F5F0</code><br><strong style="color:#c9b379">Linen</strong></td>
    <td bgcolor="#FFFFFF" align="center" width="100"><code style="color:#c9b379">#FFFFFF</code><br><strong style="color:#c9b379">Card</strong></td>
    <td bgcolor="#4A7C59" align="center" width="100"><code style="color:#ffffff">#4A7C59</code><br><strong style="color:#ffffff">Grove</strong></td>
    <td bgcolor="#A8C5B0" align="center" width="100"><code style="color:#ffffff">#A8C5B0</code><br><strong style="color:#ffffff">Sage</strong></td>
    <td bgcolor="#E8F0EB" align="center" width="100"><code style="color:#c9b379">#E8F0EB</code><br><strong style="color:#c9b379">Mist</strong></td>
    <td bgcolor="#1C1C1A" align="center" width="100"><code style="color:#ffffff">#1C1C1A</code><br><strong style="color:#ffffff">Ink</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
  </tr>
</table>

**Signature component:** ProgressCard (goal progress bars)
**Key rule:** Progress bars use Grove green fill on Mist track. Never red/amber for incomplete progress.

---

### Credit — "Know where you stand."

**Demographic:** 23–35, building or repairing credit. Financial anxiety is real.
**Emotional register:** Clinical but humane. Precise, calm, reassuring.
**Default mode:** Light

<table>
  <tr>
    <td bgcolor="#F9F7FF" align="center" width="100"><code style="color:#c9b379">#F9F7FF</code><br><strong style="color:#c9b379">Iris White</strong></td>
    <td bgcolor="#EEEAFF" align="center" width="100"><code style="color:#c9b379">#EEEAFF</code><br><strong style="color:#c9b379">Lavender</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#9896C8" align="center" width="100"><code style="color:#ffffff">#9896C8</code><br><strong style="color:#ffffff">Slate</strong></td>
    <td bgcolor="#E8A838" align="center" width="100"><code style="color:#ffffff">#E8A838</code><br><strong style="color:#ffffff">Amber</strong></td>
    <td bgcolor="#1A1830" align="center" width="100"><code style="color:#ffffff">#1A1830</code><br><strong style="color:#ffffff">Midnight</strong></td>
    <td bgcolor="#D4D2EE" align="center" width="100"><code style="color:#ffffff">#D4D2EE</code><br><strong style="color:#ffffff">Periwinkle</strong></td>
  </tr>
</table>

**Signature component:** ScoreDisplay (circular SVG gauge)
**CRITICAL RULE:** NO RED, NO GREEN for status indication. Structure and labels communicate status, not color.

---

### Plan — "Your money, mapped."

**Demographic:** 27–40, analytically inclined. Spreadsheet replacers.
**Emotional register:** Dense, precise, data-rich. Bloomberg terminal energy.
**Default mode:** Dark

<table>
  <tr>
    <td bgcolor="#0C1017" align="center" width="100"><code style="color:#ffffff">#0C1017</code><br><strong style="color:#ffffff">Abyss</strong></td>
    <td bgcolor="#151E2B" align="center" width="100"><code style="color:#ffffff">#151E2B</code><br><strong style="color:#ffffff">Deep</strong></td>
    <td bgcolor="#1F2D3D" align="center" width="100"><code style="color:#ffffff">#1F2D3D</code><br><strong style="color:#ffffff">Surface</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#2ABFA3" align="center" width="100"><code style="color:#ffffff">#2ABFA3</code><br><strong style="color:#ffffff">Teal</strong></td>
    <td bgcolor="#E8A838" align="center" width="100"><code style="color:#ffffff">#E8A838</code><br><strong style="color:#ffffff">Amber</strong></td>
    <td bgcolor="#A0AEC0" align="center" width="100"><code style="color:#ffffff">#A0AEC0</code><br><strong style="color:#ffffff">Steel</strong></td>
  </tr>
</table>

**Signature component:** DashboardPreview (recharts-powered)
**Sacrosanct rule:** Three-color data vocabulary only — Indigo (primary), Teal (positive), Amber (caution). No other colors in charts.

---

### Together — "Shared money, shared life."

**Demographic:** 25–38, cohabitating couples. Shared-screen usage.
**Emotional register:** Warm, domestic, collaborative. The only warm-neutral surface.
**Default mode:** Light

<table>
  <tr>
    <td bgcolor="#FFF9F5" align="center" width="100"><code style="color:#c9b379">#FFF9F5</code><br><strong style="color:#c9b379">Warm White</strong></td>
    <td bgcolor="#FFFFFF" align="center" width="100"><code style="color:#c9b379">#FFFFFF</code><br><strong style="color:#c9b379">Card</strong></td>
    <td bgcolor="#C4622D" align="center" width="100"><code style="color:#ffffff">#C4622D</code><br><strong style="color:#ffffff">Terracotta</strong></td>
    <td bgcolor="#6C6FE4" align="center" width="100"><code style="color:#ffffff">#6C6FE4</code><br><strong style="color:#ffffff">Indigo</strong></td>
    <td bgcolor="#F2E4DA" align="center" width="100"><code style="color:#c9b379">#F2E4DA</code><br><strong style="color:#c9b379">Blush</strong></td>
    <td bgcolor="#1C1A18" align="center" width="100"><code style="color:#ffffff">#1C1A18</code><br><strong style="color:#ffffff">Espresso</strong></td>
    <td bgcolor="#9E8E84" align="center" width="100"><code style="color:#ffffff">#9E8E84</code><br><strong style="color:#ffffff">Clay</strong></td>
  </tr>
</table>

**Signature component:** SplitDisplay (dual-color split bars)
**Key rule:** Indigo and Terracotta have equal visual weight. No warm/cool hierarchy.

---

## Component Patterns

### Shared Across All BUs

- **Wordmark:** `FUTRA | {unit}` — Inter Black (900) + thin bar + Inter Medium (500) lowercase
- **Buttons:** Always `bg-primary text-primary-foreground` (Indigo). Never use accent color for buttons.
- **Navbars:** `fixed top-[var(--nav-top,0px)]`, scroll-aware `bg-surface/95 backdrop-blur-sm`, `max-w-[1200px]` inner container
- **Footers:** Always dark, hardcoded backgrounds (not theme-responsive)
- **Cards:** `bg-surface border border-border` with BU-tinted border colors

### BU-Specific Patterns

| BU           | Signature        | Corner Radius       | Max Width | Unique Elements                                 |
| ------------ | ---------------- | ------------------- | --------- | ----------------------------------------------- |
| **Spend**    | PhoneMockup      | `rounded-xl` (12px) | 1200px    | Teal/Coral transaction colors                   |
| **Save**     | ProgressCard     | `rounded-xl` (12px) | 1200px    | Grove fill + Mist track progress bars           |
| **Credit**   | ScoreDisplay     | `rounded-xl` (12px) | 1200px    | SVG arc gauge, NO red/green, Amber caution only |
| **Plan**     | DashboardPreview | `rounded-xl` (12px) | 1280px    | Recharts, three-color data vocabulary           |
| **Together** | SplitDisplay     | `rounded-[14px]`    | 1200px    | Dual-color bars, paired avatars, warmer corners |

### Semantic Token Classes

| Token            | Tailwind Class                | Usage                            |
| ---------------- | ----------------------------- | -------------------------------- |
| Background       | `bg-background`               | Page background                  |
| Surface          | `bg-surface`                  | Cards, elevated containers       |
| Secondary        | `bg-secondary`                | Highlight areas, elevated states |
| Primary          | `bg-primary` / `text-primary` | Action color (Indigo)            |
| Foreground       | `text-foreground`             | Primary text                     |
| Muted foreground | `text-muted-foreground`       | Secondary text                   |
| Accent           | `text-accent`                 | BU-specific accent color         |
| Positive         | `text-positive`               | Positive status                  |
| Negative         | `text-negative`               | Negative status                  |
| Caution          | `text-caution`                | Warning/caution                  |
| Border           | `border-border`               | Borders (BU-tinted)              |

---

## Component Architecture

### Atomic Design Hierarchy

All components follow atomic design methodology. The Storybook sidebar reflects this hierarchy through the `title` field in stories (e.g., `title: 'Atoms/Button'`). The file system stays flat — all shared components live in `src/stories/{component-name}/` colocated with their stories.

| Tier | Purpose | Examples |
|------|---------|----------|
| **Atoms** | Smallest building blocks. Single responsibility. No composition. | Button, Badge, Avatar, Logo, NavLink, StatItem, AccordionItem |
| **Molecules** | Small combinations of atoms. Reusable. Single purpose. | Card, ProcessSteps, ProgressCard, SplitDisplay, Accordion |
| **Organisms** | Self-contained, fully realized components. They ARE the content. | Navbar, PhoneMockup, ScoreDisplay, DashboardPreview, ComparisonSection |
| **Templates** | Structural section shells. Define layout patterns. Accept content via composition. | HeroSection, FeatureSection, StatsRow, TestimonialSection, CTASection, Footer, HowItWorks, FAQSection, TrustSection |
| **Pages** | Compose templates with BU-specific data and organisms. | SpendPage, SavePage, CreditPage, PlanPage, TogetherPage |

**Key distinction:** Organisms are the content (Navbar is always a navbar). Templates are the container (HeroSection defines the layout but BUs fill it with their own content and organisms).

### Composition Over Configuration

Shared components own structure (spacing, containers, headings). BUs own content arrangement via `children` slots. All text props that may contain inline formatting (headings, subheadings) use `ReactNode`, not `string`.

```tsx
// Correct: BU composes content into template slot
<HeroSection heading={<>Your money, <span className="text-accent">in real time.</span></>}>
  <PhoneMockup />
</HeroSection>

// Wrong: Template accepts data props and renders internally
<HeroSection heading="Your money" accentText="in real time" visual="phone" />
```

### CVA Component Standard

Every shared component uses Class Variance Authority (CVA) with the `cn()` utility from `src/lib/utils` for className merging. The pattern:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const componentVariants = cva('base-classes', {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ },
});

// Always merge: cn(variants({ ...props }), className)
// Always accept: className?: string
// Always set: Component.displayName = 'Component';
// Always export: both the component and its variants
```

**Rules:**
- CVA `defaultVariants` only affect CSS classes, not prop values. Always add JS default parameters for props used in conditionals.
- Composition slots (`children`, `actions`) must be hidden from Storybook docs: `argTypes: { children: { table: { disable: true } } }`
- No speculative variants. If a variant isn't used by any BU, don't add it (YAGNI).

### File Organization

```
src/
  stories/           ← Shared component library (all atomic tiers)
    button/          ← Atom
      Button.tsx
      Button.stories.ts
    card/            ← Molecule
      Card.tsx
      Card.stories.tsx
    navbar/          ← Organism
      Navbar.tsx
      Navbar.stories.tsx
    hero-section/    ← Template
      HeroSection.tsx
      HeroSection.stories.tsx
    spend/           ← Page
      SpendPage.tsx
      SpendPage.stories.tsx
  components/        ← App infrastructure + deferred migrations
    AppShell.tsx
    DemoSwitcher.tsx
```

---

## Storybook Presentation

Storybook is part of the design system, not separate from it. Component presentation in stories follows the same rules as the application:

- All backgrounds, colors, and spacing derive from design tokens
- Theme switching (light/dark) and business unit switching work identically in stories and in the app
- A single shared decorator (`withStoryDisplay`) controls all component presentation — there are no one-off wrappers, inline decorators, or hardcoded values
- If a component doesn't render correctly in the standard decorator, the component needs fixing, not the decorator

_Futra Financial — Design System & Visual Identity Guide_
_Jeremy Sykes_
