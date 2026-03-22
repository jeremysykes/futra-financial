import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { withStoryDisplay } from '../decorators';

const faqItems = [
  {
    trigger: 'Is checking my score really free?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Yes, completely free. We never charge for credit score access. Our service is funded through personalized recommendations, not hidden fees.
      </p>
    ),
  },
  {
    trigger: 'Will this affect my credit score?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        No. We use a soft inquiry to check your score, which has zero impact on your credit. You can check as often as you like without any effect.
      </p>
    ),
  },
  {
    trigger: 'How often is my score updated?',
    content: (
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        Your credit score is updated weekly. We pull the latest data every seven days so you always have a current picture of where you stand.
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
  decorators: [withStoryDisplay({ maxWidth: 700 })],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: faqItems,
  },
  globals: { businessUnit: 'credit' },
};

export const Multiple: Story = {
  args: {
    items: faqItems,
    multiple: true,
  },
  globals: { businessUnit: 'credit' },
};

export const CompactSpacing: Story = {
  args: {
    items: faqItems,
    spacing: 'compact',
  },
  globals: { businessUnit: 'save' },
};

