import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { TrustSection } from './TrustSection';
import { FeatureSection } from './FeatureSection';
import { FAQSection } from './FAQSection';
import { CTASection } from './CTASection';
import { Footer } from './Footer';

export function CreditPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <FeatureSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
