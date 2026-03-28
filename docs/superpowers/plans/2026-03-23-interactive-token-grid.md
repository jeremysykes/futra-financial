# Interactive Token Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing Design Tokens story with an interactive matrix grid showing semantic token values across all 5 BUs with drill-down details and mode toggle.

**Architecture:** Single Storybook story file that dynamically discovers `--color-*` tokens from stylesheets at runtime, resolves all values upfront across 5 BUs x 2 modes via hidden DOM containers, and renders an interactive matrix with expandable drill-down rows. Primitive variable chains are parsed from a Vite `?raw` import of `tailwind.css`.

**Tech Stack:** React, TypeScript, Storybook 10, Tailwind CSS v4, Vite `?raw` imports

**Spec:** `docs/specs/2026-03-23-interactive-token-grid-design.md`

---

### Task 1: CSS Source Parser — Extract Variable Chains from Raw CSS

**Files:**

- Create: `src/stories/foundation/token-grid/parseCssSource.ts`

This utility imports `tailwind.css` as a raw string and extracts:

1. Default semantic token declarations (e.g., `--color-accent: var(--teal)`)
2. Per-BU override mappings (e.g., `[data-business-unit='save'] { --color-accent: var(--save-grove) }`)
3. Dark mode override mappings

- [ ] **Step 1: Create the parser file with types**

```ts
// src/stories/foundation/token-grid/parseCssSource.ts

// Vite raw import — returns the source CSS as a string before compilation
import rawCss from '../../../tailwind.css?raw';

export type BusinessUnit = 'spend' | 'save' | 'credit' | 'plan' | 'together';

export const BUSINESS_UNITS: BusinessUnit[] = [
  'spend',
  'save',
  'credit',
  'plan',
  'together',
];

export const BU_DEFAULT_MODES: Record<BusinessUnit, 'light' | 'dark'> = {
  spend: 'dark',
  save: 'light',
  credit: 'light',
  plan: 'dark',
  together: 'light',
};

type ChainMap = Record<string, string>; // token name -> primitive var reference

export type CssSourceData = {
  /** Default chains: e.g. { '--color-accent': 'var(--teal)' } */
  defaultChains: ChainMap;
  /** Dark mode chains: e.g. { '--color-accent': 'var(--default-dark-accent)' } */
  darkChains: ChainMap;
  /** Per-BU chains: e.g. { spend: { '--color-accent': 'var(--teal)' } } */
  buChains: Record<BusinessUnit, ChainMap>;
  /** Per-BU dark mode chains */
  buDarkChains: Record<BusinessUnit, ChainMap>;
};
```

- [ ] **Step 2: Implement the parser**

Add to the same file, after the types:

