import type { Meta, StoryObj } from '@storybook/react-vite';
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
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof CTASection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GradientCenter: Story = {
  args: {
    heading: 'Your first goal is waiting',
    description:
      'No minimum amounts. No fees. Just a calm, focused way to build toward something that matters to you.',
    children: <Button>Start Saving</Button>,
  },
  globals: { businessUnit: 'save' },
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
