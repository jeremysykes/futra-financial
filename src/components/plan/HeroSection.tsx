import { DashboardPreview } from './DashboardPreview';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-[calc(var(--nav-top,0px)+64px)] bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 max-w-xl">
            <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
              Your money, mapped.
            </p>
            <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
              Every dollar, every year,
              <br />
              one clear picture.
            </h1>
            <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground max-w-[460px]">
              Track net worth, budget with precision, and project your financial
              future -- all from a single dashboard built for clarity.
            </p>
            <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-base hover:bg-primary-hover transition-opacity cursor-pointer">
              Map Your Finances
            </button>
          </div>

          <div className="flex-1 relative w-full max-w-md lg:max-w-lg">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
