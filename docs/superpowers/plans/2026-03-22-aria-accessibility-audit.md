# ARIA Accessibility Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Futra Financial design system to professional-grade ARIA compliance using Radix primitives for interactive patterns, manual ARIA for custom components, and page-level infrastructure for landmarks and focus management.

**Architecture:** Three phases with user checkpoints. Phase A establishes foundation (focus indicators, landmarks, skip link) and migrates Accordion to Radix. Phase B fixes individual components after checking Radix docs for each. Phase C adds testing infrastructure and documentation.

**Tech Stack:** React, Radix UI primitives, CVA, Tailwind v4, eslint-plugin-jsx-a11y, Storybook a11y addon, Playwright

**Spec:** `docs/superpowers/specs/2026-03-22-aria-accessibility-audit-design.md`

**Radix docs:** https://www.radix-ui.com/primitives/docs/components

---

## File Map

### Phase A — Modified Files

| File | Change |
|------|--------|
| `src/tailwind.css` | Add global `:focus-visible` ring style |
| `src/components/AppShell.tsx` | Add skip-to-main link |
| `src/stories/spend/SpendPage.tsx` | Add `<main>` landmark |
| `src/stories/save/SavePage.tsx` | Add `<main>` landmark |
| `src/stories/credit/CreditPage.tsx` | Add `<main>` landmark |
| `src/stories/plan/PlanPage.tsx` | Add `<main>` landmark |
| `src/stories/together/TogetherPage.tsx` | Add `<main>` landmark |
| `src/stories/accordion-item/AccordionItem.tsx` | Rewrite with Radix Accordion.Item |
| `src/stories/accordion-item/AccordionItem.stories.tsx` | Update for new API |
| `src/stories/accordion/Accordion.tsx` | Rewrite with Radix Accordion.Root |
| `src/stories/accordion/Accordion.stories.tsx` | Update for new API |
| `src/stories/faq-section/FAQSection.tsx` | Update Accordion usage if API changed |

### Phase B — Modified Files

| File | Change |
|------|--------|
| `src/stories/score-display/ScoreDisplay.tsx` | Add `role="img"`, `aria-label` to SVG |
| `src/stories/card/Card.tsx` | Conditional `role="button"` + keyboard handler when `onClick` present |
| `src/stories/navbar/Navbar.tsx` | `aria-expanded`, `aria-label`, Escape key, focus trap |
| `src/stories/process-steps/ProcessSteps.tsx` | Change to `<ol>`/`<li>` semantics |
| `src/stories/split-display/SplitDisplay.tsx` | Add `role="img"`, `aria-label` |
| `src/stories/dashboard-preview/DashboardPreview.tsx` | Budget bars: Radix Progress or `role="progressbar"`, status text |
| `src/stories/feature-deep-dive/FeatureDeepDive.tsx` | Chart `aria-label`s |

### Phase C — Modified/Created Files

| File | Change |
|------|--------|
| `eslint.config.js` | Add jsx-a11y plugin |
| `DESIGN.md` | Add Accessibility Standards section |
| `.storybook/preview.tsx` | Verify a11y addon active |

---

## Phase A — Foundation + Radix Accordion

### Task 1: Global Focus Indicators

**Files:**
- Modify: `src/tailwind.css`

- [ ] **Step 1: Add focus-visible style to tailwind.css**

Add at the end of the `@layer base` section (or after the `@theme` block if no `@layer base` exists):

```css
:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Verify in browser**

Run dev server, tab through the Spend page. Verify buttons, links, and nav items show a visible ring on focus. The ring color should match the BU's `--color-ring` token.

- [ ] **Step 3: Commit**

```bash
git add src/tailwind.css
git commit -m "feat(a11y): add global focus-visible indicators using --color-ring token"
```

---

### Task 2: Skip-to-Main Link + Main Landmark

**Files:**
- Modify: `src/components/AppShell.tsx`
- Modify: `src/stories/spend/SpendPage.tsx`
- Modify: `src/stories/save/SavePage.tsx`
- Modify: `src/stories/credit/CreditPage.tsx`
- Modify: `src/stories/plan/PlanPage.tsx`
- Modify: `src/stories/together/TogetherPage.tsx`

- [ ] **Step 1: Add skip link to AppShell**

In `src/components/AppShell.tsx`, add the skip link as the first child inside the outer fragment/div, before the DemoSwitcher:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:rounded-lg focus:text-foreground focus:font-sans focus:font-medium focus:shadow-lg"
>
  Skip to main content
</a>
```

