# ARIA Accessibility Audit — Comprehensive Design Spec

## Overview

Bring the Futra Financial design system to professional-grade ARIA compliance. Three layers: Radix UI primitives for interactive patterns, manual ARIA for custom components, and page-level infrastructure for landmarks and focus management.

**Principle:** Use Radix when a primitive exists for the pattern, manual ARIA when it doesn't, and never roll your own keyboard handling for solved problems. Check Radix component documentation at https://www.radix-ui.com/primitives/docs/components at each step before deciding whether to use a Radix primitive or manual ARIA.

**Verification:** After every Radix migration, use Playwright to take before/after screenshots confirming the component retains the same look and feel.

## Current State

### What works

- Good semantic HTML foundation (section, nav, footer, heading hierarchy)
- Storybook a11y addon installed (`@storybook/addon-a11y`)
- Radix `@radix-ui/react-slot` already in use (Button)
- Decorative images correctly use `alt=""`
- Native `<button>` and `<a>` elements used where appropriate

### Critical gaps

- AccordionItem: no `aria-expanded`, `aria-controls`, or disclosure pattern
- Card (interactive variant): div with cursor:pointer, no keyboard access or role
- ScoreDisplay SVG: no accessible label for credit score
- No `<main>` landmark on any page
- No visible focus indicators for keyboard navigation
- Navbar mobile menu: missing `aria-expanded`, no focus trap, no Escape key
- SplitDisplay/BudgetBar: progress visualizations without progressbar roles
- ProcessSteps: not using ordered list semantics

### Radix UI opportunity

Radix is already a dependency but only used for Slot. The Accordion, NavigationMenu, and VisuallyHidden primitives are directly applicable. Each component decision must be validated against the current Radix documentation before implementation.

## Implementation Phases

### Phase A — Foundation + Radix Accordion

**Checkpoint: Review with user after completion.**

#### A1. Global focus indicators

Add `:focus-visible` ring styles to `tailwind.css`:

```css
:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

Use `--color-ring` (not `--color-primary`) since ring tokens already exist per BU in `tailwind.css` and are semantically designed for focus indication.

This applies globally to all focusable elements. Components should not suppress outlines unless providing a custom focus indicator.

#### A2. Skip-to-main link

Add a visually-hidden skip link to AppShell that becomes visible on focus:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:rounded-lg focus:text-foreground focus:font-sans focus:font-medium focus:shadow-lg"
>
  Skip to main content
</a>
```

The skip link uses design tokens for background, text, and shadow so it looks correct in all BU themes.

#### A3. `<main>` landmark

Add `<main id="main-content">` to all page components, wrapping content between Navbar and Footer. The `id` connects to the skip link.

#### A4. Migrate Accordion to Radix

**Before implementing:** Read the current `@radix-ui/react-accordion` documentation to verify the API, prop names, and data attributes for styling.

Replace custom AccordionItem/Accordion with `@radix-ui/react-accordion`. Keep CVA styling by targeting Radix's data attributes:

- `[data-state="open"]` / `[data-state="closed"]` for open/close styling
- Radix provides `aria-expanded`, `aria-controls`, `id` management, and full keyboard navigation (Enter/Space to toggle, optional arrow keys)

The AccordionItem atom and Accordion molecule will be rewritten to wrap Radix primitives with our CVA styling. The FAQSection template continues to compose them — its API doesn't change.

**Note:** AccordionItem is only consumed by the Accordion molecule (no external consumers). The current `isOpen`/`onToggle` props become Radix-managed internals. The current grid-based open/close animation will be reimplemented using Radix's `[data-state="open"]` / `[data-state="closed"]` CSS selectors.

### Phase B — Component-Level Fixes

**Checkpoint: Review with user after completion.**

For each component: check Radix documentation first to see if a primitive exists before adding manual ARIA.

#### B1. ScoreDisplay

Add `role="img"` and `aria-label` to the SVG element:

```tsx
<svg role="img" aria-label={`Credit score: ${score}, ${label}`} ...>
```

Check if `@radix-ui/react-visually-hidden` is useful here for providing alternative text.

#### B2. Card (interactive variant)

The `interactive` variant is a _visual_ variant (hover effect). ARIA treatment depends on whether a click handler is attached:

