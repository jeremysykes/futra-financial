import { TrendingUp } from 'lucide-react';

const metrics = [
  { label: 'Net Worth', value: '$184,230', trend: '+12.4%' },
  { label: 'Monthly Savings', value: '$2,140', trend: '+3.2%' },
  { label: 'Runway', value: '34 yrs', trend: 'On track' },
];

const budgetItems = [
  { label: 'Housing', spent: 1850, budget: 2000, color: '#6C6FE4' },
  { label: 'Food', spent: 620, budget: 600, color: '#E8A838' },
  { label: 'Transport', spent: 280, budget: 400, color: '#2ABFA3' },
  { label: 'Savings', spent: 500, budget: 500, color: '#6C6FE4' },
  { label: 'Utilities', spent: 195, budget: 250, color: '#2ABFA3' },
];

export function DashboardPreview() {
  return (
    <div className="rounded-xl bg-surface border border-border overflow-hidden shadow-2xl">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-[#E8A838]" />
        <span className="w-3 h-3 rounded-full bg-[#2ABFA3]" />
        <span className="w-3 h-3 rounded-full bg-[#6C6FE4]" />
        <span className="ml-3 font-sans text-xs text-muted-foreground">
          Futra Plan Dashboard
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Metric cards */}
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg bg-secondary p-3 border border-border"
            >
              <span className="block font-sans text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
                {m.label}
              </span>
              <span className="block font-mono font-semibold text-sm text-foreground">
                {m.value}
              </span>
              <span className="flex items-center gap-1 mt-1 font-mono text-[10px] text-positive">
                <TrendingUp size={10} />
                {m.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Net worth chart */}
        <div className="rounded-lg bg-secondary border border-border p-3">
          <span className="block font-sans text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
            Net Worth
          </span>
          <svg
            viewBox="0 0 400 120"
            className="w-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="nw-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2ABFA3" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2ABFA3" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <polygon
              points="0,100 30,92 65,88 100,82 135,78 170,70 200,65 235,58 270,52 305,40 340,35 370,28 400,20 400,120 0,120"
              fill="url(#nw-fill)"
            />
            <polyline
              points="0,100 30,92 65,88 100,82 135,78 170,70 200,65 235,58 270,52 305,40 340,35 370,28 400,20"
              fill="none"
              stroke="#6C6FE4"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* X-axis labels */}
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
              (month, i) => (
                <text
                  key={month}
                  x={i * 36.4}
                  y="118"
                  className="font-mono"
                  fill="#64748B"
                  fontSize="8"
                >
                  {month}
                </text>
              ),
            )}
          </svg>
        </div>

        {/* Budget bars */}
        <div className="rounded-lg bg-secondary border border-border p-3">
          <span className="block font-sans text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
            Budget vs Actual
          </span>
          <div className="space-y-2">
            {budgetItems.map((item) => {
              const pct = Math.min((item.spent / item.budget) * 100, 100);
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-16 font-sans text-[10px] text-muted-foreground truncate">
                    {item.label}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-background">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-[10px] text-muted-foreground">
                    ${item.spent}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
