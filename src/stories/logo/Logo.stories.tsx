import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from './Logo';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spend: Story = {
  args: { unitName: 'spend', mode: 'light' },
  globals: { businessUnit: 'spend' },
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
