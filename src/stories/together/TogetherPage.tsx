import { Navbar } from '../../components/together/Navbar';
import { HeroSection } from '../../components/together/HeroSection';
import { HowItWorks } from '../../components/together/HowItWorks';
import { FeatureSection } from '../../components/together/FeatureSection';
import { SplitShowcase } from '../../components/together/SplitShowcase';
import { TestimonialSection } from '../../components/together/TestimonialSection';
import { CTASection } from '../../components/together/CTASection';
import { Footer } from '../../components/together/Footer';

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
