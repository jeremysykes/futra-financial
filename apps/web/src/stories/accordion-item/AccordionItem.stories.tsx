import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { Accordion } from 'radix-ui';
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
    value: {
      control: 'text',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      table: { category: 'Appearance' },
    },
    trigger: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay({ maxWidth: 700 })],
} satisfies Meta<typeof AccordionItem>;

export default meta;

export const Default: StoryObj<typeof AccordionItem> = {
  render: () => (
    <Accordion.Root type="single" collapsible>
      <AccordionItem value="item-1" trigger="What is Futra?">
        Futra is a financial platform...
      </AccordionItem>
    </Accordion.Root>
  ),
  globals: { businessUnit: 'credit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /What is Futra/i });
    expect(trigger).toBeInTheDocument();

    // Click to expand
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('data-state', 'open');

    // Click to collapse
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('data-state', 'closed');
  },
};

export const Open: StoryObj<typeof AccordionItem> = {
  render: () => (
    <Accordion.Root type="single" defaultValue="demo" collapsible>
      <AccordionItem value="demo" trigger="Is checking my score really free?">
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          Yes, completely free. We never charge for credit score access.
        </p>
      </AccordionItem>
    </Accordion.Root>
  ),
  globals: { businessUnit: 'credit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Item should start open (defaultValue="demo")
    const trigger = canvas.getByRole('button', { name: /checking my score/i });
    expect(trigger).toHaveAttribute('data-state', 'open');

    // Content should be visible
    expect(canvas.getByText(/completely free/i)).toBeInTheDocument();
  },
};
