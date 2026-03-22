import { Navbar } from '../../components/plan/Navbar';
import { HeroSection } from '../../components/plan/HeroSection';
import { FeatureDeepDive } from '../../components/plan/FeatureDeepDive';
import { ComparisonSection } from '../../components/plan/ComparisonSection';
import { StatsRow } from '../../components/plan/StatsRow';
import { TestimonialSection } from '../../components/plan/TestimonialSection';
import { CTASection } from '../../components/plan/CTASection';
import { Footer } from '../../components/plan/Footer';

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
