import { Navbar } from '../../components/save/Navbar';
import { HowItWorks } from '../../components/save/HowItWorks';
import { ProgressCard } from '../../components/save/ProgressCard';
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
  SaveFeatures,
  SaveFooter,
  SaveStats,
  SaveTestimonials,
} from '../../mocks/save.mock';

export function SavePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <HeroSection
        eyebrow="Goal-based savings"
        heading={
          <>
            Every dollar has
            <br />a destination
          </>
        }
        subheading="Automate your savings with round-ups and scheduled transfers. Watch your goals grow with beautiful, visual progress tracking."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-SAVE-01.png`}
        actions={<Button>Create Your First Goal</Button>}
      >
        <div className="relative" style={{ minHeight: 380 }}>
          <div className="absolute top-0 left-0 w-[280px] sm:w-[300px] z-10 shadow-xl -rotate-2">
            <ProgressCard
              goalName="Trip to Japan"
              targetAmount="$4,500"
              currentAmount="$3,015"
              percentage={67}
            />
          </div>
          <div className="absolute top-28 left-16 sm:left-24 w-[280px] sm:w-[300px] z-20 shadow-xl rotate-1">
            <ProgressCard
              goalName="Emergency Fund"
              targetAmount="$10,000"
              currentAmount="$4,300"
              percentage={43}
            />
          </div>
          <div className="absolute top-56 left-8 sm:left-12 w-[280px] sm:w-[300px] z-30 shadow-2xl -rotate-1">
            <ProgressCard
              goalName="New Laptop"
              targetAmount="$2,200"
              currentAmount="$1,958"
              percentage={89}
            />
          </div>
        </div>
      </HeroSection>

      <HowItWorks />

      <FeatureSection
        subtitle="Saving, your way"
        heading="Tools that fit your life"
      >
        <div className="mb-12 rounded-xl overflow-hidden max-h-[200px] relative">
          <img
            src={`${import.meta.env.BASE_URL}images/IMG-SAVE-02.png`}
            alt="Travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SaveFeatures.map((f, i) => (
            <Card
              key={f.title}
              accent="top"
              interactive
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center bg-muted">
                <f.icon
                  size={22}
                  className="text-accent"
                  strokeWidth={1.5}
                />
              </div>
              <h4 className="mb-2 font-sans font-semibold text-[17px] text-foreground">
                {f.title}
              </h4>
              <p className="font-sans text-[15px] leading-[1.7] text-muted-foreground">
                {f.desc}
              </p>
            </Card>
          ))}
        </div>
      </FeatureSection>

      <StatsRow>
        {SaveStats.map((s, i) => (
          <StatItem
            key={s.label}
            value={s.value}
            label={s.label}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </StatsRow>

      <TestimonialSection
        subtitle="From our savers"
        heading="Real goals, real progress"
      >
        {SaveTestimonials.map((t, i) => (
          <Card
            key={t.name}
            interactive
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="mb-6 font-sans text-base leading-[1.7] text-foreground italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-semibold text-[13px]"
                style={{ backgroundColor: t.color }}
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
        heading="Your first goal is waiting"
        description="No minimum amounts. No fees. Just a calm, focused way to build toward something that matters to you."
        backgroundImage={`${import.meta.env.BASE_URL}images/IMG-SAVE-03.png`}
      >
        <Button>Start Saving</Button>
      </CTASection>

      <Footer>
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          <Logo unitName="save" mode="dark" className="text-[#F7F5F0]" />
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            {SaveFooter.map((col) => (
              <div key={col.title}>
                <span className="block mb-4 uppercase font-sans font-medium text-[11px] tracking-[0.08em] text-[#9A9A90]">
                  {col.title}
                </span>
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="block mb-3 font-sans text-sm text-[#9A9A90] transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t border-[rgba(154,154,144,0.2)]">
          <span className="font-sans text-xs text-[#9A9A90]">
            &copy; 2026 Futra Financial. All rights reserved.
          </span>
        </div>
      </Footer>
    </div>
  );
}
