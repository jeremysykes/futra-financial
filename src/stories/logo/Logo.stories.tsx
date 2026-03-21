import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Logo } from './Logo';

const paddedDecorator = (bg?: string) => (Story: React.ComponentType) =>
  React.createElement(
    'div',
    { style: { padding: '2rem', background: bg } },
    React.createElement(Story),
  );

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spend: Story = {
  args: { unitName: 'spend', mode: 'light' },
  globals: { businessUnit: 'spend' },
  decorators: [paddedDecorator()],
};

export const Save: Story = {
  args: { unitName: 'save', mode: 'light' },
  globals: { businessUnit: 'save' },
  decorators: [paddedDecorator()],
};

export const Credit: Story = {
  args: { unitName: 'credit', mode: 'light' },
  globals: { businessUnit: 'credit' },
  decorators: [paddedDecorator()],
};

export const Plan: Story = {
  args: { unitName: 'plan', mode: 'light' },
  globals: { businessUnit: 'plan' },
  decorators: [paddedDecorator()],
};

export const Together: Story = {
  args: { unitName: 'together', mode: 'light' },
  globals: { businessUnit: 'together' },
  decorators: [paddedDecorator()],
};

export const DarkSpend: Story = {
  args: { unitName: 'spend', mode: 'dark', className: 'text-[#FFFFFF]' },
  decorators: [paddedDecorator('#1a1a1a')],
};

export const DarkSave: Story = {
  args: { unitName: 'save', mode: 'dark', className: 'text-[#F7F5F0]' },
  decorators: [paddedDecorator('#1a1a1a')],
};

export const DarkCredit: Story = {
  args: { unitName: 'credit', mode: 'dark', className: 'text-[#F9F7FF]' },
  decorators: [paddedDecorator('#1a1a1a')],
};

export const DarkPlan: Story = {
  args: { unitName: 'plan', mode: 'dark', className: 'text-[#E2E8F0]' },
  decorators: [paddedDecorator('#1a1a1a')],
};

export const DarkTogether: Story = {
  args: { unitName: 'together', mode: 'dark', className: 'text-[#FFF9F5]' },
  decorators: [paddedDecorator('#1a1a1a')],
};
