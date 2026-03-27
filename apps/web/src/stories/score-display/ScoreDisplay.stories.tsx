import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ScoreDisplay } from './ScoreDisplay';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Data Visualization/ScoreDisplay',
  component: ScoreDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    score: {
      control: { type: 'number' },
      table: { category: 'Content' },
    },
    label: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    percentage: {
      control: { type: 'number', min: 0, max: 1, step: 0.01 },
      table: { category: 'Content' },
    },
    size: {
      control: { type: 'number' },
      table: { category: 'Layout' },
    },
  },
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('724')).toBeInTheDocument();
    // Label is rendered uppercased via toUpperCase()
    expect(canvas.getByText('GOOD')).toBeInTheDocument();
  },
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
