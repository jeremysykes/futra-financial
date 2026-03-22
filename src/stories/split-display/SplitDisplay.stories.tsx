import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitDisplay } from './SplitDisplay';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Molecules/SplitDisplay',
  component: SplitDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay({ maxWidth: 400 })],
} satisfies Meta<typeof SplitDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EvenSplit: Story = {
  args: {
    label: 'Rent',
    total: '$2,400',
    splits: [
      { name: 'Alex', amount: '$1,200', percent: 50, tokenColor: 'primary' },
      { name: 'Jordan', amount: '$1,200', percent: 50, tokenColor: 'accent' },
    ],
  },
  globals: { businessUnit: 'together' },
};

export const UnevenSplit: Story = {
  args: {
    label: 'Groceries',
    total: '$300',
    splits: [
      { name: 'Alex', amount: '$180', percent: 60, tokenColor: 'primary' },
      { name: 'Jordan', amount: '$120', percent: 40, tokenColor: 'accent' },
    ],
  },
  globals: { businessUnit: 'together' },
};

export const SinglePayer: Story = {
  args: {
    label: 'Netflix',
    total: '$15.99',
    splits: [
      { name: 'Jordan', amount: '$15.99', percent: 100, tokenColor: 'accent' },
    ],
  },
  globals: { businessUnit: 'together' },
};

export const Compact: Story = {
  args: {
    size: 'compact',
    label: 'Utilities',
    total: '$180',
    splits: [
      { name: 'Alex', amount: '$90', percent: 50, tokenColor: 'primary' },
      { name: 'Jordan', amount: '$90', percent: 50, tokenColor: 'accent' },
    ],
  },
  globals: { businessUnit: 'together' },
};
