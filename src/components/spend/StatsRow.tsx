import { SpendStats } from '../../mocks/spend.mock';

export function StatsRow() {
  return (
    <section className="bg-primary/[0.04] py-16 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {SpendStats.map((s, i) => (
          <div
            key={s.label}
            className="text-center animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-[28px] sm:text-[32px] text-foreground mb-1 font-mono font-medium">
              {s.value}
            </p>
            <p className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground font-sans font-medium">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
