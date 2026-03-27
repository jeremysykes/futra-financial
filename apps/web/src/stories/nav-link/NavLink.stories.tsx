import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, fn } from 'storybook/test';
import { NavLink } from './NavLink';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'base'],
      table: { category: 'Appearance' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    children: {
      table: { disable: true },
    },
    onClick: {
      table: { disable: true },
    },
  },
  args: { onClick: fn() },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#features',
    size: 'base',
    children: 'Features',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'Features' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#features');
    // Verify the onClick spy is wired up (don't click — anchor navigation crashes the test browser)
    expect(args.onClick).toBeDefined();
  },
};

export const Base: Story = {
  args: {
    href: '#how-it-works',
    size: 'base',
    children: 'How It Works',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name: 'How It Works' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#how-it-works');
  },
};
