# Futra Save Landing Page & Demo Switcher

**Date:** 2026-03-20
**Status:** Draft

---

## Overview

Two additions to the Futra Financial demo site:

1. **Futra Save landing page** — A goal-based savings landing page implemented from the Figma Make design, adapted to use the existing CSS variable theme system and supporting both light and dark modes.
2. **Demo Switcher** — A global top banner bar that lets viewers toggle between business units (Spend, Save) and light/dark themes, with deep-links to Storybook.

---

## Goals

- Integrate the Futra Save landing page from Figma, adhering to brand color guidelines in `docs/futra-financial.md`
- Introduce client-side routing so each business unit has its own URL (`/spend`, `/save`)
- Add a global demo switcher bar that is clearly meta-UI (not part of the product experience)
- Support Storybook deep-linking with pre-configured theme and business unit globals
- Both business units support light and dark modes from day one

---

## Architecture

### Routing

**New dependency:** `react-router` (v7)

**Route structure:**

```
/          → redirects to /spend (default)
/spend     → <SpendPage />
/save      → <SavePage />
```

### Component Tree

```
<BrowserRouter>                               (in main.tsx)
  <AppShell>                                  (new wrapper component)
    <DemoSwitcher />                          (new: top banner bar)
    <div data-business-unit={unit} className={theme}>
      <Routes>
        <Route path="/spend" element={<SpendPage />} />
        <Route path="/save" element={<SavePage />} />
        <Route path="/" element={<Navigate to="/spend" />} />
      </Routes>
    </div>
  </AppShell>
</BrowserRouter>
```

### State Management

- **Business unit** — derived from the current route path (`/spend` → `"spend"`, `/save` → `"save"`)
- **Theme (light/dark)** — React state in `AppShell`, persisted to `localStorage` per business unit
- **`data-business-unit` and `.dark`/`.light`** — set on the wrapper div, driving the existing CSS variable system in `tailwind.css`

---

## Demo Switcher

### Purpose

A demo-only utility for people viewing the site to switch between business units. Clearly meta-UI, not part of the product experience.

### Visual Design

