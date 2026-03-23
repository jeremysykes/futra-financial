import { TrendingUp } from 'lucide-react';
import { Navbar } from '../navbar/Navbar';
import { HeroSection } from '../hero-section/HeroSection';
import { FeatureDeepDive } from '../feature-deep-dive/FeatureDeepDive';
import { ComparisonSection } from '../comparison-section/ComparisonSection';
import { StatsRow } from '../stats-row/StatsRow';
import { TestimonialSection } from '../testimonial-section/TestimonialSection';
import { CTASection } from '../cta-section/CTASection';
import { Footer } from '../footer/Footer';
import { DashboardPreview } from '../dashboard-preview/DashboardPreview';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Logo } from '../logo/Logo';
import {
  PlanFooter,
  PlanLinks,
  PlanStats,
  PlanTestimonials,
} from '../../mocks/plan.mock';

export function PlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar unitName="plan" links={PlanLinks} ctaText="Start Planning" />

      <>
      <HeroSection
        eyebrow="Your money, mapped."
        heading={
          <>
            Every dollar, every year,
            <br />
            one clear picture.
          </>
        }
        subheading="Track net worth, budget with precision, and project your financial future — all from a single dashboard built for clarity."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-PLAN-01.png`}
        backgroundOpacity="opacity-30"
        overlayOpacity="bg-gradient-to-r from-background/70 via-background/50 to-background/30"
        actions={<Button>Map Your Finances</Button>}
      >
        <DashboardPreview />
      </HeroSection>

      <FeatureDeepDive />

      <ComparisonSection />

      <StatsRow background="default" className="bg-surface">
        {PlanStats.map((s, i) => (
          <Card
            key={s.label}
            accent="left"
            interactive
            className="bg-secondary text-center"
            data-animate="fade-in-up"
            style={{ '--animate-delay': `${i * 100}ms` } as React.CSSProperties}
          >
            <span className="block mb-1 font-mono font-semibold text-foreground text-[clamp(28px,4vw,40px)]">
              {s.value}
            </span>
            <span className="block mb-2 uppercase font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
              {s.label}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-positive">
              <TrendingUp size={12} />
              {s.trend}
            </span>
          </Card>
        ))}
      </StatsRow>

      <TestimonialSection
        subtitle="From our planners"
        heading="Built for people who think in spreadsheets"
      >
        {PlanTestimonials.map((t, i) => (
          <Card
            key={t.name}
            interactive
            data-animate="fade-in-up"
            style={{ '--animate-delay': `${i * 100}ms` } as React.CSSProperties}
          >
            <p className="mb-6 font-sans text-base leading-[1.7] text-foreground italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-[13px] ${t.colorClass}`}
              >
                {t.initials}
              </div>
              <div>
                <span className="block font-sans font-semibold text-sm text-foreground">
                  {t.name}
                </span>
                <span className="font-sans font-medium text-xs text-muted-foreground">
                  {t.role}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </TestimonialSection>

      <CTASection
        heading={
          <>
            Your spreadsheet served you well.
            <br />
            It&rsquo;s time for an upgrade.
          </>
        }
        description="Free to start. No credit card required. Connect your accounts in under two minutes and see the full picture today."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-PLAN-03.png`}
        backgroundOpacity="opacity-[0.1]"
        className="bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-accent)_12%,transparent)_0%,color-mix(in_srgb,var(--color-positive)_6%,transparent)_50%,color-mix(in_srgb,var(--color-accent)_10%,transparent)_100%)]"
        sectionId="pricing"
      >
        <Button>Start Planning Free</Button>
      </CTASection>

      </>

      <Footer className="bg-[#0C1017]">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <Logo unitName="plan" mode="dark" className="text-[#E2E8F0]" />
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {PlanFooter.map((col) => (
              <div key={col.title}>
                <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#A0AEC0]">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block mb-3 font-sans text-sm text-[#64748B] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(160,174,192,0.1)]">
          <span className="font-sans text-xs text-[#64748B]">
            &copy; 2026 Futra Financial. All rights reserved.
          </span>
        </div>
      </Footer>
    </div>
  );
}
