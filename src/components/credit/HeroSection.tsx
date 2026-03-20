import { ScoreDisplay } from './ScoreDisplay';

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-[calc(var(--nav-top,0px)+64px)] bg-background">
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 max-w-xl">
            <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
              Free credit monitoring
            </p>
            <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
              Your credit score,
              <br />without the anxiety.
            </h1>
            <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground max-w-[460px]">
              Free credit monitoring that gives you clarity — not panic.
              Understand your score, track your progress, and take control
              of your financial future.
            </p>
            <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-base hover:bg-primary-hover transition-opacity cursor-pointer">
              See Your Score Free
            </button>
          </div>

          <div className="flex-1 flex justify-center w-full max-w-md lg:max-w-lg">
            <ScoreDisplay score={724} label="Good" percentage={0.75} size={260} />
          </div>
        </div>
      </div>
    </section>
  );
}
