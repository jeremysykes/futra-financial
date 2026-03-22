import { Target, Repeat, TrendingUp } from 'lucide-react';
import { ProcessSteps } from '../../stories/process-steps/ProcessSteps';

const steps = [
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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-muted/40">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          Three steps to start
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Simple by design
        </h2>

        <ProcessSteps
          size="md"
          connector="dashed"
          badgeShape="rounded"
          iconStrokeWidth={1.5}
          steps={steps}
        />
      </div>
    </section>
  );
}