- [ ] **Step 2: Add `<main>` landmark to all 5 page components**

In each page component, change the outermost `<div className="min-h-screen bg-background">` to include a `<main>` wrapping everything between Navbar and Footer. Example for SpendPage:

```tsx
// Before:
<div className="min-h-screen bg-background">
  <Navbar ... />
  <HeroSection ... />
  ...sections...
  <Footer ...>...</Footer>
</div>

// After:
<div className="min-h-screen bg-background">
  <Navbar ... />
  <main id="main-content">
    <HeroSection ... />
    ...sections...
  </main>
  <Footer ...>...</Footer>
</div>
```

Apply this pattern to all 5 pages: SpendPage, SavePage, CreditPage, PlanPage, TogetherPage. Navbar stays outside `<main>` (it's navigation). Footer stays outside `<main>` (it's contentinfo).

- [ ] **Step 3: Verify skip link**

Run dev server, press Tab immediately after page load. The skip link should appear in the top-left corner. Pressing Enter should scroll to the main content area.

- [ ] **Step 4: Commit**

```bash
git add src/components/AppShell.tsx src/stories/spend/SpendPage.tsx src/stories/save/SavePage.tsx src/stories/credit/CreditPage.tsx src/stories/plan/PlanPage.tsx src/stories/together/TogetherPage.tsx
git commit -m "feat(a11y): add skip-to-main link and <main> landmark to all pages"
```

---

### Task 3: Migrate Accordion to Radix

**Files:**
- Modify: `src/stories/accordion-item/AccordionItem.tsx`
- Modify: `src/stories/accordion-item/AccordionItem.stories.tsx`
- Modify: `src/stories/accordion/Accordion.tsx`
- Modify: `src/stories/accordion/Accordion.stories.tsx`
- Modify: `src/stories/faq-section/FAQSection.tsx`

**Before starting:**
1. Fetch Radix Accordion docs at https://www.radix-ui.com/primitives/docs/components/accordion to verify the API
2. Take a Playwright screenshot of the Credit page FAQ section for visual comparison after migration
3. Install the Radix accordion package: `npm install @radix-ui/react-accordion`

**Radix Accordion API (verified):**
- `Accordion.Root` — container, `type="single"|"multiple"`, `collapsible` prop
- `Accordion.Item` — wraps each section, requires `value` string
- `Accordion.Header` — wraps trigger, use `asChild` for heading level
- `Accordion.Trigger` — clickable toggle, auto-manages `aria-expanded`/`aria-controls`
- `Accordion.Content` — collapsible content, provides `--radix-accordion-content-height` CSS variable for animations
- Data attributes: `[data-state="open"|"closed"]`, `[data-orientation]`, `[data-disabled]`

- [ ] **Step 1: Take "before" screenshot of FAQ section**

Note: `radix-ui` v1.4.3 is already installed and re-exports all Radix primitives including Accordion. No additional install needed.

Use Playwright to screenshot the Credit page FAQ section at `http://localhost:5173/credit`.

- [ ] **Step 2: Rewrite AccordionItem to wrap Radix primitives**

Replace `src/stories/accordion-item/AccordionItem.tsx` entirely:

```tsx
import type { ReactNode } from 'react';
import { Accordion } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const accordionItemVariants = cva(
  'border border-border rounded-xl',
);

const triggerVariants = cva(
  'w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer bg-transparent',
);

export interface AccordionItemProps {
  value: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

const AccordionItem = ({
  value,
  trigger,
  children,
  className,
}: AccordionItemProps) => {
  return (
    <Accordion.Item value={value} className={cn(accordionItemVariants(), className)}>
      <Accordion.Header asChild>
        <h3>
          <Accordion.Trigger className={cn(triggerVariants(), 'group')}>
            <span className="font-sans font-semibold text-base pr-4 transition-colors duration-200 text-foreground group-data-[state=open]:text-primary">
              {trigger}
            </span>
            <ChevronDown
              size={18}
              className="text-muted-foreground shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Accordion.Trigger>
        </h3>
      </Accordion.Header>
      <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <div className="px-6 pb-4">
          {children}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};

AccordionItem.displayName = 'AccordionItem';

export { AccordionItem, accordionItemVariants };
```

