import { Link, Settings, Eye } from 'lucide-react';

const STEPS = [
  {
    icon: Link,
    number: '01',
    title: 'Connect your accounts',
    desc: 'Link your bank accounts. Both of you. Takes two minutes.',
  },
  {
    icon: Settings,
    number: '02',
    title: 'Set up your splits',
    desc: "Choose what's shared, how to split it, and who pays what.",
  },
  {
    icon: Eye,
    number: '03',
    title: 'Live transparently',
    desc: 'See every shared expense, goal, and payment in real time.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-8 left-[16.67%] right-[16.67%] h-px bg-border" />

          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center relative animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mb-5 relative z-10">
                <step.icon size={24} className="text-accent" />
              </div>
              <span className="font-mono text-3xl font-bold mb-3 text-accent">
                {step.number}
              </span>
              <h3 className="font-sans font-semibold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-[280px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
