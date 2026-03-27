import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ProgressCard } from './ProgressCard';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Data Visualization/ProgressCard',
  component: ProgressCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    goalName: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    targetAmount: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    currentAmount: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    percentage: {
      control: { type: 'number', min: 0, max: 100 },
      table: { category: 'Content' },
    },
    size: {
      control: { type: 'inline-radio' },
      options: ['default', 'compact'],
      table: { category: 'Layout' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay({ maxWidth: 320 })],
} satisfies Meta<typeof ProgressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    goalName: 'Trip to Japan',
    targetAmount: '$4,500',
    currentAmount: '$3,015',
    percentage: 67,
    size: 'default',
  },
  globals: { businessUnit: 'save' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Trip to Japan')).toBeInTheDocument();
    expect(canvas.getByText('$3,015')).toBeInTheDocument();
    // Target amount is split across elements ("of " + "$4,500")
    expect(canvas.getByText(/\$4,500/)).toBeInTheDocument();
  },
};

export const NearlyComplete: Story = {
  args: {
    goalName: 'New Laptop',
    targetAmount: '$2,200',
    currentAmount: '$1,958',
    percentage: 89,
  },
  globals: { businessUnit: 'save' },
};

export const EarlyProgress: Story = {
  args: {
    goalName: 'Emergency Fund',
    targetAmount: '$10,000',
    currentAmount: '$4,300',
    percentage: 43,
  },
  globals: { businessUnit: 'save' },
};
