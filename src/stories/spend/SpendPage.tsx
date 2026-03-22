import { Navbar } from '../navbar/Navbar';
import { PhoneMockup } from '../phone-mockup/PhoneMockup';
import { HeroSection } from '../hero-section/HeroSection';
import { FeatureSection } from '../feature-section/FeatureSection';
import { StatsRow } from '../stats-row/StatsRow';
import { TestimonialSection } from '../testimonial-section/TestimonialSection';
import { CTASection } from '../cta-section/CTASection';
import { Footer } from '../footer/Footer';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Logo } from '../logo/Logo';
import { StatItem } from '../stat-item/StatItem';
import {
  SpendFeatures,
  SpendFooter,
  SpendLinks,
  SpendStats,
  SpendTestimonials,
} from '../../mocks/spend.mock';

export function SpendPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar unitName="spend" links={SpendLinks} ctaText="Get Started" />

      <HeroSection
        heading={
          <>
            Your money,
            <br />
            <span className="text-accent">in real time.</span>
          </>
        }
        subheading="Instant transactions, zero fees, total control. See every dollar the second it moves — not hours later."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-SPEND-01.png`}
        backgroundOpacity="opacity-10"
        overlayOpacity="bg-background/80"
        actions={
          <Button asChild>
            <a href="#cta">Open Your Account</a>
          </Button>
        }
      >
        <PhoneMockup />
      </HeroSection>

      <StatsRow background="default" className="bg-primary/[0.04] border-y border-border py-16">
        {SpendStats.map((s, i) => (
          <StatItem
            key={s.label}
            value={s.value}
            label={s.label}
            valueColor="foreground"
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </StatsRow>

      <FeatureSection
        subtitle="Built for your day"
        heading={
          <>
            Everything you need,
            <br />
            nothing you don&apos;t.
          </>
        }
      >
        <div className="mb-12 rounded-xl overflow-hidden max-h-[200px] relative">
          <img
            src={`${import.meta.env.BASE_URL}images/IMG-SPEND-02.png`}
            alt="Contactless payment"
            className="w-full h-full object-cover object-[50%_40%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SpendFeatures.map((f, i) => (
            <Card
              key={f.title}
              accent="left"
              interactive
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon size={20} className="text-accent" />
              </div>
              <h4 className="text-[18px] text-foreground mb-2 font-sans font-semibold">
                {f.title}
              </h4>
              <p className="text-[15px] text-muted-foreground leading-[1.6] font-sans font-normal">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </FeatureSection>

      <TestimonialSection
        subtitle="What people say"
        heading="Real users, real talk."
        className="relative overflow-hidden bg-secondary"
      >
        <img
          src={`${import.meta.env.BASE_URL}images/IMG-SPEND-03.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.06] z-0"
        />
        {SpendTestimonials.map((t, i) => (
          <Card
            key={t.name}
            interactive
            className="relative z-10 animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-[15px] text-muted-foreground leading-[1.6] italic mb-6 font-sans font-normal">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-[13px] text-accent font-sans font-semibold">
                {t.initials}
              </div>
              <div>
                <p className="text-[14px] text-foreground font-sans font-semibold">
                  {t.name}
                </p>
                <p className="text-[12px] text-muted-foreground font-sans font-medium">
                  {t.role}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </TestimonialSection>

      <CTASection
        background="solid"
        heading="Start spending smarter today."
        description="No minimum balance. No hidden fees. No waiting. Open your account in under two minutes."
      >
        <Button intent="inverse" asChild>
          <a href="#">Download the App</a>
        </Button>
      </CTASection>

      <Footer className="bg-[#0F0F12] border-t border-[rgba(255,255,255,0.08)]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-12">
          <Logo unitName="spend" mode="dark" className="text-[#FFFFFF]" />
          <div className="flex flex-wrap gap-12 md:gap-20">
            {SpendFooter.map((col) => (
              <div key={col.title}>
                <p className="text-[12px] uppercase tracking-[0.08em] text-[#8B8B9A] mb-4 font-sans font-medium">
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[14px] text-[#8B8B9A] hover:text-[#FFFFFF] transition-colors font-sans font-normal"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
          <p className="text-[12px] text-[#8B8B9A] font-sans font-normal">
            &copy; 2026 Futra Financial, Inc. All rights reserved.
          </p>
        </div>
      </Footer>
    </div>
  );
}
