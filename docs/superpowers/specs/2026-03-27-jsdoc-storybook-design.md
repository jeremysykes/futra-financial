# JSDoc for Storybook Components

## Goal

Make JSDoc on component source files the single source of truth for prop descriptions. Storybook's react-docgen extracts JSDoc automatically into autodocs pages. Story `argTypes` retain only Storybook-specific metadata (categories, controls, disable).

## JSDoc Standard

### Props Interface

Every property in an exported props interface gets a `/** */` comment. Use `@default` for default values. Multi-line comments for props that need additional context.

```ts
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element using Radix Slot */
  asChild?: boolean;
}
```

### Component Export

A `/** */` block on the component describing what it does, when to use it, and any constraints. Include `@default` tags for CVA default variants.

```ts
/**
 * Primary action button with variant-driven styling.
 *
 * Supports `primary` and `inverse` intents with two size presets.
 * Use `asChild` to render as a different element (e.g., a link).
 *
 * @default intent "primary"
 * @default size "md"
 */
const Button = ({ ... }: ButtonProps) => { ... };
```

### Reference Example

`FocalImage.tsx` is the existing gold standard. All components should match its level of documentation: prop-level JSDoc with `@default` tags, and a component-level description explaining purpose and constraints.

## argTypes Migration

Remove `description` from all argTypes entries. Retain everything else.

### Before

```ts
argTypes: {
  intent: {
    description: 'Visual style variant',
    control: 'select',
    options: ['primary', 'inverse'],
    table: { category: 'Appearance' },
  },
  disabled: {
    description: 'Disables the button',
    control: 'boolean',
    table: { category: 'Behavior' },
  },
  asChild: { table: { disable: true } },
  children: { table: { disable: true } },
}
```

### After

```ts
argTypes: {
  intent: {
    control: 'select',
    options: ['primary', 'inverse'],
    table: { category: 'Appearance' },
  },
  disabled: {
    control: 'boolean',
    table: { category: 'Behavior' },
  },
  asChild: { table: { disable: true } },
  children: { table: { disable: true } },
}
```

### What argTypes Still Handles

| Concern | Why it stays in argTypes |
|---------|------------------------|
| `table.category` | Storybook UI grouping (Appearance, Layout, Content, Behavior) — no JSDoc equivalent |
| `table.disable` | Hiding complex JSX props from controls — Storybook-specific |
| `control` type | Override when Storybook's auto-inference is wrong |
| `options` | Subset of allowed values for select/radio controls |

## Test Changes

### Remove

The "every visible argType has a description" test in `argTypes.test.ts` (lines 297-306). This test enforces descriptions in argTypes, which will no longer be present after migration.

### Unchanged

All other tests pass without modification:

- "has argTypes defined"
- "every visible argType has a valid category"
- "every visible argType has a control type"
- "inline-radio and select controls have options"
- "CVA variant keys are covered by argTypes"
- "first story has default args for radio/select controls"
- "JSX props are hidden from controls"

## CLAUDE.md Update

Update the argTypes guidance to reflect that:

- Prop descriptions live in JSDoc on the component's props interface, not in argTypes
- argTypes only handle: `control`, `table.category`, `table.disable`, and `options`
- Every exported props interface and component must have JSDoc comments
- `FocalImage.tsx` is the reference standard

## Storybook Config

No changes required. `@storybook/addon-docs` with `react-docgen` (default for `@storybook/react-vite`) extracts JSDoc from TypeScript interfaces automatically. `tags: ['autodocs']` is already on all stories.

## Scope

| Target | Count | Action |
|--------|-------|--------|
| Component files | 28 | Add JSDoc to props interface + component export |
| Story files | 28 | Remove `description` from argTypes |
| argTypes.test.ts | 1 | Remove the description enforcement test |
| CLAUDE.md | 1 | Update argTypes and JSDoc guidance |
| FocalImage.tsx | 1 | Already documented — verify it matches standard |
| Storybook config | 0 | No changes needed |
