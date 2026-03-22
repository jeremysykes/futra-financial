import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsRow } from './StatsRow';
import { withStoryDisplay } from '../decorators';

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center animate-fade-in-up">
    <span className="block mb-2 font-mono font-medium text-accent text-[clamp(28px,4vw,40px)]">
      {value}
    </span>
    <span className="uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
      {label}
    </span>
  </div>
);

const meta = {
  title: 'Templates/StatsRow',
  component: StatsRow,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof StatsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FourColumns: Story = {
  args: {
    children: (
      <>
        <StatItem value="$42M+" label="Total saved by users" />
        <StatItem value="128K" label="Goals completed" />
        <StatItem value="+34%" label="Avg. monthly savings increase" />
        <StatItem value="89K" label="Active savers" />
      </>
    ),
  },
  globals: { businessUnit: 'save' },
};

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    children: (
      <>
        <StatItem value="2.4M" label="Active users" />
        <StatItem value="$18B" label="Transactions processed" />
        <StatItem value="<1s" label="Average transaction time" />
      </>
    ),
  },
  globals: { businessUnit: 'spend' },
};

export const DefaultBackground: Story = {
  args: {
    background: 'default',
    children: (
      <>
        <StatItem value="$42M+" label="Total saved by users" />
        <StatItem value="128K" label="Goals completed" />
        <StatItem value="+34%" label="Avg. monthly savings increase" />
        <StatItem value="89K" label="Active savers" />
      </>
    ),
  },
  globals: { businessUnit: 'plan' },
};
