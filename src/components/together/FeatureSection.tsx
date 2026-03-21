import { Home, HandCoins, Heart, Bell } from 'lucide-react';

const FEATURES = [
  {
    icon: Home,
    title: 'One view, all accounts',
    description: 'See both checking accounts, credit cards, and shared balances in a single dashboard.',
    colorType: 'accent' as const,
  },
  {
    icon: HandCoins,
    title: 'Smart bill splitting',
    description: 'Automatically divide recurring bills, one-off expenses, or custom ratios with zero effort.',
    colorType: 'primary' as const,
  },
  {
    icon: Heart,
    title: 'Shared savings goals',
    description: 'Set goals together and watch both contributions grow side by side in real time.',
    colorType: 'accent' as const,
  },
  {
    icon: Bell,
    title: 'Real-time for both',
    description: 'Instant notifications keep both users in the loop on every transaction and milestone.',
    colorType: 'primary' as const,
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-16">
          Built for sharing
        </h2>

        <div className="mb-12 rounded-xl overflow-hidden max-h-[200px] relative">
          <img src="/images/IMG-TOGETHER-02.png" alt="Shared life" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="rounded-[14px] bg-surface border border-border p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-[10px] flex items-center justify-center mb-5 ${feature.colorType === 'accent' ? 'bg-accent/10' : 'bg-primary/10'}`}>
                <feature.icon size={22} className={feature.colorType === 'accent' ? 'text-accent' : 'text-primary'} />
              </div>
              <h3 className="font-sans font-semibold text-base text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
