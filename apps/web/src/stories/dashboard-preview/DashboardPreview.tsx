import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import {
  PlanBudgetCategories,
  PlanNetWorthData,
  PlanStatusColors,
} from '../../mocks/plan.mock';

const dashboardVariants = cva(
  'rounded-xl overflow-hidden w-full bg-surface border border-border',
  {
    variants: {
      size: {
        default: '',
        compact: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const panelVariants = cva(
  'rounded-lg bg-secondary border border-border',
  {
    variants: {
      padding: {
        default: 'p-2 sm:p-3 md:p-4',
        compact: 'p-1.5 sm:p-2 md:p-3',
      },
    },
    defaultVariants: {
      padding: 'default',
    },
  },
);

export interface DashboardPreviewProps
  extends VariantProps<typeof dashboardVariants> {
  /** Additional CSS classes for the dashboard container */
  className?: string;
}

const MetricCard = ({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) => (
  <div className={cn(panelVariants())}>
    <div className="font-sans font-medium text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-muted-foreground truncate">
      {label}
    </div>
    <div className="mt-1 font-mono font-medium text-foreground text-[clamp(16px,2.5vw,32px)]">
      {value}
    </div>
    <div className="mt-0.5 font-mono text-[10px] sm:text-xs text-positive truncate">↑ {trend}</div>
  </div>
);

const BudgetBar = ({
  name,
  budget,
  actual,
  status,
}: {
  name: string;
  budget: number;
  actual: number;
  status: string;
}) => {
  const pct = Math.min((actual / budget) * 100, 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-sans text-xs text-muted-foreground">{name}</span>
        <span
          className="font-mono text-xs font-medium"
          style={{ color: PlanStatusColors[status] }}
        >
          ${actual.toLocaleString()} / ${budget.toLocaleString()}
          <span className="sr-only"> ({status})</span>
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={actual}
        aria-valuemin={0}
        aria-valuemax={budget}
        aria-label={`${name}: $${actual.toLocaleString()} of $${budget.toLocaleString()}, ${status}`}
        className="w-full h-1.5 rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            backgroundColor: PlanStatusColors[status],
          }}
        />
      </div>
    </div>
  );
};

/**
 * Dashboard preview with metrics, charts, and budget bars.
 *
 * Renders a read-only dashboard mockup with balance, spending chart,
 * budget categories, and recent transactions. Data is hardcoded for
 * demonstration purposes.
 *
 * @default size "default"
 */
const DashboardPreview = ({ size, className }: DashboardPreviewProps) => {
  return (
    <div className={cn(dashboardVariants({ size }), className)}>
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-background border-b border-border">
        <div className="w-3 h-3 rounded-full bg-negative" />
        <div className="w-3 h-3 rounded-full bg-caution" />
        <div className="w-3 h-3 rounded-full bg-positive" />
        <span className="ml-3 font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
          Futra Plan Dashboard
        </span>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6">
          <MetricCard label="Net Worth" value="$184K" trend="+12.4%" />
          <MetricCard label="Monthly Savings" value="$2,140" trend="+3.2%" />
          <MetricCard label="Runway" value="34 yrs" trend="On track" />
        </div>

        {/* Chart */}
        <div className={cn(panelVariants(), 'mb-4 md:mb-6')}>
          <div className="mb-3 font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
            Net Worth — 12 Month Trend
          </div>
          <div role="img" aria-label="Net worth trend chart showing 12-month growth" className="w-full min-w-0" style={{ height: 180 }}>
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
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget bars */}
        <div className={cn(panelVariants())}>
          <div className="mb-3 font-sans font-medium text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
            Budget vs Actuals — This Month
          </div>
          <div className="flex flex-col gap-2.5">
            {PlanBudgetCategories.map((c) => (
              <BudgetBar key={c.name} {...c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DashboardPreview.displayName = 'DashboardPreview';

export { DashboardPreview };
