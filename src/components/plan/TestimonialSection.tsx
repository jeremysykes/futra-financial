const testimonials = [
  {
    quote:
      'I used to dread checking my finances. Now I open Futra Plan every morning with my coffee. Seeing my net worth chart trend upward is genuinely motivating.',
    name: 'Sarah Chen',
    role: 'Software Engineer',
    initials: 'SC',
    color: '#6C6FE4',
  },
  {
    quote:
      'The budget vs. actuals view changed how I think about spending. I cut $400/month without feeling deprived -- I just finally saw where it was going.',
    name: 'Marcus Webb',
    role: 'Product Manager',
    initials: 'MW',
    color: '#2ABFA3',
  },
  {
    quote:
      'As a data analyst, I appreciate that the projections use real methodology, not just straight-line extrapolation. The confidence intervals are a nice touch.',
    name: 'Priya Kapoor',
    role: 'Data Analyst',
    initials: 'PK',
    color: '#E8A838',
  },
];

export function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          From our planners
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Built for people who think in spreadsheets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="rounded-xl p-6 bg-surface border border-border shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
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
                  <span className="block font-sans font-semibold text-sm text-foreground">
                    {t.name}
                  </span>
                  <span className="font-sans font-medium text-xs text-muted-foreground">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
