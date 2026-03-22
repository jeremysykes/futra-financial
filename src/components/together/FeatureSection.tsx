import { TogetherFeatures } from '../../mocks/together.mock';
import { Card } from '../../stories/card/Card';

export function FeatureSection() {
  return (
    <section id="features" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-16">
          Built for sharing
        </h2>

        <div className="mb-12 rounded-xl overflow-hidden max-h-[200px] relative">
          <img
            src={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-02.png`}
            alt="Shared life"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TogetherFeatures.map((feature, i) => (
            <Card
              key={feature.title}
              accent="left"
              interactive
              className="flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-[10px] flex items-center justify-center mb-5 ${feature.colorType === 'accent' ? 'bg-accent/10' : 'bg-primary/10'}`}
              >
                <feature.icon
                  size={22}
                  className={
                    feature.colorType === 'accent'
                      ? 'text-accent'
                      : 'text-primary'
                  }
                />
              </div>
              <h3 className="font-sans font-semibold text-base text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