- [ ] **Step 3: Add accordion animation keyframes to tailwind.css**

```css
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
```

And add to the `@theme` block:

```css
--animate-accordion-down: accordion-down 300ms ease-out;
--animate-accordion-up: accordion-up 200ms ease-out;
```

- [ ] **Step 4: Rewrite Accordion molecule to wrap Radix Root**

Replace `src/stories/accordion/Accordion.tsx` entirely:

```tsx
import type { ReactNode } from 'react';
import { Accordion as RadixAccordion } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const accordionVariants = cva(
  '',
  {
    variants: {
      spacing: {
        default: 'space-y-3',
        compact: 'space-y-2',
      },
    },
    defaultVariants: {
      spacing: 'default',
    },
  },
);

export interface AccordionItemData {
  value: string;
  trigger: ReactNode;
  content: ReactNode;
}

export interface AccordionProps
  extends VariantProps<typeof accordionVariants> {
  items: AccordionItemData[];
  multiple?: boolean;
  className?: string;
}

const Accordion = ({
  items,
  multiple = false,
  spacing,
  className,
}: AccordionProps) => {
  // Radix uses a discriminated union — collapsible only applies to type="single"
  const rootProps = multiple
    ? { type: 'multiple' as const }
    : { type: 'single' as const, collapsible: true as const };

  return (
    <RadixAccordion.Root
      {...rootProps}
      className={cn(accordionVariants({ spacing }), className)}
    >
      {items.map((item) => (
        <AccordionItemWrapper key={item.value} value={item.value} trigger={item.trigger}>
          {item.content}
        </AccordionItemWrapper>
      ))}
    </RadixAccordion.Root>
  );
};

// Import AccordionItem here to avoid circular dependency
import { AccordionItem as AccordionItemWrapper } from '../accordion-item/AccordionItem';

Accordion.displayName = 'Accordion';

export { Accordion, accordionVariants };
```

- [ ] **Step 5: Update FAQSection to pass `value` to each item**

In `src/stories/faq-section/FAQSection.tsx`, update the item mapping to include a `value` field:

```tsx
const accordionItems = items.map((faq, i) => ({
  value: `faq-${i}`,
  trigger: faq.question,
  content: (
    <p className="font-sans text-sm leading-relaxed text-muted-foreground">
      {faq.answer}
    </p>
  ),
}));
```

- [ ] **Step 6: Update AccordionItem stories**

Replace `src/stories/accordion-item/AccordionItem.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from 'radix-ui';
import { AccordionItem } from './AccordionItem';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay({ maxWidth: 700 })],
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: StoryObj<typeof AccordionItem> = {
  render: () => (
    <Accordion.Root type="single" collapsible>
      <AccordionItem value="demo" trigger="Is checking my score really free?">
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          Yes, completely free. We never charge for credit score access.
        </p>
      </AccordionItem>
    </Accordion.Root>
  ),
  globals: { businessUnit: 'credit' },
};

export const Open: StoryObj<typeof AccordionItem> = {
  render: () => (
    <Accordion.Root type="single" defaultValue="demo">
      <AccordionItem value="demo" trigger="Is checking my score really free?">
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          Yes, completely free. We never charge for credit score access.
        </p>
      </AccordionItem>
    </Accordion.Root>
  ),
  globals: { businessUnit: 'credit' },
};
```

- [ ] **Step 7: Update Accordion stories**

Update `src/stories/accordion/Accordion.stories.tsx` to include `value` in items:

```tsx
const faqItems = [
  {
    value: 'free',
    trigger: 'Is checking my score really free?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Yes, completely free. We never charge for credit score access.
      </p>
    ),
  },
  {
    value: 'affect',
    trigger: 'Will this affect my credit score?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        No. We use a soft inquiry to check your score, which has zero impact on your credit.
      </p>
    ),
  },
  {
    value: 'updated',
    trigger: 'How often is my score updated?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Your credit score is updated weekly.
      </p>
    ),
  },
];
```

