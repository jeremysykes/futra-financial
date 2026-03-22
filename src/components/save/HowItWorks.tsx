import { ProcessSteps } from '../../stories/process-steps/ProcessSteps';
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

        <ProcessSteps
          size="md"
          connector="dashed"
          badgeShape="rounded"
          iconStrokeWidth={1.5}
          steps={SaveSteps}
        />
      </div>
    </section>
  );
}
