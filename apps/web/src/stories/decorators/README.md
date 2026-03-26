# Storybook Decorators

Single source of truth for all Storybook decorators in the Futra Financial design system.

## Rules

1. **All decorators live here.** No decorator definitions in story files, `.storybook/`, or anywhere else.
2. **Token-derived only.** All visual properties (backgrounds, colors, spacing) come from Tailwind CSS variable tokens. No hardcoded hex values.
3. **Import from the barrel.** Always `import { ... } from '../decorators'` (or appropriate relative path). Never import individual files directly.
4. **Component problem, not decorator problem.** If a component doesn't render correctly in `withStoryDisplay()`, fix the component — don't add a special-case decorator.

## Decorators

### `withThemeContext`

Global decorator registered in `.storybook/preview.tsx`. Applied to every story automatically.

**What it does:**

- Reads `theme` and `businessUnit` globals from the Storybook toolbar
- Applies `.dark` class for dark mode
- Sets `data-business-unit` attribute for BU token switching
- Applies `bg-background text-foreground` base classes

**You do not import this in story files.** It's registered once in `preview.tsx`.

### `withStoryDisplay(options?)`

Per-story decorator for component display presentation.

**Options:**

| Option         | Type                 | Default    | Description                                           |
| -------------- | -------------------- | ---------- | ----------------------------------------------------- |
| `maxWidth`     | `number`             | —          | Constrains component max width in pixels              |
| `containFixed` | `boolean`            | `false`    | Enables fixed-position containment                    |
| `height`       | `number`             | —          | Height of containment area (only with `containFixed`) |
| `layout`       | `'single' \| 'grid'` | `'single'` | Display layout mode                                   |
| `columns`      | `number`             | —          | Grid columns (only with `layout: 'grid'`)             |
| `gap`          | `string`             | `'1rem'`   | Grid gap (only with `layout: 'grid'`)                 |

**Always applied:** `bg-background` (token-derived), `p-8` (consistent padding), no rounded corners.

**Usage:**

```ts
import { withStoryDisplay } from '../decorators';

// Standard — most components
decorators: [withStoryDisplay()];

// Constrained width — cards, small components
decorators: [withStoryDisplay({ maxWidth: 300 })];

// Fixed-position containment — navbars, sticky headers
decorators: [withStoryDisplay({ containFixed: true, height: 100 })];

// Variant grid — showcase multiple variants side by side
decorators: [withStoryDisplay({ layout: 'grid', columns: 3 })];
```

## Adding New Options

Before adding an option to `withStoryDisplay`, ask:

1. **Is this a display concern or a component concern?** If the component needs a special background to be visible, the component should handle its own contrast — not the decorator.
2. **Will multiple stories use this?** If only one story needs it, the component likely needs fixing instead.
3. **Does it derive from tokens?** If the option requires hardcoded values, it violates the design system. Find a token-based approach.
