import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Card } from './Card';
import { withStoryDisplay } from '../decorators';

const SampleContent = () => (
  <>
    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
      <span className="text-accent font-bold text-sm">⚡</span>
    </div>
    <h4 className="font-sans font-semibold text-base text-foreground mb-2">Feature Title</h4>
    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
      A brief description of this feature that explains its value to the user.
    </p>
  </>
);

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay({ maxWidth: 300 })],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: React.createElement(SampleContent),
  },
};

export const AccentLeft: Story = {
  args: {
    accent: 'left',
    children: React.createElement(SampleContent),
  },
};

export const AccentTop: Story = {
  args: {
    accent: 'top',
    children: React.createElement(SampleContent),
  },
};

export const AccentRight: Story = {
  args: {
    accent: 'right',
    children: React.createElement(SampleContent),
  },
};

export const AccentBottom: Story = {
  args: {
    accent: 'bottom',
    children: React.createElement(SampleContent),
  },
};

export const Hover: Story = {
  args: {
    accent: 'left',
    interactive: true,
    children: React.createElement(SampleContent),
  },
};

export const AllVariants: Story = {
  decorators: [withStoryDisplay({ layout: 'grid', columns: 3 })],
  render: () => (
    <>
      <Card accent="none"><SampleContent /></Card>
      <Card accent="left"><SampleContent /></Card>
      <Card accent="top"><SampleContent /></Card>
      <Card accent="right"><SampleContent /></Card>
      <Card accent="bottom"><SampleContent /></Card>
      <Card accent="left" interactive><SampleContent /></Card>
    </>
  ),
};
