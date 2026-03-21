import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Navbar } from './Navbar';

const decorator = (Story: React.ComponentType) =>
  React.createElement(
    'div',
    {
      style: {
        position: 'relative',
        height: '100px',
        overflow: 'hidden',
        transform: 'translateZ(0)',
        background: 'var(--color-background)',
      },
    },
    React.createElement(Story),
  );

const meta = {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { iframeHeight: 100 },
    },
  },
  tags: ['autodocs'],
  decorators: [decorator],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spend: Story = {
  args: {
    unitName: 'spend',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Security', href: '#security' },
      { label: 'Pricing', href: '#pricing' },
    ],
    ctaText: 'Get Started',
  },
  globals: { businessUnit: 'spend' },
};

export const Save: Story = {
  args: {
    unitName: 'save',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Goals', href: '#goals' },
    ],
    ctaText: 'Start Saving',
  },
  globals: { businessUnit: 'save' },
};

export const Credit: Story = {
  args: {
    unitName: 'credit',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' },
    ],
    ctaText: 'Check Your Score',
  },
  globals: { businessUnit: 'credit' },
};

export const Plan: Story = {
  args: {
    unitName: 'plan',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Compare', href: '#compare' },
      { label: 'Pricing', href: '#pricing' },
    ],
    ctaText: 'Start Planning',
  },
  globals: { businessUnit: 'plan' },
};

export const Together: Story = {
  args: {
    unitName: 'together',
    links: [
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
    ],
    ctaText: 'Get Started',
  },
  globals: { businessUnit: 'together' },
};
