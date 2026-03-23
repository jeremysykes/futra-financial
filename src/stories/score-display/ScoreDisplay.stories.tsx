import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScoreDisplay } from './ScoreDisplay';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Data Visualization/ScoreDisplay',
  component: ScoreDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof ScoreDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Good: Story = {
  args: {
    score: 724,
    label: 'Good',
    percentage: 0.75,
    size: 260,
  },
  globals: { businessUnit: 'credit' },
};

export const Excellent: Story = {
  args: {
    score: 812,
    label: 'Excellent',
    percentage: 0.92,
    size: 260,
  },
  globals: { businessUnit: 'credit' },
};

export const Small: Story = {
  args: {
    score: 680,
    label: 'Fair',
    percentage: 0.6,
    size: 180,
  },
  globals: { businessUnit: 'credit' },
};
