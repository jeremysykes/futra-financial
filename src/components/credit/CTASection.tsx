export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2 className="font-sans font-bold text-foreground text-3xl md:text-4xl tracking-[-0.01em] mb-6">
          Take the first step toward credit clarity
        </h2>
        <p className="font-sans text-lg leading-[1.7] text-muted-foreground mb-10 max-w-[480px] mx-auto">
          Join thousands of people who monitor their credit score for free. No credit card required.
        </p>
        <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-sans font-medium text-base hover:bg-primary-hover transition-opacity cursor-pointer">
          Get Started Free
        </button>
      </div>
    </section>
  );
}
