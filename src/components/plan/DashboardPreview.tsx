import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import {
  PlanBudgetCategories,
  PlanNetWorthData,
  PlanStatusColors,
} from '../../mocks/plan.mock';

export function DashboardPreview() {
  return (
    <div className="rounded-xl overflow-hidden w-full bg-surface border border-border">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-background border-b border-border">
        <div className="w-3 h-3 rounded-full bg-negative" />
        <div className="w-3 h-3 rounded-full bg-caution" />
        <div className="w-3 h-3 rounded-full bg-positive" />
        <span className="ml-3 font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
          Futra Plan Dashboard
        </span>
      </div>

      <div className="p-4 md:p-6">
        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          {[
            { label: 'Net Worth', value: '$184K', trend: '+12.4%' },
            { label: 'Monthly Savings', value: '$2,140', trend: '+3.2%' },
            { label: 'Runway', value: '34 yrs', trend: 'On track' },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-lg p-3 md:p-4 bg-secondary border border-border"
            >
              <div className="font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                {m.label}
              </div>
              <div className="mt-1 font-mono font-medium text-foreground text-[clamp(18px,3vw,32px)]">
                {m.value}
              </div>
              <div className="mt-1 font-mono text-xs text-positive">
                ↑ {m.trend}
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-lg p-3 md:p-4 mb-4 md:mb-6 bg-secondary border border-border">
          <div className="mb-3 font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
            Net Worth — 12 Month Trend
          </div>
          <div className="w-full min-w-0" style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={PlanNetWorthData}>
                <defs>
                  <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--color-positive)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-positive)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{
                    fill: 'var(--color-muted-foreground)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{
                    fill: 'var(--color-muted-foreground)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10,
                  }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  width={45}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  fill="url(#nwGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget bars */}
        <div className="rounded-lg p-3 md:p-4 bg-secondary border border-border">
          <div className="mb-3 font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
            Budget vs Actuals — This Month
          </div>
          <div className="flex flex-col gap-2.5">
            {PlanBudgetCategories.map((c) => {
              const pct = Math.min((c.actual / c.budget) * 100, 100);
              return (
                <div key={c.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-sans text-xs text-muted-foreground">
                      {c.name}
                    </span>
                    <span
                      className="font-mono text-xs font-medium"
                      style={{ color: PlanStatusColors[c.status] }}
                    >
                      ${c.actual.toLocaleString()} / $
                      {c.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: PlanStatusColors[c.status],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
