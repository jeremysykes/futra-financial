import { SplitDisplay } from './SplitDisplay';
import { Button } from '../../stories/button/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-[calc(var(--nav-top,0px)+64px)] bg-background">
      <div className="absolute inset-0 z-0">
        <img src="/images/IMG-TOGETHER-01.png" alt="" className="w-full h-full object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: copy */}
        <div className="flex-1 max-w-xl">
          <h1 className="font-sans font-bold text-4xl md:text-5xl leading-tight text-foreground mb-6">
            Stop splitting hairs.{' '}
            <br />
            Start splitting{' '}
            <span className="text-accent">fairly</span>.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Joint accounts, fair splits, and shared savings goals &mdash; designed for couples,
            roommates, and anyone sharing a financial life.
          </p>
          <Button>Start Sharing</Button>
        </div>

        {/* Right: visual */}
        <div className="flex-1 max-w-md w-full flex flex-col gap-5">
          {/* Overlapping avatars */}
          <div className="flex items-center gap-0 mb-2">
            <img
              src="/images/IMG-TOGETHER-04.png"
              alt="Alex"
              className="w-12 h-12 rounded-full border-[3px] border-primary object-cover z-10"
            />
            <img
              src="/images/IMG-TOGETHER-05.png"
              alt="Jordan"
              className="w-12 h-12 rounded-full border-[3px] border-accent object-cover -ml-3"
            />
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
              <div className="bg-primary" style={{ width: '31%' }} />
              <div className="bg-accent" style={{ width: '31%' }} />
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
