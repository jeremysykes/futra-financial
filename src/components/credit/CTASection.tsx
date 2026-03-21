import { Button } from '../../stories/button/Button';

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-secondary/80 to-secondary/30">
      <div className="absolute inset-0 z-0">
        <img src="/images/IMG-CREDIT-03.png" alt="" className="w-full h-full object-cover opacity-[0.06]" />
      </div>
      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <h2 className="font-sans font-bold text-foreground text-3xl md:text-4xl tracking-[-0.01em] mb-6">
          Take the first step toward credit clarity
        </h2>
        <p className="font-sans text-lg leading-[1.7] text-muted-foreground mb-10 max-w-[480px] mx-auto">
          Join thousands of people who monitor their credit score for free. No credit card required.
        </p>
        <Button>Get Started Free</Button>
      </div>
    </section>
  );
}
