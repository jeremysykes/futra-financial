# Testing

This project uses [Vitest](https://vitest.dev/) with two distinct test projects that validate different aspects of the component library.

## Quick Reference

| Command | What it runs |
|---|---|
| `npm test` | Both test suites |
| `npm run test:interactions` | Interaction tests (browser) |
| `npm run test:interactions:watch` | Interaction tests in watch mode |
| `npm run test:documentation` | Documentation tests (Node.js) |

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
