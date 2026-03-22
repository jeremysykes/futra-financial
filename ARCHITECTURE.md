# Futra Financial — Architecture

---

## Tech Stack

| Layer         | Technology                     | Version                         |
| ------------- | ------------------------------ | ------------------------------- |
| Framework     | React                          | 19                              |
| Build         | Vite                           | 7                               |
| Styling       | Tailwind CSS                   | 4 (v4 plugin, CSS-first config) |
| Charts        | Recharts                       | latest (Plan BU only)           |
| Icons         | Lucide React                   | latest                          |
| Primitives    | Radix UI                       | latest                          |
| Variants      | class-variance-authority (CVA) | latest                          |
| Class merging | tailwind-merge                 | latest                          |
| Routing       | React Router                   | 7                               |
| Component dev | Storybook                      | 10                              |
| Testing       | Vitest + Playwright            | latest                          |
| Language      | TypeScript                     | 5.9 (strict mode)               |

---

## Directory Structure

```
futra-financial/
├── DESIGN.md                    # Canonical style guide (do not pollute)
├── CLAUDE.md                    # Claude Code rules and conventions
├── AGENTS.md                    # Agent roles and division of labour
├── ARCHITECTURE.md              # This file
├── README.md                    # Brand strategy and project overview
├── index.html                   # Vite entry point
├── package.json
├── vite.config.ts
├── tsconfig.app.json
├── eslint.config.js
│
├── src/
│   ├── main.tsx                 # React root — BrowserRouter wraps App
│   ├── App.tsx                  # Renders AppShell
│   ├── tailwind.css             # Theme tokens (all BU palettes, light/dark)
│   ├── index.css                # Font imports (Inter, JetBrains Mono)
│   ├── App.css                  # App-level styles
│   ├── lib/
│   │   └── utils.ts             # cn() utility (clsx + tailwind-merge)
│   │
│   ├── components/
│   │   ├── AppShell.tsx         # Router, theme state, DemoSwitcher wrapper
│   │   ├── DemoSwitcher.tsx     # Global demo navigation bar
│   │   ├── spend/               # Futra Spend components (10 files)
│   │   ├── save/                # Futra Save components (11 files)
│   │   ├── credit/              # Futra Credit components (10 files)
│   │   ├── plan/                # Futra Plan components (11 files)
│   │   └── together/            # Futra Together components (11 files)
│   │
│   ├── stories/
│   │   ├── decorators/          # Single source of truth for all Storybook decorators
│   │   ├── button/              # Shared Button component stories
│   │   ├── card/                # Shared Card component stories
│   │   ├── logo/                # Shared Logo component stories
│   │   ├── nav-link/            # Shared NavLink component stories
│   │   ├── navbar/              # Shared Navbar component stories
│   │   ├── spend/               # SpendPage.stories.tsx
│   │   ├── save/                # SavePage.stories.tsx
│   │   ├── credit/              # CreditPage.stories.tsx
│   │   ├── plan/                # PlanPage.stories.tsx
│   │   └── together/            # TogetherPage.stories.tsx
│   │
│   └── assets/                  # Images (per BU subdirectories)
│
├── .storybook/
│   ├── main.ts                  # Storybook config
│   └── preview.tsx              # Global decorators, theme/BU globals
│
├── .claude/
│   └── skills/
│       └── brand-guidelines/    # Project-level Claude skill
│
└── docs/
    ├── futra-financial.md       # Original brand strategy document
    ├── design-audit.md          # Design audit findings + improvement plan
    ├── image-requirements.md    # 15 image specs with generation prompts
    ├── prompts/                 # Figma Make prompts per BU
    └── superpowers/             # Specs and plans from brainstorming sessions
```

---

## Routing

```
/          → redirects to /spend
/spend     → SpendPage
/save      → SavePage
/credit    → CreditPage
/plan      → PlanPage
/together  → TogetherPage
```

Routing is handled by React Router v7 in `main.tsx` (BrowserRouter) and `AppShell.tsx` (Routes/Route).

---

## Component Architecture

### AppShell

The root layout component. Responsibilities:

1. Derives the active business unit from the URL path
2. Manages light/dark theme state (per-BU, persisted to localStorage)
3. Renders the DemoSwitcher bar
4. Sets `data-business-unit` and `.dark` class on the content wrapper
5. Sets `--nav-top: 36px` CSS variable for navbar offset

```
<BrowserRouter>
  <AppShell>
    <DemoSwitcher />                    ← fixed top-0, z-[60], h-9
    <div data-business-unit={unit}      ← drives theme tokens
         class={dark ? 'dark' : ''}     ← drives dark mode
         style="--nav-top: 36px">       ← navbar offset for DemoSwitcher
      <Routes>
        <Route path="/spend" element={<SpendPage />} />
        ...
      </Routes>
    </div>
  </AppShell>
</BrowserRouter>
```

### DemoSwitcher

Fixed bar at the very top of the viewport. Contains:

- Business unit pills (Link components to each route)
- Light/dark theme toggle (Sun/Moon icons)
- Storybook deep-link (opens matching story with correct globals)

### Page Components

Each BU has a `{BU}Page.tsx` orchestrator that composes section components:

```
{BU}Page
├── Navbar          ← fixed, scroll-aware, max-w-[1200px] inner container
├── HeroSection     ← full viewport, signature visual element
├── [BU-specific sections]
├── CTASection      ← call to action
└── Footer          ← always dark, hardcoded colors
```

### Per-BU Section Inventory