```ts
/**
 * Parse var() references from CSS source text.
 * Matches patterns like: --color-accent: var(--teal);
 * Returns a map of token name -> raw value string.
 */
function parseDeclarations(cssBlock: string): ChainMap {
  const map: ChainMap = {};
  const re = /(--color-[\w-]+)\s*:\s*([^;]+);/g;
  let match;
  while ((match = re.exec(cssBlock)) !== null) {
    map[match[1]] = match[2].trim();
  }
  return map;
}

/**
 * Extract all blocks matching a given selector pattern from raw CSS.
 * Returns the content between { and } for each match.
 */
function extractBlocks(css: string, selectorPattern: RegExp): string[] {
  const blocks: string[] = [];
  let match;

  while ((match = selectorPattern.exec(css)) !== null) {
    const openBrace = css.indexOf('{', match.index + match[0].length);
    if (openBrace === -1) break;

    let depth = 1;
    let i = openBrace + 1;
    while (i < css.length && depth > 0) {
      if (css[i] === '{') depth++;
      if (css[i] === '}') depth--;
      i++;
    }
    blocks.push(css.slice(openBrace + 1, i - 1));
    selectorPattern.lastIndex = i;
  }

  return blocks;
}

export function parseCssSource(): CssSourceData {
  const defaultChains: ChainMap = {};
  const darkChains: ChainMap = {};
  const buChains = Object.fromEntries(
    BUSINESS_UNITS.map((bu) => [bu, {} as ChainMap]),
  ) as Record<BusinessUnit, ChainMap>;
  const buDarkChains = Object.fromEntries(
    BUSINESS_UNITS.map((bu) => [bu, {} as ChainMap]),
  ) as Record<BusinessUnit, ChainMap>;

  // 1. Parse @theme block for default semantic token declarations
  const themeBlocks = extractBlocks(rawCss, /@theme\s*/g);
  for (const block of themeBlocks) {
    Object.assign(defaultChains, parseDeclarations(block));
  }

  // 2. Parse .dark block for dark mode overrides
  const darkBlocks = extractBlocks(rawCss, /\.dark\s*\{/g);
  for (const block of darkBlocks) {
    Object.assign(darkChains, parseDeclarations(block));
  }

  // 3. Parse per-BU blocks
  for (const bu of BUSINESS_UNITS) {
    // Light mode: [data-business-unit='spend'] { ... }
    const buLightBlocks = extractBlocks(
      rawCss,
      new RegExp(`\\[data-business-unit=['"]${bu}['"]\\]\\s*\\{`, 'g'),
    );
    for (const block of buLightBlocks) {
      Object.assign(buChains[bu], parseDeclarations(block));
    }

    // Dark mode: [data-business-unit='spend'].dark,\n.dark [data-business-unit='spend'] { ... }
    // Match the first selector before the comma — extractBlocks will find the { on the next line
    const buDarkBlockPattern = new RegExp(
      `\\[data-business-unit=['"]${bu}['"]\\]\\.dark\\s*,`,
      'g',
    );
    const buDarkBlocks = extractBlocks(rawCss, buDarkBlockPattern);
    for (const block of buDarkBlocks) {
      Object.assign(buDarkChains[bu], parseDeclarations(block));
    }
  }

  return { defaultChains, darkChains, buChains, buDarkChains };
}
```

- [ ] **Step 3: Verify the parser works in Storybook**

Temporarily add a `console.log(parseCssSource())` at the end of the file, run `npm run storybook`, and check the browser console. Verify that:

- `defaultChains` contains entries like `'--color-accent': 'var(--teal)'`
- `buChains.save` contains entries like `'--color-accent': 'var(--save-grove)'`
- Remove the `console.log` after verification.

- [ ] **Step 4: Commit**

```bash
git add src/stories/foundation/token-grid/parseCssSource.ts
git commit -m "feat(token-grid): add CSS source parser for variable chain extraction"
```

---

### Task 2: Token Discovery and Category Grouping

**Files:**

- Create: `src/stories/foundation/token-grid/tokenDiscovery.ts`

Discovers `--color-*` tokens from live stylesheets and groups them into categories via prefix matching.

- [ ] **Step 1: Create the discovery module**

```ts
// src/stories/foundation/token-grid/tokenDiscovery.ts

export type Category =
  | 'Backgrounds'
  | 'Foregrounds'
  | 'Brand & Interactive'
  | 'Status'
  | 'Borders'
  | 'Other';

export type TokenInfo = {
  cssVar: string; // '--color-accent'
  name: string; // 'accent' (stripped prefix)
  tailwind: string; // 'text-accent / bg-accent'
  category: Category;
};

const CATEGORY_RULES: Array<{
  match: RegExp;
  category: Category;
  prefix: string;
}> = [
  {
    match: /^(background|surface|secondary|muted)$/,
    category: 'Backgrounds',
    prefix: 'bg',
  },
  { match: /^(foreground)$/, category: 'Foregrounds', prefix: 'text' },
  {
    match: /^(primary|accent|ring)$/,
    category: 'Brand & Interactive',
    prefix: 'bg',
  },
  {
    match: /^(positive|negative|caution)$/,
    category: 'Status',
    prefix: 'text',
  },
  { match: /^(destructive)$/, category: 'Status', prefix: 'bg' },
  { match: /^(border)$/, category: 'Borders', prefix: 'border' },
];

function categorize(name: string): { category: Category; prefix: string } {
  // Special rule: any token ending in '-foreground' goes to Foregrounds
  if (name.endsWith('-foreground')) {
    return { category: 'Foregrounds', prefix: 'text' };
  }

  // Tokens ending in '-hover' follow their base token's category
  const baseName = name.replace(/-hover$/, '');
  const firstSegment = baseName.split('-')[0];

  for (const rule of CATEGORY_RULES) {
    if (rule.match.test(firstSegment)) {
      return { category: rule.category, prefix: rule.prefix };
    }
  }

  return { category: 'Other', prefix: 'bg' };
}

