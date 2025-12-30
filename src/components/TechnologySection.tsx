import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const TechnologySection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const capabilities = [
    'Reverse Osmosis (RO) Systems',
    'Ultrafiltration & Microfiltration',
    'Chemical Dosing & Treatment',
    'SCADA & Automation',
    'Mobile & Containerized Units',
    'Zero Liquid Discharge (ZLD)',
  ];

  const services = [
    'Engineering & Design',
    'Fabrication & Manufacturing',
    'Installation & Commissioning',
    'Operation & Maintenance',
    'Build-Own-Operate (BOO)',
    'Build-Operate-Transfer (BOT)',
  ];

  return (
    <section id="technology" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive water treatment solutions backed by proven engineering expertise and modern fabrication facilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Technologies Card */}
            <Card
              className={`p-8 md:p-10 bg-card border-2 border-primary/20 shadow-xl transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-primary">Technologies</h3>
              <div className="space-y-4">
                {capabilities.map((tech, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={24} />
                    <span className="text-lg font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Services Card */}
            <Card
              className={`p-8 md:p-10 bg-card border-2 border-accent/20 shadow-xl transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
            >
              <h3 className="text-2xl font-bold mb-6 text-accent">Services</h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-accent flex-shrink-0 mt-1" size={24} />
                    <span className="text-lg font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">6000 M² Fabrication Facilities</h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our extensive fabrication workshops include all types of steel & stainless-steel welding, HDPE welding, container modification, fiberglass coating, assembly and testing activities — ensuring quality control from design to delivery.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
