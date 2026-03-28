# Design Token Pipeline

This document explains how Futra Financial manages design tokens — from authoring in JSON to rendered UI. It covers the two-layer token architecture, the Style Dictionary build pipeline, theme switching, and monorepo orchestration with Turborepo.

---

## Table of Contents

1. [Repository Structure](#repository-structure)
2. [Design Token Architecture](#design-token-architecture)
3. [The Token Pipeline](#the-token-pipeline)
4. [How Themes Work](#how-themes-work)
5. [Build Orchestration with Turborepo](#build-orchestration-with-turborepo)

---

## Repository Structure

The project is a **pnpm + Turborepo monorepo** with two packages:

```
futra-financial/
├── apps/
│   └── web/                          ← Vite 7 + React 19 + Tailwind CSS 4 app
│       ├── src/
│       │   ├── tailwind.css          ← Imports @futra/tokens, defines semantic tokens
│       │   ├── components/           ← React components (CVA + Tailwind utility classes)
│       │   └── stories/              ← Storybook stories + decorators
│       ├── .storybook/               ← Storybook 10 config
│       ├── vite.config.ts            ← Vite + Vitest config
│       └── package.json
├── packages/
│   └── tokens/                       ← @futra/tokens — design token package
│       ├── src/tokens.json           ← DTCG source of truth (W3C Design Tokens format)
│       ├── config/style-dictionary.config.ts
│       └── dist/primitives.css       ← Generated output (gitignored)
├── turbo.json                        ← Task pipeline
├── pnpm-workspace.yaml               ← Workspace definition
└── package.json                      ← Root scripts (delegates to turbo)
```

**Why a monorepo?** Tokens are a shared concern. By isolating them in `@futra/tokens`, we get:

- A single source of truth that multiple apps/packages can depend on
- A clear build dependency: tokens build first, then consumers
- The ability to add future output formats (iOS, Android, Figma sync) without touching the web app

---

## Design Token Architecture

The system uses a **two-layer token architecture**:

### Layer 1: Primitive Tokens (raw values)

These are the actual color values — hex codes and rgba values. They live in `packages/tokens/src/tokens.json` in [W3C Design Tokens Community Group (DTCG)](https://design-tokens.github.io/community-group/format/) format:

```json
{
  "indigo": { "$value": "#6c6fe4", "$type": "color" },
  "spend": {
    "void": { "$value": "#0f0f12", "$type": "color" }
  }
}
```

**Key design decisions:**

- **DTCG format** (`$value`, `$type`) is the W3C standard for design tokens. It's tool-agnostic — Figma, Style Dictionary, and other tools all understand it.
- **Structured to match output.** Shared tokens (indigo, teal, coral) sit at root level — Style Dictionary generates flat names like `--indigo`. BU tokens are nested under their group — generating prefixed names like `--spend-void`. This means zero custom configuration.
- **Grouped by palette**, not by usage. Each BU (`spend`, `save`, `credit`, `plan`, `together`) has its own group. `default` holds the white-label theme.
- **98 total primitives** across 7 groups.

### Layer 2: Semantic Tokens (contextual meaning)

These live in `apps/web/src/tailwind.css` and map primitives to **roles** like `background`, `foreground`, `primary`, `muted`:

```css
@theme {
  --color-background: var(--white);
  --color-primary: var(--default-primary);
  --color-accent: var(--indigo);
}
```

Components only ever reference semantic tokens via Tailwind utility classes (`bg-background`, `text-foreground`, `bg-primary`). They never reference primitives directly. This means you can completely change a business unit's visual identity by remapping the semantic layer — no component changes needed.

### Business Unit Theming

Each of the 5 business units overrides the semantic layer using CSS attribute selectors:

```css
[data-business-unit='spend'] {
  --color-background: var(--spend-cloud);
  --color-primary: var(--indigo);
}

[data-business-unit='spend'].dark,
.dark [data-business-unit='spend'] {
  --color-background: var(--spend-void);
  --color-primary: var(--indigo);
}
```

At runtime, a `data-business-unit` attribute on a wrapper element and a `.dark` class on the root activate the correct theme. All 5 BUs x 2 modes (light/dark) = 10 theme combinations, all driven by CSS custom properties.

---

## The Token Pipeline

Here's what happens when a designer says "change the Spend primary color":

### Step 1: Edit the source

Open `packages/tokens/src/tokens.json` and change the value:

```json
"indigo": { "$value": "#7070e8", "$type": "color" }
```

### Step 2: Style Dictionary builds CSS

Run `pnpm --filter @futra/tokens build`. This invokes Style Dictionary 4, which:

1. Reads `src/tokens.json`
2. Applies the built-in `css/variables` format with the standard `css` transform group
3. Outputs `dist/primitives.css` — a plain `:root { ... }` block with all 98 variables

**No custom configuration needed.** The token JSON is structured so that Style Dictionary's default behavior produces the exact variable names the semantic layer expects. Shared tokens sit at the root level (generating flat names like `--indigo`), while BU tokens are nested under their group name (generating prefixed names like `--spend-void`). This follows the project's "facilitate, don't configure" principle — shape the data so the tool works out of the box.

### Step 3: Vite resolves the import

In `apps/web/src/tailwind.css`:

```css
@import '@futra/tokens/primitives.css';
```

The `@futra/tokens` package has this in its `package.json`:

```json
"exports": {
  "./primitives.css": "./dist/primitives.css"
}
```

Vite resolves `@futra/tokens/primitives.css` to `packages/tokens/dist/primitives.css` via the pnpm workspace symlink. The `:root` block from the generated file is injected before the `@theme` block, so all `var()` references in semantic tokens resolve correctly.

### Step 4: Tailwind generates utilities

Tailwind CSS 4 reads the `@theme` block and generates utility classes (`bg-background`, `text-primary`, etc.) that map to the semantic custom properties. Components use these utilities via CVA (Class Variance Authority):

```tsx
const buttonVariants = cva('rounded-lg font-medium', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover',
    },
  },
});
```

### The full chain

```
tokens.json (DTCG)
  -> Style Dictionary (build)
    -> primitives.css (:root variables)
      -> tailwind.css (@import + @theme semantic mapping)
        -> Tailwind CSS 4 (utility generation)
          -> CVA components (variant classes)
            -> Rendered UI (themed by data-business-unit + .dark)
```

---

## How Themes Work

Theme switching at runtime requires **zero JavaScript re-rendering of styles**. It works entirely through CSS cascade:

1. **Primitives** are declared at `:root` — always available globally
2. **Semantic tokens** are declared in `@theme` (Tailwind's theme layer) for the default light theme
3. **Dark mode** overrides semantic tokens inside `.dark { ... }` in `@layer base`
4. **BU themes** override semantic tokens inside `[data-business-unit='spend'] { ... }` also in `@layer base`
5. **BU dark themes** combine both: `[data-business-unit='spend'].dark, .dark [data-business-unit='spend'] { ... }`

The `@custom-variant dark (&:where(.dark, .dark *))` directive tells Tailwind that `.dark` is the dark mode trigger (instead of `prefers-color-scheme`), enabling manual dark mode toggling.

---

## Build Orchestration with Turborepo

`turbo.json` defines the task dependency graph:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

**`"dependsOn": ["^build"]`** means: before building any package, first build all of its workspace dependencies. So when you run `pnpm build`:

1. Turborepo resolves the dependency graph: `web` depends on `@futra/tokens`
2. `@futra/tokens` builds first (Style Dictionary -> `dist/primitives.css`)
3. `web` builds second (TypeScript check -> Vite build, which can now resolve the import)

Turborepo also provides:

- **Task caching**: If `tokens.json` and the Style Dictionary config haven't changed, the tokens build is skipped entirely (cache hit)
- **Parallel execution**: Independent tasks run concurrently across all CPU cores
- **Remote caching** (optional): Share build caches across CI machines via Vercel
