import { Button } from '../../stories/button/Button';

export function CTASection() {
  return (
    <section className="py-20 bg-secondary/40">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-sans font-bold text-3xl text-foreground mb-4">
          Your shared financial journey starts here
        </h2>
        <p className="text-muted-foreground mb-8">
          Free for both users. No hidden fees, no awkward conversations.
        </p>
        <Button>Get Started</Button>
      </div>
    </section>
  );
}
