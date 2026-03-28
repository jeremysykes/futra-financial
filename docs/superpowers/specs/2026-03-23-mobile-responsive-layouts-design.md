# Mobile-First Responsive Layouts

## Overview

Add explicit mobile-first responsive behavior to all Futra Financial page template sections. The Spend BU serves as the reference implementation; patterns propagate to the other four BUs via the shared component library in `src/stories/`.

## Decisions

| Decision                 | Choice                                                   | Rationale                                                                              |
| ------------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Reference BU             | Spend                                                    | Most section variants, default landing experience                                      |
| Viewport range           | 375px–768px (phone + tablet)                             | Existing `md:`/`lg:` breakpoints handle tablet→desktop well; the gap is below 768px    |
| Touch targets            | 44px minimum (Apple HIG)                                 | Financial app — mis-taps are costly, but 48px is overkill for a marketing page         |
| ComparisonSection mobile | Stacked cards                                            | Table layout doesn't work on narrow screens; cards are natively vertical               |
| Hero phone mockup        | Keep, reduce size                                        | Mockup acts as a visual scroll prompt; without it, CTA sits in a void                  |
| Implementation strategy  | Bottom-up token layer                                    | Shared responsive spacing/typography values consumed by all components; prevents drift |
| Branch strategy          | Local feature branch, no remote push until user approves | User reviews before anything touches main                                              |

## Approach: Bottom-Up Token Layer

Define responsive spacing and typography patterns at the shared level (Tailwind utility classes applied consistently across components), then update each section component to consume them. No changes to `tailwind.css` custom properties — this is all standard Tailwind responsive prefixes applied in a consistent vocabulary.

## Layer 1: Responsive Spacing & Typography Tokens

These are not CSS custom properties — they're Tailwind class patterns applied consistently across all section components.

### Container horizontal padding

| Breakpoint    | Class     | Value | Notes                                                         |
| ------------- | --------- | ----- | ------------------------------------------------------------- |
| Base (mobile) | `px-5`    | 20px  | Gains 8px total content width (4px per side) on 375px screens |
| ≥640px (sm)   | `sm:px-6` | 24px  | Current behavior preserved                                    |

### Section vertical padding

| Breakpoint    | Class      | Value |
| ------------- | ---------- | ----- |
| Base (mobile) | `py-16`    | 64px  |
| ≥640px (sm)   | `sm:py-20` | 80px  |
| ≥768px (md)   | `md:py-28` | 112px |
| ≥1024px (lg)  | `lg:py-32` | 128px |

### Body text sizing

| Element        | Current                   | New                           |
| -------------- | ------------------------- | ----------------------------- |
| Body/paragraph | Static `text-base` (16px) | `text-[clamp(15px,2vw,17px)]` |
| Small/caption  | `text-xs`/`text-sm`       | No change (fine at all sizes) |
| Headings       | Already use `clamp()`     | No change                     |

### Section heading margin-bottom

| Breakpoint    | Class      | Value |
| ------------- | ---------- | ----- |
| Base (mobile) | `mb-10`    | 40px  |
| ≥768px (md)   | `md:mb-16` | 64px  |

## Layer 2: Component-Level Changes

### HeroSection (`src/stories/hero-section/HeroSection.tsx`)

The `size` CVA variant controls min-height. Both variants get responsive mobile treatment:

| Property                       | Current                | Mobile-first change                                                       |
| ------------------------------ | ---------------------- | ------------------------------------------------------------------------- |
| Min height (`default` variant) | `min-h-screen`         | `min-h-[85vh] sm:min-h-screen` — prevents oversized hero on small screens |
| Min height (`tall` variant)    | `min-h-[110vh]`        | `min-h-[95vh] sm:min-h-[110vh]` — proportional mobile reduction           |
| Flex gap                       | `gap-16 lg:gap-20`     | `gap-10 sm:gap-16 lg:gap-20`                                              |
| Phone mockup width             | `max-w-md lg:max-w-lg` | `max-w-[220px] sm:max-w-[280px] lg:max-w-lg`                              |
| Phone mockup alignment         | Left-aligned in flex   | Add `mx-auto lg:mx-0` — center on mobile column layout                    |
| CTA button                     | Standard width         | `w-full sm:w-auto` — full-width tap target on mobile                      |
| Container padding              | `px-6`                 | `px-5 sm:px-6`                                                            |
| Section padding                | `py-20 md:py-28`       | `py-16 sm:py-20 md:py-28 lg:py-32`                                        |
| Hero subheading                | `text-lg` (18px)       | Keep `text-lg` — hero subheading is intentionally larger than body text   |

### FeatureSection (`src/stories/feature-section/FeatureSection.tsx`)

CVA `padding` variant handling: the `default` variant gets the full responsive scale. The `compact` variant gets a proportional mobile reduction.

