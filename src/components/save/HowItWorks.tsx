import { Target, Repeat, TrendingUp } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Target,
    title: 'Name your goal',
    desc: 'Set a target amount and a timeline that works for you. Trip, home, rainy day — you decide.',
  },
  {
    num: '02',
    icon: Repeat,
    title: 'Automate it',
    desc: 'Round-ups, scheduled transfers, or manual deposits. Choose what fits your rhythm.',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Watch it grow',
    desc: 'Visual progress tracking that keeps you motivated. Every dollar gets you closer.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-muted/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          Three steps to start
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Simple by design
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <div
            className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px"
            style={{ borderTop: '2px dashed var(--color-border)' }}
          />
          {steps.map((step) => (
            <div key={step.num} className="text-center relative">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-muted">
                <step.icon size={28} className="text-accent" strokeWidth={1.5} />
              </div>
              <span className="block mb-2 font-mono font-medium text-[13px] text-accent">
                Step {step.num}
              </span>
              <h3 className="mb-3 font-sans font-semibold text-xl text-foreground">
                {step.title}
              </h3>
              <p className="font-sans text-base leading-[1.7] text-muted-foreground max-w-[300px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
