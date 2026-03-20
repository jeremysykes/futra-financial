# Futra Spend Landing Page Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Figma Make Futra Spend landing page into the existing project, elevating it to production-grade visual quality with proper theme tokens, light/dark mode, animations, and component architecture matching existing CVA+Radix patterns.

**Architecture:** Replace the Vite starter template with the Futra Spend landing page. Extend the existing `data-business-unit` theme system from generic `unit-a/b/c` to named Futra business units (`spend`, `save`, `credit`, `plan`, `together`) with full color tokens. Port Figma Make components, replacing hardcoded hex values with theme tokens and adding CVA variants, proper font loading, and subtle animations.

**Tech Stack:** React 19, Vite 7, TypeScript, Tailwind CSS v4, Radix UI, CVA, Storybook 10, Inter + JetBrains Mono fonts

---

## File Structure

### New files
- `src/components/spend/Logo.tsx` — FUTRA | spend wordmark
- `src/components/spend/Navbar.tsx` — Sticky nav with scroll detection + mobile menu
- `src/components/spend/HeroSection.tsx` — Hero with headline + PhoneMockup
- `src/components/spend/PhoneMockup.tsx` — Realistic phone frame with transaction feed
- `src/components/spend/StatsRow.tsx` — 4 stat cards in a row
- `src/components/spend/FeatureSection.tsx` — Overline + 4 feature cards
- `src/components/spend/TestimonialSection.tsx` — 3 testimonial cards
- `src/components/spend/CTASection.tsx` — Full-width CTA banner
- `src/components/spend/Footer.tsx` — Footer with link columns
- `src/components/spend/SpendPage.tsx` — Full page composition
- `src/stories/spend/SpendPage.stories.tsx` — Full page story

### Modified files
- `src/tailwind.css` — Replace `unit-a/b/c` with named Futra BUs, add extended tokens
- `src/index.css` — Replace Vite starter styles with font loading + base reset
- `src/App.tsx` — Replace starter template with SpendPage
- `src/main.tsx` — Import tailwind.css instead of just index.css
- `.storybook/preview.tsx` — Update business unit names in toolbar

---

## Task 1: Font Loading + Base Styles

**Files:**
- Modify: `src/index.css`
- Modify: `src/main.tsx`

- [ ] **Step 1: Replace index.css with font imports and base reset**

Replace the entire Vite starter CSS with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

:root {
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  min-height: 100svh;
}
```

- [ ] **Step 2: Update main.tsx to import tailwind.css**

Ensure `main.tsx` imports both CSS files:
```tsx
import './index.css';
import './tailwind.css';
```

- [ ] **Step 3: Verify fonts load**

Run: `npm run dev` — check that Inter loads in devtools.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/main.tsx
git commit -m "feat: replace vite starter styles with Inter + JetBrains Mono font loading"
```

---

## Task 2: Extend Theme System with Futra Business Units

**Files:**
- Modify: `src/tailwind.css`

- [ ] **Step 1: Replace the entire tailwind.css with the Futra theme system**

Replace `unit-a/b/c` with named Futra BUs. Add extended tokens (`--color-surface`, `--color-accent`, `--color-positive`, `--color-negative`, `--color-caution`) that all five BUs need. Preserve the existing `@theme` block structure.

