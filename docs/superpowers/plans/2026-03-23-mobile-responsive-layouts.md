# Mobile-First Responsive Layouts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add mobile-first responsive behavior (375px–768px) to all Futra Financial section components, using Spend as the reference BU.

**Architecture:** Bottom-up token layer approach — apply consistent responsive Tailwind class patterns across all shared section components in `src/stories/`. No CSS custom property changes. Dual-render strategy for ComparisonSection (table on desktop, cards on mobile). Playwright MCP verification at 375px and 768px viewports.

**Tech Stack:** React, Tailwind CSS v4, CVA (class-variance-authority), Vite dev server, Playwright MCP for visual verification.

**Spec:** `docs/superpowers/specs/2026-03-23-mobile-responsive-layouts-design.md`

---

### Task 0: Create feature branch and start dev server

**Files:**

- None (git + dev server setup)

- [ ] **Step 1: Create feature branch**

```bash
git checkout -b feat/mobile-responsive-layouts
```

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

Expected: Vite dev server starts on `http://localhost:5173`

- [ ] **Step 3: Open browser via Playwright MCP and take baseline screenshot at 375px**

Use Playwright MCP `browser_navigate` to `http://localhost:5173` (Spend page is default), then `browser_resize` to width 375, height 812. Take a screenshot for baseline comparison.

---

### Task 1: HeroSection responsive updates

**Files:**

- Modify: `src/stories/hero-section/HeroSection.tsx`

- [ ] **Step 1: Update `heroSectionVariants` size variants**

In `src/stories/hero-section/HeroSection.tsx`, change the CVA `size` variants:

```tsx
// line 14-15, change:
default: 'min-h-screen',
tall: 'min-h-[110vh]',
// to:
default: 'min-h-[85vh] sm:min-h-screen',
tall: 'min-h-[95vh] sm:min-h-[110vh]',
```

- [ ] **Step 2: Update `contentVariants` padding and container**

```tsx
// line 26, change:
'relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full',
// to:
'relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6 py-16 sm:py-20 md:py-28 lg:py-32 w-full',
```

- [ ] **Step 3: Update left-right layout flex gap**

```tsx
// line 80, change:
<div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
// to:
<div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-16 lg:gap-20">
```

- [ ] **Step 4: Update phone mockup container width and alignment**

```tsx
// line 96, change:
<div className="flex-1 relative w-full max-w-md lg:max-w-lg">
// to:
<div className="flex-1 relative w-full max-w-[220px] sm:max-w-[280px] lg:max-w-lg mx-auto lg:mx-0">
```

- [ ] **Step 5: Add full-width CTA button on mobile**

The `actions` prop receives a `<Button>` from the consuming page. To make all hero CTA buttons full-width on mobile without modifying every page, wrap the actions slot:

```tsx
// line 93, change:
{
  actions;
}
// to:
<div className="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">{actions}</div>;
```

This uses descendant selectors to force child buttons to `w-full` on mobile and `w-auto` on tablet+.

- [ ] **Step 6: Verify in Playwright at 375px**

Use Playwright MCP to navigate to `http://localhost:5173`, resize to 375x812, take screenshot. Verify:

- Hero doesn't take full viewport height (85vh)
- Phone mockup is small (~220px) and centered
- Gap between text and mockup is tighter
- CTA button spans full width
- Horizontal padding is 20px

- [ ] **Step 7: Commit**

```bash
git add src/stories/hero-section/HeroSection.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to HeroSection"
```

---

### Task 1b: Body text clamp for section paragraphs

**Files:**

- Modify: `src/stories/feature-deep-dive/FeatureDeepDive.tsx`

The spec requires `text-[clamp(15px,2vw,17px)]` for body paragraphs (replacing static `text-base`). This applies to FeatureDeepDive's description paragraphs — the primary `text-base` body text in section templates. Hero subheading (`text-lg`) and CTA description (`text-lg`) are intentionally larger and stay unchanged.

- [ ] **Step 1: Update body text in FeatureBlock**

```tsx
// line 64, change:
<p className="mt-4 font-sans text-base leading-[1.6] text-muted-foreground max-w-[440px]">
// to:
<p className="mt-4 font-sans text-[clamp(15px,2vw,17px)] leading-[1.6] text-muted-foreground max-w-[440px]">
```

- [ ] **Step 2: Commit**

```bash
git add src/stories/feature-deep-dive/FeatureDeepDive.tsx
git commit -m "feat(responsive): add body text clamp to FeatureDeepDive paragraphs"
```

---

### Task 2: FeatureSection responsive updates