- Card with `interactive={true}` AND `onClick`: add `role="button"`, `tabIndex={0}`, `onKeyDown` for Enter/Space — conditionally, only when `onClick` is present
- Card with `interactive={true}` but no `onClick`: no role or tabIndex needed — it's a decorative hover effect

Currently no BU page passes `onClick` to interactive Cards. Document this distinction in DESIGN.md.

Check Radix docs for any relevant primitive.

#### B3. Navbar mobile menu

- Add `aria-expanded={mobileOpen}` to the toggle button
- Add `aria-label="Main navigation"` to the `<nav>` element
- Add Escape key handler to close mobile menu, return focus to toggle button
- **Focus trap required:** When mobile menu is open, focus must be trapped within the menu. If Radix Dialog is used, this is automatic.
- Check if `@radix-ui/react-navigation-menu` or `@radix-ui/react-dialog` is appropriate for the mobile menu pattern
- Note: mobile menu is conditionally rendered (removed from DOM when closed). If using `aria-controls`, only add it when menu is open, or skip it (not strictly required).

#### B4. ProcessSteps

- Change wrapper from `<div>` to `<ol>` with `aria-label="Steps"`
- Each step becomes an `<li>`
- Update TypeScript: component currently extends `HTMLAttributes<HTMLDivElement>` — change to `HTMLOListElement`
- Check if any Radix primitive applies (unlikely for static ordered content)

#### B5. SplitDisplay

SplitDisplay shows a _proportion breakdown_ (e.g., "You: 60%, Partner: 40%"), not progress toward completion. Use `role="img"` with a descriptive `aria-label` on the split bar container rather than `role="progressbar"`:

```tsx
<div role="img" aria-label={`Split: ${splits.map(s => `${s.name} ${s.amount}`).join(', ')}`}>
```

Check Radix docs for `@radix-ui/react-progress` — it may still be useful if the component evolves.

#### B6. DashboardPreview budget bars

Budget bars show budget spent vs. budget total — this IS legitimate progress. Use `role="progressbar"` with `aria-valuenow`, `aria-valuemin={0}`, `aria-valuemax={budget}`, `aria-label`.

Also: budget status colors (on-budget/over/under) are currently color-only indication. Add text status alongside the color so screen readers and colorblind users get the information.

Check Radix docs for `@radix-ui/react-progress`.

#### B7. DashboardPreview/FeatureDeepDive Recharts charts

Recharts SVG charts have no accessible description. Add `role="img"` and `aria-label` to the chart container divs describing the data trend (e.g., "Net worth trend chart showing growth from $156K to $184K over 12 months").

### Phase C — Testing & Documentation

**Checkpoint: Review with user after completion.**

#### C1. Install eslint-plugin-jsx-a11y

Add to dev dependencies and ESLint config. This catches a11y issues at development time — missing alt attributes, invalid ARIA roles, form labels, etc.

#### C2. Document accessibility conventions in DESIGN.md

Add an Accessibility section written as established standards (not aspirational goals, per CLAUDE.md rules for DESIGN.md):

- Radix-first principle for interactive patterns
- Required ARIA attributes per component type
- Focus indicator standards
- Landmark requirements for pages
- Color contrast guidelines (muted-foreground meets WCAG AA, note AAA limitations)
- Card interactive variant: ARIA role is conditional on onClick presence

#### C3. Verify with Storybook a11y addon

Run axe checks across all stories. The addon is already installed — verify it's active in `.storybook/preview.tsx` and fix any remaining violations it reports.

## Radix Documentation Check Requirement

**Every component decision in Phase B must include:**

1. Search Radix docs for a matching primitive
2. If found: use Radix, style with CVA + data attributes
3. If not found: add manual ARIA attributes
4. Document the decision (Radix or manual) in the implementation

This ensures we're not reinventing patterns that Radix already solves, and demonstrates a systematic approach to accessibility tooling.

## Success Criteria

- All interactive elements are keyboard accessible
- Screen readers can navigate all page content meaningfully
- Focus indicators visible on all interactive elements
- Proper landmark structure on every page
- Accordion uses Radix with full ARIA compliance
- Zero critical violations in Storybook a11y addon
- Accessibility strategy documented in DESIGN.md
