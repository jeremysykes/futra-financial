import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { HeroSection } from './HeroSection';
import { Button } from '../button/Button';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: 'inline-radio',
      options: ['left-right', 'centered'],
      table: { category: 'Layout' },
    },
    size: {
      control: 'inline-radio',
      options: ['default', 'tall'],
      table: { category: 'Layout' },
    },
    heading: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    subheading: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    eyebrow: {
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
    overlayOpacity: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    hideChildrenLandscape: {
      control: { type: 'boolean' },
      table: { category: 'Behavior' },
    },
    children: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeftRight: Story = {
  args: {
    layout: 'left-right',
    size: 'default',
    eyebrow: 'Goal-based savings',
    heading: 'Every dollar has a destination',
    subheading:
      'Automate your savings with round-ups and scheduled transfers. Watch your goals grow with beautiful, visual progress tracking.',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-SAVE-01.png`,
    actions: <Button>Create Your First Goal</Button>,
    children: (
      <div className="text-muted-foreground text-center p-16 border border-dashed border-border rounded-xl">
        Visual area — signature component goes here
      </div>
    ),
  },
  globals: { businessUnit: 'save' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Every dollar has a destination')).toBeInTheDocument();
    expect(canvas.getByText('Goal-based savings')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Create Your First Goal' })).toBeInTheDocument();
  },
};

export const LeftRightWithAccent: Story = {
  args: {
    layout: 'left-right',
    heading: (
      <>
        Your money,
        <br />
        <span className="text-accent">in real time.</span>
      </>
    ),
    subheading:
      'Instant transactions, zero fees, total control. See every dollar the second it moves — not hours later.',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-SPEND-01.png`,
    backgroundOpacity: 'opacity-10',
    overlayOpacity: 'bg-background/80',
    actions: (
      <Button asChild>
        <a href="#cta">Open Your Account</a>
      </Button>
    ),
  },
  globals: { businessUnit: 'spend' },
};

export const Centered: Story = {
  args: {
    layout: 'centered',
    eyebrow: 'Financial planning',
    heading: 'See the full picture',
    subheading:
      'A dashboard that connects every account, every goal, and every dollar into one clear view.',
    actions: <Button>Start Planning</Button>,
  },
  globals: { businessUnit: 'plan' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('See the full picture')).toBeInTheDocument();
    expect(canvas.getByText('Financial planning')).toBeInTheDocument();
    expect(canvas.getByRole('button', { name: 'Start Planning' })).toBeInTheDocument();
  },
};
