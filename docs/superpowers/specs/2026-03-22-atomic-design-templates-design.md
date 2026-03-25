# Atomic Design Templates — Phase 1

## Overview

Refactor the Futra Financial component system to follow atomic design principles. Shared section components become composition-driven CVA templates. Storybook sidebar reflects the full hierarchy: Atoms > Molecules > Organisms > Templates > Pages.

## Design System Principles

1. **Composition over configuration** — Shared components own structure (spacing, containers, headings). BUs own content arrangement via `children` slots. All text props that may contain inline formatting (headings, subheadings) use `ReactNode`, not `string`.
2. **CVA for all components** — Every new component uses Class Variance Authority with the existing `cn()` utility from `src/lib/utils` for className merging: `cn(variants({ ... }), className)`. All components accept an optional `className?: string` prop.
3. **Tokens are the single source of truth** — All styling references Tailwind v4 CSS variable tokens (`bg-background`, `text-accent`, etc.). No hardcoded hex values. **Exception:** Footer uses hardcoded dark-mode colors per DESIGN.md convention ("Footers: Always dark, hardcoded backgrounds"). Missing tokens must be discussed and added to `tailwind.css` before use.
4. **Storybook hierarchy = atomic design** — The `title` field in stories defines the tier: `Atoms/`, `Molecules/`, `Organisms/`, `Templates/`, `Pages/`. File system stays flat in `src/stories/{component}/`.
5. **BU theming via existing mechanism** — `data-business-unit` attributes + CSS variable overrides. Components never reference a specific BU's colors.

## File Organization

All shared components (atoms, molecules, organisms, templates) live in `src/stories/{component-name}/` colocated with their stories. This follows the existing convention established by Button, Card, Badge, Navbar, and other shared components. The `src/stories/` directory serves as the shared component library, not just a Storybook stories directory. BU-specific components remain in `src/components/{bu}/` until Phase 2.

## Atomic Design Classification

### Atoms

Smallest building blocks. Single responsibility. No composition.

| Component | Status | CVA | Notes |
|-----------|--------|-----|-------|
| Button | Exists | Yes | Has story |
| Badge | Exists | Yes | Has story |
| Avatar | Exists | No | Has story |
| Logo | Exists | Yes | Has story |
| NavLink | Exists | No | Has story |

### Molecules

Small combinations of atoms. Reusable. Single purpose.

| Component | Status | CVA | Notes |
|-----------|--------|-----|-------|
| Card | Exists | Yes | Has story |
| ProcessSteps | Exists | Yes | Has story |
| ProgressCard | Exists (save) | No | BU-specific, stays in src/components/save/ |
| SplitDisplay | Exists (together) | No | BU-specific, stays in src/components/together/ |

### Organisms

Self-contained, fully realized components. They ARE the content, not a container for it.

| Component | Status | CVA | Notes |
|-----------|--------|-----|-------|
| Navbar | Exists (shared) | Yes | Has story |
| PhoneMockup | Exists (spend) | No | BU-specific, stays in src/components/spend/ |
| ScoreDisplay | Exists (credit) | No | BU-specific, stays in src/components/credit/ |
| DashboardPreview | Exists (plan) | No | BU-specific, stays in src/components/plan/ |
| SplitShowcase | Exists (together) | No | BU-specific, stays in src/components/together/ |

### Templates

Structural section shells. Define layout patterns. Accept content via composition (`children` slots). These are the page sections that BUs fill with their own content and organisms.

| Component | Used By | Status | Phase |
|-----------|---------|--------|-------|
| HeroSection | All 5 BUs | Extract & share | **Phase 1** |
| FeatureSection | Spend, Save, Credit, Together | Extract & share | **Phase 1** |
| StatsRow | Spend, Save, Plan | Extract & share | **Phase 1** |
| TestimonialSection | Spend, Save, Plan, Together | Extract & share | **Phase 1** |
| CTASection | All 5 BUs | Extract & share | **Phase 1** |
| Footer | All 5 BUs | Extract & share | **Phase 1** |
| HowItWorks | Save, Together | Already shared (wraps ProcessSteps) | Phase 2 |
| FAQSection | Credit | BU-specific | Phase 2 |
| TrustSection | Credit | BU-specific | Phase 2 |
| ComparisonSection | Plan | BU-specific | Phase 2 |
| FeatureDeepDive | Plan | BU-specific | Phase 2 |

### Pages

Compose templates with BU-specific data and organisms.

| Component | Status | Notes |
|-----------|--------|-------|
| SpendPage | Exists | Rewire in Phase 2 |
| SavePage | Exists | Rewire as proof-of-concept in **Phase 1** |
| CreditPage | Exists | Rewire in Phase 2 |
| PlanPage | Exists | Rewire in Phase 2 |
| TogetherPage | Exists | Rewire in Phase 2 |

## Phase 1 Scope

### 1. Atom stories (already complete)

Stories already exist for Avatar, Logo, and NavLink with correct `Atoms/` title prefix. No work needed.

### 2. Extract 6 shared templates

Create new shared template components in `src/stories/`. Each is a CVA component that defines a section's structural layout and accepts content via composition.

#### HeroSection

Location: `src/stories/hero-section/HeroSection.tsx`

