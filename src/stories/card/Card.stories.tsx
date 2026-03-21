import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Card } from './Card';

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

const singleCardDecorator = (Story: React.ComponentType) =>
  React.createElement(
    'div',
    { style: { width: 300, padding: '2rem' } },
    React.createElement(Story)
  );

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [singleCardDecorator],
  args: {
    children: React.createElement(SampleContent),
  },
};

export const AccentLeft: Story = {
  decorators: [singleCardDecorator],
  args: {
    accent: 'left',
    children: React.createElement(SampleContent),
  },
};

export const AccentTop: Story = {
  decorators: [singleCardDecorator],
  args: {
    accent: 'top',
    children: React.createElement(SampleContent),
  },
};

export const AccentRight: Story = {
  decorators: [singleCardDecorator],
  args: {
    accent: 'right',
    children: React.createElement(SampleContent),
  },
};

export const AccentBottom: Story = {
  decorators: [singleCardDecorator],
  args: {
    accent: 'bottom',
    children: React.createElement(SampleContent),
  },
};

export const Hover: Story = {
  decorators: [singleCardDecorator],
  args: {
    accent: 'left',
    interactive: true,
    children: React.createElement(SampleContent),
  },
};

export const AllVariants: Story = {
  decorators: [
    () =>
      React.createElement(
        'div',
        { className: 'grid grid-cols-3 gap-4', style: { padding: '2rem' } },
        React.createElement(Card, { accent: 'none' }, React.createElement(SampleContent)),
        React.createElement(Card, { accent: 'left' }, React.createElement(SampleContent)),
        React.createElement(Card, { accent: 'top' }, React.createElement(SampleContent)),
        React.createElement(Card, { accent: 'right' }, React.createElement(SampleContent)),
        React.createElement(Card, { accent: 'bottom' }, React.createElement(SampleContent)),
        React.createElement(Card, { accent: 'left', interactive: true }, React.createElement(SampleContent)),
      ),
  ],
};
