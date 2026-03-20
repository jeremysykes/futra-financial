function NetWorthChart() {
  return (
    <div className="rounded-xl bg-surface border border-border p-6">
      <svg viewBox="0 0 400 200" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C6FE4" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#6C6FE4" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon
          points="0,180 40,165 80,155 120,140 160,130 200,110 240,95 280,80 320,60 360,45 400,30 400,200 0,200"
          fill="url(#area-fill)"
        />
        <polyline
          points="0,180 40,165 80,155 120,140 160,130 200,110 240,95 280,80 320,60 360,45 400,30"
          fill="none"
          stroke="#6C6FE4"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {['2019', '2020', '2021', '2022', '2023', '2024'].map((yr, i) => (
          <text
            key={yr}
            x={i * 80}
            y="198"
            fill="#64748B"
            fontSize="10"
            className="font-mono"
          >
            {yr}
          </text>
        ))}
      </svg>
    </div>
  );
}

function BudgetBarsChart() {
  const bars = [
    { label: 'Housing', budget: 85, actual: 78, status: 'under' as const },
    { label: 'Food', budget: 60, actual: 65, status: 'over' as const },
    { label: 'Transport', budget: 40, actual: 32, status: 'under' as const },
    { label: 'Entertainment', budget: 35, actual: 34, status: 'on' as const },
    { label: 'Savings', budget: 50, actual: 50, status: 'on' as const },
  ];

  const colorMap = { under: '#2ABFA3', over: '#E8A838', on: '#6C6FE4' };

  return (
    <div className="rounded-xl bg-surface border border-border p-6 space-y-4">
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className="flex justify-between mb-1">
            <span className="font-sans text-sm text-foreground">{bar.label}</span>
            <span className="font-mono text-xs text-muted-foreground">
              ${bar.actual * 10} / ${bar.budget * 10}
            </span>
          </div>
          <div className="relative h-3 rounded-full bg-secondary">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${bar.budget}%`,
                backgroundColor: 'rgba(108,111,228,0.15)',
              }}
            />
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${bar.actual}%`,
                backgroundColor: colorMap[bar.status],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function CashFlowChart() {
  return (
    <div className="rounded-xl bg-surface border border-border p-6">
      <svg viewBox="0 0 400 200" className="w-full" preserveAspectRatio="none">
        {/* Income (Indigo solid) */}
        <polyline
          points="0,140 50,130 100,120 150,110 200,100 250,88 300,75 350,60 400,45"
          fill="none"
          stroke="#6C6FE4"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Expenses (Teal dashed) */}
        <polyline
          points="0,155 50,148 100,145 150,140 200,135 250,130 300,126 350,122 400,118"
          fill="none"
          stroke="#2ABFA3"
          strokeWidth="2"
          strokeDasharray="6,4"
          strokeLinejoin="round"
        />
        {/* Baseline (Steel dashed) */}
        <polyline
          points="0,170 50,168 100,167 150,166 200,165 250,164 300,163 350,162 400,160"
          fill="none"
          stroke="#64748B"
          strokeWidth="1.5"
          strokeDasharray="4,4"
          strokeLinejoin="round"
        />
        {/* Legend */}
        <line x1="20" y1="12" x2="40" y2="12" stroke="#6C6FE4" strokeWidth="2" />
        <text x="44" y="15" fill="#A0AEC0" fontSize="9" className="font-sans">Income</text>
        <line x1="100" y1="12" x2="120" y2="12" stroke="#2ABFA3" strokeWidth="2" strokeDasharray="4,3" />
        <text x="124" y="15" fill="#A0AEC0" fontSize="9" className="font-sans">Expenses</text>
        <line x1="195" y1="12" x2="215" y2="12" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3,3" />
        <text x="219" y="15" fill="#A0AEC0" fontSize="9" className="font-sans">Baseline</text>
      </svg>
    </div>
  );
}

function RunwayChart() {
  return (
    <div className="rounded-xl bg-surface border border-border p-6">
      <div className="flex items-baseline gap-3 mb-4">
        <span className="font-mono font-bold text-5xl text-positive">34</span>
        <span className="font-sans text-sm text-muted-foreground">
          Years to financial independence
        </span>
      </div>
      <svg viewBox="0 0 400 120" className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="runway-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2ABFA3" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2ABFA3" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon
          points="0,100 40,95 80,88 120,80 160,70 200,58 240,48 280,38 320,28 360,20 400,14 400,120 0,120"
          fill="url(#runway-fill)"
        />
        <polyline
          points="0,100 40,95 80,88 120,80 160,70 200,58 240,48 280,38 320,28 360,20 400,14"
          fill="none"
          stroke="#2ABFA3"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

const features = [
  {
    overline: 'THE BIG PICTURE',
    title: 'Net worth tracking that actually makes sense',
    description:
      'See every account, asset, and liability rolled into a single number that updates in real time. Watch your trajectory, not just your balance.',
    chart: <NetWorthChart />,
    reverse: false,
  },
  {
    overline: 'WHERE IT GOES',
    title: 'Budget vs. actuals, visualized',
    description:
      'Set spending targets by category and see exactly how you compare each month. Green means under budget. Amber means time to adjust.',
    chart: <BudgetBarsChart />,
    reverse: true,
  },
  {
    overline: "WHERE IT'S HEADING",
    title: 'Cash flow projections you can trust',
    description:
      'Model future income and expenses based on your real data. See three scenarios side by side so you can plan with confidence, not hope.',
    chart: <CashFlowChart />,
    reverse: false,
  },
  {
    overline: 'THE LONG VIEW',
    title: 'Retirement runway, calculated',
    description:
      'Know exactly how many years until financial independence based on your savings rate, investment returns, and target number.',
    chart: <RunwayChart />,
    reverse: true,
  },
];

export function FeatureDeepDive() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6 space-y-28">
        {features.map((f) => (
          <div
            key={f.overline}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
              f.reverse ? 'md:[direction:rtl]' : ''
            }`}
          >
            <div style={f.reverse ? { direction: 'ltr' } : undefined}>
              <p className="mb-3 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
                {f.overline}
              </p>
              <h3 className="mb-4 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(24px,3.5vw,36px)]">
                {f.title}
              </h3>
              <p className="font-sans text-base leading-[1.7] text-muted-foreground max-w-[440px]">
                {f.description}
              </p>
            </div>
            <div style={f.reverse ? { direction: 'ltr' } : undefined}>
              {f.chart}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
