import { Navbar } from '../../components/spend/Navbar';
import { HeroSection } from '../../components/spend/HeroSection';
import { StatsRow } from '../../components/spend/StatsRow';
import { FeatureSection } from '../../components/spend/FeatureSection';
import { TestimonialSection } from '../../components/spend/TestimonialSection';
import { CTASection } from '../../components/spend/CTASection';
import { Footer } from '../../components/spend/Footer';

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
