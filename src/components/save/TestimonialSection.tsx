import { SaveTestimonials } from '../../mocks/save.mock';
import { Card } from '../../stories/card/Card';

export function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          From our savers
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Real goals, real progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SaveTestimonials.map((t, i) => (
            <Card
              key={t.name}
              interactive
              className="animate-fade-in-up"
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
