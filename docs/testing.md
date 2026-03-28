# Testing

This project uses [Vitest](https://vitest.dev/) with two distinct test projects and [Chromatic](https://www.chromatic.com/) for visual regression — three layers that catch different categories of issues.

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Reference](#quick-reference)
3. [Vitest Multi-Project Setup](#vitest-multi-project-setup)
4. [Interaction Tests](#interaction-tests)
5. [Documentation Tests](#documentation-tests)
6. [Visual Regression Tests (Chromatic)](#visual-regression-tests-chromatic)
7. [CI/CD Integration](#cicd-integration)

---

## Overview

| Layer               | Tool                     | Environment              | What it catches                                               |
| ------------------- | ------------------------ | ------------------------ | ------------------------------------------------------------- |
| Interaction tests   | Vitest + Storybook addon | Chromium (Playwright)    | Render crashes, broken interactions, accessibility violations |
| Documentation tests | Vitest                   | Node.js                  | Missing argTypes metadata, documentation standards violations |
| Visual regression   | Chromatic                | Cloud screenshot diffing | Unintended pixel-level changes across themes                  |

```
pnpm test
  -> turbo run test
    -> vitest run (apps/web)
      |-- Project: storybook (browser)
      |   '-- 35 story files -> rendered in Chromium via Playwright
      |       '-- Smoke tests + interaction tests (play functions)
      '-- Project: unit (node)
          '-- argTypes.test.ts -> validates story metadata standards
```

---

## Quick Reference

| Command                                     | What it runs                        |
| ------------------------------------------- | ----------------------------------- |
| `pnpm test`                                 | Both test suites (via Turborepo)    |
| `pnpm --filter web test:interactions`       | Interaction tests (browser)         |
| `pnpm --filter web test:interactions:watch` | Interaction tests in watch mode     |
| `pnpm --filter web test:documentation`      | Documentation tests (Node.js)       |
| `pnpm --filter web chromatic`               | Visual regression tests (Chromatic) |

From `apps/web/` directly:

```bash
vitest run                  # All tests
vitest --project=storybook  # Only interaction tests
vitest --project=unit       # Only documentation tests
```

---

## Vitest Multi-Project Setup

Testing is configured in `apps/web/vite.config.ts` using Vitest's multi-project feature. This runs two isolated test projects from a single config file — each with its own environment, includes, and plugins.

```ts
// apps/web/vite.config.ts
export default defineConfig({
  test: {
    projects: [
      {
        // Project 1: Storybook tests in real Chromium
        plugins: [storybookTest({ configDir: '.storybook' })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
      {
        // Project 2: Unit tests in Node.js
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/__tests__/**/*.test.ts'],
        },
      },
    ],
  },
});
```

**Why two projects instead of one?** Browser tests launch a real Chromium process — they're thorough but slower. Documentation tests run in Node.js — they're fast but can't test rendering. Separating them lets you choose the right tradeoff:

- During development: run `test:documentation` for instant feedback on metadata
- Before shipping: run `test:interactions` for full visual confidence
- In CI: run both via `pnpm test`

---

## Interaction Tests

**Vitest project:** `storybook`

**Runtime:** Headless Chromium via [Playwright](https://playwright.dev/)

**Tool:** [@storybook/addon-vitest](https://storybook.js.org/addons/@storybook/addon-vitest) — runs Storybook `play` functions as Vitest tests in a real browser environment.

### How it works

1. The plugin discovers all stories from the `.storybook/main.ts` config (35 story files, 314 total tests)
2. For each story, it renders the component in a real Chromium browser via Playwright
3. Stories with a `play` function get full interaction testing — the function can click buttons, fill forms, and assert on DOM state
4. Stories without `play` functions still get a smoke test: "does it render without crashing?"

### What they test

- **Interactive components** (Accordion, Button, Navbar, FAQSection, etc.) — simulate clicks, verify state changes (accordion expands, mobile menu toggles, onClick fires)
- **Content components** (HeroSection, Footer, TestimonialSection, etc.) — verify headings, labels, buttons, and child elements are present in the DOM
- **Visual components** (Badge, PhoneMockup, DashboardPreview, etc.) — smoke tests that confirm the component mounts without crashing

### Where they live

Play functions are co-located with their stories in `apps/web/src/stories/**/*.stories.tsx`. Example:

```tsx
import { expect, within, userEvent } from 'storybook/test';

export const Default: Story = {
  args: { items: faqItems },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');

    await userEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute('data-state', 'open');
  },
};
```

### Theme coverage

The Storybook `preview.tsx` applies a `withThemeContext` decorator globally. This decorator reads two toolbar globals:

- **`theme`**: `'light'` or `'dark'` — controls the `.dark` class on the root
- **`businessUnit`**: `'spend'` | `'save'` | `'credit'` | `'plan'` | `'together'` — controls the `data-business-unit` attribute

Default test configuration renders with `theme: 'dark'` and `businessUnit: 'spend'`. Chromatic captures all combinations for visual regression (see below).

### Why real Chromium instead of JSDOM?

Components rely on CSS custom properties and the full CSS cascade for theming. JSDOM does not implement CSS custom property resolution or the cascade. A theme regression that maps `--color-background` to the wrong primitive (e.g., `var(--plan-abyss)` instead of `var(--spend-void)`) would be invisible in JSDOM but immediately visible in Chromium.

The Storybook decorator chain also applies `tailwind.css` — which imports `@futra/tokens/primitives.css` — so the full token pipeline is exercised in every test.

### Viewing in Storybook

Play functions also run visually in the Storybook UI. Start Storybook with `pnpm --filter web storybook`, navigate to a story, and open the **Interactions** tab in the bottom panel to see each step execute with pass/fail indicators.

### Prerequisites

Playwright browsers must be installed before running interaction tests for the first time:

```bash
npx playwright install
```

---

## Documentation Tests

**Vitest project:** `unit`

**Runtime:** Node.js (no browser needed)

**Test file:** `apps/web/src/stories/__tests__/argTypes.test.ts`

### What they test

Documentation tests validate that every story's metadata meets the project's Storybook standards. For each component they check:

- `argTypes` are defined
- Every visible argType has a `description`
- Every visible argType has a valid `table.category` (`Appearance`, `Layout`, `Content`, or `Behavior`)
- Every visible argType has a `control` type
- `inline-radio` and `select` controls have `options` defined
- CVA variant keys are covered by argTypes
- The first story has default `args` for radio/select controls
- JSX props (`children`, `actions`, etc.) are hidden from controls

### Why they exist

These tests enforce the conventions documented in `CLAUDE.md` — ensuring every component in Storybook has complete, categorized controls for the docs panel. Without them, it's easy to add a new prop and forget to document it.

### Convention

Unit test files follow the pattern `src/**/__tests__/**/*.test.ts`. The `__tests__` directory sits alongside the code it tests.

---

## Visual Regression Tests (Chromatic)

**Service:** [Chromatic](https://www.chromatic.com/) — cloud-based visual regression testing for Storybook.

**Project:** [futra-financial on Chromatic](https://www.chromatic.com/builds?appId=69c33ccc2ed05dca54e3f9ff)

### How it works

1. On every push/PR to `main`, a GitHub Actions workflow runs Chromatic
2. Chromatic builds Storybook and takes pixel-perfect screenshots of every story
3. It diffs each screenshot against the baseline from the `main` branch
4. If any pixels changed, the PR is flagged for visual review in the Chromatic dashboard

### What it catches

- Unintended color changes from token edits (e.g., changing `--indigo` affects all 5 BU themes)
- Layout shifts from CSS changes
- Font rendering differences
- Broken responsive behavior

### Current configuration (Phase 1 — Lean)

- **Theme coverage:** light + dark (Spend BU only)
- **Snapshots per build:** ~72 (36 stories x 2 themes)
- **Free tier budget:** ~5,000 snapshots/month (~69 builds)

### Configuration

Chromatic runs from `apps/web/` with the `workingDir` option:

```yaml
- uses: chromaui/action@latest
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    autoAcceptChanges: main # Auto-accept on merge to main (new baseline)
    exitZeroOnChanges: true # Don't fail CI on visual changes (just flag them)
    exitOnceUploaded: true # Don't wait for review to complete
    onlyChanged: true # Only test stories affected by the diff
    workingDir: apps/web
```

### Running locally

To publish a one-off build for debugging:

```bash
pnpm --filter web chromatic -- --project-token=<token>
```

The project token is stored as a GitHub Actions secret (`CHROMATIC_PROJECT_TOKEN`). Do not commit it to source control.

### Reviewing visual changes

1. Open the Chromatic build link from the PR status check
2. Review each flagged change — accept intentional changes, deny regressions
3. Accepted changes become the new baseline

### Future expansion plans

The current setup snapshots stories in Spend dark + light only. The theme matrix can be expanded using Chromatic's [modes](https://www.chromatic.com/docs/modes/) feature to capture all BU/theme combinations:

| Phase                 | Coverage                                         | Snapshots/build | Notes                                        |
| --------------------- | ------------------------------------------------ | --------------- | -------------------------------------------- |
| **Phase 1 (current)** | Spend light + dark                               | ~72             | Lean start within free tier                  |
| **Phase 2**           | All 5 BUs x 2 themes for shared components only  | ~200            | BU page stories only get their own BU        |
| **Phase 3**           | Full matrix — all 5 BUs x 2 themes x all stories | ~360            | Requires paid plan or snapshot budget review |

To enable multi-mode snapshots, add a `modes` configuration to `.storybook/modes.ts` that overrides the `theme` and `businessUnit` globals per snapshot. See the [Chromatic modes docs](https://www.chromatic.com/docs/modes/) for setup details.

### Packages

- `chromatic` — CLI for publishing Storybook builds to Chromatic
- `@chromatic-com/storybook` — Storybook addon that integrates Chromatic into the Storybook UI

---

## CI/CD Integration

### Chromatic Workflow (`.github/workflows/chromatic.yml`)

Runs on every push and PR to `main`:

```yaml
- uses: pnpm/action-setup@v4           # Install pnpm (version from packageManager field)
- uses: actions/setup-node@v4
    with: { node-version: 20, cache: pnpm }
- run: pnpm install --frozen-lockfile   # Deterministic install
- uses: chromaui/action@latest
    with: { workingDir: apps/web }      # Point Chromatic to the app
```

### Deploy Workflow (`.github/workflows/deploy-pages.yml`)

Builds and deploys to GitHub Pages on push to `main`:

```yaml
- run: pnpm install --frozen-lockfile
- run: pnpm --filter web exec tsc --noEmit # Type check
- run: pnpm build # Turbo: tokens -> web
- run: pnpm --filter web build-storybook # Storybook static build
# Combines app dist + storybook into one Pages site
```

Both workflows use `pnpm/action-setup@v4` which reads the `packageManager` field from `package.json` to install the exact pnpm version used locally, ensuring reproducible installs.
