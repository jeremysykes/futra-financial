import { TogetherSteps } from '../../mocks/together.mock';
import { ProcessSteps } from '../../stories/process-steps/ProcessSteps';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <ProcessSteps
          size="lg"
          connector="solid"
          badgeShape="circle"
          badgeClassName="bg-surface border border-border"
          steps={TogetherSteps}
        />
      </div>
    </section>
  );
}
