import { SaveStats } from '../../mocks/save.mock';

export function StatsRow() {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {SaveStats.map((s, i) => (
            <div
              key={s.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="block mb-2 font-mono font-medium text-accent text-[clamp(28px,4vw,40px)]">
                {s.value}
              </span>
              <span className="uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