function deriveTailwind(name: string, prefix: string): string {
  // Special cases where the Tailwind utility prefix differs from category default
  if (name === 'ring') return `ring-ring`;
  if (name === 'border') return `border-border`;
  if (name.endsWith('-foreground')) return `text-${name}`;
  if (name.endsWith('-hover')) return `hover:${prefix}-${name}`;

  return `${prefix}-${name}`;
}

/**
 * Discover all --color-* semantic tokens from the live document stylesheets.
 * Returns tokens grouped by category in display order.
 */
export function discoverTokens(): TokenInfo[] {
  const tokenNames = new Set<string>();

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      for (const rule of Array.from(sheet.cssRules)) {
        if (rule instanceof CSSStyleRule) {
          const style = rule.style;
          for (let i = 0; i < style.length; i++) {
            const prop = style[i];
            if (prop.startsWith('--color-')) {
              tokenNames.add(prop);
            }
          }
        }
      }
    } catch {
      // Skip cross-origin stylesheets
    }
  }

  const tokens: TokenInfo[] = [];
  for (const cssVar of tokenNames) {
    const name = cssVar.replace(/^--color-/, '');
    const { category, prefix } = categorize(name);
    tokens.push({
      cssVar,
      name,
      tailwind: deriveTailwind(name, prefix),
      category,
    });
  }

  // Sort by category order, then alphabetically within category
  const categoryOrder: Category[] = [
    'Backgrounds',
    'Foregrounds',
    'Brand & Interactive',
    'Status',
    'Borders',
    'Other',
  ];

  tokens.sort((a, b) => {
    const catDiff =
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
    if (catDiff !== 0) return catDiff;
    return a.name.localeCompare(b.name);
  });

  return tokens;
}
```

- [ ] **Step 2: Verify discovery in Storybook**

Temporarily import and log in the existing story to confirm tokens are discovered:

```ts
import { discoverTokens } from './token-grid/tokenDiscovery';
console.log(discoverTokens());
```

Check the browser console — should list ~19 tokens across 5 categories. Remove after verification.

- [ ] **Step 3: Commit**

```bash
git add src/stories/foundation/token-grid/tokenDiscovery.ts
git commit -m "feat(token-grid): add dynamic token discovery with category grouping"
```

---

### Task 3: Token Resolution Hook — Upfront Resolution of All BU × Mode Combinations

**Files:**

- Create: `src/stories/foundation/token-grid/useResolvedTokens.ts`

A React hook that renders hidden DOM containers, resolves all tokens across 5 BUs × 2 modes, and caches the results.

- [ ] **Step 1: Create the resolution hook**

```ts
// src/stories/foundation/token-grid/useResolvedTokens.ts

import { useEffect, useRef, useState } from 'react';
import type { BusinessUnit } from './parseCssSource';
import { BUSINESS_UNITS } from './parseCssSource';
import type { TokenInfo } from './tokenDiscovery';
import { discoverTokens } from './tokenDiscovery';

export type ResolvedTokens = Record<
  string, // CSS variable name
  Record<BusinessUnit, { light: string; dark: string }>
>;

export type UseResolvedTokensResult = {
  tokens: TokenInfo[];
  resolved: ResolvedTokens;
  loading: boolean;
};

