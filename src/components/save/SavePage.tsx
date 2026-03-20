import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { FeatureSection } from './FeatureSection';
import { StatsRow } from './StatsRow';
import { TestimonialSection } from './TestimonialSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function SavePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeatureSection />
      <StatsRow />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
