import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

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
    asChild: { table: { disable: true } },
  },
  args: { onClick: fn() },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    intent: 'primary',
    children: 'Get Started',
  },
};

export const Inverse: Story = {
  args: {
    intent: 'inverse',
    children: 'Download the App',
  },
};

export const Medium: Story = {
  args: {
    intent: 'primary',
    size: 'md',
    children: 'Open Your Account',
  },
};

export const Small: Story = {
  args: {
    intent: 'primary',
    size: 'sm',
    children: 'Get Started',
  },
};
