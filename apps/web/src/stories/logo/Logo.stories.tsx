import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Logo } from './Logo';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    unitName: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    variant: {
      control: 'inline-radio',
      options: ['light', 'dark'],
      table: { category: 'Appearance' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spend: Story = {
  args: { unitName: 'spend', variant: 'light' },
  globals: { businessUnit: 'spend' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/futra/i)).toBeInTheDocument();
    expect(canvas.getByText(/spend/i)).toBeInTheDocument();
  },
};

export const Save: Story = {
  args: { unitName: 'save', variant: 'light' },
  globals: { businessUnit: 'save' },
};

export const Credit: Story = {
  args: { unitName: 'credit', variant: 'light' },
  globals: { businessUnit: 'credit' },
};

export const Plan: Story = {
  args: { unitName: 'plan', variant: 'light' },
  globals: { businessUnit: 'plan' },
};

export const Together: Story = {
  args: { unitName: 'together', variant: 'light' },
  globals: { businessUnit: 'together' },
};
