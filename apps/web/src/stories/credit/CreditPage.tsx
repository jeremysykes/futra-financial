import { Navbar } from '../navbar/Navbar';
import { ScoreDisplay } from '../score-display/ScoreDisplay';
import { HeroSection } from '../hero-section/HeroSection';
import { TrustSection } from '../trust-section/TrustSection';
import { FeatureSection } from '../feature-section/FeatureSection';
import { FAQSection } from '../faq-section/FAQSection';
import { CTASection } from '../cta-section/CTASection';
import { Footer } from '../footer/Footer';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Logo } from '../logo/Logo';
import {
  CreditFeatures,
  CreditFooter,
  CreditLinks,
  CreditFAQs,
  CreditSignals,
} from '../../mocks/credit.mock';

export function CreditPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar unitName="credit" links={CreditLinks} ctaText="Check Your Score" />

      <>
      <HeroSection
        eyebrow="Free credit monitoring"
        heading={
          <>
            Your credit score,
            <br />
            without the anxiety.
          </>
        }
        subheading="Free credit monitoring that gives you clarity — not panic. Understand your score, track your progress, and take control of your financial future."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-CREDIT-01.png`}
        backgroundOpacity="opacity-30"
        overlayOpacity="bg-gradient-to-r from-background/70 via-background/50 to-background/30"
        actions={<Button>See Your Score Free</Button>}
      >
        <ScoreDisplay score={724} label="Good" percentage={0.75} size={260} />
      </HeroSection>

      <TrustSection
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-CREDIT-02.png`}
      >
        {CreditSignals.map((signal, i) => (
          <div key={signal.text} className="flex items-center gap-6">
            {i > 0 && <div className="hidden sm:block w-px h-8 bg-border" />}
            <div className="flex items-center gap-3">
              <signal.icon size={18} className="text-primary shrink-0" />
              <span className="font-sans text-sm font-medium text-muted-foreground whitespace-nowrap">
                {signal.text}
              </span>
            </div>
          </div>
        ))}
      </TrustSection>

      <FeatureSection
        subtitle="Features"
        heading="Everything you need to understand your credit"
        className="bg-gradient-to-b from-background to-secondary/40"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CreditFeatures.map((feature, i) => (
            <Card
              key={feature.title}
              variant="left"
              interactive
              data-animate="fade-in-up"
              style={{ '--animate-delay': `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-sans font-semibold text-foreground text-base mb-2">
                {feature.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </FeatureSection>

      <FAQSection
        eyebrow="FAQ"
        heading="Common questions"
        items={CreditFAQs}
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-CREDIT-03.png`}
      />

      <CTASection
        heading="Take the first step toward credit clarity"
        description="Join thousands of people who monitor their credit score for free. No credit card required."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-CREDIT-03.png`}
        backgroundOpacity="opacity-[0.06]"
        className="bg-gradient-to-br from-secondary/80 to-secondary/30"
      >
        <Button>Get Started Free</Button>
      </CTASection>

      </>

      <Footer className="bg-[#1A1830]">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <Logo unitName="credit" variant="dark" className="text-[#F9F7FF]" />
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {CreditFooter.map((col) => (
              <div key={col.title}>
                <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#F9F7FF]">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block mb-3 font-sans text-sm text-[#9896C8] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(152,150,200,0.2)]">
          <span className="font-sans text-xs text-[#6B6880]">
            &copy; 2026 Futra Financial. All rights reserved.
          </span>
        </div>
      </Footer>
    </div>
  );
}
