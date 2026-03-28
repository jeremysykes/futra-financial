import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo } from 'react';

const TOKEN_GROUPS = [
  {
    title: 'Backgrounds',
    tokens: [
      {
        name: 'background',
        variable: '--color-background',
        tailwind: 'bg-background',
      },
      { name: 'surface', variable: '--color-surface', tailwind: 'bg-surface' },
      {
        name: 'secondary',
        variable: '--color-secondary',
        tailwind: 'bg-secondary',
      },
      { name: 'muted', variable: '--color-muted', tailwind: 'bg-muted' },
    ],
  },
  {
    title: 'Foregrounds',
    tokens: [
      {
        name: 'foreground',
        variable: '--color-foreground',
        tailwind: 'text-foreground',
      },
      {
        name: 'muted-foreground',
        variable: '--color-muted-foreground',
        tailwind: 'text-muted-foreground',
      },
      {
        name: 'primary-foreground',
        variable: '--color-primary-foreground',
        tailwind: 'text-primary-foreground',
      },
      {
        name: 'secondary-foreground',
        variable: '--color-secondary-foreground',
        tailwind: 'text-secondary-foreground',
      },
    ],
  },
  {
    title: 'Brand & Accent',
    tokens: [
      { name: 'primary', variable: '--color-primary', tailwind: 'bg-primary' },
      {
        name: 'primary-hover',
        variable: '--color-primary-hover',
        tailwind: 'hover:bg-primary-hover',
      },
      { name: 'accent', variable: '--color-accent', tailwind: 'text-accent' },
      { name: 'ring', variable: '--color-ring', tailwind: 'ring-ring' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      {
        name: 'positive',
        variable: '--color-positive',
        tailwind: 'text-positive',
      },
      {
        name: 'negative',
        variable: '--color-negative',
        tailwind: 'text-negative',
      },
      {
        name: 'caution',
        variable: '--color-caution',
        tailwind: 'text-caution',
      },
      {
        name: 'destructive',
        variable: '--color-destructive',
        tailwind: 'bg-destructive',
      },
    ],
  },
  {
    title: 'Borders',
    tokens: [
      { name: 'border', variable: '--color-border', tailwind: 'border-border' },
    ],
  },
];

function resolveColor(computedValue: string): {
  hex: string;
  rgb: string;
  oklch: string;
  r: number;
  g: number;
  b: number;
} {
  // Resolve the computed CSS color value to RGB using a temp element
  const el = document.createElement('div');
  el.style.backgroundColor = computedValue;
  document.body.appendChild(el);
  const resolved = getComputedStyle(el).backgroundColor;
  document.body.removeChild(el);

  // Modern browsers may return oklch() or color() — use canvas as fallback
  const rgbMatch = resolved.match(
    /rgba?\(\s*([\d.]+),?\s*([\d.]+),?\s*([\d.]+)/,
  );
  if (rgbMatch) {
    const r = Math.round(parseFloat(rgbMatch[1]));
    const g = Math.round(parseFloat(rgbMatch[2]));
    const b = Math.round(parseFloat(rgbMatch[3]));
    const hex =
      '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
    return {
      hex,
      rgb: `rgb(${r}, ${g}, ${b})`,
      oklch: computedValue.trim(),
      r,
      g,
      b,
    };
  }

  // Fallback: use canvas to resolve non-RGB formats
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = resolved;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  const hex =
    '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');
  return {
    hex,
    rgb: `rgb(${r}, ${g}, ${b})`,
    oklch: computedValue.trim(),
    r,
    g,
    b,
  };
}

function ColorSwatch({
  name,
  variable,
  tailwind,
}: {
  name: string;
  variable: string;
  tailwind: string;
}) {
  const color = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
    if (!raw) return null;
    const resolved = resolveColor(raw);
    return { ...resolved, oklch: raw };
  }, [variable]);

  const isLight = color
    ? color.r * 0.299 + color.g * 0.587 + color.b * 0.114 > 186
    : false;

  return (
    <div className="rounded-xl border border-[#e5e5e5] dark:border-[#333] overflow-hidden">
      <div
        className="h-20 flex items-end p-3 relative"
        style={{ backgroundColor: `var(${variable})` }}
      >
        <span
          className="font-sans font-semibold text-sm relative z-10 px-2 py-1 rounded"
          style={{
            color: isLight ? '#fff' : '#fff',
            backgroundColor: isLight ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.5)',
          }}
        >
          {name}
        </span>
      </div>
      <div className="p-3 space-y-1.5 border-t border-[#e5e5e5] bg-white dark:bg-[#1a1a1a] dark:border-[#333]">
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-[#888]">HEX</span>
          <span className="font-mono text-xs text-[#111] dark:text-[#eee]">
            {color?.hex ?? '...'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-[#888]">RGB</span>
          <span className="font-mono text-xs text-[#111] dark:text-[#eee]">
            {color?.rgb ?? '...'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-[#888]">OKLCH</span>
          <span className="font-mono text-[10px] text-[#111] dark:text-[#eee] truncate ml-4">
            {color?.oklch ?? '...'}
          </span>
        </div>
        <div className="pt-1.5 border-t border-[#e5e5e5] dark:border-[#333] space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-[#888]">CSS</span>
            <code className="font-mono text-[10px] text-[#6C6FE4]">
              var({variable})
            </code>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-[#888]">Tailwind</span>
            <code className="font-mono text-[10px] text-[#6C6FE4]">
              {tailwind}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorPalette() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 min-h-screen bg-white dark:bg-[#111]">
      <h1 className="font-sans font-bold text-3xl text-[#111] dark:text-[#eee] mb-2">
        Color Palette
      </h1>
      <p className="font-sans text-base text-[#666] dark:text-[#999] mb-12">
        All colors derive from CSS custom properties in{' '}
        <code className="font-mono text-[#6C6FE4]">tailwind.css</code> and
        switch automatically per business unit via{' '}
        <code className="font-mono text-[#6C6FE4]">data-business-unit</code>{' '}
        attributes. Use the BU selector in the toolbar to see each palette.
      </p>

      {TOKEN_GROUPS.map((group) => (
        <div key={group.title} className="mb-12">
          <h2 className="font-sans font-semibold text-lg text-[#111] dark:text-[#eee] mb-4">
            {group.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {group.tokens.map((token) => (
              <ColorSwatch key={token.variable} {...token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundation/Colors',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spend: Story = { globals: { businessUnit: 'spend' } };
export const Save: Story = { globals: { businessUnit: 'save' } };
export const Credit: Story = { globals: { businessUnit: 'credit' } };
export const Plan: Story = { globals: { businessUnit: 'plan' } };
export const Together: Story = { globals: { businessUnit: 'together' } };
