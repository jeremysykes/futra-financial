import { Home, HandCoins, Heart, Bell } from 'lucide-react';

const FEATURES = [
  {
    icon: Home,
    title: 'One view, all accounts',
    description: 'See both checking accounts, credit cards, and shared balances in a single dashboard.',
    iconColor: '#C4622D',
  },
  {
    icon: HandCoins,
    title: 'Smart bill splitting',
    description: 'Automatically divide recurring bills, one-off expenses, or custom ratios with zero effort.',
    iconColor: '#6C6FE4',
  },
  {
    icon: Heart,
    title: 'Shared savings goals',
    description: 'Set goals together and watch both contributions grow side by side in real time.',
    iconColor: '#C4622D',
  },
  {
    icon: Bell,
    title: 'Real-time for both',
    description: 'Instant notifications keep both users in the loop on every transaction and milestone.',
    iconColor: '#6C6FE4',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-16">
          Built for sharing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[14px] bg-surface border border-border p-6 flex flex-col"
            >
              <div className="w-12 h-12 rounded-[10px] flex items-center justify-center mb-5" style={{ backgroundColor: feature.iconColor === '#C4622D' ? 'rgba(196,98,45,0.10)' : 'rgba(108,111,228,0.10)' }}>
                <feature.icon size={22} style={{ color: feature.iconColor }} />
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
