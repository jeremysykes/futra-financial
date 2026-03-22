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
import {
  PlanBudgetData,
  PlanNetWorthLong,
  PlanProjectionData,
  PlanRetirementData,
} from '../../mocks/plan.mock';

const monoFont = 'JetBrains Mono, monospace';
const sansFont = 'Inter, sans-serif';

interface BlockProps {
  overline: string;
  title: string;
  desc: string;
  chart: React.ReactNode;
  reverse?: boolean;
}

function FeatureBlock({ overline, title, desc, chart, reverse }: BlockProps) {
  return (
    <div
      className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? 'md:[direction:rtl]' : ''}`}
    >
      <div style={{ direction: 'ltr' }}>
        <p className="font-sans font-medium text-xs tracking-[0.08em] uppercase text-accent mb-3">
          {overline}
        </p>
        <h3 className="font-sans font-semibold text-foreground leading-[1.2] text-[clamp(24px,3vw,32px)]">
          {title}
        </h3>
        <p className="mt-4 font-sans text-base leading-[1.6] text-muted-foreground max-w-[440px]">
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

function useChartColors() {
  const style =
    typeof window !== 'undefined'
      ? getComputedStyle(document.documentElement)
      : null;
  const get = (name: string, fallback: string) =>
    style?.getPropertyValue(name).trim() || fallback;
  return {
    accent: get('--color-accent', '#6C6FE4'),
    positive: get('--color-positive', '#2ABFA3'),
    caution: get('--color-caution', '#E8A838'),
    mutedFg: get('--color-muted-foreground', '#64748B'),
    border: get('--color-border', 'rgba(160,174,192,0.1)'),
  };
}

export function FeatureDeepDive() {
  const c = useChartColors();
  const gridStroke = 'var(--color-border)';
  const tickFill = 'var(--color-muted-foreground)';

  return (
    <section
      id="features"
      className="relative overflow-hidden py-20 md:py-32 bg-background"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/IMG-PLAN-02.png`}
          alt=""
          className="w-full h-full object-cover opacity-[0.06]"
        />
      </div>
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 flex flex-col gap-24 md:gap-32">
        <FeatureBlock
          overline="THE BIG PICTURE"
          title="Net worth, tracked over time."
          desc="Watch your wealth compound with a precise, annotated timeline. Every asset, every liability, one clean chart you'll actually want to check."
          chart={
            <div className="w-full" style={{ height: 200 }}>
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
                    tick={{
                      fill: tickFill,
                      fontFamily: monoFont,
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fill: tickFill,
                      fontFamily: monoFont,
                      fontSize: 10,
                    }}
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
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          }
        />

        <FeatureBlock
          reverse
          overline="WHERE IT GOES"
          title="Budget vs actuals, no surprises."
          desc="See exactly where you overspend and where you save. Horizontal breakdowns by category with instant variance highlighting — Teal when you're under, Amber when you're over."
          chart={
            <div className="w-full" style={{ height: 220 }}>
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
                    tick={{
                      fill: tickFill,
                      fontFamily: monoFont,
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `$${v}`}
                  />
                  <YAxis
                    dataKey="cat"
                    type="category"
                    tick={{
                      fill: tickFill,
                      fontFamily: sansFont,
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={70}
                  />
                  <Bar dataKey="budget" fill={c.accent} radius={[0, 4, 4, 0]} />
                  <Bar
                    dataKey="actual"
                    fill={c.positive}
                    radius={[0, 4, 4, 0]}
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
            <div className="w-full" style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={PlanProjectionData}>
                  <CartesianGrid stroke={gridStroke} vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{
                      fill: tickFill,
                      fontFamily: monoFont,
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{
                      fill: tickFill,
                      fontFamily: monoFont,
                      fontSize: 10,
                    }}
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
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke={c.accent}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="conservative"
                    stroke={c.mutedFg}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          }
        />

        <FeatureBlock
          reverse
          overline="THE LONG VIEW"
          title="Retirement runway, quantified."
          desc="One number that matters: years until financial independence. Watch it update in real-time as you adjust savings rate, expected returns, and target spending."
          chart={
            <div>
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
                      tick={{
                        fill: tickFill,
                        fontFamily: monoFont,
                        fontSize: 10,
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fill: tickFill,
                        fontFamily: monoFont,
                        fontSize: 10,
                      }}
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
}
