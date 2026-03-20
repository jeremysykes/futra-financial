import { SplitDisplay } from './SplitDisplay';

export function HeroSection() {
  return (
    <section className="pt-[100px] pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: copy */}
        <div className="flex-1 max-w-xl">
          <h1 className="font-sans font-bold text-4xl md:text-5xl leading-tight text-foreground mb-6">
            Stop splitting hairs.{' '}
            <br />
            Start splitting{' '}
            <span style={{ color: '#C4622D' }}>fairly</span>.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Joint accounts, fair splits, and shared savings goals &mdash; designed for couples,
            roommates, and anyone sharing a financial life.
          </p>
          <button className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-[10px] hover:bg-primary-hover transition-colors text-base">
            Start Sharing
          </button>
        </div>

        {/* Right: visual */}
        <div className="flex-1 max-w-md w-full flex flex-col gap-5">
          {/* Overlapping avatars */}
          <div className="flex items-center gap-0 mb-2">
            <div
              className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center font-sans font-bold text-sm text-white z-10"
              style={{ borderColor: '#6C6FE4', backgroundColor: '#6C6FE4' }}
            >
              A
            </div>
            <div
              className="w-12 h-12 rounded-full border-[3px] flex items-center justify-center font-sans font-bold text-sm text-white -ml-3"
              style={{ borderColor: '#C4622D', backgroundColor: '#C4622D' }}
            >
              J
            </div>
            <span className="ml-3 text-sm text-muted-foreground font-medium">
              Alex &amp; Jordan
            </span>
          </div>

          {/* Split display */}
          <SplitDisplay
            label="Rent"
            total="$2,400"
            splits={[
              { name: 'Alex', amount: '$1,200', percent: 50, color: 'indigo' },
              { name: 'Jordan', amount: '$1,200', percent: 50, color: 'terracotta' },
            ]}
          />

          {/* Shared goal card */}
          <div className="rounded-[14px] p-5 bg-surface border border-border shadow-[0_2px_8px_rgba(28,26,24,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans font-semibold text-base text-foreground">
                Weekend Getaway
              </span>
              <span className="font-mono text-sm font-medium text-foreground">62%</span>
            </div>
            <div className="flex rounded-full overflow-hidden h-3">
              <div style={{ width: '31%', backgroundColor: '#6C6FE4' }} />
              <div style={{ width: '31%', backgroundColor: '#C4622D' }} />
              <div style={{ width: '38%' }} className="bg-secondary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              $930 of $1,500 saved together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
