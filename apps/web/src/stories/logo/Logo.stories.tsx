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
      description: 'Business unit name displayed after the FUTRA brand',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    mode: {
      description: 'Color mode variant for light or dark backgrounds',
      control: 'inline-radio',
      options: ['light', 'dark'],
      table: { category: 'Appearance' },
    },
    className: {
      description: 'Additional CSS classes',
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spend: Story = {
  args: { unitName: 'spend', mode: 'light' },
  globals: { businessUnit: 'spend' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/futra/i)).toBeInTheDocument();
    expect(canvas.getByText(/spend/i)).toBeInTheDocument();
  },
};

export const Save: Story = {
  args: { unitName: 'save', mode: 'light' },
  globals: { businessUnit: 'save' },
};

export const Credit: Story = {
  args: { unitName: 'credit', mode: 'light' },
  globals: { businessUnit: 'credit' },
};

export const Plan: Story = {
  args: { unitName: 'plan', mode: 'light' },
  globals: { businessUnit: 'plan' },
};

export const Together: Story = {
  args: { unitName: 'together', mode: 'light' },
  globals: { businessUnit: 'together' },
};
