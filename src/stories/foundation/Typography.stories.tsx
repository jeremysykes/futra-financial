import type { Meta, StoryObj } from '@storybook/react-vite';

const SAMPLES = [
  {
    title: 'Headings',
    items: [
      { label: 'H1', className: 'font-sans font-bold text-[clamp(36px,5vw,56px)] leading-[1.1] tracking-[-0.01em] text-foreground', text: 'Every dollar has a destination' },
      { label: 'H2', className: 'font-sans font-bold text-[clamp(28px,4vw,40px)] tracking-[-0.01em] text-foreground', text: 'Tools that fit your life' },
      { label: 'H3', className: 'font-sans font-semibold text-base text-foreground', text: 'Visual goal tracking' },
      { label: 'H4', className: 'font-sans font-semibold text-[17px] text-foreground', text: 'Real-Time Feed' },
    ],
  },
  {
    title: 'Body',
    items: [
      { label: 'Body Large', className: 'font-sans text-lg leading-[1.7] text-muted-foreground', text: 'Automate your savings with round-ups and scheduled transfers. Watch your goals grow with beautiful, visual progress tracking.' },
      { label: 'Body', className: 'font-sans text-base leading-[1.7] text-foreground', text: 'I finally saved enough for my first solo trip to Portugal. Seeing that progress bar inch forward every week kept me going.' },
      { label: 'Body Small', className: 'font-sans text-sm leading-relaxed text-muted-foreground', text: 'Yes, completely free. We never charge for credit score access. Our service is funded through personalized recommendations, not hidden fees.' },
    ],
  },
  {
    title: 'Captions & Labels',
    items: [
      { label: 'Eyebrow', className: 'uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent', text: 'Goal-based savings' },
      { label: 'Overline', className: 'uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground', text: 'From our savers' },
      { label: 'Label', className: 'uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-muted-foreground', text: 'Available Balance' },
    ],
  },
  {
    title: 'Monospace (Data)',
    items: [
      { label: 'Stat Large', className: 'font-mono font-medium text-[clamp(28px,4vw,40px)] text-accent', text: '$42M+' },
      { label: 'Stat', className: 'font-mono font-medium text-lg text-foreground', text: '$2,400' },
      { label: 'Stat Small', className: 'font-mono font-medium text-sm text-foreground', text: '$3,015' },
      { label: 'Code', className: 'font-mono text-xs text-muted-foreground', text: 'var(--color-accent)' },
    ],
  },
];

const FONT_TABLE = [
  { role: 'Headings H1–H2', font: 'Inter', weight: 'Bold (700)', tailwind: 'font-sans font-bold' },
  { role: 'Headings H3–H4', font: 'Inter', weight: 'Semibold (600)', tailwind: 'font-sans font-semibold' },
  { role: 'Body', font: 'Inter', weight: 'Regular (400)', tailwind: 'font-sans' },
  { role: 'Captions/Overlines', font: 'Inter', weight: 'Medium (500)', tailwind: 'font-sans font-medium' },
  { role: 'Data/Numbers', font: 'JetBrains Mono', weight: 'Medium (500)', tailwind: 'font-mono font-medium' },
];

function TypographyPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 bg-background min-h-screen">
      <h1 className="font-sans font-bold text-3xl text-foreground mb-2">Typography</h1>
      <p className="font-sans text-base text-muted-foreground mb-12">
        Two font families: <span className="font-sans font-semibold text-foreground">Inter</span> for
        interface text and <span className="font-mono font-medium text-foreground">JetBrains Mono</span> for
        data, numbers, and code. Use <code className="font-mono text-accent">font-sans</code> and{' '}
        <code className="font-mono text-accent">font-mono</code> Tailwind classes — never inline fontFamily.
      </p>

      {/* Font reference table */}
      <div className="mb-12 overflow-x-auto">
        <h2 className="font-sans font-semibold text-lg text-foreground mb-4">Font Reference</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-3 pr-4 text-left font-sans font-medium text-muted-foreground">Role</th>
              <th className="py-3 px-4 text-left font-sans font-medium text-muted-foreground">Font</th>
              <th className="py-3 px-4 text-left font-sans font-medium text-muted-foreground">Weight</th>
              <th className="py-3 pl-4 text-left font-sans font-medium text-muted-foreground">Tailwind</th>
            </tr>
          </thead>
          <tbody>
            {FONT_TABLE.map((row) => (
              <tr key={row.role} className="border-b border-border">
                <td className="py-3 pr-4 font-sans text-foreground">{row.role}</td>
                <td className="py-3 px-4 font-sans text-foreground">{row.font}</td>
                <td className="py-3 px-4 font-sans text-muted-foreground">{row.weight}</td>
                <td className="py-3 pl-4">
                  <code className="font-mono text-xs text-accent">{row.tailwind}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Type samples */}
      {SAMPLES.map((group) => (
        <div key={group.title} className="mb-12">
          <h2 className="font-sans font-semibold text-lg text-foreground mb-6">{group.title}</h2>
          <div className="space-y-8">
            {group.items.map((item) => (
              <div key={item.label} className="border-b border-border pb-6">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-xs text-accent shrink-0 w-24">{item.label}</span>
                  <code className="font-mono text-[10px] text-muted-foreground truncate hidden sm:block">
                    {item.className}
                  </code>
                </div>
                <div className={item.className}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta = {
  title: 'Foundation/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof TypographyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  globals: { businessUnit: 'save' },
};