Keep the existing story structure (Default, Multiple, CompactSpacing) — just update the items array.

- [ ] **Step 8: Build and verify**

```bash
npm run build
```

Expected: Build succeeds with no type errors.

- [ ] **Step 9: Take "after" screenshot and compare**

Use Playwright to screenshot the Credit page FAQ section. Compare with the "before" screenshot to verify visual parity.

- [ ] **Step 10: Verify keyboard behavior**

Navigate to the Credit FAQ section, tab to the first accordion trigger. Verify:
- Enter/Space toggles the accordion item
- Arrow keys move between triggers
- Content is announced by screen reader with proper expanded/collapsed state

- [ ] **Step 11: Commit**

```bash
git add src/stories/accordion-item/ src/stories/accordion/ src/stories/faq-section/FAQSection.tsx src/tailwind.css package.json package-lock.json
git commit -m "feat(a11y): migrate Accordion to Radix UI with full ARIA compliance"
```

---

### **CHECKPOINT A: Review with user before proceeding to Phase B**

---

## Phase B — Component-Level Fixes

### Task 4: ScoreDisplay SVG Accessibility

**Files:**
- Modify: `src/stories/score-display/ScoreDisplay.tsx`

**Radix check:** No Radix primitive for SVG data visualizations. Use manual ARIA.

- [ ] **Step 1: Add role and aria-label to SVG**

In ScoreDisplay, add `role="img"` and `aria-label` to the `<svg>` element:

```tsx
<svg
  role="img"
  aria-label={`Credit score: ${score}, ${label}`}
  width={size}
  height={size}
  viewBox={`0 0 ${size} ${size}`}
>
```

- [ ] **Step 2: Verify build and commit**

```bash
npm run build
git add src/stories/score-display/ScoreDisplay.tsx
git commit -m "feat(a11y): add accessible label to ScoreDisplay SVG"
```

---

### Task 5: Card Interactive Variant Accessibility

**Files:**
- Modify: `src/stories/card/Card.tsx`

**Radix check:** No Radix primitive for generic card containers. Use conditional manual ARIA.

- [ ] **Step 1: Add conditional keyboard support when onClick is present**

Update Card to detect `onClick` and add `role="button"`, `tabIndex`, and Enter/Space handler:

```tsx
const Card = ({
  className,
  accent,
  interactive,
  children,
  onClick,
  ...props
}: CardProps) => {
  const isClickable = interactive && !!onClick;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={cn(cardVariants({ accent, interactive }), className)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
```

- [ ] **Step 2: Verify build and commit**

```bash
npm run build
git add src/stories/card/Card.tsx
git commit -m "feat(a11y): add conditional keyboard support to Card interactive variant"
```

---

### Task 6: Navbar Mobile Menu Accessibility

**Files:**
- Modify: `src/stories/navbar/Navbar.tsx`

**Radix check:** Check `@radix-ui/react-navigation-menu` and `@radix-ui/react-dialog` docs. The mobile menu is a simple toggle overlay — Dialog is most appropriate for focus trapping if needed. For now, add manual ARIA + Escape key as the minimal fix. Consider Radix Dialog in a future pass if focus trapping proves insufficient.

- [ ] **Step 1: Add aria-expanded and aria-label to Navbar**

In `src/stories/navbar/Navbar.tsx`:

Add `aria-label="Main navigation"` to the `<nav>` element.

Add `aria-expanded={mobileOpen}` to the mobile toggle button (it already has `aria-label`).

- [ ] **Step 2: Add Escape key handler**

Add a `useRef` on the toggle button and a `useEffect` for Escape key that returns focus:

```tsx
const toggleRef = useRef<HTMLButtonElement>(null);

useEffect(() => {
  if (!mobileOpen) return;
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMobileOpen(false);
      toggleRef.current?.focus();
    }
  };
  document.addEventListener('keydown', handleEscape);
  return () => document.removeEventListener('keydown', handleEscape);
}, [mobileOpen]);
```

