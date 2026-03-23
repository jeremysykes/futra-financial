import type { Meta, StoryObj } from '@storybook/react-vite';
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
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay({ maxWidth: 700 })],
} satisfies Meta<typeof AccordionItem>;

export default meta;

export const Default: StoryObj<typeof AccordionItem> = {
  render: () => (
    <Accordion.Root type="single" collapsible>
      <AccordionItem value="demo" trigger="Is checking my score really free?">
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          Yes, completely free. We never charge for credit score access.
        </p>
      </AccordionItem>
    </Accordion.Root>
  ),
  globals: { businessUnit: 'credit' },
};

export const Open: StoryObj<typeof AccordionItem> = {
  render: () => (
    <Accordion.Root type="single" defaultValue="demo">
      <AccordionItem value="demo" trigger="Is checking my score really free?">
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          Yes, completely free. We never charge for credit score access.
        </p>
      </AccordionItem>
    </Accordion.Root>
  ),
  globals: { businessUnit: 'credit' },
};