| Property                    | Current          | Mobile-first change                |
| --------------------------- | ---------------- | ---------------------------------- |
| Section padding (`default`) | `py-24 md:py-32` | `py-16 sm:py-20 md:py-28 lg:py-32` |
| Section padding (`compact`) | `py-16 md:py-20` | `py-12 sm:py-16 md:py-20`          |
| Container padding           | `px-6`           | `px-5 sm:px-6`                     |
| Heading margin              | `mb-16`          | `mb-10 md:mb-16`                   |

### FeatureDeepDive (`src/stories/feature-deep-dive/FeatureDeepDive.tsx`)

CVA `padding` variant handling: same pattern as FeatureSection.

| Property                             | Current             | Mobile-first change                                                                                                                                                        |
| ------------------------------------ | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Inner grid gap (FeatureBlock)        | `gap-10 md:gap-16`  | `gap-8 md:gap-16`                                                                                                                                                          |
| Outer container gap (between blocks) | `gap-24 md:gap-32`  | `gap-16 sm:gap-24 md:gap-32` — 96px is excessive on mobile                                                                                                                 |
| Image max-width on mobile            | Unconstrained       | `max-w-[280px] mx-auto md:max-w-none`                                                                                                                                      |
| Chart containers                     | Fixed pixel heights | No change — Recharts `ResponsiveContainer` handles width; fixed heights are acceptable. Known risk: `YAxis` labels may compress on 280px containers but this is tolerable. |
| Section padding (`default`)          | `py-20 md:py-32`    | `py-16 sm:py-20 md:py-28 lg:py-32`                                                                                                                                         |
| Section padding (`compact`)          | `py-16 md:py-24`    | `py-12 sm:py-16 md:py-24`                                                                                                                                                  |
| Container padding                    | `px-6`              | `px-5 sm:px-6`                                                                                                                                                             |

### StatsRow (`src/stories/stats-row/StatsRow.tsx`)

| Property                              | Current           | Mobile-first change                                                                                                                                                                                     |
| ------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Section padding                       | `py-20 md:py-28`  | `py-16 sm:py-20 md:py-28 lg:py-32`                                                                                                                                                                      |
| Grid gap                              | `gap-8 md:gap-12` | `gap-6 sm:gap-8 md:gap-12`                                                                                                                                                                              |
| Mobile alignment (3-col variant only) | Left-aligned      | Add `text-center sm:text-left` to the grid container. Only the 3-column variant collapses to `grid-cols-1` on mobile; the 4-column variant uses `grid-cols-2` at base so centering is not needed there. |

### TestimonialSection (`src/stories/testimonial-section/TestimonialSection.tsx`)

Grid columns are a CVA variant. The `sm:grid-cols-2` intermediate step applies to the `columns: 3` variant specifically. The `columns: 2` variant already reaches 2 columns at `md:`, so `sm:` is redundant there.

| Property                            | Current                      | Mobile-first change                                            |
| ----------------------------------- | ---------------------------- | -------------------------------------------------------------- |
| Grid columns (`columns: 3` variant) | `grid-cols-1 md:grid-cols-3` | `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` — tablet gets 2-up |
| Gap                                 | Static                       | `gap-6 sm:gap-8`                                               |
| Heading margin                      | `mb-16`                      | `mb-10 md:mb-16`                                               |
| Section padding                     | `py-24 md:py-32`             | `py-16 sm:py-20 md:py-28 lg:py-32`                             |
| Container padding                   | `px-6`                       | `px-5 sm:px-6`                                                 |

### CTASection (`src/stories/cta-section/CTASection.tsx`)

| Property          | Current          | Mobile-first change                                             |
| ----------------- | ---------------- | --------------------------------------------------------------- |
| Section padding   | `py-24 md:py-32` | `py-16 sm:py-20 md:py-28 lg:py-32`                              |
| CTA button        | Standard width   | `w-full sm:w-auto`                                              |
| Heading margin    | Static           | `mb-10 md:mb-16` (follows Layer 1 standard, not a custom scale) |
| Container padding | `px-6`           | `px-5 sm:px-6`                                                  |

### HowItWorks (`src/stories/how-it-works/HowItWorks.tsx`)

CVA `padding` variant handling: same pattern as FeatureSection.

| Property                    | Current          | Mobile-first change                |
| --------------------------- | ---------------- | ---------------------------------- |
| Section padding (`default`) | `py-24 md:py-32` | `py-16 sm:py-20 md:py-28 lg:py-32` |
| Section padding (`compact`) | `py-20`          | `py-12 sm:py-16 md:py-20`          |
| Heading margin              | `mb-16`          | `mb-10 md:mb-16`                   |
| Step spacing                | Static           | `gap-8 sm:gap-10 md:gap-12`        |
| Container padding           | `px-6`           | `px-5 sm:px-6`                     |

### FAQSection (`src/stories/faq-section/FAQSection.tsx`)

CVA `padding` variant handling: same pattern as FeatureSection.