**Files:**

- Modify: `src/stories/feature-section/FeatureSection.tsx`

- [ ] **Step 1: Update `featureSectionVariants` padding variants**

```tsx
// lines 14-15, change:
default: 'py-24 md:py-32',
compact: 'py-16 md:py-20',
// to:
default: 'py-16 sm:py-20 md:py-28 lg:py-32',
compact: 'py-12 sm:py-16 md:py-20',
```

- [ ] **Step 2: Update container padding**

```tsx
// line 48, change:
<div className="max-w-[1200px] mx-auto px-6">
// to:
<div className="max-w-[1200px] mx-auto px-5 sm:px-6">
```

- [ ] **Step 3: Update heading margin-bottom**

```tsx
// line 54, change:
<h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
// to:
<h2 className="text-center mb-10 md:mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
```

- [ ] **Step 4: Commit**

```bash
git add src/stories/feature-section/FeatureSection.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to FeatureSection"
```

---

### Task 3: FeatureDeepDive responsive updates

**Files:**

- Modify: `src/stories/feature-deep-dive/FeatureDeepDive.tsx`

- [ ] **Step 1: Update inner grid gap in `featureBlockVariants`**

```tsx
// line 25, change:
'grid md:grid-cols-2 gap-10 md:gap-16 items-center',
// to:
'grid md:grid-cols-2 gap-8 md:gap-16 items-center',
```

- [ ] **Step 2: Update `featureDeepDiveVariants` padding variants**

```tsx
// lines 87-88, change:
default: 'py-20 md:py-32',
compact: 'py-16 md:py-24',
// to:
default: 'py-16 sm:py-20 md:py-28 lg:py-32',
compact: 'py-12 sm:py-16 md:py-24',
```

- [ ] **Step 3: Update outer container padding and gap**

```tsx
// line 120, change:
<div className="relative z-10 max-w-[1280px] mx-auto px-6 flex flex-col gap-24 md:gap-32">
// to:
<div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6 flex flex-col gap-16 sm:gap-24 md:gap-32">
```

- [ ] **Step 4: Add image max-width constraint on mobile**

For each `FeatureBlock`'s chart wrapper div (the one with `className="rounded-xl p-4 md:p-6 min-w-0"`), add mobile max-width to the inner chart container. In `FeatureBlock` component:

```tsx
// line 68-71, change:
<div
  style={{ direction: 'ltr' }}
  className="rounded-xl p-4 md:p-6 min-w-0"
>
// to:
<div
  style={{ direction: 'ltr' }}
  className="rounded-xl p-4 md:p-6 min-w-0 max-w-[320px] mx-auto md:max-w-none"
>
```

- [ ] **Step 5: Commit**

```bash
git add src/stories/feature-deep-dive/FeatureDeepDive.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to FeatureDeepDive"
```

---

### Task 4: StatsRow responsive updates

**Files:**

- Modify: `src/stories/stats-row/StatsRow.tsx`

- [ ] **Step 1: Update `statsRowVariants` section padding**

```tsx
// line 6, change:
'py-20 md:py-28',
// to:
'py-16 sm:py-20 md:py-28 lg:py-32',
```

- [ ] **Step 2: Update `statsGridVariants` gap and add centering to 3-col variant**

```tsx
// line 26, change:
'grid gap-8 md:gap-12',
// to:
'grid gap-6 sm:gap-8 md:gap-12',
```

```tsx
// line 30, change:
3: 'grid-cols-1 sm:grid-cols-3',
// to:
3: 'grid-cols-1 sm:grid-cols-3 text-center sm:text-left',
```

- [ ] **Step 3: Update container padding**

```tsx
// line 49, change:
<div className="max-w-[1200px] mx-auto px-6">
// to:
<div className="max-w-[1200px] mx-auto px-5 sm:px-6">
```

- [ ] **Step 4: Commit**

```bash
git add src/stories/stats-row/StatsRow.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to StatsRow"
```

---

### Task 5: TestimonialSection responsive updates

**Files:**

- Modify: `src/stories/testimonial-section/TestimonialSection.tsx`

- [ ] **Step 1: Update `testimonialSectionVariants` section padding**

```tsx
// line 6, change:
'py-24 md:py-32 bg-background',
// to:
'py-16 sm:py-20 md:py-28 lg:py-32 bg-background',
```

- [ ] **Step 2: Update `testimonialGridVariants` — add tablet step and responsive gap**

```tsx
// line 21, change:
'grid grid-cols-1 gap-6',
// to:
'grid grid-cols-1 gap-6 sm:gap-8',
```

