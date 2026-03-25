# Futra Save & Demo Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Futra Save landing page and a global demo switcher bar that lets viewers toggle between business units and themes.

**Architecture:** React Router v7 provides URL-based routing (`/spend`, `/save`). An `AppShell` component wraps routes with theme state and a `DemoSwitcher` top bar. Save page components mirror the Spend pattern under `src/components/save/`. Theme defaults are per-unit (Spend→dark, Save→light), persisted to localStorage independently.

**Tech Stack:** React 19, React Router 7, Vite 7, Tailwind CSS 4, Lucide React, Storybook 10

**Spec:** `docs/superpowers/specs/2026-03-20-futra-save-and-demo-switcher-design.md`

---

### Task 1: Install React Router

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install react-router**

```bash
npm install react-router
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('react-router/package.json').version"
```

Expected: prints a version number (7.x)

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add react-router dependency"
```

---

### Task 2: Create AppShell with routing and theme state

**Files:**

- Create: `src/components/AppShell.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create AppShell component**

Create `src/components/AppShell.tsx`:

```tsx
import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { SpendPage } from './spend/SpendPage';
import { DemoSwitcher } from './DemoSwitcher';

const UNIT_DEFAULTS: Record<string, 'light' | 'dark'> = {
  spend: 'dark',
  save: 'light',
};

function getUnitFromPath(pathname: string): string {
  const segment = pathname.split('/')[1];
  return segment && segment in UNIT_DEFAULTS ? segment : 'spend';
}

function getStoredTheme(unit: string): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem(`futra-theme-${unit}`);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable
  }
  return UNIT_DEFAULTS[unit] ?? 'dark';
}

export function AppShell() {
  const location = useLocation();
  const unit = getUnitFromPath(location.pathname);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    getStoredTheme(unit),
  );

  // When unit changes (route change), load that unit's stored theme or default
  useEffect(() => {
    setTheme(getStoredTheme(unit));
  }, [unit]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(`futra-theme-${unit}`, next);
      } catch {
        // localStorage unavailable
      }
      return next;
    });
  }, [unit]);

  return (
    <>
      <DemoSwitcher unit={unit} theme={theme} onToggleTheme={toggleTheme} />
      <div
        className={`${theme === 'dark' ? 'dark' : ''}`}
        data-business-unit={unit}
      >
        <Routes>
          <Route path="/spend" element={<SpendPage />} />
          <Route path="/" element={<Navigate to="/spend" replace />} />
        </Routes>
      </div>
    </>
  );
}
```

Note: Save route will be added in Task 5 after SavePage is built. DemoSwitcher is a placeholder for now.

- [ ] **Step 2: Create placeholder DemoSwitcher**

Create `src/components/DemoSwitcher.tsx`:

```tsx
export function DemoSwitcher(_props: {
  unit: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  return null; // Placeholder — implemented in Task 3
}
```

- [ ] **Step 3: Update main.tsx to add BrowserRouter**

Replace the contents of `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './tailwind.css';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

- [ ] **Step 4: Update App.tsx to use AppShell**

Replace the contents of `src/App.tsx`:

```tsx
import { AppShell } from './components/AppShell';

function App() {
  return <AppShell />;
}

export default App;
```

- [ ] **Step 5: Verify the app runs**

```bash
npm run dev
```

Open `http://localhost:5173/spend` — should show the Spend page in dark mode.
Open `http://localhost:5173/` — should redirect to `/spend`.

- [ ] **Step 6: Commit**

```bash
git add src/components/AppShell.tsx src/components/DemoSwitcher.tsx src/main.tsx src/App.tsx
git commit -m "feat: add AppShell with routing and theme state"
```

---

### Task 3: Build the DemoSwitcher component

**Files:**

- Modify: `src/components/DemoSwitcher.tsx`

- [ ] **Step 1: Implement DemoSwitcher**

Replace `src/components/DemoSwitcher.tsx`:

```tsx
import { Link } from 'react-router';
import { Sun, Moon, BookOpen } from 'lucide-react';

const UNITS = [
  { id: 'spend', label: 'Spend' },
  { id: 'save', label: 'Save' },
];

const STORYBOOK_STORY_PATHS: Record<string, string> = {
  spend: '/story/pages-futra-spend--default',
  save: '/story/pages-futra-save--default',
};

function getStorybookUrl(unit: string, theme: string): string {
  const storyPath = STORYBOOK_STORY_PATHS[unit] ?? STORYBOOK_STORY_PATHS.spend;
  return `http://localhost:6006/?path=${storyPath}&globals=theme:${theme};businessUnit:${unit}`;
}

export function DemoSwitcher({
  unit,
  theme,
  onToggleTheme,
}: {
  unit: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-9 flex items-center justify-between px-4 lg:px-6"
      style={{ backgroundColor: '#6C6FE4' }}
    >
      {/* Left: label + unit pills */}
      <div className="flex items-center gap-3">
        <span
          className="text-white text-[11px] font-bold tracking-[0.05em] hidden sm:inline"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          FUTRA DEMO
        </span>
        <div className="flex gap-1">
          {UNITS.map((u) => (
            <Link
              key={u.id}
              to={`/${u.id}`}
              className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
                unit === u.id
                  ? 'bg-white/25 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {u.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right: theme toggle + storybook link */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <a
          href={getStorybookUrl(unit, theme)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open in Storybook"
        >
          <BookOpen size={14} />
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update Spend Navbar offset**

In `src/components/spend/Navbar.tsx`, change `fixed top-0` to `fixed top-9` so the navbar sits below the 36px DemoSwitcher:

Change line 19 from:

```tsx
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 transition-colors duration-300 ${
```

to:

```tsx
      className={`fixed top-9 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12 transition-colors duration-300 ${
```

Also update the mobile menu position on line 51 from `top-16` to `top-[100px]` (36px switcher + 64px navbar = 100px):

Change:

```tsx
        <div className="absolute top-16 left-0 right-0 bg-[#1A1A1F] border-t border-white/10 flex flex-col p-6 gap-4 md:hidden">
```

to:

```tsx
        <div className="absolute top-[64px] left-0 right-0 bg-[#1A1A1F] border-t border-white/10 flex flex-col p-6 gap-4 md:hidden">
```

Note: The mobile menu is positioned relative to the nav element (which is 64px/h-16 tall), so `top-[64px]` is correct — it sits right below the navbar.

- [ ] **Step 3: Verify DemoSwitcher renders**

```bash
npm run dev
```

Open `http://localhost:5173/spend`:

- Indigo bar visible at the top with "FUTRA DEMO", "Spend" pill highlighted, "Save" pill visible
- Spend navbar sits below the demo bar
- Sun/Moon toggle switches between light/dark
- Storybook link opens new tab (will 404 if Storybook isn't running — that's fine)
- Click "Save" pill — navigates to `/save` (blank page for now, that's expected)

- [ ] **Step 4: Commit**

```bash
git add src/components/DemoSwitcher.tsx src/components/spend/Navbar.tsx
git commit -m "feat: add DemoSwitcher bar with unit pills, theme toggle, and Storybook link"
```

---

### Task 4: Build Save page components

**Files:**

- Create: `src/components/save/Logo.tsx`
- Create: `src/components/save/ProgressCard.tsx`
- Create: `src/components/save/Navbar.tsx`
- Create: `src/components/save/HeroSection.tsx`
- Create: `src/components/save/HowItWorks.tsx`
- Create: `src/components/save/FeatureSection.tsx`
- Create: `src/components/save/StatsRow.tsx`
- Create: `src/components/save/TestimonialSection.tsx`
- Create: `src/components/save/CTASection.tsx`
- Create: `src/components/save/Footer.tsx`
- Create: `src/components/save/SavePage.tsx`

**Source reference:** Figma Make components at `https://www.figma.com/make/vuqSZjRYbpGvho74uZxG87/Futra-Save`. Use the Figma MCP `ReadMcpResourceTool` to pull each component's source from `file://figma/make/source/vuqSZjRYbpGvho74uZxG87/src/app/components/{Component}.tsx`.

**Key adaptations from Figma source:**

1. Replace all hardcoded hex colors with CSS variable tokens from `tailwind.css`:
   - `#F7F5F0` (Linen) → `bg-background` (mapped by `[data-business-unit='save']`)
   - `#1C1C1A` (Ink) → `text-foreground`
   - `#FFFFFF` (Card) → `bg-surface`
   - `#4A7C59` (Grove) → `text-accent` / `bg-accent`
   - `#7A7A72` (Muted) → `text-muted-foreground`
   - `#E8F0EB` (Mist) → `bg-muted` / `bg-secondary`
   - `#6C6FE4` (Indigo) → `bg-primary` / `text-primary`
   - `#A8C5B0` (Sage) → use accent at reduced opacity
   - Card borders `rgba(168,197,176,0.15)` → `border-border`
2. Replace inline `style={{ fontFamily: 'Inter' }}` with Tailwind `font-sans` (Inter is already set as the body font via `index.css`)
3. Replace inline `style={{ fontFamily: 'JetBrains Mono' }}` with Tailwind `font-mono`
4. Save Navbar: use `fixed top-9` (below DemoSwitcher), mobile menu at `top-[64px]`
5. Navbar scroll state: `bg-surface/95 backdrop-blur-sm` instead of hardcoded white
6. All sections that use `backgroundColor: '#F7F5F0'` → `bg-background`
7. All sections that use `backgroundColor: '#FFFFFF'` → `bg-surface`
8. CTA gradient: keep the `linear-gradient` but use `from-secondary to-secondary-hover` or keep explicit Mist-to-Sage since gradients don't map cleanly to single tokens — use `bg-gradient-to-br from-muted to-muted/80` as a reasonable approximation
9. Footer: dark footer uses `bg-foreground` (which is Ink in light mode) with `text-muted-foreground` for links — OR keep hardcoded dark footer since it's always dark regardless of theme. **Decision: keep Footer hardcoded dark** (`bg-[#1C1C1A]`) as it's the same in both light and dark modes per the design spec.

This is the largest task. It can be split into sub-steps.

- [ ] **Step 1: Create Logo component**

Create `src/components/save/Logo.tsx`:

```tsx
export function Logo({ dark = false }: { dark?: boolean }) {
  const color = dark ? '#F7F5F0' : undefined;
  return (
    <div
      className="flex items-center gap-0"
      style={color ? { color } : undefined}
    >
      <span
        className={`font-sans font-black text-xl tracking-[-0.03em] ${dark ? '' : 'text-foreground'}`}
      >
        FUTRA
      </span>
      <span className="mx-2 opacity-30 font-light">|</span>
      <span
        className={`font-sans font-medium text-xl ${dark ? '' : 'text-foreground'}`}
      >
        save
      </span>
    </div>
  );
}
```

- [ ] **Step 2: Create ProgressCard component**

Create `src/components/save/ProgressCard.tsx`:

```tsx
export function ProgressCard({
  goalName,
  targetAmount,
  currentAmount,
  percentage,
  className = '',
}: {
  goalName: string;
  targetAmount: string;
  currentAmount: string;
  percentage: number;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl p-5 bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans font-semibold text-[15px] text-foreground">
          {goalName}
        </span>
        <span className="font-mono font-medium text-[13px] text-accent">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-muted mb-3">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono font-medium text-sm text-foreground">
          {currentAmount}
        </span>
        <span className="font-mono font-medium text-[13px] text-muted-foreground">
          of {targetAmount}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Navbar component**

Create `src/components/save/Navbar.tsx`:

```tsx
import { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['How It Works', 'Features', 'Goals'];

  return (
    <nav
      className={`fixed top-9 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-sm border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="font-sans font-medium text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-sm hover:bg-primary-hover transition-colors cursor-pointer">
            Start Saving
          </button>
        </div>
        <button
          className="md:hidden text-foreground cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 py-4 bg-surface absolute top-[64px] left-0 right-0 border-b border-border">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="block py-3 font-sans font-medium text-base text-muted-foreground"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button className="mt-3 w-full px-5 py-3 rounded-lg bg-primary text-primary-foreground font-sans font-medium cursor-pointer">
            Start Saving
          </button>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 4: Create HeroSection component**

Create `src/components/save/HeroSection.tsx`:

```tsx
import { ProgressCard } from './ProgressCard';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-[100px] bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 max-w-xl">
            <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
              Goal-based savings
            </p>
            <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
              Every dollar has
              <br />a destination
            </h1>
            <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground max-w-[460px]">
              Automate your savings with round-ups and scheduled transfers.
              Watch your goals grow with beautiful, visual progress tracking.
            </p>
            <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-base hover:bg-primary-hover transition-opacity cursor-pointer">
              Create Your First Goal
            </button>
          </div>

          <div className="flex-1 relative w-full max-w-md lg:max-w-lg">
            <div className="relative" style={{ minHeight: 380 }}>
              <div className="absolute top-0 left-0 w-[280px] sm:w-[300px] z-10">
                <ProgressCard
                  goalName="Trip to Japan"
                  targetAmount="$4,500"
                  currentAmount="$3,015"
                  percentage={67}
                />
              </div>
              <div className="absolute top-28 left-16 sm:left-24 w-[280px] sm:w-[300px] z-20">
                <ProgressCard
                  goalName="Emergency Fund"
                  targetAmount="$10,000"
                  currentAmount="$4,300"
                  percentage={43}
                />
              </div>
              <div className="absolute top-56 left-8 sm:left-12 w-[280px] sm:w-[300px] z-30">
                <ProgressCard
                  goalName="New Laptop"
                  targetAmount="$2,200"
                  currentAmount="$1,958"
                  percentage={89}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create HowItWorks component**

Create `src/components/save/HowItWorks.tsx`:

```tsx
import { Target, Repeat, TrendingUp } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Target,
    title: 'Name your goal',
    desc: 'Set a target amount and a timeline that works for you. Trip, home, rainy day — you decide.',
  },
  {
    num: '02',
    icon: Repeat,
    title: 'Automate it',
    desc: 'Round-ups, scheduled transfers, or manual deposits. Choose what fits your rhythm.',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Watch it grow',
    desc: 'Visual progress tracking that keeps you motivated. Every dollar gets you closer.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          Three steps to start
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Simple by design
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <div
            className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px"
            style={{ borderTop: '2px dashed' }}
            // border color inherits from border-border via the theme
          />
          {steps.map((step) => (
            <div key={step.num} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-muted">
                <step.icon
                  size={28}
                  className="text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <span className="block mb-2 font-mono font-medium text-[13px] text-accent">
                Step {step.num}
              </span>
              <h3 className="mb-3 font-sans font-semibold text-xl text-foreground">
                {step.title}
              </h3>
              <p className="font-sans text-base leading-[1.7] text-muted-foreground max-w-[300px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create FeatureSection component**

Create `src/components/save/FeatureSection.tsx`:

```tsx
import { CircleDot, Coins, CalendarClock, Trophy } from 'lucide-react';

const features = [
  {
    icon: CircleDot,
    title: 'Visual goal tracking',
    desc: "See every goal at a glance with progress rings and bars that celebrate how far you've come.",
  },
  {
    icon: Coins,
    title: 'Smart round-ups',
    desc: 'Every purchase rounds up to the nearest dollar. Spare change adds up faster than you think.',
  },
  {
    icon: CalendarClock,
    title: 'Scheduled transfers',
    desc: 'Set it and forget it. Automatic weekly or monthly transfers keep your goals on track.',
  },
  {
    icon: Trophy,
    title: 'Milestones & streaks',
    desc: 'Hit 25%, 50%, 75% — celebrate each milestone. Streaks reward your consistency.',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          Saving, your way
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Tools that fit your life
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-6 bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-muted">
                <f.icon size={22} className="text-accent" strokeWidth={1.5} />
              </div>
              <h4 className="mb-2 font-sans font-semibold text-[17px] text-foreground">
                {f.title}
              </h4>
              <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Create StatsRow component**

Create `src/components/save/StatsRow.tsx`:

```tsx
const stats = [
  { value: '$42M+', label: 'Total saved by users' },
  { value: '128K', label: 'Goals completed' },
  { value: '+34%', label: 'Avg. monthly savings increase' },
  { value: '89K', label: 'Active savers' },
];

export function StatsRow() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="block mb-2 font-mono font-medium text-foreground text-[clamp(28px,4vw,40px)]">
                {s.value}
              </span>
              <span className="uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Create TestimonialSection component**

Create `src/components/save/TestimonialSection.tsx`:

```tsx
const testimonials = [
  {
    quote:
      'I finally saved enough for my first solo trip to Portugal. Seeing that progress bar inch forward every week kept me going.',
    name: 'Maya Chen',
    role: 'Saved $3,200 for travel',
    initials: 'MC',
    color: '#A8C5B0',
  },
  {
    quote:
      "The round-ups are sneaky good. I barely notice them, but I've saved over $1,400 in six months without even trying.",
    name: 'Jordan Ellis',
    role: 'Building an emergency fund',
    initials: 'JE',
    color: '#6C6FE4',
  },
  {
    quote:
      "Other apps made saving feel like a chore. Futra makes it feel like I'm actually building something. The milestones are *chef's kiss*.",
    name: 'Priya Kapoor',
    role: 'Saving for a down payment',
    initials: 'PK',
    color: '#4A7C59',
  },
];

export function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          From our savers
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Real goals, real progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl p-6 bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            >
              <p className="mb-6 font-sans text-base leading-[1.7] text-foreground italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-[13px]"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <span className="block font-sans font-semibold text-sm text-foreground">
                    {t.name}
                  </span>
                  <span className="font-sans font-medium text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 9: Create CTASection component**

Create `src/components/save/CTASection.tsx`:

```tsx
export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-muted to-secondary">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="mb-4 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Your first goal is waiting
        </h2>
        <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground">
          No minimum amounts. No fees. Just a calm, focused way to build toward
          something that matters to you.
        </p>
        <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-base hover:bg-primary-hover transition-opacity cursor-pointer">
          Start Saving
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 10: Create Footer component**

Create `src/components/save/Footer.tsx`:

```tsx
import { Logo } from './Logo';

const columns = [
  { title: 'Product', links: ['Features', 'Goals', 'Round-Ups'] },
  { title: 'Company', links: ['About', 'Careers', 'Press'] },
  { title: 'Legal', links: ['Privacy', 'Terms'] },
];

export function Footer() {
  return (
    <footer className="py-16 md:py-20 bg-[#1C1C1A]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <Logo dark />
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#9A9A90]">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block mb-3 font-sans text-sm text-[#9A9A90] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(154,154,144,0.2)]">
          <span className="font-sans text-xs text-[#9A9A90]">
            &copy; 2026 Futra Financial. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 11: Create SavePage orchestrator**

Create `src/components/save/SavePage.tsx`:

```tsx
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { FeatureSection } from './FeatureSection';
import { StatsRow } from './StatsRow';
import { TestimonialSection } from './TestimonialSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function SavePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeatureSection />
      <StatsRow />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 12: Commit Save components**

```bash
git add src/components/save/
git commit -m "feat: add Futra Save landing page components from Figma design"
```

---

### Task 5: Wire Save route into AppShell

**Files:**

- Modify: `src/components/AppShell.tsx`

- [ ] **Step 1: Add Save route**

In `src/components/AppShell.tsx`, add the SavePage import and route:

Add import at top:

```tsx
import { SavePage } from './save/SavePage';
```

Add route after the Spend route:

```tsx
<Route path="/save" element={<SavePage />} />
```

- [ ] **Step 2: Verify both pages work**

```bash
npm run dev
```

- Open `http://localhost:5173/spend` — Spend page in dark mode, DemoSwitcher visible
- Open `http://localhost:5173/save` — Save page in light mode (warm Linen background)
- Click "Save" pill in DemoSwitcher → navigates to Save page, theme switches to light
- Click "Spend" pill → navigates back to Spend page, theme switches to dark
- Toggle light/dark on Save → persists when you leave and come back
- Verify mobile responsive: hamburger menus, stacked layouts

- [ ] **Step 3: Commit**

```bash
git add src/components/AppShell.tsx
git commit -m "feat: wire Save page route into AppShell"
```

---

### Task 6: Add Storybook stories with global configuration

**Files:**

- Modify: `src/stories/spend/SpendPage.stories.tsx`
- Create: `src/stories/save/SavePage.stories.tsx`

- [ ] **Step 1: Update SpendPage story with globals**

Replace `src/stories/spend/SpendPage.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SpendPage } from '../../components/spend/SpendPage';

const meta = {
  title: 'Pages/Futra Spend',
  component: SpendPage,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    theme: 'dark',
    businessUnit: 'spend',
  },
} satisfies Meta<typeof SpendPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

- [ ] **Step 2: Create SavePage story with globals**

Create `src/stories/save/SavePage.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SavePage } from '../../components/save/SavePage';

const meta = {
  title: 'Pages/Futra Save',
  component: SavePage,
  parameters: {
    layout: 'fullscreen',
  },
  globals: {
    theme: 'light',
    businessUnit: 'save',
  },
} satisfies Meta<typeof SavePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

- [ ] **Step 3: Verify Storybook**

```bash
npm run storybook
```

- Navigate to "Pages/Futra Save" → should render with light theme, Save business unit selected in toolbar
- Navigate to "Pages/Futra Spend" → should render with dark theme, Spend business unit selected in toolbar
- Navigate away to a component story and back → globals should restore correctly

- [ ] **Step 4: Verify DemoSwitcher Storybook links**

With Storybook running on port 6006, go to the dev app and:

- On `/spend` in dark mode, click the Storybook icon → should open Storybook to Futra Spend story with dark theme
- On `/save` in light mode, click the Storybook icon → should open Storybook to Futra Save story with light theme

- [ ] **Step 5: Commit**

```bash
git add src/stories/spend/SpendPage.stories.tsx src/stories/save/SavePage.stories.tsx
git commit -m "feat: add SavePage story and configure per-story globals for theme/unit"
```

---

### Task 7: Build verification and polish

**Files:** None new — verification pass

- [ ] **Step 1: Run type check**

```bash
npx tsc -b
```

Expected: no errors

- [ ] **Step 2: Run linter**

```bash
npm run lint
```

Expected: no errors (or only pre-existing warnings)

- [ ] **Step 3: Build for production**

```bash
npm run build
```

Expected: successful build

- [ ] **Step 4: Visual verification checklist**

Run `npm run dev` and verify:

**DemoSwitcher:**

- [ ] Indigo bar visible at top on all pages
- [ ] Active unit pill highlighted with white/25 background
- [ ] Theme toggle works (sun/moon icon swaps)
- [ ] Storybook link opens correct deep-link
- [ ] Mobile: bar stays compact, readable

**Save page — Light mode (default):**

- [ ] Warm Linen (#F7F5F0) background on Hero and content sections
- [ ] Grove green (#4A7C59) accent on progress bars, step numbers, icons
- [ ] Indigo (#6C6FE4) on all buttons
- [ ] ProgressCards overlap correctly in Hero
- [ ] HowItWorks connecting dashed line visible on desktop
- [ ] Feature cards have subtle borders and shadows
- [ ] Stats in JetBrains Mono
- [ ] Footer always dark regardless of theme

**Save page — Dark mode:**

- [ ] Background switches to #1C1C1A
- [ ] Text inverts to light
- [ ] Card surfaces use #2A2A26
- [ ] Progress bars use lighter green (#5A8C69)
- [ ] Footer unchanged (always dark)

**Spend page:**

- [ ] Navbar offset below DemoSwitcher (no overlap)
- [ ] Mobile hamburger menu positioned correctly
- [ ] All existing functionality preserved

**Theme persistence:**

- [ ] Switch Save to dark → navigate to Spend → navigate back to Save → still dark
- [ ] Switch Spend to light → navigate to Save → navigate back to Spend → still light

- [ ] **Step 5: Fix any issues found**

Address any visual or functional issues discovered during verification.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "fix: polish and verification fixes for Save page and DemoSwitcher"
```

(Only if there were fixes to commit. Skip if everything passed cleanly.)
