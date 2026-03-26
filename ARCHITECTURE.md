# Futra Financial — Architecture

---

## Tech Stack

| Layer         | Technology                     | Version                         |
| ------------- | ------------------------------ | ------------------------------- |
| Framework     | React                          | 19                              |
| Build         | Vite                           | 7                               |
| Monorepo      | Turborepo + pnpm workspaces    | latest                          |
| Styling       | Tailwind CSS                   | 4 (v4 plugin, CSS-first config) |
| Tokens        | W3C DTCG JSON + Style Dictionary | 4                             |
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
futra-financial/                     # Turborepo monorepo root
├── DESIGN.md                        # Canonical style guide (do not pollute)
├── CLAUDE.md                        # Claude Code rules and conventions
├── AGENTS.md                        # Agent roles and division of labour
├── ARCHITECTURE.md                  # This file
├── README.md                        # Brand strategy and project overview
├── package.json                     # Root workspace scripts (delegates to turbo)
├── pnpm-workspace.yaml              # Workspace definition (apps/*, packages/*)
├── turbo.json                       # Turborepo task pipeline
│
├── apps/
│   └── web/                         # Main Vite + React application
│       ├── index.html               # Vite entry point
│       ├── package.json
│       ├── vite.config.ts           # Vite + Vitest multi-project config
│       ├── tsconfig.json
│       ├── eslint.config.js
│       ├── .storybook/
│       │   ├── main.ts              # Storybook config
│       │   └── preview.tsx          # Global decorators, theme/BU globals
│       └── src/
│           ├── main.tsx             # React root — BrowserRouter wraps App
│           ├── App.tsx              # Renders AppShell
│           ├── tailwind.css         # Imports @futra/tokens + semantic tokens + BU themes
│           ├── index.css            # Font imports (Inter, JetBrains Mono)
│           ├── lib/
│           │   └── utils.ts         # cn() utility (clsx + tailwind-merge)
│           ├── components/
│           │   ├── AppShell.tsx     # Router, theme state, DemoSwitcher wrapper
│           │   ├── DemoSwitcher.tsx # Global demo navigation bar
│           │   ├── spend/           # Futra Spend components
│           │   ├── save/            # Futra Save components
│           │   ├── credit/          # Futra Credit components
│           │   ├── plan/            # Futra Plan components
│           │   └── together/        # Futra Together components
│           ├── stories/
│           │   ├── decorators/      # Single source of truth for all Storybook decorators
│           │   ├── foundation/      # Colors, Typography, DesignTokens stories
│           │   ├── {component}/     # Shared component stories (35 total)
│           │   ├── {bu}/            # Page-level stories per BU
│           │   └── __tests__/       # Unit tests (argTypes validation)
│           └── assets/              # Images (per BU subdirectories)
│
├── packages/
│   └── tokens/                      # @futra/tokens — design token package
│       ├── src/
│       │   └── tokens.json          # DTCG-format source of truth (98 primitives)
│       ├── config/
│       │   └── style-dictionary.config.ts
│       └── dist/
│           └── primitives.css       # Generated CSS (gitignored)
│
├── .claude/
│   └── skills/
│       └── brand-guidelines/        # Project-level Claude skill
│
└── docs/
    ├── design-token-pipeline.md     # Token flow from source to render
    ├── testing.md                   # Three-layer testing strategy
    ├── figma-library-workflow.md    # Figma-to-code sync process
    ├── image-requirements.md        # 15 image specs with generation prompts
    ├── diagrams/
    │   └── token-architecture.md    # Mermaid diagram of full token pipeline
    ├── prompts/                     # Figma Make prompts per BU
    └── superpowers/                 # Specs and plans from brainstorming sessions
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

1. `apps/web/src/tailwind.css` imports primitives from `@futra/tokens` and defines semantic tokens per BU via `[data-business-unit='...']` selectors
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

- Stories glob: `src/**/*.stories.@(js|jsx|mjs|ts|tsx)` (in `apps/web/`)
- Framework: `@storybook/react-vite`
- Addons: Chromatic, Vitest, a11y, Docs

### Global Controls

Two toolbar selectors defined in `apps/web/.storybook/preview.tsx`:

- **Theme:** Light / Dark
- **Business Unit:** Spend, Save, Credit, Plan, Together

### Decorators

All decorators are defined in `apps/web/src/stories/decorators/` — the single source of truth.

- **`withThemeContext`** — Global decorator (registered in `preview.tsx`). Applies `data-business-unit`, `.dark` class, and `bg-background text-foreground` to every story.
- **`withStoryDisplay(options?)`** — Per-story decorator for display presentation. Handles padding, token-derived backgrounds, layout modes (single/grid), fixed-position containment, and width constraints. See `apps/web/src/stories/decorators/README.md` for full API.

No decorator logic exists outside `apps/web/src/stories/decorators/`.

### Page Story Globals

Each page story sets `globals: { businessUnit: '{bu}' }` to auto-select the correct BU when the story is viewed. The theme selector remains free for the user to toggle.

### Navbar Offset

Navbars use `top-[var(--nav-top,0px)]`. In the app, AppShell sets `--nav-top: 36px` (DemoSwitcher height). In Storybook, the variable defaults to `0px` — navbars sit flush at the top with no gap.

---

## Build & Development

All commands run from the monorepo root via Turborepo:

```bash
pnpm dev              # Vite dev server (localhost:5173 or next available port)
pnpm build            # Turbo: tokens build → web TypeScript check + Vite build
pnpm storybook        # Storybook on localhost:6006
pnpm test             # All tests (Storybook browser + unit)
pnpm lint             # ESLint
pnpm format           # Prettier
```

To target a specific package:

```bash
pnpm --filter web dev                # Only the web app
pnpm --filter @futra/tokens build    # Only the tokens package
pnpm --filter web test:interactions  # Only Storybook browser tests
pnpm --filter web test:documentation # Only unit tests
```

### Production Build Output

```
apps/web/dist/
├── index.html
└── assets/
    ├── index-*.css    (~63KB, ~11KB gzipped)
    └── index-*.js     (~711KB, ~217KB gzipped)
```

---

## Key Design Decisions

### Shared components, not duplicated

All components (Navbar, Footer, HeroSection, Card, Button, etc.) are single implementations shared across all five business units. There is no per-BU component duplication. Visual differentiation comes entirely from the token system:

- Components use semantic Tailwind classes (`bg-primary`, `text-foreground`, `border-border`)
- The CSS cascade resolves these to different values per BU via `[data-business-unit]` selectors
- BU pages compose shared components differently via props and section ordering
- Content differences (logo text, link labels, CTA copy) are passed as props

This means one Navbar serves all five products. Adding a feature to Navbar improves every BU simultaneously.

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
