import { SplitDisplay } from './SplitDisplay';

const EXAMPLES = [
  {
    label: 'Rent',
    total: '$2,400',
    splits: [
      { name: 'Alex', amount: '$1,200', percent: 50, color: 'indigo' as const },
      { name: 'Jordan', amount: '$1,200', percent: 50, color: 'terracotta' as const },
    ],
  },
  {
    label: 'Groceries',
    total: '$300',
    splits: [
      { name: 'Alex', amount: '$180', percent: 60, color: 'indigo' as const },
      { name: 'Jordan', amount: '$120', percent: 40, color: 'terracotta' as const },
    ],
  },
  {
    label: 'Netflix',
    total: '$15.99',
    splits: [
      { name: 'Jordan', amount: '$15.99', percent: 100, color: 'terracotta' as const },
    ],
  },
];

export function SplitShowcase() {
  return (
    <section className="relative overflow-hidden py-20 bg-secondary/40">
      <div className="absolute inset-0 z-0">
        <img src={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-03.png`} alt="" className="w-full h-full object-cover opacity-[0.08]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-4">
          Split it any way you want
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          50/50, 60/40, or 100% one person. Every expense can have its own ratio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXAMPLES.map((example) => (
            <SplitDisplay key={example.label} {...example} />
          ))}
        </div>
      </div>
    </section>
  );
}
