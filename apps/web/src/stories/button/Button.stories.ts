import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, within, userEvent, fn } from 'storybook/test';

import { Button } from './Button';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'inverse'],
      table: { category: 'Appearance' },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { category: 'Appearance' },
    },
    className: {
      control: 'text',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      table: { category: 'Behavior' },
    },
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: { onClick: fn() },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Get Started',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Get Started' });

    expect(button).toBeInTheDocument();
    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Inverse: Story = {
  args: {
    variant: 'inverse',
    children: 'Download the App',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Download the App' });

    await userEvent.click(button);
    expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Open Your Account',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: 'Open Your Account' })).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Get Started',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: 'Get Started' })).toBeInTheDocument();
  },
};
