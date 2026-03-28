import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import React from 'react';
import { Card } from './Card';
import { withStoryDisplay } from '../decorators';

const SampleContent = () => (
  <>
    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
      <span className="text-accent font-bold text-sm">⚡</span>
    </div>
    <h4 className="font-sans font-semibold text-base text-foreground mb-2">
      Feature Title
    </h4>
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
  argTypes: {
    variant: {
      control: 'select',
      options: ['none', 'left', 'top', 'right', 'bottom'],
      table: { category: 'Appearance' },
    },
    interactive: {
      control: 'select',
      options: [true, false, 'disabled'],
      table: { category: 'Behavior' },
    },
    className: {
      control: 'text',
      table: { category: 'Appearance' },
    },
    children: { table: { disable: true } },
  },
  args: { interactive: false },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const constrainedCard = [withStoryDisplay({ maxWidth: 300 })];

export const Default: Story = {
  decorators: constrainedCard,
  args: {
    variant: 'none',
    children: React.createElement(SampleContent),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Feature Title')).toBeInTheDocument();
    expect(canvas.getByText(/A brief description/)).toBeInTheDocument();
  },
};

export const AccentLeft: Story = {
  decorators: constrainedCard,
  args: {
    variant: 'left',
    children: React.createElement(SampleContent),
  },
};

export const AccentTop: Story = {
  decorators: constrainedCard,
  args: {
    variant: 'top',
    children: React.createElement(SampleContent),
  },
};

export const AccentRight: Story = {
  decorators: constrainedCard,
  args: {
    variant: 'right',
    children: React.createElement(SampleContent),
  },
};

export const AccentBottom: Story = {
  decorators: constrainedCard,
  args: {
    variant: 'bottom',
    children: React.createElement(SampleContent),
  },
};

export const Hover: Story = {
  decorators: constrainedCard,
  args: {
    variant: 'left',
    interactive: true,
    children: React.createElement(SampleContent),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas
      .getByText('Feature Title')
      .closest('[class*="cursor-pointer"]');
    expect(card).toBeInTheDocument();
  },
};

export const Disabled: Story = {
  decorators: constrainedCard,
  args: {
    variant: 'left',
    interactive: 'disabled',
    children: React.createElement(SampleContent),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas
      .getByText('Feature Title')
      .closest('[class*="cursor-not-allowed"]');
    expect(card).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  decorators: [withStoryDisplay({ layout: 'grid', columns: 3, gap: '1.5rem' })],
  render: () => (
    <>
      <Card variant="none">
        <SampleContent />
      </Card>
      <Card variant="left">
        <SampleContent />
      </Card>
      <Card variant="top">
        <SampleContent />
      </Card>
      <Card variant="right">
        <SampleContent />
      </Card>
      <Card variant="bottom">
        <SampleContent />
      </Card>
      <Card variant="left" interactive>
        <SampleContent />
      </Card>
    </>
  ),
};
