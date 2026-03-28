import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { Accordion } from './Accordion';
import { withStoryDisplay } from '../decorators';

const faqItems = [
  {
    value: 'free',
    trigger: 'Is checking my score really free?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Yes, completely free. We never charge for credit score access. Our
        service is funded through personalized recommendations, not hidden fees.
      </p>
    ),
  },
  {
    value: 'affect',
    trigger: 'Will this affect my credit score?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        No. We use a soft inquiry to check your score, which has zero impact on
        your credit. You can check as often as you like without any effect.
      </p>
    ),
  },
  {
    value: 'updated',
    trigger: 'How often is my score updated?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Your credit score is updated weekly. We pull the latest data every seven
        days so you always have a current picture of where you stand.
      </p>
    ),
  },
];

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: { type: 'object' },
      table: { category: 'Content' },
    },
    multiple: {
      control: { type: 'boolean' },
      table: { category: 'Behavior' },
    },
    spacing: {
      control: { type: 'inline-radio' },
      options: ['default', 'compact'],
      table: { category: 'Layout' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
  },
  decorators: [withStoryDisplay({ maxWidth: 700 })],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: faqItems,
    spacing: 'default',
  },
  globals: { businessUnit: 'credit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // All items should start collapsed
    const triggers = canvas.getAllByRole('button');
    expect(triggers).toHaveLength(3);

    // Click first item to expand
    await userEvent.click(triggers[0]);
    expect(triggers[0]).toHaveAttribute('data-state', 'open');

    // Click second item — first should collapse (single mode)
    await userEvent.click(triggers[1]);
    expect(triggers[1]).toHaveAttribute('data-state', 'open');
    expect(triggers[0]).toHaveAttribute('data-state', 'closed');

    // Click second item again to collapse it
    await userEvent.click(triggers[1]);
    expect(triggers[1]).toHaveAttribute('data-state', 'closed');
  },
};

export const Multiple: Story = {
  args: {
    items: faqItems,
    multiple: true,
  },
  globals: { businessUnit: 'credit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');

    // Open first and second — both should stay open
    await userEvent.click(triggers[0]);
    await userEvent.click(triggers[1]);
    expect(triggers[0]).toHaveAttribute('data-state', 'open');
    expect(triggers[1]).toHaveAttribute('data-state', 'open');
  },
};

export const CompactSpacing: Story = {
  args: {
    items: faqItems,
    spacing: 'compact',
  },
  globals: { businessUnit: 'save' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = canvas.getAllByRole('button');
    expect(triggers).toHaveLength(3);

    // Verify compact spacing renders and items are interactive
    await userEvent.click(triggers[2]);
    expect(triggers[2]).toHaveAttribute('data-state', 'open');
  },
};