```
CVA variants:
  layout: 'left-right' | 'centered'
  size: 'default' | 'tall'

Props:
  heading: ReactNode        // supports inline JSX formatting (e.g., <span className="text-accent">)
  subheading: ReactNode     // same
  eyebrow?: ReactNode       // small uppercase label above heading (e.g., "Goal-based savings")
  backgroundImage?: string  // optional BU hero background image
  backgroundOpacity?: string // e.g., 'opacity-[0.08]' — defaults to theme-appropriate value
  overlayOpacity?: string   // overlay on background image, e.g., 'bg-background/70'
  children?: ReactNode      // visual area (PhoneMockup, ScoreDisplay, etc.)
  actions: ReactNode        // CTA buttons
  className?: string
```

Story: `title: 'Templates/HeroSection'` — variants for each layout + per-BU examples.

#### FeatureSection

Location: `src/stories/feature-section/FeatureSection.tsx`

```
CVA variants:
  background: 'default' | 'muted'
  padding: 'default' | 'compact'

Props:
  heading: ReactNode
  subtitle?: ReactNode
  sectionId?: string   // anchor id, defaults to 'features'
  children: ReactNode  // card grid — BUs compose their own Card arrangements
  className?: string
```

Story: `title: 'Templates/FeatureSection'`

#### StatsRow

Location: `src/stories/stats-row/StatsRow.tsx`

Composition-driven: the template handles the grid layout and section wrapper. BUs render their own stat items as children.

```
CVA variants:
  columns: 3 | 4
  background: 'default' | 'muted'

Props:
  children: ReactNode  // BUs compose their own stat items
  className?: string
```

A `StatItem` molecule may be introduced if a common stat card pattern emerges during implementation. For now, BUs own stat item rendering.

Story: `title: 'Templates/StatsRow'`

#### TestimonialSection

Location: `src/stories/testimonial-section/TestimonialSection.tsx`

Composition-driven: the template handles the grid layout and section wrapper. BUs render their own testimonial cards as children, allowing full control over avatar treatment, card styling, etc.

```
CVA variants:
  columns: 2 | 3

Props:
  heading?: ReactNode
  children: ReactNode  // BUs compose their own testimonial cards
  className?: string
```

Story: `title: 'Templates/TestimonialSection'`

#### CTASection

Location: `src/stories/cta-section/CTASection.tsx`

```
CVA variants:
  background: 'gradient' | 'solid'
  alignment: 'center' | 'left'

Props:
  heading: ReactNode
  description?: ReactNode
  backgroundImage?: string   // optional background image (e.g., Save CTA uses one)
  backgroundOpacity?: string // Tailwind opacity class, defaults to 'opacity-[0.08]'
  sectionId?: string         // anchor id, defaults to 'cta'
  children: ReactNode        // CTA buttons
  className?: string
```

Note: Text colors are variant-aware — `solid` background uses `text-primary-foreground` for readability on dark BU gradients.

Story: `title: 'Templates/CTASection'`

#### Footer

Location: `src/stories/footer/Footer.tsx`

Uses hardcoded dark-mode colors per DESIGN.md convention (always-dark footer, not theme-responsive).

```
CVA variants:
  layout: 'columns' | 'simple'

Props:
  children: ReactNode  // Logo, link groups, social icons, legal text — fully composed by BU
  className?: string
```

Story: `title: 'Templates/Footer'`

### 3. Migrate SavePage as proof-of-concept

Rewire `src/stories/save/SavePage.tsx` to import and compose the new shared templates instead of the BU-specific components from `src/components/save/`. The Save BU-specific components (HeroSection, FeatureSection, StatsRow, TestimonialSection, CTASection, Footer) in `src/components/save/` remain untouched until all BUs are migrated — SavePage simply stops importing them.

Components SavePage will continue importing from `src/components/save/`:
- HowItWorks (Phase 2 — already wraps shared ProcessSteps)

### 4. Storybook sidebar target

```
Atoms/
  Avatar
  Badge
  Button
  Logo
  NavLink
Molecules/
  Card
  ProcessSteps
Organisms/
  Navbar
Templates/
  CTASection
  FeatureSection
  Footer
  HeroSection
  StatsRow
  TestimonialSection
Pages/
  Futra Spend
  Futra Save
  Futra Credit
  Futra Plan
  Futra Together
```

## Phase 2 — Remaining Work (Not Built in Phase 1)

After Phase 1 review, the following work remains:

### Template extraction
- Extract HowItWorks as a shared template (currently exists in Save and Together, wraps ProcessSteps)
- Extract FAQSection as a shared template (currently Credit-only, but the pattern is reusable)
- Extract TrustSection as a shared template (currently Credit-only)
- Extract ComparisonSection as a shared template (currently Plan-only)
- Extract FeatureDeepDive as a shared template (currently Plan-only)

### BU page migration
- Rewire SpendPage to use shared templates
- Rewire CreditPage to use shared templates
- Rewire PlanPage to use shared templates
- Rewire TogetherPage to use shared templates

### Component relocation
- Move BU-specific organisms (PhoneMockup, ScoreDisplay, DashboardPreview, SplitShowcase) from `src/components/{bu}/` into `src/stories/` with their own stories
- Move BU-specific molecules (ProgressCard, SplitDisplay) from `src/components/{bu}/` into `src/stories/` with their own stories

### Cleanup
- Slim down or remove `src/components/` once all components live in `src/stories/`
- Audit all existing components for CVA compliance
- Audit all existing components for token adherence (no hardcoded values)
- Document design system principles in DESIGN.md

### Missing token review
- During Phase 1 implementation, any tokens needed that don't exist in `tailwind.css` will be flagged for discussion before being added