```tsx
// line 26 (columns: 3 variant), change:
3: 'md:grid-cols-3',
// to:
3: 'sm:grid-cols-2 md:grid-cols-3',
```

- [ ] **Step 3: Update container padding and heading margin**

```tsx
// line 52, change:
<div className="max-w-[1200px] mx-auto px-6">
// to:
<div className="max-w-[1200px] mx-auto px-5 sm:px-6">
```

```tsx
// line 54, change:
<div className="text-center mb-16">
// to:
<div className="text-center mb-10 md:mb-16">
```

- [ ] **Step 4: Commit**

```bash
git add src/stories/testimonial-section/TestimonialSection.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to TestimonialSection"
```

---

### Task 6: CTASection responsive updates

**Files:**

- Modify: `src/stories/cta-section/CTASection.tsx`

- [ ] **Step 1: Update `ctaSectionVariants` section padding**

```tsx
// line 6, change:
'relative overflow-hidden py-24 md:py-32',
// to:
'relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-32',
```

- [ ] **Step 2: Update container padding**

```tsx
// line 63-64, change:
'relative z-10 mx-auto px-6',
// to:
'relative z-10 mx-auto px-5 sm:px-6',
```

- [ ] **Step 3: Update heading margin-bottom**

The `mb-4` here is the gap between heading and the optional description paragraph — NOT the heading-to-content gap that the Layer 1 standard addresses. Since a description element sits between heading and button, `mb-6 md:mb-8` is the correct scale (not the full `mb-10 md:mb-16`).

```tsx
// line 67, change:
'mb-4 font-sans font-bold tracking-[-0.01em] text-[clamp(28px,4vw,40px)]',
// to:
'mb-6 md:mb-8 font-sans font-bold tracking-[-0.01em] text-[clamp(28px,4vw,40px)]',
```

- [ ] **Step 4: Add full-width CTA button on mobile**

CTASection renders children (the CTA button) directly. Wrap with the same responsive width pattern as HeroSection:

```tsx
// line 80, change:
{
  children;
}
// to:
<div className="w-full sm:w-auto [&>*]:w-full sm:[&>*]:w-auto">{children}</div>;
```

- [ ] **Step 5: Commit**

```bash
git add src/stories/cta-section/CTASection.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to CTASection"
```

- [ ] **Step 6: Mid-point visual verification**

Use Playwright MCP to navigate to `http://localhost:5173`, resize to 375x812, take screenshot. Verify Tasks 1–6 collectively:

- Hero: reduced height, centered small mockup, full-width CTA, tighter padding
- FeatureSection: tighter padding and heading margin
- StatsRow: tighter gaps
- TestimonialSection: single column with tighter margins
- CTASection: tighter padding, full-width button
- All sections: 20px horizontal padding

---

### Task 7: HowItWorks responsive updates

**Files:**

- Modify: `src/stories/how-it-works/HowItWorks.tsx`

- [ ] **Step 1: Update `howItWorksVariants` padding variants**

```tsx
// lines 14-15, change:
default: 'py-24 md:py-32',
compact: 'py-20',
// to:
default: 'py-16 sm:py-20 md:py-28 lg:py-32',
compact: 'py-12 sm:py-16 md:py-20',
```

- [ ] **Step 2: Update container padding and heading margin**

```tsx
// line 45, change:
<div className="max-w-[1200px] mx-auto px-6">
// to:
<div className="max-w-[1200px] mx-auto px-5 sm:px-6">
```

```tsx
// line 47, change:
<div className="text-center mb-16">
// to:
<div className="text-center mb-10 md:mb-16">
```

- [ ] **Step 3: Commit**

```bash
git add src/stories/how-it-works/HowItWorks.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to HowItWorks"
```

Note: Step spacing (`gap-8 sm:gap-10 md:gap-12`) is handled by `ProcessSteps` children passed into this component, not by HowItWorks itself. If `ProcessSteps` needs gap updates, that's a separate concern. For this task, only HowItWorks' own padding/container/heading changes are in scope.

---

### Task 8: FAQSection + AccordionItem responsive updates

**Files:**

- Modify: `src/stories/faq-section/FAQSection.tsx`
- Modify: `src/stories/accordion-item/AccordionItem.tsx`

- [ ] **Step 1: Update `faqSectionVariants` padding variants**

```tsx
// lines 11-12, change:
default: 'py-20 md:py-28',
compact: 'py-16 md:py-20',
// to:
default: 'py-16 sm:py-20 md:py-28 lg:py-32',
compact: 'py-12 sm:py-16 md:py-20',
```

