import { Navbar } from '../../components/credit/Navbar';
import { HeroSection } from '../../components/credit/HeroSection';
import { TrustSection } from '../../components/credit/TrustSection';
import { FeatureSection } from '../../components/credit/FeatureSection';
import { FAQSection } from '../../components/credit/FAQSection';
import { CTASection } from '../../components/credit/CTASection';
import { Footer } from '../../components/credit/Footer';

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
