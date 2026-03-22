import { TogetherTestimonials } from '../../mocks/together.mock';
import { Card } from '../../stories/card/Card';

export function TestimonialSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-16">
          Real people, real splits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TogetherTestimonials.map((t, i) => (
            <Card
              key={t.names}
              interactive
              className="flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Paired avatars */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full border-[2.5px] border-primary bg-primary flex items-center justify-center font-sans font-bold text-xs text-white z-10">
                    {t.initials[0]}
                  </div>
                  <div className="w-10 h-10 rounded-full border-[2.5px] border-accent bg-accent flex items-center justify-center font-sans font-bold text-xs text-white -ml-2.5">
                    {t.initials[1]}
                  </div>
                </div>
                <div>
                  <p className="font-sans font-semibold text-sm text-foreground">
                    {t.names}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.context}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
