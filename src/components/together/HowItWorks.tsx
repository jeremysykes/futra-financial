import { Link, Settings, Eye } from 'lucide-react';
import { ProcessSteps } from '../../stories/process-steps/ProcessSteps';

const steps = [
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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ProcessSteps
          size="lg"
          connector="solid"
          badgeShape="circle"
          badgeClassName="bg-surface border border-border"
          steps={steps}
        />
      </div>
    </section>
  );
}
