export function SplitDisplay({
  label,
  total,
  splits,
}: {
  label: string;
  total: string;
  splits: { name: string; amount: string; percent: number; color: 'indigo' | 'terracotta' }[];
}) {
  const colors = {
    indigo: 'var(--color-primary)',
    terracotta: 'var(--color-accent)',
  };

  return (
    <div className="rounded-[14px] p-5 bg-surface border border-border shadow-[0_2px_8px_rgba(28,26,24,0.05)]">
      <div className="flex justify-between items-center mb-3">
        <span className="font-sans font-semibold text-base text-foreground">{label}</span>
        <span className="font-mono font-medium text-lg text-foreground">{total}</span>
      </div>

      {/* Split bar */}
      <div className="flex rounded-full overflow-hidden h-3 mb-3">
        {splits.map((s, i) => (
          <div
            key={i}
            style={{
              width: `${s.percent}%`,
              backgroundColor: colors[s.color],
            }}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between">
        {splits.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: colors[s.color] }}
            />
            <span className="text-xs text-muted-foreground font-medium">{s.name}</span>
            <span className="font-mono text-xs font-medium text-foreground">{s.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
