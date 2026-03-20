const TESTIMONIALS = [
  {
    names: 'Sarah & Mike',
    context: 'Couple, 3 years together',
    initials: ['S', 'M'],
    quote:
      'We used to argue about groceries every single week. Now it just... happens. We see the split, it\u2019s fair, nobody\u2019s keeping score anymore.',
  },
  {
    names: 'Priya & Tom',
    context: 'Partners saving for first trip',
    initials: ['P', 'T'],
    quote:
      'The shared savings goal for our trip to Portugal literally brought us closer. Watching both bars grow together was weirdly romantic.',
  },
  {
    names: 'Maria & Alex',
    context: 'Roommates in Brooklyn',
    initials: ['M', 'A'],
    quote:
      'As roommates, we needed something more grown-up than Venmo requests. This finally makes shared living feel organized, not awkward.',
  },
];

export function TestimonialSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-16">
          Real people, real splits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.names}
              className="rounded-[14px] bg-surface border border-border p-6 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Paired avatars */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center">
                  <div
                    className="w-10 h-10 rounded-full border-[2.5px] flex items-center justify-center font-sans font-bold text-xs text-white z-10"
                    style={{ borderColor: '#6C6FE4', backgroundColor: '#6C6FE4' }}
                  >
                    {t.initials[0]}
                  </div>
                  <div
                    className="w-10 h-10 rounded-full border-[2.5px] flex items-center justify-center font-sans font-bold text-xs text-white -ml-2.5"
                    style={{ borderColor: '#C4622D', backgroundColor: '#C4622D' }}
                  >
                    {t.initials[1]}
                  </div>
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-foreground">{t.names}</p>
                  <p className="text-xs text-muted-foreground">{t.context}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
