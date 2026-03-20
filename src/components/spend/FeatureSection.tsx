import { Zap, Send, Shield, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Feed',
    desc: 'Every transaction appears instantly with smart categorization. No more refreshing, no more guessing.',
  },
  {
    icon: Send,
    title: 'Instant P2P Transfers',
    desc: 'Send money to anyone in seconds — no fees, no delays. Split dinner or pay rent without thinking twice.',
  },
  {
    icon: Shield,
    title: 'Card Controls',
    desc: "Freeze your card, set spending limits, and get instant push notifications. You're always in control.",
  },
  {
    icon: BarChart3,
    title: 'Spending Insights',
    desc: 'Weekly summaries and category breakdowns show you exactly where your money goes. No surprises.',
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p
          className="text-[12px] uppercase tracking-[0.08em] text-accent mb-3 font-sans font-medium"
        >
          BUILT FOR YOUR DAY
        </p>
        <h2
          className="text-[32px] sm:text-[40px] text-foreground tracking-[-0.02em] mb-12 font-sans font-bold"
        >
          Everything you need,
          <br />
          nothing you don't.
        </h2>
        <div className="mb-12 rounded-xl overflow-hidden max-h-[200px] relative">
          <img src="/images/IMG-SPEND-02.png" alt="Contactless payment" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-surface border border-border border-l-4 border-l-primary rounded-xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-accent" />
              </div>
              <h4
                className="text-[18px] text-foreground mb-2 font-sans font-semibold"
              >
                {f.title}
              </h4>
              <p
                className="text-[15px] text-muted-foreground leading-[1.6] font-sans font-normal"
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
