import { SaveSteps } from '../../mocks/save.mock';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-muted/40">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          Three steps to start
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          Simple by design
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <div
            className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px"
            style={{ borderTop: '2px dashed var(--color-border)' }}
          />
          {SaveSteps.map((step, i) => (
            <div
              key={step.num}
              className="text-center relative animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-muted">
                <step.icon
                  size={28}
                  className="text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <span className="block mb-2 font-mono font-medium text-[13px] text-accent">
                Step {step.num}
              </span>
              <h3 className="mb-3 font-sans font-semibold text-xl text-foreground">
                {step.title}
              </h3>
              <p className="font-sans text-base leading-[1.7] text-muted-foreground max-w-[300px] mx-auto">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