```css
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

/* ─── Default / White-label theme (light) ─── */
@theme {
  --color-background: oklch(1 0 0);
  --color-foreground: oklch(0.15 0 0);
  --color-surface: oklch(1 0 0);

  --color-primary: oklch(0.45 0 0);
  --color-primary-hover: oklch(0.35 0 0);
  --color-primary-foreground: oklch(1 0 0);

  --color-secondary: oklch(0.96 0 0);
  --color-secondary-hover: oklch(0.91 0 0);
  --color-secondary-foreground: oklch(0.2 0 0);

  --color-muted: oklch(0.95 0 0);
  --color-muted-foreground: oklch(0.55 0 0);

  --color-border: oklch(0.88 0 0);
  --color-ring: oklch(0.45 0 0);

  --color-accent: oklch(0.5 0.2 265);
  --color-positive: oklch(0.6 0.15 170);
  --color-negative: oklch(0.65 0.16 25);
  --color-caution: oklch(0.75 0.15 75);

  --color-destructive: oklch(0.55 0.22 25);
  --color-destructive-foreground: oklch(1 0 0);
}

@layer base {
  /* ─── Default / White-label (dark) ─── */
  .dark {
    --color-background: oklch(0.13 0 0);
    --color-foreground: oklch(0.95 0 0);
    --color-surface: oklch(0.18 0 0);

    --color-primary: oklch(0.85 0 0);
    --color-primary-hover: oklch(0.92 0 0);
    --color-primary-foreground: oklch(0.13 0 0);

    --color-secondary: oklch(0.22 0 0);
    --color-secondary-hover: oklch(0.28 0 0);
    --color-secondary-foreground: oklch(0.9 0 0);

    --color-muted: oklch(0.22 0 0);
    --color-muted-foreground: oklch(0.6 0 0);

    --color-border: oklch(0.3 0 0);
    --color-ring: oklch(0.85 0 0);

    --color-accent: oklch(0.65 0.18 265);
    --color-positive: oklch(0.7 0.13 170);
    --color-negative: oklch(0.7 0.14 25);
    --color-caution: oklch(0.8 0.13 75);

    --color-destructive: oklch(0.6 0.22 25);
    --color-destructive-foreground: oklch(1 0 0);
  }

  /* ─── Futra Spend — Indigo/Dark ─── */

  [data-business-unit='spend'] {
    --color-background: #F5F5F8;
    --color-foreground: #1A1A1F;
    --color-surface: #FFFFFF;

    --color-primary: #6C6FE4;
    --color-primary-hover: #5B5ED0;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #F0F0F5;
    --color-secondary-hover: #E5E5EE;
    --color-secondary-foreground: #1A1A1F;

    --color-muted: #F0F0F5;
    --color-muted-foreground: #8B8B9A;

    --color-border: rgba(0, 0, 0, 0.08);
    --color-ring: #6C6FE4;

    --color-accent: #6C6FE4;
    --color-positive: #2ABFA3;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  [data-business-unit='spend'].dark,
  .dark [data-business-unit='spend'] {
    --color-background: #0F0F12;
    --color-foreground: #FFFFFF;
    --color-surface: #1A1A1F;

    --color-primary: #6C6FE4;
    --color-primary-hover: #5B5ED0;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #1A1A1F;
    --color-secondary-hover: #252530;
    --color-secondary-foreground: #FFFFFF;

    --color-muted: #1A1A1F;
    --color-muted-foreground: #8B8B9A;

    --color-border: rgba(255, 255, 255, 0.08);
    --color-ring: #6C6FE4;

    --color-accent: #6C6FE4;
    --color-positive: #2ABFA3;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  /* ─── Futra Save — Grove Green ─── */

  [data-business-unit='save'] {
    --color-background: #F7F5F0;
    --color-foreground: #1C1C1A;
    --color-surface: #FFFFFF;

    --color-primary: #6C6FE4;
    --color-primary-hover: #5B5ED0;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #E8F0EB;
    --color-secondary-hover: #D8E8DD;
    --color-secondary-foreground: #1C1C1A;

    --color-muted: #E8F0EB;
    --color-muted-foreground: #7A7A72;

    --color-border: rgba(74, 124, 89, 0.15);
    --color-ring: #4A7C59;

    --color-accent: #4A7C59;
    --color-positive: #4A7C59;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  [data-business-unit='save'].dark,
  .dark [data-business-unit='save'] {
    --color-background: #1C1C1A;
    --color-foreground: #F7F5F0;
    --color-surface: #2A2A26;

    --color-primary: #6C6FE4;
    --color-primary-hover: #5B5ED0;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #2A3A2E;
    --color-secondary-hover: #354538;
    --color-secondary-foreground: #F7F5F0;

    --color-muted: #2A3A2E;
    --color-muted-foreground: #9A9A90;

    --color-border: rgba(74, 124, 89, 0.2);
    --color-ring: #5A8C69;

    --color-accent: #5A8C69;
    --color-positive: #5A8C69;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  /* ─── Futra Credit — Lavender/Indigo ─── */

  [data-business-unit='credit'] {
    --color-background: #F9F7FF;
    --color-foreground: #1A1830;
    --color-surface: #EEEAFF;

    --color-primary: #6C6FE4;
    --color-primary-hover: #5B5ED0;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #EEEAFF;
    --color-secondary-hover: #E0DAFF;
    --color-secondary-foreground: #1A1830;

    --color-muted: #D4D2EE;
    --color-muted-foreground: #6B6880;

    --color-border: rgba(108, 111, 228, 0.15);
    --color-ring: #6C6FE4;

    --color-accent: #9896C8;
    --color-positive: #6C6FE4;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  [data-business-unit='credit'].dark,
  .dark [data-business-unit='credit'] {
    --color-background: #1A1830;
    --color-foreground: #F9F7FF;
    --color-surface: #252340;

    --color-primary: #6C6FE4;
    --color-primary-hover: #7B7EEE;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #3A3860;
    --color-secondary-hover: #454370;
    --color-secondary-foreground: #F9F7FF;

    --color-muted: #3A3860;
    --color-muted-foreground: #9896C8;

    --color-border: rgba(108, 111, 228, 0.2);
    --color-ring: #6C6FE4;

    --color-accent: #7B79B0;
    --color-positive: #6C6FE4;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  /* ─── Futra Plan — Deep Blue/Dark ─── */

  [data-business-unit='plan'] {
    --color-background: #F0F4F8;
    --color-foreground: #0C1017;
    --color-surface: #FFFFFF;

    --color-primary: #6C6FE4;
    --color-primary-hover: #5B5ED0;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #E8EDF2;
    --color-secondary-hover: #D8DFE8;
    --color-secondary-foreground: #0C1017;

    --color-muted: #E8EDF2;
    --color-muted-foreground: #64748B;

    --color-border: rgba(12, 16, 23, 0.1);
    --color-ring: #6C6FE4;

    --color-accent: #6C6FE4;
    --color-positive: #1FA88E;
    --color-negative: #E4746C;
    --color-caution: #D4962E;
  }

  [data-business-unit='plan'].dark,
  .dark [data-business-unit='plan'] {
    --color-background: #0C1017;
    --color-foreground: #E2E8F0;
    --color-surface: #151E2B;

    --color-primary: #6C6FE4;
    --color-primary-hover: #7B7EEE;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #1F2D3D;
    --color-secondary-hover: #2A3A4D;
    --color-secondary-foreground: #E2E8F0;

    --color-muted: #1F2D3D;
    --color-muted-foreground: #A0AEC0;

    --color-border: rgba(255, 255, 255, 0.08);
    --color-ring: #6C6FE4;

    --color-accent: #6C6FE4;
    --color-positive: #2ABFA3;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  /* ─── Futra Together — Warm Terracotta ─── */

  [data-business-unit='together'] {
    --color-background: #FFF9F5;
    --color-foreground: #1C1A18;
    --color-surface: #FFFFFF;

    --color-primary: #6C6FE4;
    --color-primary-hover: #5B5ED0;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #F2E4DA;
    --color-secondary-hover: #E8D6CA;
    --color-secondary-foreground: #1C1A18;

    --color-muted: #F2E4DA;
    --color-muted-foreground: #9E8E84;

    --color-border: rgba(196, 98, 45, 0.15);
    --color-ring: #C4622D;

    --color-accent: #C4622D;
    --color-positive: #4A7C59;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }

  [data-business-unit='together'].dark,
  .dark [data-business-unit='together'] {
    --color-background: #1C1A18;
    --color-foreground: #FFF9F5;
    --color-surface: #2A2622;

    --color-primary: #6C6FE4;
    --color-primary-hover: #7B7EEE;
    --color-primary-foreground: #FFFFFF;

    --color-secondary: #3A322C;
    --color-secondary-hover: #453C35;
    --color-secondary-foreground: #FFF9F5;

    --color-muted: #3A322C;
    --color-muted-foreground: #9E8E84;

    --color-border: rgba(196, 98, 45, 0.2);
    --color-ring: #D4724A;

    --color-accent: #D4724A;
    --color-positive: #5A8C69;
    --color-negative: #E4746C;
    --color-caution: #E8A838;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/tailwind.css
git commit -m "feat: replace generic unit-a/b/c themes with named Futra business units"
```

