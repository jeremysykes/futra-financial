import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StatsRow } from './StatsRow';
import { FeatureSection } from './FeatureSection';
import { TestimonialSection } from './TestimonialSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function SpendPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsRow />
      <FeatureSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