export function useResolvedTokens(): UseResolvedTokensResult {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [resolved, setResolved] = useState<ResolvedTokens>({});
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Discover tokens from stylesheets
    const discoveredTokens = discoverTokens();
    setTokens(discoveredTokens);

    if (discoveredTokens.length === 0) {
      setLoading(false);
      return;
    }

    // 2. Create hidden resolver container
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.opacity = '0';
    container.style.pointerEvents = 'none';
    container.style.width = '0';
    container.style.height = '0';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);
    containerRef.current = container;

    // 3. Create 10 resolver divs: 5 BUs × 2 modes
    const resolverMap: Record<string, HTMLElement> = {};

    for (const bu of BUSINESS_UNITS) {
      for (const mode of ['light', 'dark'] as const) {
        const key = `${bu}-${mode}`;

        // Outer wrapper — applies .dark class for dark mode
        const wrapper = document.createElement('div');
        if (mode === 'dark') {
          wrapper.classList.add('dark');
        }

        // Inner div — carries the data-business-unit attribute
        const inner = document.createElement('div');
        inner.setAttribute('data-business-unit', bu);

        // Also add .dark to inner for compound selectors like [data-business-unit].dark
        if (mode === 'dark') {
          inner.classList.add('dark');
        }

        wrapper.appendChild(inner);
        container.appendChild(wrapper);
        resolverMap[key] = inner;
      }
    }

    // 4. Wait one frame for styles to apply, then resolve
    requestAnimationFrame(() => {
      const result: ResolvedTokens = {};

      for (const token of discoveredTokens) {
        result[token.cssVar] = {} as Record<
          BusinessUnit,
          { light: string; dark: string }
        >;

        for (const bu of BUSINESS_UNITS) {
          const lightEl = resolverMap[`${bu}-light`];
          const darkEl = resolverMap[`${bu}-dark`];

          const lightVal =
            getComputedStyle(lightEl).getPropertyValue(token.cssVar).trim() ||
            '—';
          const darkVal =
            getComputedStyle(darkEl).getPropertyValue(token.cssVar).trim() ||
            '—';

          result[token.cssVar][bu] = { light: lightVal, dark: darkVal };
        }
      }

      // 5. Store results and clean up
      setResolved(result);
      setLoading(false);
      container.remove();
      containerRef.current = null;
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.remove();
      }
    };
  }, []);

  return { tokens, resolved, loading };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/stories/foundation/token-grid/useResolvedTokens.ts
git commit -m "feat(token-grid): add useResolvedTokens hook for upfront resolution"
```

---

### Task 4: Token Grid Story — Intro, Mode Toggle, and Matrix Layout

**Files:**

- Modify: `src/stories/foundation/DesignTokens.stories.tsx` (replace entirely)

Build the main story with intro block, mode toggle, and the matrix table (without drill-down yet).

- [ ] **Step 1: Create the barrel export**

```ts
// src/stories/foundation/token-grid/index.ts
export { parseCssSource } from './parseCssSource';
export type { CssSourceData, BusinessUnit } from './parseCssSource';
export { BUSINESS_UNITS, BU_DEFAULT_MODES } from './parseCssSource';
export { discoverTokens } from './tokenDiscovery';
export type { TokenInfo, Category } from './tokenDiscovery';
export { useResolvedTokens } from './useResolvedTokens';
export type { ResolvedTokens } from './useResolvedTokens';
```

- [ ] **Step 2: Replace DesignTokens.stories.tsx with the new story**

```tsx
// src/stories/foundation/DesignTokens.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';
import { withStoryDisplay } from '../decorators';
import {
  BUSINESS_UNITS,
  BU_DEFAULT_MODES,
  useResolvedTokens,
} from './token-grid';
import type { BusinessUnit, Category, TokenInfo } from './token-grid';

type ThemeMode = 'bu-defaults' | 'all-light' | 'all-dark';

/** BU accent colors for column header styling */
const BU_ACCENTS: Record<BusinessUnit, string> = {
  spend: '#50e3c2',
  save: '#2abfa3',
  credit: '#8b8fc7',
  plan: '#f59e0b',
  together: '#c2724e',
};

function getActiveMode(bu: BusinessUnit, mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'all-light') return 'light';
  if (mode === 'all-dark') return 'dark';
  return BU_DEFAULT_MODES[bu];
}

/**
 * Normalize a resolved CSS color to a hex string for display.
 * Handles rgb(), oklch(), and pass-through hex values.
 */
function toHex(value: string): string {
  if (!value || value === '—') return '—';
  if (value.startsWith('#')) return value;

  // Use a canvas to convert any CSS color string to hex
  try {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return value;
    ctx.fillStyle = '#000000'; // Reset to known state
    ctx.fillStyle = value;
    // If fillStyle is still #000000 and input wasn't black, canvas couldn't parse it
    // (e.g., oklch not supported in canvas). Return the raw value.
    if (
      ctx.fillStyle === '#000000' &&
      !value.includes('0, 0, 0') &&
      value !== 'black'
    ) {
      return value;
    }
    return ctx.fillStyle; // Returns hex
  } catch {
    return value;
  }
}

