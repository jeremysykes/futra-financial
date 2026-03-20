import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const netWorthData = [
  { month: 'Jan', value: 156000 },
  { month: 'Feb', value: 158200 },
  { month: 'Mar', value: 155800 },
  { month: 'Apr', value: 161400 },
  { month: 'May', value: 164800 },
  { month: 'Jun', value: 163200 },
  { month: 'Jul', value: 168900 },
  { month: 'Aug', value: 172400 },
  { month: 'Sep', value: 170100 },
  { month: 'Oct', value: 176800 },
  { month: 'Nov', value: 180500 },
  { month: 'Dec', value: 184230 },
];

const budgetCategories = [
  { name: 'Housing', budget: 2200, actual: 2200, color: '#6C6FE4' },
  { name: 'Food', budget: 800, actual: 920, color: '#E8A838' },
  { name: 'Transport', budget: 400, actual: 310, color: '#2ABFA3' },
  { name: 'Savings', budget: 2500, actual: 2140, color: '#2ABFA3' },
  { name: 'Utilities', budget: 350, actual: 380, color: '#E8A838' },
];

export function DashboardPreview() {
  return (
    <div className="rounded-xl overflow-hidden w-full bg-surface border border-border">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-background border-b border-border">
        <div className="w-3 h-3 rounded-full bg-[#E8A838]" />
        <div className="w-3 h-3 rounded-full bg-[#2ABFA3]" />
        <div className="w-3 h-3 rounded-full bg-[#6C6FE4]" />
        <span className="ml-3 font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
          Futra Plan Dashboard
        </span>
      </div>

      <div className="p-4 md:p-6">
        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
          {[
            { label: 'Net Worth', value: '$184,230', trend: '+12.4%' },
            { label: 'Monthly Savings', value: '$2,140', trend: '+3.2%' },
            { label: 'Runway', value: '34 yrs', trend: 'On track' },
          ].map((m) => (
            <div key={m.label} className="rounded-lg p-3 md:p-4 bg-secondary border border-border">
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
          <div className="w-full h-[140px] md:h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={netWorthData}>
                <defs>
                  <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ABFA3" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2ABFA3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(160,174,192,0.05)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  width={45}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6C6FE4"
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
            {budgetCategories.map((c) => {
              const pct = Math.min((c.actual / c.budget) * 100, 100);
              return (
                <div key={c.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-sans text-xs text-muted-foreground">{c.name}</span>
                    <span className="font-mono text-xs font-medium" style={{ color: c.color }}>
                      ${c.actual.toLocaleString()} / ${c.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: 'rgba(160,174,192,0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: c.color }}
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
