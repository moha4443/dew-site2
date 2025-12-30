import { Navigation } from '@/components/Navigation';
import { WhyHeroSection } from '@/components/WhyHeroSection';
import { DifferenceFormulaSection } from '@/components/DifferenceFormulaSection';
import { InnovationSection } from '@/components/InnovationSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Why = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-white via-blue-50 to-blue-100" />

      <WhyHeroSection />
      <DifferenceFormulaSection />
      <InnovationSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Why;
