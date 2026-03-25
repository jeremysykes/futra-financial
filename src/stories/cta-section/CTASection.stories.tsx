import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { CTASection } from './CTASection';
import { Button } from '../button/Button';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/CTASection',
  component: CTASection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      description: 'Background style variant',
      control: 'inline-radio',
      options: ['gradient', 'solid'],
      table: { category: 'Appearance' },
    },
    alignment: {
      description: 'Text alignment of the section',
      control: 'inline-radio',
      options: ['center', 'left'],
      table: { category: 'Layout' },
    },
    heading: {
      description: 'Primary headline text',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    description: {
      description: 'Supporting description below the heading',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    backgroundImage: {
      description: 'URL for the background image',
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    backgroundOpacity: {
      description: 'Tailwind opacity class applied to the background image',
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    sectionId: {
      description: 'HTML id attribute for anchor linking',
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    className: {
      description: 'Additional CSS classes for the root element',
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof CTASection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GradientCenter: Story = {
  args: {
    background: 'gradient',
    alignment: 'center',
    heading: 'Your first goal is waiting',
    description:
      'No minimum amounts. No fees. Just a calm, focused way to build toward something that matters to you.',
    children: <Button>Start Saving</Button>,
  },
  globals: { businessUnit: 'save' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Your first goal is waiting')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Start Saving' })).toBeInTheDocument();
  },
};

export const SolidCenter: Story = {
  args: {
    background: 'solid',
    heading: 'Start spending smarter today.',
    description:
      'No minimum balance. No hidden fees. No waiting. Open your account in under two minutes.',
    children: (
      <Button intent="inverse" asChild>
        <a href="#">Download the App</a>
      </Button>
    ),
  },
  globals: { businessUnit: 'spend' },
};

export const WithBackgroundImage: Story = {
  args: {
    heading: 'Your first goal is waiting',
    description:
      'No minimum amounts. No fees. Just a calm, focused way to build toward something that matters to you.',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-SAVE-03.png`,
    children: <Button>Start Saving</Button>,
  },
  globals: { businessUnit: 'save' },
};

export const LeftAligned: Story = {
  args: {
    alignment: 'left',
    heading: 'Ready to take control?',
    description: 'Join thousands already planning smarter.',
    children: <Button>Get Started</Button>,
  },
  globals: { businessUnit: 'plan' },
};
