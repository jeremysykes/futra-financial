import type { ReactNode } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { useChartColors } from '../../hooks/useChartColors';
import {
  PlanBudgetData,
  PlanNetWorthLong,
  PlanProjectionData,
  PlanRetirementData,
} from '../../mocks/plan.mock';

const featureBlockVariants = cva(
  'grid md:grid-cols-2 gap-8 md:gap-16 items-center',
  {
    variants: {
      direction: {
        default: '',
        reverse: 'md:[direction:rtl]',
      },
    },
    defaultVariants: {
      direction: 'default',
    },
  },
);

interface FeatureBlockProps extends VariantProps<typeof featureBlockVariants> {
  overline: string;
  title: string;
  desc: string;
  chart: ReactNode;
  className?: string;
}

function FeatureBlock({
  overline,
  title,
  desc,
  chart,
  direction,
  className,
}: FeatureBlockProps) {
  return (
    <div className={cn(featureBlockVariants({ direction }), className)}>
      <div style={{ direction: 'ltr' }}>
        <p className="font-sans font-medium text-xs tracking-[0.08em] uppercase text-accent mb-3">
          {overline}
        </p>
        <h3 className="font-sans font-semibold text-foreground leading-[1.2] text-[clamp(24px,3vw,32px)]">
          {title}
        </h3>
        <p className="mt-4 font-sans text-[clamp(15px,2vw,17px)] leading-[1.6] text-muted-foreground max-w-[440px]">
          {desc}
        </p>
      </div>
      <div
        style={{ direction: 'ltr' }}
        className="rounded-xl p-4 md:p-6 min-w-0"
      >
        <div className="rounded-lg p-4 bg-surface border border-border min-w-0">
          {chart}
        </div>
      </div>
    </div>
  );
}

const monoFont = 'JetBrains Mono, monospace';

const featureDeepDiveVariants = cva('relative overflow-hidden bg-background', {
  variants: {
    padding: {
      default: 'py-16 sm:py-20 md:py-28 lg:py-32',
      compact: 'py-12 sm:py-16 md:py-24',
    },
  },
  defaultVariants: {
    padding: 'default',
  },
});

export interface FeatureDeepDiveProps extends VariantProps<
  typeof featureDeepDiveVariants
> {
  /** Additional CSS classes for the root element */
  className?: string;
}

/**
 * Deep-dive feature blocks with alternating chart and text layout.
 *
 * Renders a series of feature blocks in a two-column grid that
 * alternates direction. Each block includes an overline, title,
 * description, and chart visualization. Content is hardcoded for
 * the Spend business unit.
 *
 * @default padding "default"
 */
const FeatureDeepDive = ({ padding, className }: FeatureDeepDiveProps) => {
  const c = useChartColors();
  const gridStroke = 'var(--color-border)';
  const tickFill = 'var(--color-muted-foreground)';
  const tickStyle = { fill: tickFill, fontFamily: monoFont, fontSize: 10 };

  return (
    <section
      id="features"
      className={cn(featureDeepDiveVariants({ padding }), className)}
    >
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/IMG-PLAN-02.png`}
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-6 flex flex-col gap-16 sm:gap-24 md:gap-32">
        <FeatureBlock
          overline="THE BIG PICTURE"
          title="Net worth, tracked over time."
          desc="Watch your wealth compound with a precise, annotated timeline. Every asset, every liability, one clean chart you'll actually want to check."
          chart={
            <div
              role="img"
              aria-label="Net worth growth from $98K in 2020 to $184K in 2025"
              className="w-full"
              style={{ height: 200 }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={PlanNetWorthLong}>
                  <defs>
                    <linearGradient id="nwg2" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={c.accent}
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor={c.accent}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={gridStroke} vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                    width={50}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={c.accent}
                    strokeWidth={2}
                    fill="url(#nwg2)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          }
        />

        <FeatureBlock
          direction="reverse"
          overline="WHERE IT GOES"
          title="Budget vs actuals, no surprises."
          desc="See exactly where you overspend and where you save. Horizontal breakdowns by category with instant variance highlighting — Teal when you're under, Amber when you're over."
          chart={
            <div
              role="img"
              aria-label="Budget vs actuals comparison by category"
              className="w-full"
              style={{ height: 220 }}
            >
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={PlanBudgetData}
                  layout="vertical"
                  barGap={2}
                  barSize={10}
                >
                  <CartesianGrid stroke={gridStroke} horizontal={false} />
                  <XAxis
                    type="number"
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${v}`}
                  />
                  <YAxis
                    dataKey="cat"
                    type="category"
                    tick={{
                      fill: tickFill,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={70}
                  />
                  <Bar
                    dataKey="budget"
                    fill={c.accent}
                    radius={[0, 4, 4, 0]}
                    isAnimationActive={false}
                  />
                  <Bar
                    dataKey="actual"
                    fill={c.positive}
                    radius={[0, 4, 4, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          }
        />

        <FeatureBlock
          overline="WHERE IT'S HEADING"
          title="Cash flow projections with confidence bands."
          desc="See your financial trajectory across optimistic, projected, and conservative scenarios. Data-driven projections that update as your habits evolve."
          chart={
            <div
              role="img"
              aria-label="Cash flow projections with optimistic, projected, and conservative scenarios"
              className="w-full"
              style={{ height: 200 }}
            >
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={PlanProjectionData}>
                  <CartesianGrid stroke={gridStroke} vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={tickStyle}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) =>
                      `$${(v / 1000000).toFixed(1)}M`
                    }
                    width={50}
                  />
                  <Line
                    type="monotone"
                    dataKey="optimistic"
                    stroke={c.positive}
                    strokeWidth={1.5}
                    strokeDasharray="6 3"
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke={c.accent}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="conservative"
                    stroke={c.mutedFg}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          }
        />

        <FeatureBlock
          direction="reverse"
          overline="THE LONG VIEW"
          title="Retirement runway, quantified."
          desc="One number that matters: years until financial independence. Watch it update in real-time as you adjust savings rate, expected returns, and target spending."
          chart={
            <div
              role="img"
              aria-label="Retirement runway projection reaching $3.2M by 2059"
            >
              <div className="text-center mb-4">
                <span className="font-mono text-5xl font-medium text-positive">
                  34
                </span>
                <span className="block font-sans font-medium text-xs text-muted-foreground tracking-[0.08em] uppercase mt-1">
                  Years to financial independence
                </span>
              </div>
              <div className="w-full" style={{ height: 140 }}>
                <ResponsiveContainer width="100%" height={140}>
                  <AreaChart data={PlanRetirementData}>
                    <defs>
                      <linearGradient id="retG" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0%"
                          stopColor={c.positive}
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="100%"
                          stopColor={c.positive}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke={gridStroke} vertical={false} />
                    <XAxis
                      dataKey="year"
                      tick={tickStyle}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={tickStyle}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) =>
                        `$${(v / 1000000).toFixed(1)}M`
                      }
                      width={50}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke={c.positive}
                      strokeWidth={2}
                      fill="url(#retG)"
                      isAnimationActive={false}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          }
        />
      </div>
    </section>
  );
};

FeatureDeepDive.displayName = 'FeatureDeepDive';

export { FeatureDeepDive };
