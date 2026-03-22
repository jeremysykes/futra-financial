import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatsRow } from './StatsRow';
import { StatItem } from '../stat-item/StatItem';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/StatsRow',
  component: StatsRow,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
  },
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
        <StatItem value="2.4M" label="Active users" valueColor="foreground" />
        <StatItem value="$18B" label="Transactions processed" valueColor="foreground" />
        <StatItem value="<1s" label="Average transaction time" valueColor="foreground" />
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
