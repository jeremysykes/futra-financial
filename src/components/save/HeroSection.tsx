import { ProgressCard } from './ProgressCard';
import { Button } from '../../stories/button/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-[calc(var(--nav-top,0px)+64px)] bg-background">
      <div className="absolute inset-0 z-0">
        <img src={`${import.meta.env.BASE_URL}images/IMG-SAVE-01.png`} alt="" className="w-full h-full object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-28 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 max-w-xl">
            <p className="mb-4 uppercase font-sans font-medium text-xs tracking-[0.08em] text-accent">
              Goal-based savings
            </p>
            <h1 className="mb-6 font-sans font-bold text-foreground leading-[1.1] tracking-[-0.01em] text-[clamp(36px,5vw,56px)]">
              Every dollar has
              <br />a destination
            </h1>
            <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground max-w-[460px]">
              Automate your savings with round-ups and scheduled transfers.
              Watch your goals grow with beautiful, visual progress tracking.
            </p>
            <Button>Create Your First Goal</Button>
          </div>

          <div className="flex-1 relative w-full max-w-md lg:max-w-lg">
            <div className="relative" style={{ minHeight: 380 }}>
              <div className="absolute top-0 left-0 w-[280px] sm:w-[300px] z-10 shadow-xl -rotate-2">
                <ProgressCard goalName="Trip to Japan" targetAmount="$4,500" currentAmount="$3,015" percentage={67} />
              </div>
              <div className="absolute top-28 left-16 sm:left-24 w-[280px] sm:w-[300px] z-20 shadow-xl rotate-1">
                <ProgressCard goalName="Emergency Fund" targetAmount="$10,000" currentAmount="$4,300" percentage={43} />
              </div>
              <div className="absolute top-56 left-8 sm:left-12 w-[280px] sm:w-[300px] z-30 shadow-2xl -rotate-1">
                <ProgressCard goalName="New Laptop" targetAmount="$2,200" currentAmount="$1,958" percentage={89} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
