import type { ComponentType } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CircleDot, Coins, CalendarClock, Trophy } from 'lucide-react';
import { FeatureSection } from './FeatureSection';
import { Card } from '../card/Card';
import { withStoryDisplay } from '../decorators';

const FeatureCard = ({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: ComponentType<{ size: number; className: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  delay?: number;
}) => (
  <Card
    accent="top"
    interactive
    className="animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-muted">
      <Icon size={22} className="text-accent" strokeWidth={1.5} />
    </div>
    <h4 className="mb-2 font-sans font-semibold text-[17px] text-foreground">
      {title}
    </h4>
    <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
      {desc}
    </p>
  </Card>
);

const meta = {
  title: 'Templates/FeatureSection',
  component: FeatureSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof FeatureSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    subtitle: 'Saving, your way',
    heading: 'Tools that fit your life',
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={CircleDot} title="Visual goal tracking" desc="See every goal at a glance with progress rings and bars." delay={0} />
        <FeatureCard icon={Coins} title="Smart round-ups" desc="Every purchase rounds up to the nearest dollar." delay={100} />
        <FeatureCard icon={CalendarClock} title="Scheduled transfers" desc="Set it and forget it. Automatic transfers keep you on track." delay={200} />
        <FeatureCard icon={Trophy} title="Milestones & streaks" desc="Celebrate each milestone. Streaks reward your consistency." delay={300} />
      </div>
    ),
  },
  globals: { businessUnit: 'save' },
};

export const MutedBackground: Story = {
  args: {
    background: 'muted',
    heading: 'Everything you need',
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard icon={CircleDot} title="Feature one" desc="Description of the feature." delay={0} />
        <FeatureCard icon={Coins} title="Feature two" desc="Description of the feature." delay={100} />
        <FeatureCard icon={CalendarClock} title="Feature three" desc="Description of the feature." delay={200} />
        <FeatureCard icon={Trophy} title="Feature four" desc="Description of the feature." delay={300} />
      </div>
    ),
  },
  globals: { businessUnit: 'credit' },
};

export const Compact: Story = {
  args: {
    padding: 'compact',
    heading: 'Key features',
    children: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard icon={CircleDot} title="Feature one" desc="Description." delay={0} />
        <FeatureCard icon={Coins} title="Feature two" desc="Description." delay={100} />
        <FeatureCard icon={CalendarClock} title="Feature three" desc="Description." delay={200} />
      </div>
    ),
  },
  globals: { businessUnit: 'plan' },
};
