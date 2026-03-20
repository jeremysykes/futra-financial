export function CTASection() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-sans font-bold text-3xl text-foreground mb-4">
          Your shared financial journey starts here
        </h2>
        <p className="text-muted-foreground mb-8">
          Free for both users. No hidden fees, no awkward conversations.
        </p>
        <button className="bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-[10px] hover:bg-primary-hover transition-colors text-base">
          Get Started Together
        </button>
      </div>
    </section>
  );
}
