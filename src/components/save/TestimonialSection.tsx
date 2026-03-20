const testimonials = [
  {
    quote: 'I finally saved enough for my first solo trip to Portugal. Seeing that progress bar inch forward every week kept me going.',
    name: 'Maya Chen',
    role: 'Saved $3,200 for travel',
    initials: 'MC',
    color: '#A8C5B0',
  },
  {
    quote: "The round-ups are sneaky good. I barely notice them, but I've saved over $1,400 in six months without even trying.",
    name: 'Jordan Ellis',
    role: 'Building an emergency fund',
    initials: 'JE',
    color: '#6C6FE4',
  },
  {
    quote: "Other apps made saving feel like a chore. Futra makes it feel like I'm actually building something. The milestones are *chef's kiss*.",
    name: 'Priya Kapoor',
    role: 'Saving for a down payment',
    initials: 'PK',
    color: '#4A7C59',
  },
];

export function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          From our savers
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Real goals, real progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="rounded-xl p-6 bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <p className="mb-6 font-sans text-base leading-[1.7] text-foreground italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-[13px]"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <span className="block font-sans font-semibold text-sm text-foreground">{t.name}</span>
                  <span className="font-sans font-medium text-xs text-muted-foreground">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
