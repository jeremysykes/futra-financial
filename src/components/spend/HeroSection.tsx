import { PhoneMockup } from './PhoneMockup';

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-background flex items-center overflow-hidden pt-16">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <h1
            className="text-[40px] sm:text-[48px] lg:text-[56px] text-foreground leading-[1.05] tracking-[-0.02em] mb-6 font-sans font-bold"
          >
            Your money,
            <br />
            <span className="text-accent">in real time.</span>
          </h1>
          <p
            className="text-muted-foreground text-[17px] leading-[1.6] mb-8 max-w-md mx-auto lg:mx-0 font-sans font-normal"
          >
            Instant transactions, zero fees, total control. See every dollar the second it moves — not hours later.
          </p>
          <a
            href="#cta"
            className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground text-[16px] rounded-lg hover:bg-primary-hover transition-colors font-sans font-medium"
          >
            Open Your Account
          </a>
        </div>
        <div className="flex-shrink-0">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