- Thin bar (36px height) pinned above all content
- Indigo (#6C6FE4) background — distinct from any product's navbar
- **Left side:** "FUTRA DEMO" label + business unit pills (Spend, Save). Active unit gets a white semi-transparent pill highlight. Pills are `<Link>` elements.
- **Right side:** Sun/Moon icon toggle for light/dark + Storybook icon link
- Fully responsive — compact on mobile, labels stay readable

### Only Built Units

Only Spend and Save are listed. Additional business units (Credit, Plan, Together) will be added as their landing pages are built.

### Storybook Deep-Link

The Storybook link opens a new tab to the full-page story for the active business unit with the current theme pre-configured:

```
http://localhost:6006/?path=/story/{unit}-{unit}page--default&globals=theme:{currentTheme};businessUnit:{currentUnit}
```

Example: viewing Futra Spend in dark mode → `?path=/story/spend-spendpage--default&globals=theme:dark;businessUnit:spend`

---

## Theme Behavior

### Default Themes

| Business Unit | Default Theme | Reason                                    |
| ------------- | ------------- | ----------------------------------------- |
| Spend         | Dark          | Evening/commute usage, glanceable         |
| Save          | Light         | Planning mindset, warm Linen (#F7F5F0) bg |

### State Flow

1. User lands on `/` → redirected to `/spend` → theme set to `dark`
2. User toggles light/dark via DemoSwitcher → theme updates, stored in `localStorage`
3. User clicks "Save" in DemoSwitcher → navigates to `/save` → theme resets to Save's default (`light`)
4. If user previously visited Save and set a preference, that preference is restored from `localStorage`

### localStorage Keys

- `futra-theme-spend` → `"light"` | `"dark"`
- `futra-theme-save` → `"light"` | `"dark"`

Each business unit remembers its own theme preference independently. First visit uses the default.

---

## Futra Save Landing Page

### Source

Implemented from the Figma Make design at `https://www.figma.com/make/vuqSZjRYbpGvho74uZxG87/Futra-Save`. All component code has been pulled from the Figma source files.

### Adaptation from Figma

The Figma output uses hardcoded hex colors and inline font styles. During implementation:

- **Hardcoded colors → CSS variable tokens** from the existing theme system in `tailwind.css`
- **All sections get dark mode variants** using the `[data-business-unit='save']` tokens already defined
- **Navbar gets `top: 36px` offset** to sit below the DemoSwitcher bar
- **Brand guidelines** from `docs/futra-financial.md` take precedence over Figma output where they conflict

### Page Sections

8 sections, each mapping to a component under `src/components/save/`:

| #   | Section      | Component                | Description                                                                                                                                        |
| --- | ------------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Navbar       | `Navbar.tsx`             | Sticky nav, "FUTRA \| save" logo, links (How It Works, Features, Goals), "Start Saving" CTA. Transparent over hero, white bg on scroll.            |
| 2   | Hero         | `HeroSection.tsx`        | Linen bg, headline "Every dollar has a destination", overline "Goal-based savings", CTA "Create Your First Goal", overlapping ProgressCards visual |
| 3   | How It Works | `HowItWorks.tsx`         | 3 step cards (Name your goal, Automate it, Watch it grow) with connecting dashed line. Icons: Target, Repeat, TrendingUp from Lucide               |
| 4   | Features     | `FeatureSection.tsx`     | 4 feature cards (Visual goal tracking, Smart round-ups, Scheduled transfers, Milestones & streaks). Icons: CircleDot, Coins, CalendarClock, Trophy |
| 5   | Stats Row    | `StatsRow.tsx`           | 4 stats in JetBrains Mono ($42M+, 128K, +34%, 89K)                                                                                                 |
| 6   | Testimonials | `TestimonialSection.tsx` | 3 quote cards (Maya Chen, Jordan Ellis, Priya Kapoor) with avatar initials                                                                         |
| 7   | CTA          | `CTASection.tsx`         | Mist-to-Sage gradient, "Your first goal is waiting", "Start Saving" button                                                                         |
| 8   | Footer       | `Footer.tsx`             | Ink (#1C1C1A) bg, "FUTRA \| save" logo, Product/Company/Legal columns                                                                              |

### Signature Component

**ProgressCard** (`ProgressCard.tsx`) — Displays a savings goal with name, target amount, current amount, and a progress bar (Grove fill on Mist track). Used in the Hero section as a cluster of 3 overlapping cards:

- Trip to Japan: $3,015 of $4,500 (67%)
- Emergency Fund: $4,300 of $10,000 (43%)
- New Laptop: $1,958 of $2,200 (89%)

### Color System (Save)

#### Light Mode (Default)

| Token  | Hex       | Usage                             |
| ------ | --------- | --------------------------------- |
| Linen  | `#F7F5F0` | Page background                   |
| Card   | `#FFFFFF` | Cards, elevated containers        |
| Grove  | `#4A7C59` | Primary accent — progress, growth |
| Sage   | `#A8C5B0` | Secondary accent — softer fills   |
| Mist   | `#E8F0EB` | Highlight backgrounds             |
| Ink    | `#1C1C1A` | Headings, primary text            |
| Muted  | `#7A7A72` | Secondary text                    |
| Indigo | `#6C6FE4` | Action color — buttons, links     |

#### Dark Mode

| Token      | Hex       | Usage                                  |
| ---------- | --------- | -------------------------------------- |
| Background | `#1C1C1A` | Page background                        |
| Surface    | `#2A2A26` | Cards, elevated containers             |
| Grove      | `#5A8C69` | Primary accent (lightened for dark bg) |
| Sage       | `#3D6B4A` | Secondary accent                       |
| Mist       | `#2A3A2E` | Highlight backgrounds                  |
| Primary    | `#F7F5F0` | Headings, primary text                 |
| Muted      | `#9A9A90` | Secondary text                         |
| Indigo     | `#6C6FE4` | Action color                           |

---

## File Structure

### New Files

```
src/
├── components/
│   ├── DemoSwitcher.tsx
│   ├── AppShell.tsx
│   └── save/
│       ├── SavePage.tsx
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── ProgressCard.tsx
│       ├── HowItWorks.tsx
│       ├── FeatureSection.tsx
│       ├── StatsRow.tsx
│       ├── TestimonialSection.tsx
│       ├── CTASection.tsx
│       ├── Footer.tsx
│       └── Logo.tsx
├── stories/
│   └── save/
│       └── SavePage.stories.tsx
```

### Modified Files

| File                              | Change                                                       |
| --------------------------------- | ------------------------------------------------------------ |
| `package.json`                    | Add `react-router` dependency                                |
| `App.tsx`                         | Replace `<SpendPage />` with `<AppShell>` containing router  |
| `main.tsx`                        | Wrap app in `<BrowserRouter>`                                |
| `src/components/spend/Navbar.tsx` | Add `top: 36px` offset for DemoSwitcher                      |
| `tailwind.css`                    | Verify/extend `[data-business-unit='save']` dark mode tokens |

### Unchanged

- All Spend page component content/styling/structure
- Storybook configuration (already has business unit + theme globals)
- Existing Button component library
- `vite.config.ts`, `tsconfig`, ESLint config

---

## Responsive Strategy

Mobile-first, matching the Figma spec:

- **Navbar:** Hamburger menu on mobile, full links on desktop
- **Hero:** Stacked on mobile (text above, cards below), side-by-side on desktop
- **How It Works:** Vertical stack on mobile, horizontal row on desktop
- **Features:** Single column on mobile, 2-col tablet, 4-col desktop
- **Stats:** 2x2 grid on mobile, single row on desktop
- **Testimonials:** Single column on mobile, row on desktop
- **DemoSwitcher:** Compact on mobile, full bar on desktop

---

## Storybook

A new `SavePage.stories.tsx` story will be created to support deep-linking from the DemoSwitcher. It follows the same pattern as the existing `SpendPage.stories.tsx`.

### Story-Level Global Configuration

Each full-page story must set the correct Storybook globals (business unit + theme) so that when a user navigates around Storybook and returns to a page story, the theme context is correct:

- `SpendPage.stories.tsx` — sets `globals: { businessUnit: 'spend', theme: 'dark' }`
- `SavePage.stories.tsx` — sets `globals: { businessUnit: 'save', theme: 'light' }`

This uses Storybook's `play` function or `globals` parameter at the story level so that landing on the story automatically configures the correct business unit selector and light/dark theme in the Storybook toolbar — matching the product's default presentation.

---

## Out of Scope

- Credit, Plan, and Together landing pages (future work)
- Shared/extracted component library across business units
- API integration or form handling
- Animation/transition polish beyond basic hover states
- Storybook hosting (dev-only `localhost:6006` for now)
