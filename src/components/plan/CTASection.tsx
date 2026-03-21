import { Button } from '../../stories/button/Button';

export function CTASection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          'linear-gradient(135deg, rgba(108,111,228,0.12) 0%, rgba(42,191,163,0.06) 50%, rgba(108,111,228,0.10) 100%)',
      }}
    >
      <div className="absolute inset-0 z-0">
        <img src="/images/IMG-PLAN-03.png" alt="" className="w-full h-full object-cover opacity-[0.1]" />
      </div>
      <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center">
        <h2 className="mb-4 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Your spreadsheet served you well.
          <br />
          It&rsquo;s time for an upgrade.
        </h2>
        <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground">
          Free to start. No credit card required. Connect your accounts in under
          two minutes and see the full picture today.
        </p>
        <Button>Start Planning Free</Button>
      </div>
    </section>
  );
}
