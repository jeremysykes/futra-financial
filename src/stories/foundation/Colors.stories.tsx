import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

const TOKEN_GROUPS = [
  {
    title: 'Backgrounds',
    tokens: [
      { name: 'background', variable: '--color-background', tailwind: 'bg-background' },
      { name: 'surface', variable: '--color-surface', tailwind: 'bg-surface' },
      { name: 'secondary', variable: '--color-secondary', tailwind: 'bg-secondary' },
      { name: 'muted', variable: '--color-muted', tailwind: 'bg-muted' },
    ],
  },
  {
    title: 'Foregrounds',
    tokens: [
      { name: 'foreground', variable: '--color-foreground', tailwind: 'text-foreground' },
      { name: 'muted-foreground', variable: '--color-muted-foreground', tailwind: 'text-muted-foreground' },
      { name: 'primary-foreground', variable: '--color-primary-foreground', tailwind: 'text-primary-foreground' },
      { name: 'secondary-foreground', variable: '--color-secondary-foreground', tailwind: 'text-secondary-foreground' },
    ],
  },
  {
    title: 'Brand & Accent',
    tokens: [
      { name: 'primary', variable: '--color-primary', tailwind: 'bg-primary' },
      { name: 'primary-hover', variable: '--color-primary-hover', tailwind: 'hover:bg-primary-hover' },
      { name: 'accent', variable: '--color-accent', tailwind: 'text-accent' },
      { name: 'ring', variable: '--color-ring', tailwind: 'ring-ring' },
    ],
  },
  {
    title: 'Status',
    tokens: [
      { name: 'positive', variable: '--color-positive', tailwind: 'text-positive' },
      { name: 'negative', variable: '--color-negative', tailwind: 'text-negative' },
      { name: 'caution', variable: '--color-caution', tailwind: 'text-caution' },
      { name: 'destructive', variable: '--color-destructive', tailwind: 'bg-destructive' },
    ],
  },
  {
    title: 'Borders',
    tokens: [
      { name: 'border', variable: '--color-border', tailwind: 'border-border' },
    ],
  },
];

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

function parseColor(raw: string): { hex: string; rgb: string; oklch: string } {
  // Create a temporary element to resolve the computed color
  const el = document.createElement('div');
  el.style.color = raw;
  document.body.appendChild(el);
  const computed = getComputedStyle(el).color;
  document.body.removeChild(el);

  // Parse rgb(r, g, b) or rgba(r, g, b, a)
  const match = computed.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  const r = match ? parseInt(match[1]) : 0;
  const g = match ? parseInt(match[2]) : 0;
  const b = match ? parseInt(match[3]) : 0;

  return {
    hex: rgbToHex(r, g, b),
    rgb: `rgb(${r}, ${g}, ${b})`,
    oklch: raw.trim(),
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
  const [color, setColor] = useState<{ hex: string; rgb: string; oklch: string } | null>(null);

  useEffect(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    if (raw) setColor(parseColor(raw));
  }, [variable]);

  const isLight = color
    ? parseInt(color.hex.slice(1, 3), 16) * 0.299 +
        parseInt(color.hex.slice(3, 5), 16) * 0.587 +
        parseInt(color.hex.slice(5, 7), 16) * 0.114 >
      186
    : false;

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-surface">
      <div
        className="h-20 flex items-end p-3"
        style={{ backgroundColor: `var(${variable})` }}
      >
        <span
          className="font-sans font-semibold text-sm"
          style={{ color: isLight ? '#000' : '#fff' }}
        >
          {name}
        </span>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-muted-foreground">HEX</span>
          <span className="font-mono text-xs text-foreground">{color?.hex ?? '...'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-muted-foreground">RGB</span>
          <span className="font-mono text-xs text-foreground">{color?.rgb ?? '...'}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-muted-foreground">OKLCH</span>
          <span className="font-mono text-[10px] text-foreground truncate ml-4">{color?.oklch ?? '...'}</span>
        </div>
        <div className="pt-1.5 border-t border-border space-y-1">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-muted-foreground">CSS</span>
            <code className="font-mono text-[10px] text-accent">var({variable})</code>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] text-muted-foreground">Tailwind</span>
            <code className="font-mono text-[10px] text-accent">{tailwind}</code>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorPalette() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 bg-background min-h-screen">
      <h1 className="font-sans font-bold text-3xl text-foreground mb-2">Color Palette</h1>
      <p className="font-sans text-base text-muted-foreground mb-12">
        All colors derive from CSS custom properties in <code className="font-mono text-accent">tailwind.css</code> and
        switch automatically per business unit via <code className="font-mono text-accent">data-business-unit</code> attributes.
        Use the BU selector in the toolbar to see each palette.
      </p>

      {TOKEN_GROUPS.map((group) => (
        <div key={group.title} className="mb-12">
          <h2 className="font-sans font-semibold text-lg text-foreground mb-4">{group.title}</h2>
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
