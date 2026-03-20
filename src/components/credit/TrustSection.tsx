import { Lock, Shield, RefreshCw, Target } from 'lucide-react';

const signals = [
  { icon: Lock, text: 'Bank-level encryption' },
  { icon: Shield, text: 'No impact to your credit score' },
  { icon: RefreshCw, text: 'Updated weekly' },
  { icon: Target, text: 'Free forever \u2014 no hidden costs' },
];

export function TrustSection() {
  return (
    <section className="bg-secondary/20 border-y border-border">
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {signals.map((signal, i) => (
            <div key={signal.text} className="flex items-center gap-6">
              {i > 0 && (
                <div className="hidden sm:block w-px h-8 bg-border" />
              )}
              <div className="flex items-center gap-3">
                <signal.icon size={18} className="text-primary shrink-0" />
                <span className="font-sans text-sm font-medium text-muted-foreground whitespace-nowrap">
                  {signal.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
