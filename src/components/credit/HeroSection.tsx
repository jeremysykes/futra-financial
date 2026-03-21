import { ScoreDisplay } from './ScoreDisplay';
import { Button } from '../../stories/button/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-[calc(var(--nav-top,0px)+64px)] bg-background">
      <div className="absolute inset-0 z-0">
        <img src="/images/IMG-CREDIT-01.png" alt="" className="w-full h-full object-cover opacity-[0.07]" />
        <div className="absolute inset-0 bg-background/75" />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full">
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
            <Button>See Your Score Free</Button>
          </div>

          <div className="flex-1 flex justify-center w-full max-w-md lg:max-w-lg">
            <ScoreDisplay score={724} label="Good" percentage={0.75} size={260} />
          </div>
        </div>
      </div>
    </section>
  );
}