Add `ref={toggleRef}` to the mobile toggle `<button>` element.

- [ ] **Step 3: Verify keyboard behavior**

Open mobile menu (resize browser to mobile width), press Escape. Menu should close.

- [ ] **Step 4: Commit**

```bash
git add src/stories/navbar/Navbar.tsx
git commit -m "feat(a11y): add aria-expanded, aria-label, and Escape key to Navbar"
```

---

### Task 7: ProcessSteps Ordered List Semantics

**Files:**
- Modify: `src/stories/process-steps/ProcessSteps.tsx`

**Radix check:** No Radix primitive for static ordered lists.

- [ ] **Step 1: Change root element to `<ol>` and steps to `<li>`**

Update the ProcessSteps component:
- Change the outer wrapper `<div>` to `<ol>` with `aria-label="Steps"` and `className` including `list-none` (to suppress default list styling)
- Change each step wrapper `<div>` to `<li>`
- Update the TypeScript interface to extend `HTMLAttributes<HTMLOListElement>` instead of `HTMLDivElement`

- [ ] **Step 2: Verify build and visual parity**

```bash
npm run build
```

Check Storybook — ProcessSteps should look identical (list-none suppresses bullets).

- [ ] **Step 3: Commit**

```bash
git add src/stories/process-steps/ProcessSteps.tsx
git commit -m "feat(a11y): change ProcessSteps to ordered list semantics"
```

---

### Task 8: SplitDisplay Accessible Label

**Files:**
- Modify: `src/stories/split-display/SplitDisplay.tsx`

**Radix check:** SplitDisplay shows proportional breakdown, not progress. Radix Progress is for progress bars. Use manual `role="img"` with descriptive label.

- [ ] **Step 1: Add role and aria-label to split bar container**

On the flex container that renders the colored split segments, add:

```tsx
<div
  role="img"
  aria-label={`${label} split: ${splits.map(s => `${s.name} ${s.amount}`).join(', ')}`}
  className="flex rounded-full overflow-hidden h-3 mb-3"
>
```

- [ ] **Step 2: Commit**

```bash
npm run build
git add src/stories/split-display/SplitDisplay.tsx
git commit -m "feat(a11y): add accessible label to SplitDisplay split bar"
```

---

### Task 9: DashboardPreview Budget Bars + Recharts Labels

**Files:**
- Modify: `src/stories/dashboard-preview/DashboardPreview.tsx`
- Modify: `src/stories/feature-deep-dive/FeatureDeepDive.tsx`

**Radix check:** Check `@radix-ui/react-progress` docs. Budget bars show actual vs. budget — legitimate progress. Radix Progress provides `role="progressbar"`, `aria-valuenow`, `aria-valuemax` automatically. Fetch the docs to verify the API before implementing.

- [ ] **Step 1: Add Radix Progress to budget bars (or manual progressbar role)**

For each BudgetBar in DashboardPreview, add progressbar semantics:

```tsx
<div
  role="progressbar"
  aria-valuenow={actual}
  aria-valuemin={0}
  aria-valuemax={budget}
  aria-label={`${name}: $${actual.toLocaleString()} of $${budget.toLocaleString()}, ${status}`}
  className="w-full h-1.5 rounded-full bg-muted"
>
```

Add status text alongside color — add a visually-hidden status label or include status in the existing text:

```tsx
<span
  className="font-mono text-xs font-medium"
  style={{ color: PlanStatusColors[status] }}
>
  ${actual.toLocaleString()} / ${budget.toLocaleString()}
  <span className="sr-only"> ({status})</span>
</span>
```

- [ ] **Step 2: Add aria-labels to Recharts chart containers**

In DashboardPreview, add `role="img"` and `aria-label` to the chart wrapper div:

```tsx
<div role="img" aria-label="Net worth trend chart showing 12-month growth" className="w-full min-w-0" style={{ height: 180 }}>
```

In FeatureDeepDive, add `aria-label` to each FeatureBlock chart wrapper. The labels should describe the data:
- Net worth chart: "Net worth growth from $98K in 2020 to $184K in 2025"
- Budget chart: "Budget vs actuals comparison by category"
- Projection chart: "Cash flow projections with optimistic, projected, and conservative scenarios"
- Retirement chart: "Retirement runway projection reaching $3.2M by 2059"

