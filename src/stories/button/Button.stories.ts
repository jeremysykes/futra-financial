import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { fn } from 'storybook/test';

import { Button } from './Button';

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
  decorators: [
    (Story) => React.createElement('div', {
      style: { background: 'linear-gradient(135deg, #6C6FE4, #5B5ED0)', padding: '3rem', borderRadius: '12px' },
    }, React.createElement(Story)),
  ],
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
