import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';

/**
 * All token definitions. The `variable` is the CSS custom property name.
 * Values are resolved at runtime from getComputedStyle so this page
 * always reflects the actual token state — no manual sync needed.
 */
const TOKEN_CATEGORIES = [
  {
    title: 'Background Colors',
    tokens: [
      { variable: '--color-background', tailwind: 'bg-background', description: 'Page background' },
      { variable: '--color-surface', tailwind: 'bg-surface', description: 'Cards, elevated containers' },
      { variable: '--color-secondary', tailwind: 'bg-secondary', description: 'Highlight areas, elevated states' },
      { variable: '--color-muted', tailwind: 'bg-muted', description: 'Subtle backgrounds, tracks' },
    ],
  },
  {
    title: 'Foreground Colors',
    tokens: [
      { variable: '--color-foreground', tailwind: 'text-foreground', description: 'Primary text' },
      { variable: '--color-muted-foreground', tailwind: 'text-muted-foreground', description: 'Secondary text, captions' },
      { variable: '--color-primary-foreground', tailwind: 'text-primary-foreground', description: 'Text on primary backgrounds' },
      { variable: '--color-secondary-foreground', tailwind: 'text-secondary-foreground', description: 'Text on secondary backgrounds' },
      { variable: '--color-destructive-foreground', tailwind: 'text-destructive-foreground', description: 'Text on destructive backgrounds' },
    ],
  },
  {
    title: 'Brand & Interactive',
    tokens: [
      { variable: '--color-primary', tailwind: 'bg-primary', description: 'Action color (Indigo)' },
      { variable: '--color-primary-hover', tailwind: 'hover:bg-primary-hover', description: 'Primary hover state' },
      { variable: '--color-secondary-hover', tailwind: 'hover:bg-secondary-hover', description: 'Secondary hover state' },
      { variable: '--color-accent', tailwind: 'text-accent', description: 'BU-specific accent color' },
      { variable: '--color-ring', tailwind: 'ring-ring', description: 'Focus ring indicator' },
    ],
  },
  {
    title: 'Status Colors',
    tokens: [
      { variable: '--color-positive', tailwind: 'text-positive', description: 'Positive / success' },
      { variable: '--color-negative', tailwind: 'text-negative', description: 'Negative / error' },
      { variable: '--color-caution', tailwind: 'text-caution', description: 'Warning / caution' },
      { variable: '--color-destructive', tailwind: 'bg-destructive', description: 'Destructive actions' },
    ],
  },
  {
    title: 'Borders',
    tokens: [
      { variable: '--color-border', tailwind: 'border-border', description: 'Default border color' },
    ],
  },
  {
    title: 'Animations',
    tokens: [
      { variable: '--animate-interval', tailwind: 'animate-fade-in-up (delay)', description: 'Stagger delay between animated items' },
      { variable: '--animate-accordion-down', tailwind: 'animate-accordion-down', description: 'Accordion open animation' },
      { variable: '--animate-accordion-up', tailwind: 'animate-accordion-up', description: 'Accordion close animation' },
    ],
  },
];

function resolveValue(variable: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim() || '—';
}

function TokenRow({ variable, tailwind, description }: { variable: string; tailwind: string; description: string }) {
  const resolved = useMemo(() => resolveValue(variable), [variable]);
  const isColor = variable.startsWith('--color-');

  return (
    <tr className="border-b border-[#e5e5e5] dark:border-[#333]">
      <td className="py-3 pr-4 align-top">
        <div className="flex items-center gap-2">
          {isColor && (
            <div
              className="w-5 h-5 rounded border border-[#ccc] dark:border-[#555] shrink-0"
              style={{ backgroundColor: `var(${variable})` }}
            />
          )}
          <code className="font-mono text-xs text-[#6C6FE4]">{variable}</code>
        </div>
      </td>
      <td className="py-3 px-4 align-top">
        <code className="font-mono text-[11px] text-[#111] dark:text-[#eee]">{tailwind}</code>
      </td>
      <td className="py-3 px-4 align-top">
        <code className="font-mono text-[11px] text-[#888] break-all">{resolved}</code>
      </td>
      <td className="py-3 pl-4 align-top">
        <span className="font-sans text-xs text-[#666] dark:text-[#999]">{description}</span>
      </td>
    </tr>
  );
}

function DesignTokensPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 min-h-screen bg-white dark:bg-[#111]">
      <h1 className="font-sans font-bold text-3xl text-[#111] dark:text-[#eee] mb-2">Design Tokens</h1>
      <p className="font-sans text-base text-[#666] dark:text-[#999] mb-4">
        All tokens are CSS custom properties defined in <code className="font-mono text-[#6C6FE4]">tailwind.css</code>.
        Values shown are resolved live from the current theme — switch BU and light/dark mode in the toolbar to see how tokens change.
      </p>
      <p className="font-sans text-sm text-[#888] mb-12">
        Tokens are the single source of truth. Components reference them via Tailwind utility classes. Never hardcode hex values in components.
      </p>

      {TOKEN_CATEGORIES.map((category) => (
        <div key={category.title} className="mb-10">
          <h2 className="font-sans font-semibold text-lg text-[#111] dark:text-[#eee] mb-4">{category.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e5e5] dark:border-[#333]">
                  <th className="py-2 pr-4 text-left font-sans font-medium text-[#888] w-[280px]">Token</th>
                  <th className="py-2 px-4 text-left font-sans font-medium text-[#888] w-[200px]">Tailwind</th>
                  <th className="py-2 px-4 text-left font-sans font-medium text-[#888] w-[220px]">Resolved Value</th>
                  <th className="py-2 pl-4 text-left font-sans font-medium text-[#888]">Usage</th>
                </tr>
              </thead>
              <tbody>
                {category.tokens.map((token) => (
                  <TokenRow key={token.variable} {...token} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundation/Design Tokens',
  component: DesignTokensPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof DesignTokensPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'spend' },
};
