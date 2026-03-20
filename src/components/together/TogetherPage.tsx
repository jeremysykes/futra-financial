import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { HowItWorks } from './HowItWorks';
import { FeatureSection } from './FeatureSection';
import { SplitShowcase } from './SplitShowcase';
import { TestimonialSection } from './TestimonialSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function TogetherPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeatureSection />
      <SplitShowcase />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  );
}
