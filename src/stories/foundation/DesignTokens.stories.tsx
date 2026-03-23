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
    if (ctx.fillStyle === '#000000' && !value.includes('0, 0, 0') && value !== 'black') {
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
        <p className="font-mono text-sm text-muted-foreground">Resolving tokens...</p>
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
      <h1 className="font-sans font-bold text-2xl text-foreground mb-2">Design Tokens</h1>
      <p className="font-sans text-sm text-muted-foreground mb-1">
        Components use semantic tokens (<code className="font-mono text-xs text-[#6c6fe4]">bg-surface</code>,{' '}
        <code className="font-mono text-xs text-[#6c6fe4]">text-accent</code>) that resolve through
        primitives to final hex values. Each BU remaps the same semantic tokens to its own palette.
      </p>
      <p className="font-mono text-xs text-muted-foreground mb-8">
        var(--teal) → var(--color-accent) → bg-accent
      </p>

      {/* Mode Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-sans text-xs text-muted-foreground mr-1">Mode:</span>
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
                  <span className="font-sans font-semibold text-xs capitalize" style={{ color: BU_ACCENTS[bu] }}>
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
                      const val = resolved[token.cssVar]?.[bu]?.[activeMode] || '—';
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
