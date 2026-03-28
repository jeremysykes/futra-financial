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
