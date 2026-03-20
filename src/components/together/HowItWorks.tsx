import { Link, Settings, Eye } from 'lucide-react';

const STEPS = [
  { icon: Link, number: '01', title: 'Connect your accounts' },
  { icon: Settings, number: '02', title: 'Set up your splits' },
  { icon: Eye, number: '03', title: 'Live transparently' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-16">
          How it works
        </h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-px bg-border" />

          {STEPS.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center relative animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 rounded-[10px] bg-secondary flex items-center justify-center mb-5 relative z-10">
                <step.icon size={24} className="text-foreground" />
              </div>
              <span
                className="font-mono text-3xl font-bold mb-3"
                style={{ color: '#C4622D' }}
              >
                {step.number}
              </span>
              <h3 className="font-sans font-semibold text-lg text-foreground">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