function TokenGridPage() {
  const { tokens, resolved, loading } = useResolvedTokens();
  const [mode, setMode] = useState<ThemeMode>('bu-defaults');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="font-mono text-sm text-muted-foreground">
          Resolving tokens...
        </p>
      </div>
    );
  }

  // Group tokens by category
  const grouped = new Map<Category, TokenInfo[]>();
  for (const token of tokens) {
    const list = grouped.get(token.category) || [];
    list.push(token);
    grouped.set(token.category, list);
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Intro */}
      <h1 className="font-sans font-bold text-2xl text-foreground mb-2">
        Design Tokens
      </h1>
      <p className="font-sans text-sm text-muted-foreground mb-1">
        Components use semantic tokens (
        <code className="font-mono text-xs text-[#6c6fe4]">bg-surface</code>,{' '}
        <code className="font-mono text-xs text-[#6c6fe4]">text-accent</code>)
        that resolve through primitives to final hex values. Each BU remaps the
        same semantic tokens to its own palette.
      </p>
      <p className="font-mono text-xs text-muted-foreground mb-8">
        var(--teal) → var(--color-accent) → bg-accent
      </p>

      {/* Mode Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-sans text-xs text-muted-foreground mr-1">
          Mode:
        </span>
        {(
          [
            { value: 'bu-defaults', label: 'BU Defaults' },
            { value: 'all-light', label: 'All Light' },
            { value: 'all-dark', label: 'All Dark' },
          ] as const
        ).map((opt) => (
          <button
            key={opt.value}
            onClick={() => setMode(opt.value)}
            className={`px-3 py-1.5 rounded-md font-sans text-xs font-medium transition-colors ${
              mode === opt.value
                ? 'bg-[#6c6fe4] text-white'
                : 'bg-secondary text-muted-foreground hover:bg-secondary-hover'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-sans font-medium text-muted-foreground w-[28%]">
                Token
              </th>
              {BUSINESS_UNITS.map((bu) => (
                <th key={bu} className="text-center py-3 px-2 w-[14.4%]">
                  <span
                    className="font-sans font-semibold text-xs capitalize"
                    style={{ color: BU_ACCENTS[bu] }}
                  >
                    {bu}
                  </span>
                  <div className="font-sans font-normal text-[10px] text-muted-foreground mt-0.5">
                    {getActiveMode(bu, mode)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from(grouped.entries()).map(([category, categoryTokens]) => (
              <Fragment key={category}>
                {/* Category header row */}
                <tr>
                  <td
                    colSpan={6}
                    className="pt-4 pb-2 px-4 font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#6c6fe4] border-t-2 border-border"
                  >
                    {category}
                  </td>
                </tr>

                {/* Token rows */}
                {categoryTokens.map((token) => (
                  <tr
                    key={token.cssVar}
                    className="border-b border-border/50 hover:bg-secondary/50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-4 text-muted-foreground">
                      {token.cssVar}
                    </td>
                    {BUSINESS_UNITS.map((bu) => {
                      const activeMode = getActiveMode(bu, mode);
                      const val =
                        resolved[token.cssVar]?.[bu]?.[activeMode] || '—';
                      const hex = toHex(val);
                      return (
                        <td key={bu} className="text-center py-2.5 px-2">
                          <div
                            className="w-6 h-6 rounded-md mx-auto border border-border/50"
                            style={{ backgroundColor: val }}
                            title={hex}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const meta = {
  title: 'Foundation/Design Tokens',
  component: TokenGridPage,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof TokenGridPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

- [ ] **Step 3: Verify in Storybook**

Run: `npm run storybook`

Check that:

- The story loads under Foundation/Design Tokens
- All ~19 semantic tokens appear grouped by category
- Swatches show correct colors for the default BU modes
- Mode toggle switches all columns between light/dark/defaults
- Column headers show BU names with mode labels
- Category headers display in indigo uppercase

- [ ] **Step 4: Commit**

```bash
git add src/stories/foundation/token-grid/index.ts src/stories/foundation/DesignTokens.stories.tsx
git commit -m "feat(token-grid): interactive matrix with mode toggle and category grouping"
```

---

### Task 5: Drill-Down Panel — Expandable Token Detail Rows

**Files:**

- Modify: `src/stories/foundation/DesignTokens.stories.tsx` (add drill-down interaction)

Add the expandable drill-down panel that shows larger swatches, hex values, Tailwind classes, and CSS variable chains.

- [ ] **Step 1: Import the CSS source parser at the top of the story**

Add to imports:

```tsx
import { parseCssSource } from './token-grid';
import type { CssSourceData } from './token-grid';
```

- [ ] **Step 2: Add chain resolution helper**

Add this function above `TokenGridPage`:

```tsx
/**
 * Get the CSS variable chain for a token in a specific BU/mode.
 * Falls back through: BU dark/light overrides → global dark override → default chain.
 */
function getChain(
  cssVar: string,
  bu: BusinessUnit,
  mode: 'light' | 'dark',
  source: CssSourceData,
): string {
  if (mode === 'dark') {
    // Check BU-specific dark override first
    const buDark = source.buDarkChains[bu]?.[cssVar];
    if (buDark) return buDark;
    // Then BU light override (some BUs only override in light)
    const buLight = source.buChains[bu]?.[cssVar];
    if (buLight) return buLight;
    // Then global dark override
    const globalDark = source.darkChains[cssVar];
    if (globalDark) return globalDark;
  } else {
    // Check BU-specific light override first
    const buLight = source.buChains[bu]?.[cssVar];
    if (buLight) return buLight;
  }

  // Fall back to default chain
  return source.defaultChains[cssVar] || 'direct value';
}
```

- [ ] **Step 3: Add expanded state and drill-down rendering to TokenGridPage**

Inside `TokenGridPage`, add state and source data:

```tsx
const [expanded, setExpanded] = useState<Set<string>>(new Set());
const [source] = useState<CssSourceData>(() => parseCssSource());

function toggleExpanded(cssVar: string) {
  setExpanded((prev) => {
    const next = new Set(prev);
    if (next.has(cssVar)) {
      next.delete(cssVar);
    } else {
      next.add(cssVar);
    }
    return next;
  });
}
```

Update the token row `<tr>` to call `toggleExpanded` on click, and add expand indicator:

```tsx
<tr
  key={token.cssVar}
  onClick={() => toggleExpanded(token.cssVar)}
  className={`border-b border-border/50 cursor-pointer transition-colors ${
    expanded.has(token.cssVar) ? 'bg-[#6c6fe4]/5' : 'hover:bg-secondary/50'
  }`}
>
  <td className="py-2.5 px-4 text-muted-foreground">
    <span className="mr-1.5 text-[10px]">
      {expanded.has(token.cssVar) ? '▾' : '▸'}
    </span>
    {token.cssVar}
  </td>
  {/* ... swatch cells unchanged ... */}
</tr>
```

Add the drill-down row immediately after the token row (inside the same fragment):

```tsx
{
  expanded.has(token.cssVar) && (
    <tr
      key={`${token.cssVar}-detail`}
      className="bg-[#6c6fe4]/5 border-b border-border/50"
    >
      <td colSpan={6} className="px-6 py-4">
        {/* Large swatches */}
        <div className="flex gap-4 mb-3">
          {BUSINESS_UNITS.map((bu) => {
            const activeMode = getActiveMode(bu, mode);
            const val = resolved[token.cssVar]?.[bu]?.[activeMode] || '—';
            const hex = toHex(val);
            return (
              <div key={bu} className="text-center">
                <div
                  className="w-11 h-11 rounded-lg mx-auto border border-border/50 mb-1"
                  style={{ backgroundColor: val }}
                />
                <div
                  className="font-sans text-[10px] font-semibold capitalize"
                  style={{ color: BU_ACCENTS[bu] }}
                >
                  {bu}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  {hex}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tailwind class */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-sans text-[10px] text-muted-foreground">
            Tailwind:
          </span>
          <code className="font-mono text-[10px] bg-secondary px-2 py-0.5 rounded text-foreground">
            {token.tailwind}
          </code>
        </div>

        {/* Variable chains */}
        <div className="flex items-start gap-2">
          <span className="font-sans text-[10px] text-muted-foreground shrink-0">
            Chain:
          </span>
          <div className="font-mono text-[10px] text-muted-foreground">
            {BUSINESS_UNITS.map((bu, i) => {
              const activeMode = getActiveMode(bu, mode);
              const chain = getChain(token.cssVar, bu, activeMode, source);
              return (
                <span key={bu}>
                  {i > 0 && <span className="mx-1.5">·</span>}
                  <span
                    className="capitalize"
                    style={{ color: BU_ACCENTS[bu] }}
                  >
                    {bu}
                  </span>
                  {': '}
                  {chain}
                </span>
              );
            })}
          </div>
        </div>
      </td>
    </tr>
  );
}
```

- [ ] **Step 4: Verify drill-down in Storybook**

Run: `npm run storybook`

Check that:

- Clicking a token row expands the drill-down panel below it
- Clicking again collapses it
- Multiple rows can be expanded simultaneously
- Drill-down shows 44px swatches with hex values per BU
- Tailwind class displays in a pill badge
- Variable chains show per-BU primitive references
- Switching mode toggle updates both swatches and chains in expanded rows

- [ ] **Step 5: Commit**

```bash
git add src/stories/foundation/DesignTokens.stories.tsx
git commit -m "feat(token-grid): add expandable drill-down with chains and Tailwind class"
```

---

### Task 6: Polish and Final Verification

**Files:**

- Modify: `src/stories/foundation/DesignTokens.stories.tsx` (minor polish)

Final visual polish pass and verification against the spec.

- [ ] **Step 1: Verify against spec checklist**

Open the story in Storybook and check each spec requirement:

| Requirement                                              | Check                                    |
| -------------------------------------------------------- | ---------------------------------------- |
| Replaces existing Design Tokens story                    | Same `title: 'Foundation/Design Tokens'` |
| Intro block with architecture explanation                | Visible at top                           |
| Mode toggle: BU Defaults / All Light / All Dark          | Three buttons, all functional            |
| BU default modes correct (Spend/Plan=dark, others=light) | Column headers show correct mode labels  |
| 5 BU columns with accent-colored headers                 | All present                              |
| Category divider rows in indigo uppercase                | All 5+ categories visible                |
| 24px swatches in collapsed rows                          | Correct size                             |
| Hover highlight on rows                                  | Visible cursor + bg change               |
| Expandable drill-down with 44px swatches                 | Click to expand works                    |
| Hex values in drill-down                                 | Displayed per BU                         |
| Tailwind class in pill badge                             | Displayed                                |
| CSS variable chain per BU                                | Displayed from raw CSS parse             |
| Multiple rows expandable                                 | Can open several at once                 |
| Dynamic token discovery                                  | No manual token list — all from CSS      |
| Uses withStoryDisplay() decorator                        | Configured in meta                       |

- [ ] **Step 2: Fix any issues found during verification**

Address any visual or functional issues discovered. Common things to check:

- Light-on-light swatches need a visible border
- Hex display for oklch() values converts correctly
- Empty/missing token values show "—" gracefully

- [ ] **Step 3: Final commit**

```bash
git add src/stories/foundation/DesignTokens.stories.tsx
git commit -m "feat(token-grid): polish and final verification"
```

---

## File Map Summary

| File                                                     | Action  | Purpose                                           |
| -------------------------------------------------------- | ------- | ------------------------------------------------- |
| `src/stories/foundation/token-grid/parseCssSource.ts`    | Create  | Parse raw CSS for variable chains                 |
| `src/stories/foundation/token-grid/tokenDiscovery.ts`    | Create  | Discover tokens from live stylesheets, categorize |
| `src/stories/foundation/token-grid/useResolvedTokens.ts` | Create  | Hook: resolve all tokens across BUs × modes       |
| `src/stories/foundation/token-grid/index.ts`             | Create  | Barrel export                                     |
| `src/stories/foundation/DesignTokens.stories.tsx`        | Replace | New interactive grid story                        |
