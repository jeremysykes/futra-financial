import { Button } from '../../stories/button/Button';

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-muted to-accent/10">
      <div className="absolute inset-0 z-0">
        <img src={`${import.meta.env.BASE_URL}images/IMG-SAVE-03.png`} alt="" className="w-full h-full object-cover opacity-[0.08]" />
      </div>
      <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center">
        <h2 className="mb-4 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Your first goal is waiting
        </h2>
        <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground">
          No minimum amounts. No fees. Just a calm, focused way to build toward
          something that matters to you.
        </p>
        <Button>Start Saving</Button>
      </div>
    </section>
  );
}
