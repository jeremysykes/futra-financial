import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressCard } from './ProgressCard';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Data Visualization/ProgressCard',
  component: ProgressCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
  },
  globals: { businessUnit: 'save' },
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