- [ ] **Step 2: Update container padding and heading margin**

```tsx
// line 71, change:
<div className="relative z-10 max-w-[700px] mx-auto px-6">
// to:
<div className="relative z-10 max-w-[700px] mx-auto px-5 sm:px-6">
```

```tsx
// line 72, change:
<div className="text-center mb-16">
// to:
<div className="text-center mb-10 md:mb-16">
```

- [ ] **Step 3: Add 44px tap target to AccordionItem trigger**

In `src/stories/accordion-item/AccordionItem.tsx`:

```tsx
// lines 11-12, change:
const triggerVariants = cva(
  'w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent',
);
// to:
const triggerVariants = cva(
  'w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent min-h-[44px]',
);
```

- [ ] **Step 4: Commit**

```bash
git add src/stories/faq-section/FAQSection.tsx src/stories/accordion-item/AccordionItem.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to FAQSection and AccordionItem tap targets"
```

---

### Task 9: ComparisonSection dual-render (table + mobile cards)

**Files:**

- Modify: `src/stories/comparison-section/ComparisonSection.tsx`

This is the most complex change — adding a mobile card layout alongside the existing table.

- [ ] **Step 1: Update section padding and container padding**

```tsx
// line 6, change:
<section id="compare" className="py-24 md:py-32 bg-surface">
// to:
<section id="compare" className="py-16 sm:py-20 md:py-28 lg:py-32 bg-surface">
```

```tsx
// line 7, change:
<div className="max-w-[1200px] mx-auto px-6">
// to:
<div className="max-w-[1200px] mx-auto px-5 sm:px-6">
```

- [ ] **Step 2: Update heading margin**

```tsx
// line 11, change:
<h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
// to:
<h2 className="text-center mb-10 md:mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
```

- [ ] **Step 3: Wrap existing table in `hidden md:block`**

```tsx
// line 15, change:
<div className="overflow-x-auto">
// to:
<div className="hidden md:block overflow-x-auto">
```

- [ ] **Step 4: Add mobile card layout after the table div**

Insert after the closing `</div>` of the table wrapper (after line 64), before the closing `</div>` of the container:

```tsx
{
  /* Mobile card layout */
}
<div className="md:hidden flex flex-col gap-4">
  {PlanCompetitors.map((c, ci) => (
    <div
      key={c.name}
      className={cn(
        'rounded-xl p-4 border',
        ci === 0
          ? 'bg-primary/10 border-primary/30'
          : 'bg-surface border-border',
      )}
    >
      <p
        className={cn(
          'font-sans font-semibold text-sm mb-3',
          ci === 0 ? 'text-primary' : 'text-foreground',
        )}
      >
        {c.name}
      </p>
      <div className="flex flex-col gap-2">
        {PlanFeatures.map((feat, fi) => (
          <div key={feat} className="flex items-center justify-between py-2">
            <span className="text-sm text-foreground font-sans">{feat}</span>
            {c.support[fi] ? (
              <Check
                size={18}
                className={cn(
                  'shrink-0 ml-2',
                  ci === 0 ? 'text-primary' : 'text-positive',
                )}
              />
            ) : (
              <X
                size={18}
                className="shrink-0 ml-2 text-muted-foreground opacity-40"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  ))}
</div>;
```

- [ ] **Step 5: Add `cn` import**

The current ComparisonSection doesn't import `cn`. Add it after the last existing import:

```tsx
// after line 2, add:
import { cn } from '../../lib/utils';
```

- [ ] **Step 6: Verify in Playwright at 375px and 768px**

At 375px: Verify cards render (no table). Futra Plan card has indigo highlight. Features show as checklist rows.
At 768px: Verify table renders (no cards). Existing table layout is preserved.

- [ ] **Step 7: Commit**

```bash
git add src/stories/comparison-section/ComparisonSection.tsx
git commit -m "feat(responsive): add mobile card layout to ComparisonSection with table/card dual render"
```

---

### Task 10: TrustSection responsive updates

**Files:**

- Modify: `src/stories/trust-section/TrustSection.tsx`

- [ ] **Step 1: Update `trustSectionVariants` default padding**

```tsx
// line 14, change:
default: 'py-8',
// to:
default: 'py-6 sm:py-8',
```

- [ ] **Step 2: Update container padding**

```tsx
// line 52, change:
<div className="relative z-10 max-w-[1200px] mx-auto px-6">
// to:
<div className="relative z-10 max-w-[1200px] mx-auto px-5 sm:px-6">
```

