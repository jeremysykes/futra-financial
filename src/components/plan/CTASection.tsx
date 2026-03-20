export function CTASection() {
  return (
    <section
      id="pricing"
      className="py-24 md:py-32"
      style={{
        background:
          'linear-gradient(135deg, rgba(108,111,228,0.08) 0%, rgba(42,191,163,0.04) 50%, rgba(108,111,228,0.06) 100%)',
      }}
    >
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="mb-4 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Your spreadsheet served you well.
          <br />
          It&rsquo;s time for an upgrade.
        </h2>
        <p className="mb-10 font-sans text-lg leading-[1.7] text-muted-foreground">
          Free to start. No credit card required. Connect your accounts in under
          two minutes and see the full picture today.
        </p>
        <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-base hover:bg-primary-hover transition-opacity cursor-pointer">
          Start Planning Free
        </button>
      </div>
    </section>
  );
}
