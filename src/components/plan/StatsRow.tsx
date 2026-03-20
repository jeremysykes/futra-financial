import { TrendingUp } from 'lucide-react';

const stats = [
  { value: '12,400+', label: 'Accounts Synced', trend: '+18%' },
  { value: '2.1M', label: 'Data Points / User', trend: '+24%' },
  { value: '94.7%', label: 'Projection Accuracy', trend: '+2.1%' },
  { value: '22 min', label: 'Avg Session Length', trend: '+8%' },
];

export function StatsRow() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-6 bg-secondary border border-border text-center"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
