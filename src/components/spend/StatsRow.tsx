const stats = [
  { value: '<300ms', label: 'Transaction Speed' },
  { value: '99.99%', label: 'Platform Uptime' },
  { value: '2.4M+', label: 'Active Users' },
  { value: '38', label: 'Countries Supported' },
];

export function StatsRow() {
  return (
    <section className="bg-surface py-16 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p
              className="text-[28px] sm:text-[32px] text-foreground mb-1 font-mono font-medium"
            >
              {s.value}
            </p>
            <p
              className="text-[12px] uppercase tracking-[0.08em] text-muted-foreground font-sans font-medium"
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
