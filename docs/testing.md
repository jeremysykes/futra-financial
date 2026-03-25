# Testing

This project uses [Vitest](https://vitest.dev/) with two distinct test projects that validate different aspects of the component library.

## Quick Reference

| Command | What it runs |
|---|---|
| `npm test` | Both test suites |
| `npm run test:interactions` | Interaction tests (browser) |
| `npm run test:interactions:watch` | Interaction tests in watch mode |
| `npm run test:documentation` | Documentation tests (Node.js) |
| `npm run chromatic` | Visual regression tests (Chromatic) |

## Interaction Tests

**Command:** `npm run test:interactions`

**Runtime:** Headless Chromium via [Playwright](https://playwright.dev/)

**Vitest project:** `storybook`

**Tool:** [@storybook/addon-vitest](https://storybook.js.org/addons/@storybook/addon-vitest) — runs Storybook `play` functions as Vitest tests in a real browser environment.

### What they test

Interaction tests verify that components render correctly and respond to user actions. Each test is a `play` function defined directly on a story in `src/stories/`.

- **Interactive components** (Accordion, Button, Navbar, FAQSection, etc.) — simulate clicks, verify state changes (accordion expands, mobile menu toggles, onClick fires)
- **Content components** (HeroSection, Footer, TestimonialSection, etc.) — verify headings, labels, buttons, and child elements are present in the DOM
- **Visual components** (Badge, PhoneMockup, DashboardPreview, etc.) — smoke tests that confirm the component mounts without crashing

### Where they live

Play functions are co-located with their stories in `src/stories/**/*.stories.tsx`. Example:

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

### Viewing in Storybook

Play functions also run visually in the Storybook UI. Start Storybook with `npm run storybook`, navigate to a story, and open the **Interactions** tab in the bottom panel to see each step execute with pass/fail indicators.

### Prerequisites

Playwright browsers must be installed before running interaction tests for the first time:

```bash
npx playwright install
```

## Documentation Tests

**Command:** `npm run test:documentation`

**Runtime:** Node.js (no browser needed)

**Vitest project:** `unit`

**Test file:** `src/stories/__tests__/argTypes.test.ts`

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

## Visual Regression Tests (Chromatic)

**Command:** `npm run chromatic`

**Service:** [Chromatic](https://www.chromatic.com/) — cloud-based visual regression testing for Storybook.

**Project:** [futra-financial on Chromatic](https://www.chromatic.com/builds?appId=69c33ccc2ed05dca54e3f9ff)

### What it does

Chromatic captures a snapshot of every story and compares it against a baseline. When a visual change is detected, it flags the diff for review in the Chromatic web UI. This catches unintended regressions to colors, spacing, layout, and typography across all components.

### Current configuration (Phase 1 — Lean)

- **Theme coverage:** light + dark (Spend BU only)
- **Snapshots per build:** ~72 (36 stories x 2 themes)
- **Free tier budget:** ~5,000 snapshots/month (~69 builds)

### CI integration

Chromatic runs automatically via GitHub Actions (`.github/workflows/chromatic.yml`):

- **On pull requests:** compares the PR branch against the `main` baseline, posts a status check with a link to visual diffs
- **On push to main:** updates the baseline snapshots for future comparisons

### Running locally

To publish a one-off build for debugging:

```bash
npm run chromatic -- --project-token=<token>
```

The project token is stored as a GitHub Actions secret (`CHROMATIC_PROJECT_TOKEN`). Do not commit it to source control.

### Reviewing visual changes

1. Open the Chromatic build link from the PR status check
2. Review each flagged change — accept intentional changes, deny regressions
3. Accepted changes become the new baseline

### Future expansion plans

The current setup snapshots stories in Spend dark + light only. The theme matrix can be expanded using Chromatic's [modes](https://www.chromatic.com/docs/modes/) feature to capture all BU/theme combinations:

| Phase | Coverage | Snapshots/build | Notes |
|---|---|---|---|
| **Phase 1 (current)** | Spend light + dark | ~72 | Lean start within free tier |
| **Phase 2** | All 5 BUs x 2 themes for shared components only | ~200 | BU page stories only get their own BU |
| **Phase 3** | Full matrix — all 5 BUs x 2 themes x all stories | ~360 | Requires paid plan or snapshot budget review |

To enable multi-mode snapshots, add a `modes` configuration to `.storybook/modes.ts` that overrides the `theme` and `businessUnit` globals per snapshot. See the [Chromatic modes docs](https://www.chromatic.com/docs/modes/) for setup details.

### Packages

- `chromatic` — CLI for publishing Storybook builds to Chromatic
- `@chromatic-com/storybook` — Storybook addon that integrates Chromatic into the Storybook UI
