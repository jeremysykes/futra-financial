export function CTASection() {
  return (
    <section id="cta" className="py-20 bg-gradient-to-br from-primary to-primary-hover">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2
          className="text-[32px] sm:text-[40px] text-primary-foreground tracking-[-0.02em] mb-4 font-sans font-bold"
        >
          Start spending smarter today.
        </h2>
        <p
          className="text-primary-foreground/80 text-[17px] leading-[1.6] mb-8 font-sans font-normal"
        >
          No minimum balance. No hidden fees. No waiting. Open your account in under two minutes.
        </p>
        <a
          href="#"
          className="inline-flex items-center px-8 py-3.5 bg-white text-accent text-[16px] rounded-lg hover:bg-white/90 transition-colors font-sans font-semibold"
        >
          Download the App
        </a>
      </div>
    </section>
  );
}
