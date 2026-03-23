import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, useState } from 'react';
import {
  BUSINESS_UNITS,
  BU_DEFAULT_MODES,
  useResolvedTokens,
  parseCssSource,
} from './token-grid';
import type { BusinessUnit, Category, TokenInfo, CssSourceData } from './token-grid';

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
    const buDark = source.buDarkChains[bu]?.[cssVar];
    if (buDark) return buDark;
    const buLight = source.buChains[bu]?.[cssVar];
    if (buLight) return buLight;
    const globalDark = source.darkChains[cssVar];
    if (globalDark) return globalDark;
  } else {
    const buLight = source.buChains[bu]?.[cssVar];
    if (buLight) return buLight;
  }
  return source.defaultChains[cssVar] || 'direct value';
}

function TokenGridPage() {
  const { tokens, resolved, loading } = useResolvedTokens();
  const [mode, setMode] = useState<ThemeMode>('bu-defaults');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="font-mono text-sm text-[#888]">Resolving tokens...</p>
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
    <div className="max-w-[1400px] mx-auto px-6 py-12 min-h-screen bg-white dark:bg-[#111]">
      {/* Intro */}
      <h1 className="font-sans font-bold text-2xl text-[#111] dark:text-[#eee] mb-2">Design Tokens</h1>
      <p className="font-sans text-sm text-[#666] dark:text-[#999] mb-1">
        Components use semantic tokens (<code className="font-mono text-xs text-[#6c6fe4]">bg-surface</code>,{' '}
        <code className="font-mono text-xs text-[#6c6fe4]">text-accent</code>) that resolve through
        primitives to final hex values. Each BU remaps the same semantic tokens to its own palette.
      </p>
      <p className="font-mono text-xs text-[#888] mb-8">
        var(--teal) → var(--color-accent) → bg-accent
      </p>

      {/* Mode Toggle */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-sans text-xs text-[#888] mr-1">Mode:</span>
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
                : 'bg-[#f2f2f2] dark:bg-[#222] text-[#888] hover:bg-[#e5e5e5] dark:hover:bg-[#333]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full font-mono text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#e5e5e5] dark:border-[#333]">
              <th className="text-left py-3 px-4 font-sans font-medium text-[#888] w-[28%]">
                Token
              </th>
              {BUSINESS_UNITS.map((bu) => (
                <th key={bu} className="text-center py-3 px-2 w-[14.4%]">
                  <span className="font-sans font-semibold text-xs capitalize" style={{ color: BU_ACCENTS[bu] }}>
                    {bu}
                  </span>
                  <div className="font-sans font-normal text-[10px] text-[#888] mt-0.5">
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
                    className="pt-4 pb-2 px-4 font-sans font-bold text-[10px] uppercase tracking-[0.1em] text-[#6c6fe4] border-t-2 border-[#e5e5e5] dark:border-[#333]"
                  >
                    {category}
                  </td>
                </tr>

                {/* Token rows */}
                {categoryTokens.map((token) => (
                  <Fragment key={token.cssVar}>
                    <tr
                      onClick={() => toggleExpanded(token.cssVar)}
                      className={`border-b border-[#e5e5e5] dark:border-[#333] cursor-pointer transition-colors ${
                        expanded.has(token.cssVar)
                          ? 'bg-[#fafafa] dark:bg-[#161616]'
                          : 'hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]'
                      }`}
                    >
                      <td className="py-2.5 px-4 text-[#888]">
                        <span className="mr-1.5 text-[10px]">
                          {expanded.has(token.cssVar) ? '▾' : '▸'}
                        </span>
                        {token.cssVar}
                      </td>
                      {BUSINESS_UNITS.map((bu) => {
                        const activeMode = getActiveMode(bu, mode);
                        const val = resolved[token.cssVar]?.[bu]?.[activeMode] || '—';
                        const hex = toHex(val);
                        return (
                          <td key={bu} className="text-center py-2.5 px-2">
                            <div
                              className="w-6 h-6 rounded-md mx-auto border border-[#ccc] dark:border-[#555]"
                              style={{ backgroundColor: val }}
                              title={hex}
                            />
                          </td>
                        );
                      })}
                    </tr>
                    {expanded.has(token.cssVar) && (
                      <tr className="bg-[#fafafa] dark:bg-[#161616] border-b border-[#e5e5e5] dark:border-[#333]">
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
                                    className="w-11 h-11 rounded-lg mx-auto border border-[#ccc] dark:border-[#555] mb-1"
                                    style={{ backgroundColor: val }}
                                  />
                                  <div className="font-sans text-[10px] font-semibold capitalize" style={{ color: BU_ACCENTS[bu] }}>
                                    {bu}
                                  </div>
                                  <div className="font-mono text-[10px] text-[#888]">
                                    {hex}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Tailwind class */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-sans text-[10px] text-[#888]">Tailwind:</span>
                            <code className="font-mono text-[10px] bg-[#f2f2f2] dark:bg-[#222] px-2 py-0.5 rounded text-[#111] dark:text-[#eee]">
                              {token.tailwind}
                            </code>
                          </div>

                          {/* Variable chains */}
                          <div className="flex items-start gap-2">
                            <span className="font-sans text-[10px] text-[#888] shrink-0">Chain:</span>
                            <div className="font-mono text-[10px] text-[#888]">
                              {BUSINESS_UNITS.map((bu, i) => {
                                const activeMode = getActiveMode(bu, mode);
                                const chain = getChain(token.cssVar, bu, activeMode, source);
                                return (
                                  <span key={bu}>
                                    {i > 0 && <span className="mx-1.5">·</span>}
                                    <span className="capitalize" style={{ color: BU_ACCENTS[bu] }}>{bu}</span>
                                    {': '}
                                    {chain}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
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
} satisfies Meta<typeof TokenGridPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
