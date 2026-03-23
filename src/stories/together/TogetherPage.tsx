import { FocalImage } from '../focal-image/FocalImage';
import { Navbar } from '../navbar/Navbar';
import { HeroSection } from '../hero-section/HeroSection';
import { HowItWorks } from '../how-it-works/HowItWorks';
import { FeatureSection } from '../feature-section/FeatureSection';
import { TestimonialSection } from '../testimonial-section/TestimonialSection';
import { CTASection } from '../cta-section/CTASection';
import { Footer } from '../footer/Footer';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Logo } from '../logo/Logo';
import { ProcessSteps } from '../process-steps/ProcessSteps';
import { SplitDisplay } from '../split-display/SplitDisplay';
import {
  TogetherFeatures,
  TogetherFooter,
  TogetherLinks,
  TogetherSteps,
  TogetherExamples,
  TogetherTestimonials,
} from '../../mocks/together.mock';

export function TogetherPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar unitName="together" links={TogetherLinks} ctaText="Get Started" />

      <main id="main-content">
      <HeroSection
        heading={
          <>
            Stop splitting hairs. <br />
            Start splitting <span className="text-accent">fairly</span>.
          </>
        }
        subheading="Joint accounts, fair splits, and shared savings goals — designed for couples, roommates, and anyone sharing a financial life."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-01.png`}
        backgroundOpacity="opacity-30"
        overlayOpacity="bg-gradient-to-r from-background/70 via-background/50 to-background/30"
        actions={<Button>Start Sharing</Button>}
      >
        <div className="flex flex-col gap-5">
          {/* Overlapping avatars */}
          <div className="flex items-center gap-0 mb-2">
            <img
              src={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-04.png`}
              alt="Alex"
              className="w-12 h-12 rounded-full border-[3px] border-primary object-cover z-10"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-05.png`}
              alt="Jordan"
              className="w-12 h-12 rounded-full border-[3px] border-accent object-cover -ml-3"
            />
            <span className="ml-3 text-sm text-muted-foreground font-medium">
              Alex &amp; Jordan
            </span>
          </div>

          <SplitDisplay
            label="Rent"
            total="$2,400"
            splits={[
              { name: 'Alex', amount: '$1,200', percent: 50, tokenColor: 'primary' },
              { name: 'Jordan', amount: '$1,200', percent: 50, tokenColor: 'accent' },
            ]}
          />

          {/* Shared goal card */}
          <div className="rounded-[14px] p-5 bg-surface border border-border shadow-[0_2px_8px_rgba(28,26,24,0.05)]">
            <div className="flex justify-between items-center mb-2">
              <span className="font-sans font-semibold text-base text-foreground">
                Weekend Getaway
              </span>
              <span className="font-mono text-sm font-medium text-foreground">
                62%
              </span>
            </div>
            <div className="flex rounded-full overflow-hidden h-3">
              <div className="bg-primary" style={{ width: '31%' }} />
              <div className="bg-accent" style={{ width: '31%' }} />
              <div style={{ width: '38%' }} className="bg-secondary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              $930 of $1,500 saved together
            </p>
          </div>
        </div>
      </HeroSection>

      <HowItWorks background="muted" padding="compact">
        <ProcessSteps
          size="lg"
          connector="solid"
          badgeShape="circle"
          badgeClassName="bg-surface border border-border"
          steps={TogetherSteps}
          animated
        />
      </HowItWorks>

      <FeatureSection heading="Built for sharing">
        <div className="mb-12 relative">
          <FocalImage
            src={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-02.png`}
            alt="Shared life"
            focusX={50}
            focusY={24}
            className="w-full h-[200px] rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent rounded-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TogetherFeatures.map((feature, i) => (
            <Card
              key={feature.title}
              accent="left"
              interactive
              className="flex flex-col"
              data-animate="fade-in-up"
              style={{ '--animate-delay': `${i * 100}ms` } as React.CSSProperties}
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
      </FeatureSection>

      <FeatureSection
        heading="Split it any way you want"
        subtitle="50/50, 60/40, or 100% one person. Every expense can have its own ratio."
        className="relative overflow-hidden bg-secondary/40"
        sectionId="splits"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/IMG-TOGETHER-03.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] z-0"
        />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TogetherExamples.map((example) => (
            <SplitDisplay
              key={example.label}
              label={example.label}
              total={example.total}
              splits={example.splits.map((s) => ({
                ...s,
                tokenColor: s.color === 'indigo' ? 'primary' as const : 'accent' as const,
              }))}
            />
          ))}
        </div>
      </FeatureSection>

      <TestimonialSection heading="Real people, real splits">
        {TogetherTestimonials.map((t, i) => (
          <Card
            key={t.names}
            interactive
            className="flex flex-col"
            data-animate="fade-in-up"
            style={{ '--animate-delay': `${i * 100}ms` } as React.CSSProperties}
          >
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
      </TestimonialSection>

      <CTASection
        heading="Your shared financial journey starts here"
        description="Free for both users. No hidden fees, no awkward conversations."
        className="bg-secondary/40"
      >
        <Button>Get Started</Button>
      </CTASection>

      </main>

      <Footer className="bg-[#1C1A18]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo unitName="together" mode="dark" className="text-[#FFF9F5]" />
            <p className="text-sm mt-4 leading-relaxed text-[#9E8E84]">
              Shared finances,
              <br />
              without the friction.
            </p>
          </div>
          {TogetherFooter.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans font-semibold text-xs uppercase tracking-wider mb-4 text-[#9E8E84]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors text-[#9E8E84] hover:text-[#C4B8AE]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 text-xs text-center border-t border-[rgba(158,142,132,0.2)] text-[#9E8E84]">
          &copy; 2026 Futra Together. All rights reserved.
        </div>
      </Footer>
    </div>
  );
}
