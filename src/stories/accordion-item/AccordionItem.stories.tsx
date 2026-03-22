import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionItem } from './AccordionItem';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Atoms/AccordionItem',
  component: AccordionItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay({ maxWidth: 700 })],
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    trigger: 'Is checking my score really free?',
    children: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Yes, completely free. We never charge for credit score access.
      </p>
    ),
  },
  globals: { businessUnit: 'credit' },
};

export const Open: Story = {
  args: {
    trigger: 'Is checking my score really free?',
    isOpen: true,
    children: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Yes, completely free. We never charge for credit score access.
      </p>
    ),
  },
  globals: { businessUnit: 'credit' },
};

export const Interactive: StoryObj<typeof AccordionItem> = {
  decorators: [withStoryDisplay({ maxWidth: 700 })],
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <AccordionItem
        trigger="Will this affect my credit score?"
        isOpen={open}
        onToggle={() => setOpen(!open)}
      >
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          No. We use a soft inquiry to check your score, which has zero impact on your credit.
        </p>
      </AccordionItem>
    );
  },
  globals: { businessUnit: 'credit' },
};

export const Flush: Story = {
  args: {
    variant: 'flush',
    trigger: 'How do I get started?',
    isOpen: true,
    children: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Sign up for free and connect your accounts.
      </p>
    ),
  },
  globals: { businessUnit: 'save' },
};
