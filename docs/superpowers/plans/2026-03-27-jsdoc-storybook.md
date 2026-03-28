# JSDoc for Storybook Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add JSDoc to all 28 component prop interfaces and exports, remove duplicate descriptions from story argTypes, and update the argTypes test.

**Architecture:** JSDoc on component source becomes the single source of truth for prop descriptions. Storybook's react-docgen (built into `@storybook/react-vite`) auto-extracts JSDoc into autodocs pages. Story argTypes retain only Storybook-specific metadata: categories, controls, disable, options.

**Tech Stack:** TypeScript JSDoc, Storybook autodocs, Vitest

**Reference:** `apps/web/src/stories/focal-image/FocalImage.tsx` is the gold standard for JSDoc format.

---

## File Map

**Components to add JSDoc (26 files — FocalImage already done, ComparisonSection and PhoneMockup have no props):**

| File                                                              | Props Interface           |
| ----------------------------------------------------------------- | ------------------------- |
| `apps/web/src/stories/accordion/Accordion.tsx`                    | `AccordionProps`          |
| `apps/web/src/stories/accordion-item/AccordionItem.tsx`           | `AccordionItemProps`      |
| `apps/web/src/stories/avatar/Avatar.tsx`                          | `AvatarProps`             |
| `apps/web/src/stories/badge/Badge.tsx`                            | `BadgeProps`              |
| `apps/web/src/stories/button/Button.tsx`                          | `ButtonProps`             |
| `apps/web/src/stories/card/Card.tsx`                              | `CardProps`               |
| `apps/web/src/stories/cta-section/CTASection.tsx`                 | `CTASectionProps`         |
| `apps/web/src/stories/dashboard-preview/DashboardPreview.tsx`     | `DashboardPreviewProps`   |
| `apps/web/src/stories/faq-section/FAQSection.tsx`                 | `FAQSectionProps`         |
| `apps/web/src/stories/feature-deep-dive/FeatureDeepDive.tsx`      | `FeatureDeepDiveProps`    |
| `apps/web/src/stories/feature-section/FeatureSection.tsx`         | `FeatureSectionProps`     |
| `apps/web/src/stories/footer/Footer.tsx`                          | `FooterProps`             |
| `apps/web/src/stories/hero-section/HeroSection.tsx`               | `HeroSectionProps`        |
| `apps/web/src/stories/how-it-works/HowItWorks.tsx`                | `HowItWorksProps`         |
| `apps/web/src/stories/logo/Logo.tsx`                              | `LogoProps`               |
| `apps/web/src/stories/navbar/Navbar.tsx`                          | `NavbarProps`             |
| `apps/web/src/stories/nav-link/NavLink.tsx`                       | `NavLinkProps`            |
| `apps/web/src/stories/process-steps/ProcessSteps.tsx`             | `ProcessStepsProps`       |
| `apps/web/src/stories/progress-card/ProgressCard.tsx`             | `ProgressCardProps`       |
| `apps/web/src/stories/score-display/ScoreDisplay.tsx`             | `ScoreDisplayProps`       |
| `apps/web/src/stories/split-display/SplitDisplay.tsx`             | `SplitDisplayProps`       |
| `apps/web/src/stories/stat-item/StatItem.tsx`                     | `StatItemProps`           |
| `apps/web/src/stories/stats-row/StatsRow.tsx`                     | `StatsRowProps`           |
| `apps/web/src/stories/testimonial-section/TestimonialSection.tsx` | `TestimonialSectionProps` |
| `apps/web/src/stories/trust-section/TrustSection.tsx`             | `TrustSectionProps`       |

**Stories to strip descriptions (26 files — ComparisonSection and PhoneMockup have empty argTypes):**
Same directories as above, the `.stories.ts(x)` files.

**Test file:** `apps/web/src/stories/__tests__/argTypes.test.ts`

**Config:** `CLAUDE.md`

---

### Task 1: Add JSDoc to Atom Components (Button, Badge, Avatar, NavLink)

**Files:**

- Modify: `apps/web/src/stories/button/Button.tsx`
- Modify: `apps/web/src/stories/badge/Badge.tsx`
- Modify: `apps/web/src/stories/avatar/Avatar.tsx`
- Modify: `apps/web/src/stories/nav-link/NavLink.tsx`

- [ ] **Step 1: Add JSDoc to Button.tsx**

Replace the `ButtonProps` interface and component with:

```tsx
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element using Radix Slot */
  asChild?: boolean;
}

/**
 * Primary action button with variant-driven styling.
 *
 * Supports `primary` and `inverse` intents with two size presets.
 * Use `asChild` to render as a different element (e.g., a link).
 *
 * @default intent "primary"
 * @default size "md"
 */
const Button = ({
```

- [ ] **Step 2: Add JSDoc to Badge.tsx**

Replace the `BadgeProps` interface and component with:

```tsx
export interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof badgeVariants> {
  /** Badge content — icon, text, or image */
  children: React.ReactNode;
}

/**
 * Shaped container for icon, text, or image content.
 *
 * Uses CVA variants for shape (square, rounded, circle),
 * size (sm, md, lg), and content type styling hints.
 *
 * @default shape "rounded"
 * @default size "md"
 * @default content "icon"
 */
const Badge = ({
```

- [ ] **Step 3: Add JSDoc to Avatar.tsx**

Replace the `AvatarProps` interface and component with:

```tsx
export interface AvatarProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL for the avatar */
  src?: string;
  /** Alt text; first character used as fallback initial */
  alt: string;
  /** Custom initials to show when no image is provided */
  initials?: string;
}

/**
 * Circular avatar with image or initials fallback.
 *
 * Shows the provided image, or falls back to the first character
 * of `alt` (or custom `initials`) on a muted background.
 *
 * @default size "md"
 * @default ring "none"
 */
const Avatar = ({
```

- [ ] **Step 4: Add JSDoc to NavLink.tsx**

Replace the `NavLinkProps` interface and component with:

```tsx
export interface NavLinkProps
  extends
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  /** Target URL for the link */
  href: string;
}

/**
 * Anchor navigation link with sizing variants.
 *
 * Styled with muted foreground color and accent hover transition.
 *
 * @default size "sm"
 */
const NavLink = ({
```

- [ ] **Step 5: Run tests to verify nothing breaks**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass (JSDoc additions don't affect test behavior).

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/stories/button/Button.tsx apps/web/src/stories/badge/Badge.tsx apps/web/src/stories/avatar/Avatar.tsx apps/web/src/stories/nav-link/NavLink.tsx
git commit -m "docs: add JSDoc to atom components (Button, Badge, Avatar, NavLink)"
```

---

### Task 2: Add JSDoc to Atom Components (Card, Logo, Accordion, AccordionItem)

**Files:**

- Modify: `apps/web/src/stories/card/Card.tsx`
- Modify: `apps/web/src/stories/logo/Logo.tsx`
- Modify: `apps/web/src/stories/accordion/Accordion.tsx`
- Modify: `apps/web/src/stories/accordion-item/AccordionItem.tsx`

- [ ] **Step 1: Add JSDoc to Card.tsx**

```tsx
/**
 * Container with optional accent borders and interactive hover states.
 *
 * Accent borders can be placed on any edge. Interactive mode adds
 * hover elevation and pointer cursor.
 *
 * @default accent "none"
 * @default interactive false
 */
```

CardProps has no custom props beyond CVA variants and `React.HTMLAttributes`, so add the component-level JSDoc only (no prop-level JSDoc needed — inherited props are self-documenting).

- [ ] **Step 2: Add JSDoc to Logo.tsx**

```tsx
export interface LogoProps extends VariantProps<typeof logoVariants> {
  /** Business unit name displayed after the FUTRA brand */
  unitName: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FUTRA brand logo with business unit name.
 *
 * Renders the FUTRA wordmark followed by the unit name in accent color.
 * Supports light and dark mode variants.
 *
 * @default mode "light"
 */
const Logo = ({
```

- [ ] **Step 3: Add JSDoc to Accordion.tsx**

```tsx
export interface AccordionProps
  extends VariantProps<typeof accordionVariants> {
  /** Array of accordion item data objects with value, trigger, and content */
  items: AccordionItemData[];
  /** Allow multiple accordion items to be open simultaneously */
  multiple?: boolean;
  /** Additional CSS classes for the accordion root */
  className?: string;
}

/**
 * Collapsible accordion with support for single or multiple open items.
 *
 * Renders a list of `AccordionItem` components driven by the `items` data array.
 *
 * @default spacing "default"
 * @default multiple false
 */
const Accordion = ({
```

- [ ] **Step 4: Add JSDoc to AccordionItem.tsx**

```tsx
export interface AccordionItemProps {
  /** Unique identifier for the accordion item */
  value: string;
  /** Clickable header content that toggles open/close */
  trigger: ReactNode;
  /** Collapsible body content revealed when open */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Individual accordion item with trigger and collapsible content.
 *
 * Must be used inside an `Accordion` component. The trigger area
 * includes a chevron icon that rotates when expanded.
 */
const AccordionItem = ({
```

- [ ] **Step 5: Run tests**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/stories/card/Card.tsx apps/web/src/stories/logo/Logo.tsx apps/web/src/stories/accordion/Accordion.tsx apps/web/src/stories/accordion-item/AccordionItem.tsx
git commit -m "docs: add JSDoc to atom components (Card, Logo, Accordion, AccordionItem)"
```

---

### Task 3: Add JSDoc to Molecule Components (FocalImage verify, StatItem, ProgressCard, ScoreDisplay, SplitDisplay, DashboardPreview)

**Files:**

- Verify: `apps/web/src/stories/focal-image/FocalImage.tsx` (already has JSDoc)
- Modify: `apps/web/src/stories/stat-item/StatItem.tsx`
- Modify: `apps/web/src/stories/progress-card/ProgressCard.tsx`
- Modify: `apps/web/src/stories/score-display/ScoreDisplay.tsx`
- Modify: `apps/web/src/stories/split-display/SplitDisplay.tsx`
- Modify: `apps/web/src/stories/dashboard-preview/DashboardPreview.tsx`

- [ ] **Step 1: Verify FocalImage.tsx already matches the standard**

Read `apps/web/src/stories/focal-image/FocalImage.tsx` and confirm it has JSDoc on all props and the component export. It should already be complete — no changes needed.

- [ ] **Step 2: Add JSDoc to StatItem.tsx**

```tsx
export interface StatItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statItemVariants> {
  /** The statistic value to display */
  value: ReactNode;
  /** Descriptive label below the value */
  label: ReactNode;
}

/**
 * Single statistic display with value and label.
 *
 * Renders a large value (mono font) with a smaller label beneath.
 * Use inside `StatsRow` for grid layouts.
 *
 * @default valueColor "accent"
 */
const StatItem = ({
```

- [ ] **Step 3: Add JSDoc to ProgressCard.tsx**

```tsx
export interface ProgressCardProps
  extends VariantProps<typeof progressCardVariants> {
  /** Display name for the savings goal */
  goalName: string;
  /** Formatted target amount string (e.g. "$4,500") */
  targetAmount: string;
  /** Formatted current saved amount string (e.g. "$3,015") */
  currentAmount: string;
  /** Progress percentage from 0 to 100 */
  percentage: number;
  /** Additional CSS classes for the card container */
  className?: string;
}

/**
 * Progress card showing a savings goal with bar indicator.
 *
 * Displays goal name, current vs target amounts, and a
 * percentage-filled progress bar with accent color.
 *
 * @default size "default"
 */
const ProgressCard = ({
```

- [ ] **Step 4: Add JSDoc to ScoreDisplay.tsx**

```tsx
interface ScoreDisplayProps {
  /** Numeric credit score value displayed in the center */
  score: number;
  /** Rating label shown below the score (e.g. "Good", "Excellent") */
  label: string;
  /**
   * Arc fill percentage from 0 to 1.
   * @default 0.75
   */
  percentage?: number;
  /**
   * SVG width and height in pixels.
   * @default 220
   */
  size?: number;
}

/**
 * Circular score gauge with arc indicator.
 *
 * Renders a score value inside an SVG arc that fills proportionally
 * to the `percentage` prop. Used for credit score displays.
 */
const ScoreDisplay = ({
```

- [ ] **Step 5: Add JSDoc to SplitDisplay.tsx**

```tsx
export interface SplitDisplayProps
  extends VariantProps<typeof splitDisplayVariants> {
  /** Heading text describing the expense category */
  label: string;
  /** Formatted total amount displayed alongside the label */
  total: string;
  /** Array of segment objects defining each payer's share */
  splits: SplitSegment[];
  /** Additional CSS classes for the outer container */
  className?: string;
}

/**
 * Split percentage display with colored segments and legend.
 *
 * Shows a horizontal bar divided proportionally by each split,
 * with a legend listing names, amounts, and percentages.
 *
 * @default size "default"
 */
const SplitDisplay = ({
```

Also add JSDoc to `SplitSegment`:

```tsx
export interface SplitSegment {
  /** Display name for the payer */
  name: string;
  /** Formatted amount string */
  amount: string;
  /** Percentage share from 0 to 100 */
  percent: number;
  /** Token color for the segment bar */
  tokenColor: 'primary' | 'accent';
}
```

- [ ] **Step 6: Add JSDoc to DashboardPreview.tsx**

```tsx
export interface DashboardPreviewProps
  extends VariantProps<typeof dashboardVariants> {
  /** Additional CSS classes for the dashboard container */
  className?: string;
}

/**
 * Dashboard preview with metrics, charts, and budget bars.
 *
 * Renders a read-only dashboard mockup with balance, spending chart,
 * budget categories, and recent transactions. Data is hardcoded for
 * demonstration purposes.
 *
 * @default size "default"
 */
const DashboardPreview = ({
```

- [ ] **Step 7: Run tests**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass.

- [ ] **Step 8: Commit**

```bash
git add apps/web/src/stories/stat-item/StatItem.tsx apps/web/src/stories/progress-card/ProgressCard.tsx apps/web/src/stories/score-display/ScoreDisplay.tsx apps/web/src/stories/split-display/SplitDisplay.tsx apps/web/src/stories/dashboard-preview/DashboardPreview.tsx
git commit -m "docs: add JSDoc to molecule components (StatItem, ProgressCard, ScoreDisplay, SplitDisplay, DashboardPreview)"
```

---

### Task 4: Add JSDoc to Organism Components (Navbar, Footer, ProcessSteps, StatsRow)

**Files:**

- Modify: `apps/web/src/stories/navbar/Navbar.tsx`
- Modify: `apps/web/src/stories/footer/Footer.tsx`
- Modify: `apps/web/src/stories/process-steps/ProcessSteps.tsx`
- Modify: `apps/web/src/stories/stats-row/StatsRow.tsx`

- [ ] **Step 1: Add JSDoc to Navbar.tsx**

```tsx
export interface NavbarProps extends VariantProps<typeof navbarVariants> {
  /** Business unit name used for the logo */
  unitName: string;
  /** Navigation link items displayed in the navbar */
  links: { label: string; href: string }[];
  /** Label text for the call-to-action button */
  ctaText: string;
  /** Additional CSS classes for the nav element */
  className?: string;
}

/**
 * Responsive navigation bar with logo, links, CTA, and mobile menu.
 *
 * Fixed to the top of the viewport. Transitions from transparent to
 * a blurred surface background on scroll. Includes a hamburger menu
 * for mobile viewports.
 */
const Navbar = ({
```

- [ ] **Step 2: Add JSDoc to Footer.tsx**

```tsx
export interface FooterProps
  extends VariantProps<typeof footerVariants> {
  /** Footer content (columns, links, copyright, etc.) */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Footer section with layout variants.
 *
 * Always renders on a dark background (`#1C1C1A`). The `columns`
 * layout provides more vertical padding for multi-column content;
 * `simple` is more compact.
 *
 * @default layout "columns"
 */
const Footer = ({
```

- [ ] **Step 3: Add JSDoc to ProcessSteps.tsx**

```tsx
export interface ProcessStepsProps
  extends
    React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof processStepsVariants> {
  /** Array of step objects with icon, label, title, and description */
  steps: StepItem[];
  /**
   * Whether steps animate in with a fade-up effect.
   * @default true
   */
  animated?: boolean;
  /** Additional CSS classes applied to each step badge */
  badgeClassName?: string;
  /** Stroke width override for step icons */
  iconStrokeWidth?: number;
}

/**
 * Multi-step process display with badges and connector lines.
 *
 * Renders a responsive grid of steps, each with an icon badge,
 * label, title, and description. Steps can be connected with
 * dashed, solid, or no connector lines.
 *
 * @default size "md"
 * @default connector "dashed"
 * @default badgeShape "rounded"
 */
const ProcessSteps = ({
```

Also add JSDoc to `StepItem`:

```tsx
export interface StepItem {
  /** Lucide icon component for the step badge */
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
  }>;
  /** Short label above the title (e.g. "Step 1") */
  label: string;
  /** Step title */
  title: string;
  /** Step description text */
  description: string;
}
```

- [ ] **Step 4: Add JSDoc to StatsRow.tsx**

```tsx
export interface StatsRowProps
  extends VariantProps<typeof statsRowVariants> {
  /** StatItem children to display in the grid */
  children: ReactNode;
  /** Additional CSS classes for the section element */
  className?: string;
}

/**
 * Row container for statistic items in a responsive grid.
 *
 * Wraps `StatItem` children in a 3 or 4 column grid layout
 * with configurable background.
 *
 * @default columns 4
 * @default background "muted"
 */
const StatsRow = ({
```

- [ ] **Step 5: Run tests**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/stories/navbar/Navbar.tsx apps/web/src/stories/footer/Footer.tsx apps/web/src/stories/process-steps/ProcessSteps.tsx apps/web/src/stories/stats-row/StatsRow.tsx
git commit -m "docs: add JSDoc to organism components (Navbar, Footer, ProcessSteps, StatsRow)"
```

---

### Task 5: Add JSDoc to Section Components (HeroSection, FeatureSection, FeatureDeepDive, CTASection)

**Files:**

- Modify: `apps/web/src/stories/hero-section/HeroSection.tsx`
- Modify: `apps/web/src/stories/feature-section/FeatureSection.tsx`
- Modify: `apps/web/src/stories/feature-deep-dive/FeatureDeepDive.tsx`
- Modify: `apps/web/src/stories/cta-section/CTASection.tsx`

- [ ] **Step 1: Add JSDoc to HeroSection.tsx**

```tsx
export interface HeroSectionProps
  extends VariantProps<typeof heroSectionVariants> {
  /** Primary headline text */
  heading: ReactNode;
  /** Supporting description below the heading */
  subheading: ReactNode;
  /** Small label displayed above the heading */
  eyebrow?: ReactNode;
  /** URL for the background image */
  backgroundImage?: string;
  /**
   * Tailwind opacity class applied to the background image.
   * @default "opacity-[0.08]"
   */
  backgroundOpacity?: string;
  /**
   * Tailwind background class for the overlay layer.
   * @default "bg-background/70"
   */
  overlayOpacity?: string;
  /** CTA buttons or action elements */
  actions: ReactNode;
  /** Optional visual content (e.g., phone mockup) displayed beside the text */
  children?: ReactNode;
  /**
   * Hide the children slot in landscape orientation.
   * @default true
   */
  hideChildrenLandscape?: boolean;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Hero section with heading, subheading, CTA actions, and optional visual.
 *
 * Supports left-right and centered layouts with optional background
 * image and gradient overlay. The children slot (typically a phone
 * mockup or illustration) hides in landscape orientation by default.
 *
 * @default layout "left-right"
 * @default size "default"
 */
const HeroSection = ({
```

- [ ] **Step 2: Add JSDoc to FeatureSection.tsx**

```tsx
export interface FeatureSectionProps
  extends VariantProps<typeof featureSectionVariants> {
  /** Section heading text */
  heading: ReactNode;
  /** Eyebrow label displayed above the heading */
  subtitle?: ReactNode;
  /**
   * HTML id attribute for anchor linking.
   * @default "features"
   */
  sectionId?: string;
  /** Feature content (cards, grids, etc.) */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Feature section with heading, subtitle, and content area.
 *
 * Generic section wrapper for feature-related content. Supports
 * default and muted backgrounds with configurable padding.
 *
 * @default background "default"
 * @default padding "default"
 */
const FeatureSection = ({
```

- [ ] **Step 3: Add JSDoc to FeatureDeepDive.tsx**

```tsx
export interface FeatureDeepDiveProps
  extends VariantProps<typeof featureDeepDiveVariants> {
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Deep-dive feature blocks with alternating chart and text layout.
 *
 * Renders a series of feature blocks in a two-column grid that
 * alternates direction. Each block includes an overline, title,
 * description, and chart visualization. Content is hardcoded for
 * the Spend business unit.
 *
 * @default padding "default"
 */
const FeatureDeepDive = ({
```

- [ ] **Step 4: Add JSDoc to CTASection.tsx**

```tsx
export interface CTASectionProps
  extends VariantProps<typeof ctaSectionVariants> {
  /** Primary headline text */
  heading: ReactNode;
  /** Supporting description below the heading */
  description?: ReactNode;
  /** URL for the background image */
  backgroundImage?: string;
  /**
   * Tailwind opacity class applied to the background image.
   * @default "opacity-[0.08]"
   */
  backgroundOpacity?: string;
  /**
   * HTML id attribute for anchor linking.
   * @default "cta"
   */
  sectionId?: string;
  /** CTA buttons or action elements */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Call-to-action section with heading, description, and background.
 *
 * Supports gradient and solid background variants with optional
 * background image overlay. Content can be center or left aligned.
 *
 * @default background "gradient"
 * @default alignment "center"
 */
const CTASection = ({
```

- [ ] **Step 5: Run tests**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/stories/hero-section/HeroSection.tsx apps/web/src/stories/feature-section/FeatureSection.tsx apps/web/src/stories/feature-deep-dive/FeatureDeepDive.tsx apps/web/src/stories/cta-section/CTASection.tsx
git commit -m "docs: add JSDoc to section components (HeroSection, FeatureSection, FeatureDeepDive, CTASection)"
```

---

### Task 6: Add JSDoc to Remaining Section Components (FAQSection, HowItWorks, TestimonialSection, TrustSection)

**Files:**

- Modify: `apps/web/src/stories/faq-section/FAQSection.tsx`
- Modify: `apps/web/src/stories/how-it-works/HowItWorks.tsx`
- Modify: `apps/web/src/stories/testimonial-section/TestimonialSection.tsx`
- Modify: `apps/web/src/stories/trust-section/TrustSection.tsx`

- [ ] **Step 1: Add JSDoc to FAQSection.tsx**

```tsx
export interface FAQSectionProps
  extends VariantProps<typeof faqSectionVariants> {
  /** Small label displayed above the heading */
  eyebrow?: ReactNode;
  /** Section heading text */
  heading: ReactNode;
  /** Array of FAQ question/answer pairs */
  items: FAQItem[];
  /** URL for the background image */
  backgroundImage?: string;
  /**
   * Tailwind opacity class applied to the background image.
   * @default "opacity-[0.06]"
   */
  backgroundOpacity?: string;
  /**
   * HTML id attribute for anchor linking.
   * @default "faq"
   */
  sectionId?: string;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * FAQ section with accordion of questions and answers.
 *
 * Renders a heading area followed by an `Accordion` component
 * populated from the `items` array. Supports optional background
 * image overlay.
 *
 * @default padding "default"
 */
const FAQSection = ({
```

Also add JSDoc to `FAQItem`:

```tsx
export interface FAQItem {
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
}
```

- [ ] **Step 2: Add JSDoc to HowItWorks.tsx**

```tsx
export interface HowItWorksProps
  extends VariantProps<typeof howItWorksVariants> {
  /** Small label displayed above the heading */
  eyebrow?: ReactNode;
  /** Section heading text */
  heading?: ReactNode;
  /**
   * HTML id attribute for anchor linking.
   * @default "how-it-works"
   */
  sectionId?: string;
  /** Section content (typically ProcessSteps) */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Section wrapper for "how it works" content.
 *
 * Provides a heading area and content slot, typically used with
 * `ProcessSteps` as children. Supports background and padding variants.
 *
 * @default background "default"
 * @default padding "default"
 */
const HowItWorks = ({
```

- [ ] **Step 3: Add JSDoc to TestimonialSection.tsx**

```tsx
export interface TestimonialSectionProps
  extends VariantProps<typeof testimonialSectionVariants> {
  /** Section heading text */
  heading?: ReactNode;
  /** Eyebrow label displayed above the heading */
  subtitle?: ReactNode;
  /** Testimonial card children */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Testimonial section with responsive card grid.
 *
 * Renders a heading area followed by a grid of testimonial cards.
 * Supports 2 or 3 column layouts.
 *
 * @default columns 3
 */
const TestimonialSection = ({
```

- [ ] **Step 4: Add JSDoc to TrustSection.tsx**

```tsx
export interface TrustSectionProps
  extends VariantProps<typeof trustSectionVariants> {
  /** URL for the background image */
  backgroundImage?: string;
  /**
   * Tailwind opacity class applied to the background image.
   * @default "opacity-[0.12]"
   */
  backgroundOpacity?: string;
  /** Trust badge or partner logo content */
  children: ReactNode;
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Trust section with horizontal layout for badges and logos.
 *
 * Renders a bordered strip with optional background image,
 * typically containing trust badges, partner logos, or
 * security certifications.
 *
 * @default background "default"
 * @default padding "default"
 */
const TrustSection = ({
```

- [ ] **Step 5: Run tests**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/stories/faq-section/FAQSection.tsx apps/web/src/stories/how-it-works/HowItWorks.tsx apps/web/src/stories/testimonial-section/TestimonialSection.tsx apps/web/src/stories/trust-section/TrustSection.tsx
git commit -m "docs: add JSDoc to section components (FAQSection, HowItWorks, TestimonialSection, TrustSection)"
```

---

### Task 7: Remove descriptions from Atom story argTypes

**Files:**

- Modify: `apps/web/src/stories/button/Button.stories.ts`
- Modify: `apps/web/src/stories/badge/Badge.stories.tsx`
- Modify: `apps/web/src/stories/avatar/Avatar.stories.tsx`
- Modify: `apps/web/src/stories/nav-link/NavLink.stories.tsx`
- Modify: `apps/web/src/stories/card/Card.stories.ts`
- Modify: `apps/web/src/stories/logo/Logo.stories.tsx`
- Modify: `apps/web/src/stories/accordion/Accordion.stories.tsx`
- Modify: `apps/web/src/stories/accordion-item/AccordionItem.stories.tsx`

- [ ] **Step 1: Strip descriptions from Button.stories.ts argTypes**

Remove every `description: '...',` line from the argTypes block. Keep `control`, `options`, `table` entries. Result:

```ts
argTypes: {
  intent: {
    control: 'select',
    options: ['primary', 'inverse'],
    table: { category: 'Appearance' },
  },
  size: {
    control: 'select',
    options: ['sm', 'md'],
    table: { category: 'Appearance' },
  },
  className: {
    control: 'text',
    table: { category: 'Appearance' },
  },
  disabled: {
    control: 'boolean',
    table: { category: 'Behavior' },
  },
  asChild: { table: { disable: true } },
  children: { table: { disable: true } },
},
```

- [ ] **Step 2: Strip descriptions from Badge.stories.tsx argTypes**

```ts
argTypes: {
  shape: {
    control: 'select',
    options: ['square', 'rounded', 'circle'],
    table: { category: 'Appearance' },
  },
  size: {
    control: 'select',
    options: ['sm', 'md', 'lg'],
    table: { category: 'Layout' },
  },
  content: {
    control: 'select',
    options: ['icon', 'text', 'image'],
    table: { category: 'Appearance' },
  },
  className: {
    control: 'text',
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 3: Strip descriptions from Avatar.stories.tsx argTypes**

```ts
argTypes: {
  src: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  alt: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  initials: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  size: {
    control: 'inline-radio',
    options: ['sm', 'md', 'lg'],
    table: { category: 'Appearance' },
  },
  ring: {
    control: 'inline-radio',
    options: ['none', 'accent', 'primary'],
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 4: Strip descriptions from NavLink.stories.tsx argTypes**

```ts
argTypes: {
  href: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  size: {
    control: 'inline-radio',
    options: ['sm', 'base'],
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  children: {
    table: { disable: true },
  },
  onClick: {
    table: { disable: true },
  },
},
```

- [ ] **Step 5: Strip descriptions from Card.stories.ts argTypes**

```ts
argTypes: {
  accent: {
    control: 'select',
    options: ['none', 'left', 'top', 'right', 'bottom'],
    table: { category: 'Appearance' },
  },
  interactive: {
    control: 'boolean',
    table: { category: 'Behavior' },
  },
  className: {
    control: 'text',
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 6: Strip descriptions from Logo.stories.tsx argTypes**

```ts
argTypes: {
  unitName: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  mode: {
    control: 'inline-radio',
    options: ['light', 'dark'],
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 7: Strip descriptions from Accordion.stories.tsx argTypes**

```ts
argTypes: {
  items: {
    control: { type: 'object' },
    table: { category: 'Content' },
  },
  multiple: {
    control: { type: 'boolean' },
    table: { category: 'Behavior' },
  },
  spacing: {
    control: { type: 'inline-radio' },
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 8: Strip descriptions from AccordionItem.stories.tsx argTypes**

```ts
argTypes: {
  value: {
    control: 'text',
    table: { category: 'Content' },
  },
  className: {
    control: 'text',
    table: { category: 'Appearance' },
  },
  trigger: { table: { disable: true } },
  children: { table: { disable: true } },
},
```

- [ ] **Step 9: Run tests**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: FAIL — the "every visible argType has a description" test will fail since descriptions are removed. This is expected and will be fixed in Task 11.

- [ ] **Step 10: Commit**

```bash
git add apps/web/src/stories/button/Button.stories.ts apps/web/src/stories/badge/Badge.stories.tsx apps/web/src/stories/avatar/Avatar.stories.tsx apps/web/src/stories/nav-link/NavLink.stories.tsx apps/web/src/stories/card/Card.stories.ts apps/web/src/stories/logo/Logo.stories.tsx apps/web/src/stories/accordion/Accordion.stories.tsx apps/web/src/stories/accordion-item/AccordionItem.stories.tsx
git commit -m "refactor: remove descriptions from atom story argTypes (now in JSDoc)"
```

---

### Task 8: Remove descriptions from Molecule story argTypes

**Files:**

- Modify: `apps/web/src/stories/focal-image/FocalImage.stories.ts`
- Modify: `apps/web/src/stories/stat-item/StatItem.stories.tsx`
- Modify: `apps/web/src/stories/progress-card/ProgressCard.stories.tsx`
- Modify: `apps/web/src/stories/score-display/ScoreDisplay.stories.tsx`
- Modify: `apps/web/src/stories/split-display/SplitDisplay.stories.tsx`
- Modify: `apps/web/src/stories/dashboard-preview/DashboardPreview.stories.tsx`

- [ ] **Step 1: Strip descriptions from FocalImage.stories.ts argTypes**

```ts
argTypes: {
  src: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  alt: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  focusX: {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    table: { category: 'Layout' },
  },
  focusY: {
    control: { type: 'range', min: 0, max: 100, step: 1 },
    table: { category: 'Layout' },
  },
  className: {
    table: { disable: true },
  },
},
```

- [ ] **Step 2: Strip descriptions from StatItem.stories.tsx argTypes**

```ts
argTypes: {
  value: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  label: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  valueColor: {
    control: 'inline-radio',
    options: ['foreground', 'accent'],
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 3: Strip descriptions from ProgressCard.stories.tsx argTypes**

```ts
argTypes: {
  goalName: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  targetAmount: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  currentAmount: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  percentage: {
    control: { type: 'number', min: 0, max: 100 },
    table: { category: 'Content' },
  },
  size: {
    control: { type: 'inline-radio' },
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 4: Strip descriptions from ScoreDisplay.stories.tsx argTypes**

```ts
argTypes: {
  score: {
    control: { type: 'number' },
    table: { category: 'Content' },
  },
  label: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  percentage: {
    control: { type: 'number', min: 0, max: 1, step: 0.01 },
    table: { category: 'Content' },
  },
  size: {
    control: { type: 'number' },
    table: { category: 'Layout' },
  },
},
```

- [ ] **Step 5: Strip descriptions from SplitDisplay.stories.tsx argTypes**

```ts
argTypes: {
  size: {
    control: { type: 'select' },
    options: ['default', 'compact'],
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  label: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  total: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  splits: {
    table: { disable: true },
  },
},
```

- [ ] **Step 6: Strip descriptions from DashboardPreview.stories.tsx argTypes**

```ts
argTypes: {
  size: {
    control: { type: 'inline-radio' },
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 7: Commit**

```bash
git add apps/web/src/stories/focal-image/FocalImage.stories.ts apps/web/src/stories/stat-item/StatItem.stories.tsx apps/web/src/stories/progress-card/ProgressCard.stories.tsx apps/web/src/stories/score-display/ScoreDisplay.stories.tsx apps/web/src/stories/split-display/SplitDisplay.stories.tsx apps/web/src/stories/dashboard-preview/DashboardPreview.stories.tsx
git commit -m "refactor: remove descriptions from molecule story argTypes (now in JSDoc)"
```

---

### Task 9: Remove descriptions from Organism story argTypes

**Files:**

- Modify: `apps/web/src/stories/navbar/Navbar.stories.tsx`
- Modify: `apps/web/src/stories/footer/Footer.stories.tsx`
- Modify: `apps/web/src/stories/process-steps/ProcessSteps.stories.tsx`
- Modify: `apps/web/src/stories/stats-row/StatsRow.stories.tsx`

- [ ] **Step 1: Strip descriptions from Navbar.stories.tsx argTypes**

```ts
argTypes: {
  unitName: {
    control: { type: 'select' },
    options: ['spend', 'save', 'credit', 'plan', 'together'],
    table: { category: 'Content' },
  },
  links: {
    control: { type: 'object' },
    table: { category: 'Content' },
  },
  ctaText: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 2: Strip descriptions from Footer.stories.tsx argTypes**

```ts
argTypes: {
  layout: {
    control: 'inline-radio',
    options: ['columns', 'simple'],
    table: { category: 'Layout' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 3: Strip descriptions from ProcessSteps.stories.tsx argTypes**

```ts
argTypes: {
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    table: { category: 'Appearance' },
  },
  connector: {
    control: { type: 'select' },
    options: ['dashed', 'solid', 'none'],
    table: { category: 'Appearance' },
  },
  badgeShape: {
    control: { type: 'select' },
    options: ['square', 'rounded', 'circle'],
    table: { category: 'Appearance' },
  },
  badgeClassName: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  iconStrokeWidth: {
    control: { type: 'number' },
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  animated: {
    control: { type: 'boolean' },
    table: { category: 'Behavior' },
  },
  steps: {
    table: { disable: true },
  },
},
```

- [ ] **Step 4: Strip descriptions from StatsRow.stories.tsx argTypes**

```ts
argTypes: {
  children: { table: { disable: true } },
  columns: {
    control: { type: 'inline-radio' },
    options: [3, 4],
    table: { category: 'Layout' },
  },
  background: {
    control: { type: 'inline-radio' },
    options: ['default', 'muted'],
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 5: Commit**

```bash
git add apps/web/src/stories/navbar/Navbar.stories.tsx apps/web/src/stories/footer/Footer.stories.tsx apps/web/src/stories/process-steps/ProcessSteps.stories.tsx apps/web/src/stories/stats-row/StatsRow.stories.tsx
git commit -m "refactor: remove descriptions from organism story argTypes (now in JSDoc)"
```

---

### Task 10: Remove descriptions from Section story argTypes

**Files:**

- Modify: `apps/web/src/stories/hero-section/HeroSection.stories.tsx`
- Modify: `apps/web/src/stories/feature-section/FeatureSection.stories.tsx`
- Modify: `apps/web/src/stories/feature-deep-dive/FeatureDeepDive.stories.tsx`
- Modify: `apps/web/src/stories/cta-section/CTASection.stories.tsx`
- Modify: `apps/web/src/stories/faq-section/FAQSection.stories.tsx`
- Modify: `apps/web/src/stories/how-it-works/HowItWorks.stories.tsx`
- Modify: `apps/web/src/stories/testimonial-section/TestimonialSection.stories.tsx`
- Modify: `apps/web/src/stories/trust-section/TrustSection.stories.tsx`

- [ ] **Step 1: Strip descriptions from HeroSection.stories.tsx argTypes**

```ts
argTypes: {
  layout: {
    control: 'inline-radio',
    options: ['left-right', 'centered'],
    table: { category: 'Layout' },
  },
  size: {
    control: 'inline-radio',
    options: ['default', 'tall'],
    table: { category: 'Layout' },
  },
  heading: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  subheading: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  eyebrow: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  backgroundImage: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  backgroundOpacity: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  overlayOpacity: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  hideChildrenLandscape: {
    control: { type: 'boolean' },
    table: { category: 'Behavior' },
  },
  children: { table: { disable: true } },
  actions: { table: { disable: true } },
},
```

- [ ] **Step 2: Strip descriptions from FeatureSection.stories.tsx argTypes**

```ts
argTypes: {
  background: {
    control: 'inline-radio',
    options: ['default', 'muted'],
    table: { category: 'Appearance' },
  },
  padding: {
    control: 'inline-radio',
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  heading: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  subtitle: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  sectionId: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 3: Strip descriptions from FeatureDeepDive.stories.tsx argTypes**

```ts
argTypes: {
  padding: {
    control: 'inline-radio',
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 4: Strip descriptions from CTASection.stories.tsx argTypes**

```ts
argTypes: {
  background: {
    control: 'inline-radio',
    options: ['gradient', 'solid'],
    table: { category: 'Appearance' },
  },
  alignment: {
    control: 'inline-radio',
    options: ['center', 'left'],
    table: { category: 'Layout' },
  },
  heading: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  description: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  backgroundImage: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  backgroundOpacity: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  sectionId: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 5: Strip descriptions from FAQSection.stories.tsx argTypes**

```ts
argTypes: {
  padding: {
    control: 'inline-radio',
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  eyebrow: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  heading: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  items: {
    control: { type: 'object' },
    table: { category: 'Content' },
  },
  backgroundImage: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  backgroundOpacity: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  sectionId: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
},
```

- [ ] **Step 6: Strip descriptions from HowItWorks.stories.tsx argTypes**

```ts
argTypes: {
  background: {
    control: 'inline-radio',
    options: ['default', 'muted'],
    table: { category: 'Appearance' },
  },
  padding: {
    control: 'inline-radio',
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  eyebrow: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  heading: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  sectionId: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 7: Strip descriptions from TestimonialSection.stories.tsx argTypes**

```ts
argTypes: {
  columns: {
    control: 'inline-radio',
    options: [2, 3],
    table: { category: 'Layout' },
  },
  heading: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  subtitle: {
    control: { type: 'text' },
    table: { category: 'Content' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 8: Strip descriptions from TrustSection.stories.tsx argTypes**

```ts
argTypes: {
  background: {
    control: 'inline-radio',
    options: ['default', 'muted'],
    table: { category: 'Appearance' },
  },
  padding: {
    control: 'inline-radio',
    options: ['default', 'compact'],
    table: { category: 'Layout' },
  },
  backgroundImage: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  backgroundOpacity: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  className: {
    control: { type: 'text' },
    table: { category: 'Appearance' },
  },
  children: { table: { disable: true } },
},
```

- [ ] **Step 9: Commit**

```bash
git add apps/web/src/stories/hero-section/HeroSection.stories.tsx apps/web/src/stories/feature-section/FeatureSection.stories.tsx apps/web/src/stories/feature-deep-dive/FeatureDeepDive.stories.tsx apps/web/src/stories/cta-section/CTASection.stories.tsx apps/web/src/stories/faq-section/FAQSection.stories.tsx apps/web/src/stories/how-it-works/HowItWorks.stories.tsx apps/web/src/stories/testimonial-section/TestimonialSection.stories.tsx apps/web/src/stories/trust-section/TrustSection.stories.tsx
git commit -m "refactor: remove descriptions from section story argTypes (now in JSDoc)"
```

---

### Task 11: Update argTypes test

**Files:**

- Modify: `apps/web/src/stories/__tests__/argTypes.test.ts`

- [ ] **Step 1: Remove the description enforcement test**

Delete lines 297-306 from `argTypes.test.ts`:

```ts
// DELETE THIS ENTIRE TEST:
it('every visible argType has a description', () => {
  const visible = getVisibleArgTypes(meta);
  const missing = visible.filter(
    ([, config]) => !config.description || config.description.trim() === '',
  );
  expect(
    missing.map(([name]) => name),
    'argTypes missing description',
  ).toEqual([]);
});
```

- [ ] **Step 2: Run all tests to verify everything passes**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass. The remaining tests (categories, controls, options, CVA coverage, default args, JSX hiding) should all pass unchanged.

- [ ] **Step 3: Commit**

```bash
git add apps/web/src/stories/__tests__/argTypes.test.ts
git commit -m "test: remove argTypes description requirement (descriptions now in JSDoc)"
```

---

### Task 12: Update CLAUDE.md

**Files:**

- Modify: `CLAUDE.md`

- [ ] **Step 1: Update the Storybook/argTypes guidance in CLAUDE.md**

Find the line:

```
- Every story must include `argTypes` with `description`, `table.category`, and `control` for each meaningful prop
```

Replace with:

```
- Every exported props interface and component must have JSDoc comments (see `FocalImage.tsx` as the reference standard)
- Every story must include `argTypes` with `table.category` and `control` for each meaningful prop (descriptions come from JSDoc on the component, not argTypes)
```

Find the line:

```
- Categories: `Appearance` (variants, className), `Layout` (layout, size, positioning), `Content` (text, data, labels), `Behavior` (interactive flags, event handlers)
```

Keep it unchanged.

- [ ] **Step 2: Run tests one final time**

Run: `cd apps/web && npx vitest run --project=unit`
Expected: All tests pass.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect JSDoc as source of truth for prop descriptions"
```