| Section           | Spend | Save | Credit | Plan | Together |
| ----------------- | :---: | :--: | :----: | :--: | :------: |
| Navbar            |   x   |  x   |   x    |  x   |    x     |
| Hero              |   x   |  x   |   x    |  x   |    x     |
| HowItWorks        |       |  x   |        |      |    x     |
| TrustSection      |       |      |   x    |      |          |
| FeatureSection    |   x   |  x   |   x    |      |    x     |
| FeatureDeepDive   |       |      |        |  x   |          |
| ComparisonSection |       |      |        |  x   |          |
| SplitShowcase     |       |      |        |      |    x     |
| FAQSection        |       |      |   x    |      |          |
| StatsRow          |   x   |  x   |        |  x   |          |
| Testimonials      |   x   |  x   |        |  x   |    x     |
| CTASection        |   x   |  x   |   x    |  x   |    x     |
| Footer            |   x   |  x   |   x    |  x   |    x     |

---

## Theme System

### How It Works

1. `tailwind.css` defines CSS custom properties per BU via `[data-business-unit='...']` selectors
2. Dark mode variants are defined via `.dark [data-business-unit='...']` compound selectors
3. Components use Tailwind utility classes (`bg-background`, `text-foreground`, etc.) that resolve to the active BU's tokens
4. `AppShell` sets the `data-business-unit` attribute and `.dark` class based on route and user preference

### Token Layers

```
┌─────────────────────────────────────────┐
│  @theme { }                             │  ← Default/white-label tokens
├─────────────────────────────────────────┤
│  .dark { }                              │  ← Default dark mode overrides
├─────────────────────────────────────────┤
│  [data-business-unit='spend'] { }       │  ← Spend light tokens
│  .dark [data-business-unit='spend'] { } │  ← Spend dark tokens
├─────────────────────────────────────────┤
│  [data-business-unit='save'] { }        │  ← Save light tokens
│  .dark [data-business-unit='save'] { }  │  ← Save dark tokens
├─────────────────────────────────────────┤
│  ... (credit, plan, together)           │
└─────────────────────────────────────────┘
```

### Default Themes

| BU       | Default | Reason                                |
| -------- | ------- | ------------------------------------- |
| Spend    | Dark    | Evening/commute usage                 |
| Save     | Light   | Planning mindset, warm Linen bg       |
| Credit   | Light   | User control for high-stakes sessions |
| Plan     | Dark    | Midnight analytical sessions          |
| Together | Light   | Shared-screen, face-to-face usage     |

### Theme Persistence

Per-BU preferences stored in localStorage:

- `futra-theme-spend` → `"light"` | `"dark"`
- `futra-theme-save` → `"light"` | `"dark"`
- etc.

When switching BUs, the stored preference is loaded (or the default is used on first visit).

---

## Storybook

### Configuration

- Stories glob: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)`
- Framework: `@storybook/react-vite`
- Addons: Chromatic, Vitest, a11y, Docs

### Global Controls

Two toolbar selectors defined in `.storybook/preview.tsx`:

- **Theme:** Light / Dark
- **Business Unit:** Spend, Save, Credit, Plan, Together

### Decorators

All decorators are defined in `src/stories/decorators/` — the single source of truth.

- **`withThemeContext`** — Global decorator (registered in `preview.tsx`). Applies `data-business-unit`, `.dark` class, and `bg-background text-foreground` to every story.
- **`withStoryDisplay(options?)`** — Per-story decorator for display presentation. Handles padding, token-derived backgrounds, layout modes (single/grid), fixed-position containment, and width constraints. See `src/stories/decorators/README.md` for full API.

No decorator logic exists outside `src/stories/decorators/`.

### Page Story Globals

Each page story sets `globals: { businessUnit: '{bu}' }` to auto-select the correct BU when the story is viewed. The theme selector remains free for the user to toggle.

### Navbar Offset

Navbars use `top-[var(--nav-top,0px)]`. In the app, AppShell sets `--nav-top: 36px` (DemoSwitcher height). In Storybook, the variable defaults to `0px` — navbars sit flush at the top with no gap.

---

## Build & Development

```bash
npm run dev          # Vite dev server (localhost:5173 or next available port)
npm run build        # TypeScript check + Vite production build
npm run storybook    # Storybook on localhost:6006
npm run lint         # ESLint
npm run format       # Prettier
```

### Production Build Output

```
dist/
├── index.html
└── assets/
    ├── index-*.css    (~34KB gzipped ~7KB)
    └── index-*.js     (~262KB gzipped ~82KB)
```

---

## Key Design Decisions

### Why no shared component library (yet)

Each BU has its own component directory with duplicated patterns (Navbar, Footer, Logo, etc.). This is intentional at this stage:

- BU components have subtle differences (corner radii, icon choices, section ordering)
- The token system handles cross-BU consistency at the CSS level
- Premature abstraction would couple BUs that need to evolve independently
- A shared library can be extracted later once patterns stabilize

### Why CSS variables instead of Tailwind config themes

Tailwind CSS v4 uses CSS-first configuration. The `@theme` directive and `@layer base` selectors in `tailwind.css` define all tokens. This approach:

- Supports runtime theme switching via `data-business-unit` attributes
- Allows dark mode via CSS cascade (`.dark` class)
- Avoids JavaScript-level theme context or providers
- Works in Storybook without any special setup

### Why React Router instead of hash-based routing

- Each BU has a bookmarkable URL (`/spend`, `/save`, etc.)
- DemoSwitcher uses `<Link>` components for proper client-side navigation
- Foundation for potential future server-side rendering or deployment on Vercel
