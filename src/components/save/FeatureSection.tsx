import { SaveFeatures } from '../../mocks/save.mock';
import { Card } from '../../stories/card/Card';

export function FeatureSection() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          Saving, your way
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Tools that fit your life
        </h2>

        <div className="mb-12 rounded-xl overflow-hidden max-h-[200px] relative">
          <img
            src={`${import.meta.env.BASE_URL}images/IMG-SAVE-02.png`}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SaveFeatures.map((f, i) => (
            <Card
              key={f.title}
              accent="top"
              interactive
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-muted">
                <f.icon size={22} className="text-accent" strokeWidth={1.5} />
              </div>
              <h4 className="mb-2 font-sans font-semibold text-[17px] text-foreground">
                {f.title}
              </h4>
              <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