| Property                    | Current          | Mobile-first change                |
| --------------------------- | ---------------- | ---------------------------------- |
| Section padding (`default`) | `py-20 md:py-28` | `py-16 sm:py-20 md:py-28 lg:py-32` |
| Section padding (`compact`) | `py-16 md:py-20` | `py-12 sm:py-16 md:py-20`          |
| Heading margin              | `mb-16`          | `mb-10 md:mb-16`                   |
| Container padding           | `px-6`           | `px-5 sm:px-6`                     |
| Container max-width         | `max-w-[700px]`  | No change (works great on mobile)  |

**Accordion tap target:** The 44px `min-h` change targets `AccordionItem.tsx` (`src/stories/accordion-item/AccordionItem.tsx`), not FAQSection itself. AccordionItem is a shared atom — this change applies globally to all accordion usages, which is the correct behavior (all accordions should meet touch target standards).

| Property                     | Current     | Mobile-first change                                              |
| ---------------------------- | ----------- | ---------------------------------------------------------------- |
| AccordionItem trigger height | Unspecified | `min-h-[44px]` in `triggerVariants` — meets Apple HIG tap target |

### ComparisonSection (`src/stories/comparison-section/ComparisonSection.tsx`)

**Note:** This component is currently Plan-specific — it imports `PlanCompetitors` and `PlanFeatures` from `plan.mock`. The dual-render change is Plan-only. Making ComparisonSection accept generic data via props is out of scope for this work.

**Structural change — dual render:**

- Desktop (≥768px): Current `<table>` layout, shown via `hidden md:block`
- Mobile (<768px): Stacked cards, shown via `md:hidden`

**Mobile card layout:**

- Futra's card renders **first** in the stack (index `0` in `PlanCompetitors`, same logic as the table's highlighted column)
- Futra's card: `bg-primary/10 border border-primary/30 rounded-xl p-4`
- Competitor cards: `bg-surface border border-border rounded-xl p-4`
- Card header: competitor name, `font-semibold text-sm` (bold)
- Card body: feature rows as flex with name (`text-sm text-foreground`) left-aligned, Check/X icon right-aligned
- Check/X icons: same 18px size as table layout — adequate for 44px row height when combined with `py-2` row padding
- Cards stack with `gap-4` (16px) between them
- Section padding and container padding follow shared responsive scale

### Navbar (`src/stories/navbar/Navbar.tsx`)

| Property          | Current          | Mobile-first change                           |
| ----------------- | ---------------- | --------------------------------------------- |
| Hamburger button  | Standard size    | Ensure `min-h-[44px] min-w-[44px]` tap target |
| Mobile menu links | Standard padding | `min-h-[44px]` per link for touch             |

### TrustSection (`src/stories/trust-section/TrustSection.tsx`)

Already has `flex-col sm:flex-row` responsive behavior. TrustSection is a slim trust-badge strip, not a full content section — its padding is intentionally small. Only container padding changes.

| Property                    | Current | Mobile-first change                                           |
| --------------------------- | ------- | ------------------------------------------------------------- |
| Section padding (`default`) | `py-8`  | `py-6 sm:py-8` — proportional mobile reduction for slim strip |
| Section padding (`compact`) | `py-6`  | No change — already compact enough                            |
| Container padding           | `px-6`  | `px-5 sm:px-6`                                                |

### Footer (`src/stories/footer/Footer.tsx`)

Footer is a composition shell that accepts `children`. The responsive stacking change targets the inner `<div>` wrapper that Footer renders around its children.

| Property             | Current            | Mobile-first change                              |
| -------------------- | ------------------ | ------------------------------------------------ |
| Inner content layout | No responsive flex | Add `flex flex-col sm:flex-row` to inner wrapper |
| Column gap           | Static             | `gap-8` between stacked columns on mobile        |

## Scope Boundaries

**In scope:**

- All 10 section components in `src/stories/`
- Spend page as reference implementation
- Propagation to Save, Credit, Plan, Together pages (same shared components)
- Navbar touch target fixes
- Footer responsive stacking

**Out of scope:**

- No changes to `tailwind.css` custom properties or token architecture
- No changes to color themes or dark/light mode behavior
- No new custom Tailwind breakpoints (using defaults: sm:640, md:768, lg:1024)
- No `xl:` or `2xl:` breakpoint additions (deferred — low ROI for this scope)
- No changes to Storybook decorators or story files
- No JavaScript viewport detection — pure CSS responsive via Tailwind classes

## Testing Strategy

- Visual verification at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad mini portrait), 1024px+ (desktop)
- Storybook stories already exist for each component — verify in Storybook's viewport addon
- Check all 5 BU pages to confirm shared components adapt correctly across themes
- Verify ComparisonSection card↔table toggle at the `md:` breakpoint
- Verify 44px tap targets on CTA buttons, navbar hamburger, mobile menu links, FAQ accordions