---

## Task 3: Update Storybook Preview

**Files:**
- Modify: `.storybook/preview.tsx`

- [ ] **Step 1: Update business unit toolbar items to Futra names**

Replace `unit-a/b/c` with the five Futra BUs. Update the decorator to apply both the `data-business-unit` attribute and proper background color class.

```tsx
import type { Preview } from '@storybook/react-vite';
// @ts-expect-error css side-effect import
import '../src/tailwind.css';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Light or dark mode',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
      },
      dynamicTitle: true,
    },
    businessUnit: {
      description: 'Business Unit',
      toolbar: {
        title: 'Business Unit',
        icon: 'component',
        items: [
          { value: 'none', title: 'White Label' },
          { value: 'spend', title: 'Futra Spend' },
          { value: 'save', title: 'Futra Save' },
          { value: 'credit', title: 'Futra Credit' },
          { value: 'plan', title: 'Futra Plan' },
          { value: 'together', title: 'Futra Together' },
        ],
      },
      dynamicTitle: true,
    },
  },
  initialGlobals: {
    theme: 'dark',
    businessUnit: 'spend',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      const businessUnit = context.globals.businessUnit;
      return (
        <div
          className={`${theme === 'dark' ? 'dark' : ''} bg-background text-foreground min-h-screen`}
          {...(businessUnit !== 'none' && {
            'data-business-unit': businessUnit,
          })}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
```

