import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { SplitDisplay } from './SplitDisplay';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Data Visualization/SplitDisplay',
  component: SplitDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay({ maxWidth: 400 })],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      table: { category: 'Appearance' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    label: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    total: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    splits: {
      table: { disable: true },
    },
  },
} satisfies Meta<typeof SplitDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EvenSplit: Story = {
  args: {
    size: 'default',
    label: 'Rent',
    total: '$2,400',
    splits: [
      { name: 'Alex', amount: '$1,200', percent: 50, tokenColor: 'primary' },
      { name: 'Jordan', amount: '$1,200', percent: 50, tokenColor: 'accent' },
    ],
  },
  globals: { businessUnit: 'together' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Rent')).toBeInTheDocument();
    expect(canvas.getByText('$2,400')).toBeInTheDocument();
    expect(canvas.getByText('Alex')).toBeInTheDocument();
    expect(canvas.getByText('Jordan')).toBeInTheDocument();
  },
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
