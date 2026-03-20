import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { FeatureDeepDive } from './FeatureDeepDive';
import { ComparisonSection } from './ComparisonSection';
import { StatsRow } from './StatsRow';
import { TestimonialSection } from './TestimonialSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function PlanPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeatureDeepDive />
      <ComparisonSection />
      <StatsRow />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