- [ ] **Step 2: Commit**

```bash
git add .storybook/preview.tsx
git commit -m "feat: update storybook toolbar with five Futra business units"
```

---

## Task 4: Create Spend Landing Page Components

**Files:**
- Create: `src/components/spend/Logo.tsx`
- Create: `src/components/spend/Navbar.tsx`
- Create: `src/components/spend/PhoneMockup.tsx`
- Create: `src/components/spend/HeroSection.tsx`
- Create: `src/components/spend/StatsRow.tsx`
- Create: `src/components/spend/FeatureSection.tsx`
- Create: `src/components/spend/TestimonialSection.tsx`
- Create: `src/components/spend/CTASection.tsx`
- Create: `src/components/spend/Footer.tsx`
- Create: `src/components/spend/SpendPage.tsx`

Port each Figma Make component, elevating with:
- Theme token usage (`bg-background`, `text-foreground`, `bg-surface`, `text-muted-foreground`, `bg-primary`, `text-primary-foreground`) instead of hardcoded hex
- CSS `font-family` via `var(--font-sans)` and `var(--font-mono)` instead of inline styles
- Subtle animations (fade-in on scroll, hover transforms on cards)
- Enhanced phone mockup with indigo glow shadow
- Proper responsive breakpoints (mobile-first)
- Light mode support through theme tokens

Each component should use theme tokens exclusively so they automatically adapt when the business unit or theme changes in Storybook.

- [ ] **Step 1: Create all component files**

Create `src/components/spend/` directory with all 10 files. See source code from Figma Make resources — adapt every hardcoded color to theme tokens.

Key transformations per component:
- `bg-[#0F0F12]` → `bg-background`
- `bg-[#1A1A1F]` → `bg-surface`
- `text-white` → `text-foreground`
- `text-[#8B8B9A]` → `text-muted-foreground`
- `bg-[#6C6FE4]` → `bg-primary`
- `text-[#6C6FE4]` → `text-accent`
- `text-[#2ABFA3]` → `text-positive`
- `text-[#E4746C]` → `text-negative`
- `border-white/[0.08]` → `border-border`
- `style={{ fontFamily: "Inter, sans-serif" }}` → `style={{ fontFamily: 'var(--font-sans)' }}`
- `style={{ fontFamily: "JetBrains Mono, monospace" }}` → `style={{ fontFamily: 'var(--font-mono)' }}`

Animation additions:
- Navbar: `transition-all duration-300` on scroll state change
- Hero: fade-in + slight upward translate on mount
- Feature cards: hover scale + shadow transition
- Phone mockup: indigo glow shadow (`shadow-[0_0_60px_rgba(108,111,228,0.15)]`)
- Stats: counter-style entrance animation
- CTA: gradient that shifts subtly on hover

- [ ] **Step 2: Verify all components render**

Run: `npm run dev` — should show the Spend landing page.

- [ ] **Step 3: Commit**

```bash
git add src/components/spend/
git commit -m "feat: add Futra Spend landing page components with theme tokens"
```

---

## Task 5: Wire Up App.tsx + Storybook Story

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css` — delete or empty
- Create: `src/stories/spend/SpendPage.stories.tsx`

- [ ] **Step 1: Replace App.tsx with SpendPage**

```tsx
import { SpendPage } from './components/spend/SpendPage';

function App() {
  return (
    <div className="dark" data-business-unit="spend">
      <SpendPage />
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Clear App.css**

Delete or empty `src/App.css` — it's Vite starter styles we no longer need.

- [ ] **Step 3: Create Storybook story for SpendPage**

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpendPage } from '../../components/spend/SpendPage';

const meta = {
  title: 'Pages/Futra Spend',
  component: SpendPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SpendPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

- [ ] **Step 4: Verify in Storybook**

Run: `npm run storybook` — navigate to "Pages/Futra Spend", toggle between themes and BUs in toolbar.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.css src/stories/spend/
git commit -m "feat: wire SpendPage as main app + add storybook story"
```

---

## Task 6: Visual QA + Polish Pass

- [ ] **Step 1: Run dev server and verify dark mode**

Check: backgrounds, text colors, card borders, button states, phone mockup, responsive at 375/768/1024/1440px.

- [ ] **Step 2: Run dev server and verify light mode**

Change App.tsx wrapper to remove `dark` class. Verify all tokens resolve to light mode values.

- [ ] **Step 3: Verify Storybook theme switching**

Toggle between all 5 BUs in Storybook toolbar. The SpendPage should adapt its colors per BU (since it uses theme tokens). Verify light/dark toggle works across all BUs.

- [ ] **Step 4: Fix any visual issues found**

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: visual QA polish for Futra Spend landing page"
```
