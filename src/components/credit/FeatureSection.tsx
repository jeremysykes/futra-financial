import { Gauge, CreditCard, Activity, Bell } from 'lucide-react';

const features = [
  {
    icon: Gauge,
    title: 'Credit Score Monitoring',
    description: 'Track your credit score over time with clear, easy-to-read charts and weekly updates.',
  },
  {
    icon: CreditCard,
    title: 'Balance Tracking & Reminders',
    description: 'Stay on top of your balances and never miss a payment with smart reminders.',
  },
  {
    icon: Activity,
    title: 'Debt Payoff Planner',
    description: 'Create a personalized plan to pay down debt faster and save on interest.',
  },
  {
    icon: Bell,
    title: 'Score Alerts & Insights',
    description: 'Get notified when your score changes and understand exactly what drove it.',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
            Features
          </p>
          <h2 className="font-sans font-bold text-foreground text-3xl md:text-4xl tracking-[-0.01em]">
            Everything you need to understand your credit
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-surface border border-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-foreground text-base mb-2">
                {feature.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
