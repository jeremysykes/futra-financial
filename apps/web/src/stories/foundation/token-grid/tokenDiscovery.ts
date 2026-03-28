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
 * Recursively collect --color-* properties from CSS rules,
 * descending into @layer, @media, @supports, and other grouping rules.
 */
function collectColorProps(rules: CSSRuleList, out: Set<string>): void {
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSStyleRule) {
      const style = rule.style;
      for (let i = 0; i < style.length; i++) {
        const prop = style[i];
        if (prop.startsWith('--color-')) {
          out.add(prop);
        }
      }
    } else if ('cssRules' in rule && (rule as CSSGroupingRule).cssRules) {
      collectColorProps((rule as CSSGroupingRule).cssRules, out);
    }
  }
}

/**
 * Discover all --color-* semantic tokens from the live document stylesheets.
 * Returns tokens grouped by category in display order.
 */
export function discoverTokens(): TokenInfo[] {
  const tokenNames = new Set<string>();

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      collectColorProps(sheet.cssRules, tokenNames);
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
