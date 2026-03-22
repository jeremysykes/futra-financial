import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { NavLink } from './NavLink';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#features',
    size: 'sm',
    children: 'Features',
  },
};

export const Base: Story = {
  args: {
    href: '#how-it-works',
    size: 'base',
    children: 'How It Works',
  },
};
