import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { TestimonialSection } from './TestimonialSection';
import { Card } from '../card/Card';
import { withStoryDisplay } from '../decorators';

const TestimonialCard = ({
  quote,
  name,
  subtitle,
  initials,
  color,
}: {
  quote: string;
  name: string;
  subtitle: string;
  initials: string;
  color: string;
}) => (
  <Card interactive className="animate-fade-in-up">
    <p className="mb-6 font-sans text-base leading-[1.7] text-foreground italic">
      &ldquo;{quote}&rdquo;
    </p>
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-[13px]"
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      <div>
        <span className="block font-sans font-semibold text-sm text-foreground">
          {name}
        </span>
        <span className="font-sans font-medium text-xs text-muted-foreground">
          {subtitle}
        </span>
      </div>
    </div>
  </Card>
);

const meta = {
  title: 'Templates/TestimonialSection',
  component: TestimonialSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'inline-radio',
      options: [2, 3],
      table: { category: 'Layout' },
    },
    heading: {
      control: { type: 'text' },
      table: { category: 'Content' },
    },
    subtitle: {
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
} satisfies Meta<typeof TestimonialSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = {
  args: {
    columns: 3,
    subtitle: 'From our savers',
    heading: 'Real goals, real progress',
    children: (
      <>
        <TestimonialCard
          quote="I finally saved enough for my first solo trip to Portugal."
          name="Maya Chen"
          subtitle="Saved $3,200 for travel"
          initials="MC"
          color="#A8C5B0"
        />
        <TestimonialCard
          quote="The round-ups are sneaky good. I've saved over $1,400 in six months."
          name="Jordan Ellis"
          subtitle="Building an emergency fund"
          initials="JE"
          color="#3D8B5E"
        />
        <TestimonialCard
          quote="Futra makes saving feel like I'm actually building something."
          name="Priya Kapoor"
          subtitle="Saving for a down payment"
          initials="PK"
          color="#4A7C59"
        />
      </>
    ),
  },
  globals: { businessUnit: 'save' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Real goals, real progress')).toBeInTheDocument();
    expect(canvas.getByText('From our savers')).toBeInTheDocument();
    expect(canvas.getByText('Maya Chen')).toBeInTheDocument();
    expect(canvas.getByText('Jordan Ellis')).toBeInTheDocument();
    expect(canvas.getByText('Priya Kapoor')).toBeInTheDocument();
  },
};

export const TwoColumns: Story = {
  args: {
    columns: 2,
    subtitle: 'What our users say',
    heading: 'Trusted by thousands',
    children: (
      <>
        <TestimonialCard
          quote="Planning our finances together has never been easier."
          name="Alex Rivera"
          subtitle="Couple planning"
          initials="AR"
          color="#D4718A"
        />
        <TestimonialCard
          quote="We finally have visibility into our shared expenses."
          name="Sam Taylor"
          subtitle="Joint account holder"
          initials="ST"
          color="#C25D7B"
        />
      </>
    ),
  },
  globals: { businessUnit: 'together' },
};
