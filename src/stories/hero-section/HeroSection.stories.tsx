import type { Meta, StoryObj } from '@storybook/react-vite';
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
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LeftRight: Story = {
  args: {
    layout: 'left-right',
    eyebrow: 'Goal-based savings',
    heading: (
      <>
        Every dollar has
        <br />a destination
      </>
    ),
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
};
