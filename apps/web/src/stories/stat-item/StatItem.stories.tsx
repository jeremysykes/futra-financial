import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { StatItem } from './StatItem';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/StatItem',
  component: StatItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    label: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    valueColor: {
      control: 'inline-radio',
      options: ['foreground', 'accent'],
      table: { category: 'Appearance' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof StatItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccentValue: Story = {
  args: {
    valueColor: 'foreground',
    value: '$42M+',
    label: 'Total saved by users',
  },
  globals: { businessUnit: 'save' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('$42M+')).toBeInTheDocument();
    expect(canvas.getByText('Total saved by users')).toBeInTheDocument();
  },
};

export const ForegroundValue: Story = {
  args: {
    valueColor: 'foreground',
    value: '<300ms',
    label: 'Transaction Speed',
  },
  globals: { businessUnit: 'spend' },
};

export const AllVariants: StoryObj<typeof StatItem> = {
  decorators: [withStoryDisplay({ layout: 'grid', columns: 4, gap: '2rem' })],
  render: () => (
    <>
      <StatItem value="<300ms" label="Transaction Speed" valueColor="foreground" />
      <StatItem value="99.99%" label="Platform Uptime" valueColor="foreground" />
      <StatItem value="2.4M+" label="Active Users" />
      <StatItem value="38" label="Countries Supported" />
    </>
  ),
  globals: { businessUnit: 'spend' },
};
