import { TogetherExamples } from '../../mocks/together.mock';
import { SplitDisplay } from './SplitDisplay';

export function SplitShowcase() {
  return (
    <section className="relative overflow-hidden py-20 bg-secondary/40">
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-03.png`}
          alt=""
          className="w-full h-full object-cover opacity-[0.08]"
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <h2 className="font-sans font-bold text-3xl text-foreground text-center mb-4">
          Split it any way you want
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
          50/50, 60/40, or 100% one person. Every expense can have its own
          ratio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TogetherExamples.map((example) => (
            <SplitDisplay key={example.label} {...example} />
          ))}
        </div>
      </div>
    </section>
  );
}
