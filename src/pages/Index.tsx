import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TechnologySection } from '@/components/TechnologySection';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-white via-blue-50 to-blue-100" />

      <main>
        <HeroSection />
        <FeaturesSection />
        <TechnologySection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
