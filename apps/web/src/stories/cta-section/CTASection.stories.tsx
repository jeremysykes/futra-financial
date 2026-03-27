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
      control: 'inline-radio',
      options: ['gradient', 'solid'],
      table: { category: 'Appearance' },
    },
    alignment: {
      control: 'inline-radio',
      options: ['center', 'left'],
      table: { category: 'Layout' },
    },
    heading: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    description: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    backgroundImage: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    backgroundOpacity: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    sectionId: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    className: {
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
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-SAVE-03.png`,
    children: <Button>Start Saving</Button>,
  },
  globals: { businessUnit: 'save' },
};

export const LeftAligned: Story = {
  args: {
    alignment: 'left',
    heading: 'Ready to take control?',
    children: <Button>Get Started</Button>,
  },
  globals: { businessUnit: 'plan' },
};