- [ ] **Step 3: Commit**

```bash
git add src/stories/trust-section/TrustSection.tsx
git commit -m "feat(responsive): add mobile-first breakpoints to TrustSection"
```

---

### Task 11: Navbar touch target updates

**Files:**

- Modify: `src/stories/navbar/Navbar.tsx`

- [ ] **Step 1: Add min tap target to hamburger button**

```tsx
// line 87-89, change:
<button
  ref={toggleRef}
  className="md:hidden text-foreground cursor-pointer"
// to:
<button
  ref={toggleRef}
  className="md:hidden text-foreground cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
```

- [ ] **Step 2: Add min tap target to mobile menu links**

The mobile menu uses `<NavLink>` components. Add `min-h-[44px]` to the mobile menu link wrapper. In the mobile menu div:

```tsx
// lines 100-108, change:
{
  links.map((link) => (
    <NavLink
      key={link.label}
      href={link.href}
      size="base"
      onClick={() => setMobileOpen(false)}
    >
      {link.label}
    </NavLink>
  ));
}
// to:
{
  links.map((link) => (
    <NavLink
      key={link.label}
      href={link.href}
      size="base"
      className="min-h-[44px] flex items-center"
      onClick={() => setMobileOpen(false)}
    >
      {link.label}
    </NavLink>
  ));
}
```

- [ ] **Step 3: Update container padding**

```tsx
// line 70, change:
<div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
// to:
<div className="max-w-[1200px] mx-auto px-5 sm:px-6 h-full flex items-center justify-between">
```

- [ ] **Step 4: Commit**

```bash
git add src/stories/navbar/Navbar.tsx
git commit -m "feat(responsive): add 44px touch targets to Navbar mobile menu"
```

---

### Task 12: Footer responsive updates

**Files:**

- Modify: `src/stories/footer/Footer.tsx`

- [ ] **Step 1: Update container padding**

```tsx
// line 29, change:
<div className="max-w-[1200px] mx-auto px-6">
// to:
<div className="max-w-[1200px] mx-auto px-5 sm:px-6">
```

Note: The Footer is a composition shell. Its children (passed by each BU page) already handle their own responsive layouts (`flex-col md:flex-row`). The spec's "inner wrapper flex" change is unnecessary because each page already does this in its footer children. Only the container padding update is needed.

- [ ] **Step 2: Commit**

```bash
git add src/stories/footer/Footer.tsx
git commit -m "feat(responsive): update Footer container padding for mobile"
```

---

### Task 13: Full visual verification with Playwright MCP

**Files:**

- None (verification only)

- [ ] **Step 1: Verify Spend page at 375px (iPhone SE)**

Use Playwright MCP to navigate to `http://localhost:5173`, resize to 375x812. Take screenshot and verify:

- Navbar: hamburger visible, 44px tap target
- Hero: 85vh height, phone mockup ~220px centered, full-width CTA button
- StatsRow: single column, centered text
- FeatureSection: tighter padding, reduced heading margin
- TestimonialSection: single column
- CTASection: tighter padding
- Footer: stacked layout with tight padding
- All sections use 20px horizontal padding

- [ ] **Step 2: Verify Spend page at 768px (tablet)**

Resize to 768x1024. Take screenshot and verify:

- Navbar: desktop nav links visible
- Hero: full viewport height, phone mockup larger
- StatsRow: 3-column grid
- TestimonialSection: 2-column grid (sm breakpoint)
- All sections use 24px horizontal padding
- ComparisonSection table visible (if on Plan page)

- [ ] **Step 3: Verify Plan page at 375px for ComparisonSection cards**

Navigate to `http://localhost:5173/#/plan` (or however Plan page routes), resize to 375x812. Verify:

- ComparisonSection shows cards, not table
- Futra Plan card has indigo highlight and renders first
- Each card shows full feature checklist

- [ ] **Step 4: Verify Plan page at 768px for ComparisonSection table**

Resize to 768x1024. Verify:

- ComparisonSection shows table, not cards
- Table layout matches pre-change behavior

- [ ] **Step 5: Verify desktop hasn't regressed at 1280px**

Resize to 1280x900. Verify Spend page:

- Hero: full viewport, side-by-side layout, phone mockup at max-w-lg
- All sections: 128px vertical padding (py-32 at lg)
- 24px horizontal padding
- No visual regressions

- [ ] **Step 6: Spot-check other BU pages at 375px**

Navigate to Save, Credit, Together pages at 375px. Take quick screenshots to verify shared components adapt correctly with each BU's theme.
