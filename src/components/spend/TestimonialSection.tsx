const testimonials = [
  {
    quote: "I got a notification before the barista even handed me my coffee. That's when I knew Futra was different.",
    name: 'Jasmine K.',
    role: 'Freelance Designer, NYC',
    initials: 'JK',
  },
  {
    quote: 'Splitting rent with three roommates used to be a nightmare. Now it takes literally five seconds, no fees.',
    name: 'Marcus T.',
    role: 'Software Engineer, Austin',
    initials: 'MT',
  },
  {
    quote: "The weekly spending breakdown actually changed how I budget. I didn't know I was spending that much on food delivery.",
    name: 'Priya S.',
    role: 'Product Manager, LA',
    initials: 'PS',
  },
];

export function TestimonialSection() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <p
          className="text-[12px] uppercase tracking-[0.08em] text-accent mb-3 font-sans font-medium"
        >
          WHAT PEOPLE SAY
        </p>
        <h2
          className="text-[32px] sm:text-[36px] text-foreground tracking-[-0.02em] mb-12 font-sans font-bold"
        >
          Real users, real talk.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <p
                className="text-[15px] text-muted-foreground leading-[1.6] italic mb-6 font-sans font-normal"
              >
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-[13px] text-accent font-sans font-semibold">
                  {t.initials}
                </div>
                <div>
                  <p className="text-[14px] text-foreground font-sans font-semibold">{t.name}</p>
                  <p className="text-[12px] text-muted-foreground font-sans font-medium">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
