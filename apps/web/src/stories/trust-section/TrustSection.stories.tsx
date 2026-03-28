import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Lock, Shield, RefreshCw, Target } from 'lucide-react';
import { TrustSection } from './TrustSection';
import { withStoryDisplay } from '../decorators';

const TrustSignal = ({
  icon: Icon,
  text,
  showDivider = false,
}: {
  icon: typeof Lock;
  text: string;
  showDivider?: boolean;
}) => (
  <div className="flex items-center gap-6">
    {showDivider && <div className="hidden sm:block w-px h-8 bg-border" />}
    <div className="flex items-center gap-3">
      <Icon size={18} className="text-primary shrink-0" />
      <span className="font-sans text-sm font-medium text-muted-foreground whitespace-nowrap">
        {text}
      </span>
    </div>
  </div>
);

const meta = {
  title: 'Templates/TrustSection',
  component: TrustSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'inline-radio',
      options: ['default', 'muted'],
      table: { category: 'Appearance' },
    },
    padding: {
      control: 'inline-radio',
      options: ['default', 'compact'],
      table: { category: 'Layout' },
    },
    backgroundImage: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    backgroundOpacity: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    className: {
      control: { type: 'text' },
      table: { category: 'Appearance' },
    },
    children: { table: { disable: true } },
  },
  decorators: [withStoryDisplay()],
} satisfies Meta<typeof TrustSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    background: 'default',
    padding: 'default',
    backgroundImage: `${import.meta.env.BASE_URL}images/IMG-CREDIT-02.png`,
    children: (
      <>
        <TrustSignal icon={Lock} text="Bank-level encryption" />
        <TrustSignal
          icon={Shield}
          text="No impact to your credit score"
          showDivider
        />
        <TrustSignal icon={RefreshCw} text="Updated weekly" showDivider />
        <TrustSignal
          icon={Target}
          text="Free forever — no hidden costs"
          showDivider
        />
      </>
    ),
  },
  globals: { businessUnit: 'credit' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Bank-level encryption')).toBeInTheDocument();
    expect(
      canvas.getByText('No impact to your credit score'),
    ).toBeInTheDocument();
    expect(canvas.getByText('Updated weekly')).toBeInTheDocument();
    expect(canvas.getByText(/Free forever/)).toBeInTheDocument();
  },
};