- [ ] **Step 3: Commit**

```bash
npm run build
git add src/stories/dashboard-preview/DashboardPreview.tsx src/stories/feature-deep-dive/FeatureDeepDive.tsx
git commit -m "feat(a11y): add progressbar roles to budget bars and aria-labels to Recharts charts"
```

---

### **CHECKPOINT B: Review with user before proceeding to Phase C**

---

## Phase C — Testing & Documentation

### Task 10: Install eslint-plugin-jsx-a11y

**Files:**
- Modify: `eslint.config.js`

- [ ] **Step 1: Install the plugin**

```bash
npm install -D eslint-plugin-jsx-a11y
```

- [ ] **Step 2: Add to ESLint config**

In `eslint.config.js`, add the plugin and its recommended rules:

```js
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Add to the configs array:
jsxA11y.flatConfigs.recommended,
```

- [ ] **Step 3: Run ESLint and fix any new violations**

```bash
npx eslint src/ --ext .tsx,.ts
```

Fix any violations that surface. These are real a11y issues caught by static analysis.

- [ ] **Step 4: Commit**

```bash
git add eslint.config.js package.json package-lock.json
git commit -m "feat(a11y): add eslint-plugin-jsx-a11y for static accessibility analysis"
```

---

### Task 11: Document Accessibility Standards in DESIGN.md

**Files:**
- Modify: `DESIGN.md`

- [ ] **Step 1: Add Accessibility Standards section**

Add after the "Component Architecture" section and before "Storybook Presentation":

```markdown
## Accessibility Standards

### Interactive Components

All interactive components use Radix UI primitives for ARIA management, keyboard navigation, and focus handling. Radix provides the behavior; our CVA tokens and Tailwind classes provide the visuals. Before building any new interactive pattern, check the Radix component library at https://www.radix-ui.com/primitives/docs/components for an existing primitive.

| Pattern | Implementation | Provides |
|---------|---------------|----------|
| Accordion/Disclosure | `@radix-ui/react-accordion` | `aria-expanded`, `aria-controls`, keyboard nav |
| Progress bars | `role="progressbar"` with `aria-valuenow/max` | Screen reader progress announcements |
| Data visualizations | `role="img"` with `aria-label` | Accessible description of chart content |
| Interactive cards | Conditional `role="button"` when `onClick` present | Keyboard support only when card is actually clickable |

### Focus Indicators

All focusable elements display a visible ring on `:focus-visible` using the `--color-ring` design token. Components must not suppress focus outlines unless providing a custom focus indicator of equal or greater visibility.

### Page Landmarks

Every page includes:
- `<nav aria-label="Main navigation">` — Navbar
- `<main id="main-content">` — Primary content area
- `<footer>` — Page footer
- Skip-to-main link (visually hidden, visible on focus)

### Color Contrast

Muted foreground colors (`text-muted-foreground`) meet WCAG AA contrast ratio (4.5:1 minimum for normal text). Status indicators (on-budget, over, under) include text labels alongside color to support colorblind users.
```

- [ ] **Step 2: Commit**

```bash
git add DESIGN.md
git commit -m "docs: add Accessibility Standards section to DESIGN.md"
```

---

### Task 12: Verify Storybook A11y Addon

**Files:**
- Modify: `.storybook/preview.tsx` (if needed)

- [ ] **Step 1: Verify addon is registered**

Check `.storybook/main.ts` includes `'@storybook/addon-a11y'` in the addons array. It should already be there.

- [ ] **Step 2: Run Storybook and check the Accessibility tab**

```bash
npm run storybook
```

Navigate through each component's Docs page. Click the "Accessibility" tab in the addon panel. Look for violations.

- [ ] **Step 3: Fix any remaining violations**

If axe reports violations (e.g., color contrast, missing labels), fix them in the affected components.

- [ ] **Step 4: Commit any fixes**

Stage only the specific files that were fixed, then commit:

```bash
git commit -m "fix(a11y): resolve remaining Storybook axe violations"
```

---

### **CHECKPOINT C: Review with user — all phases complete**
