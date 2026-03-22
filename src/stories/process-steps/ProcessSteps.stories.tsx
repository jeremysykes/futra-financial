import type { Meta, StoryObj } from '@storybook/react-vite';
import { Target, Repeat, TrendingUp, Link, Settings, Eye } from 'lucide-react';
import { ProcessSteps } from './ProcessSteps';
import { withStoryDisplay } from '../decorators';

const saveSteps = [
  {
    icon: Target,
    label: 'Step 01',
    title: 'Name your goal',
    description:
      'Set a target amount and a timeline that works for you. Trip, home, rainy day — you decide.',
  },
  {
    icon: Repeat,
    label: 'Step 02',
    title: 'Automate it',
    description:
      'Round-ups, scheduled transfers, or manual deposits. Choose what fits your rhythm.',
  },
  {
    icon: TrendingUp,
    label: 'Step 03',
    title: 'Watch it grow',
    description:
      'Visual progress tracking that keeps you motivated. Every dollar gets you closer.',
  },
];

const togetherSteps = [
  {
    icon: Link,
    label: '01',
    title: 'Connect your accounts',
    description: 'Link your bank accounts. Both of you. Takes two minutes.',
  },
  {
    icon: Settings,
    label: '02',
    title: 'Set up your splits',
    description: "Choose what's shared, how to split it, and who pays what.",
  },
  {
    icon: Eye,
    label: '03',
    title: 'Live transparently',
    description: 'See every shared expense, goal, and payment in real time.',
  },
];

const meta = {
  title: 'Molecules/ProcessSteps',
  component: ProcessSteps,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [withStoryDisplay({ maxWidth: 1200 })],
} satisfies Meta<typeof ProcessSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    steps: saveSteps,
  },
};

export const SaveStyle: Story = {
  parameters: {
    globals: { businessUnit: 'save' },
  },
  args: {
    size: 'md',
    connector: 'dashed',
    badgeShape: 'rounded',
    steps: saveSteps,
  },
};

export const TogetherStyle: Story = {
  parameters: {
    globals: { businessUnit: 'together' },
  },
  args: {
    size: 'lg',
    connector: 'solid',
    badgeShape: 'circle',
    steps: togetherSteps,
  },
};

export const SmallSize: Story = {
  args: {
    size: 'sm',
    steps: saveSteps,
  },
};

export const NoConnector: Story = {
  args: {
    connector: 'none',
    steps: saveSteps,
  },
};

export const NoAnimation: Story = {
  args: {
    steps: saveSteps,
    animated: false,
  },
};

export const SquareBadges: Story = {
  args: {
    badgeShape: 'square',
    steps: saveSteps,
  },
};
