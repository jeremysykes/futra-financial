import type { Meta, StoryObj } from '@storybook/react-vite';
import { Target, Repeat, TrendingUp, Link, Settings, Eye } from 'lucide-react';
import { HowItWorks } from './HowItWorks';
import { ProcessSteps } from '../process-steps/ProcessSteps';
import { withStoryDisplay } from '../decorators';

const meta = {
  title: 'Templates/HowItWorks',
  component: HowItWorks,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof HowItWorks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Save: Story = {
  args: {
    eyebrow: 'Three steps to start',
    heading: 'Simple by design',
    children: (
      <ProcessSteps
        size="md"
        connector="dashed"
        badgeShape="rounded"
        iconStrokeWidth={1.5}
        steps={[
          { icon: Target, label: 'Step 01', title: 'Name your goal', description: 'Set a target amount and a timeline that works for you.' },
          { icon: Repeat, label: 'Step 02', title: 'Automate it', description: 'Round-ups, scheduled transfers, or manual deposits.' },
          { icon: TrendingUp, label: 'Step 03', title: 'Watch it grow', description: 'Visual progress tracking that keeps you motivated.' },
        ]}
        animated
      />
    ),
  },
  globals: { businessUnit: 'save' },
};

export const Together: Story = {
  args: {
    background: 'muted',
    padding: 'compact',
    children: (
      <ProcessSteps
        size="lg"
        connector="solid"
        badgeShape="circle"
        badgeClassName="bg-surface border border-border"
        steps={[
          { icon: Link, label: '01', title: 'Connect your accounts', description: 'Link your bank accounts. Both of you. Takes two minutes.' },
          { icon: Settings, label: '02', title: 'Set up your splits', description: "Choose what's shared, how to split it, and who pays what." },
          { icon: Eye, label: '03', title: 'Live transparently', description: 'See every shared expense, goal, and payment in real time.' },
        ]}
        animated
      />
    ),
  },
  globals: { businessUnit: 'together' },
};
