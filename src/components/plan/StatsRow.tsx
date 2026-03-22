import { TrendingUp } from 'lucide-react';
import { Card } from '../../stories/card/Card';
import { PlanStats } from '../../mocks/plan.mock';

export function StatsRow() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {PlanStats.map((s, i) => (
            <Card
              key={s.label}
              accent="left"
              interactive
              className="bg-secondary text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="block mb-1 font-mono font-semibold text-foreground text-[clamp(28px,4vw,40px)]">
                {s.value}
              </span>
              <span className="block mb-2 uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
                {s.label}
              </span>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-positive">
                <TrendingUp size={12} />
                {s.trend}
              </span>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
