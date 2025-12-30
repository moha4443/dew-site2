import { Card } from '@/components/ui/card';
import { Cog, FileText, Wrench } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const InnovationSection = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: modelsRef, isVisible: modelsVisible } = useScrollReveal({ threshold: 0.2 });

  const services = [
    {
      icon: Wrench,
      title: 'Fabrication',
      description: 'DEW has around 6000 m² of fabrication workshops, including all types of steel & stainless-steel welding, HDPE welding, container modification, fiberglass coating, assembly and testing activities.',
      features: ['Steel & Stainless Steel Welding', 'HDPE Welding', 'Container Modification', 'Fiberglass Coating', 'Assembly & Testing']
    },
    {
      icon: Cog,
      title: 'EPC Solutions',
      description: 'Complete Engineering, Procurement and Construction solutions from intake to product supply of decentralized water desalination & treatment solutions.',
      features: ['Full Engineering Design', 'Equipment Procurement', 'Construction Management', 'System Integration', 'Commissioning']
    },
    {
      icon: FileText,
      title: 'O&M Services',
      description: 'We provide operation & maintenance services of our supplied solutions when needed, customizable to include consumables, chemicals, spare parts and more.',
      features: ['24/7 Operations Support', 'Preventive Maintenance', 'Spare Parts Supply', 'Chemical Management', 'Performance Optimization']
    }
  ];

  const contractModels = [
    {
      title: 'Build-Own-Operate (B.O.O)',
      description: 'If you prefer not to invest in your water utilities, we can build, own and operate the assets, delivering the water quality you need under flexible contract models.',
      benefits: ['No Capital Investment', 'Guaranteed Performance', 'Flexible Contracts', 'Full Asset Ownership by DEW']
    },
    {
      title: 'Build-Operate-Transfer (B.O.T)',
      description: 'We build and operate your water treatment facility, then transfer ownership to you after a specified period, ensuring smooth technology transfer and knowledge handover.',
      benefits: ['Gradual Ownership Transfer', 'Operational Training', 'Technology Transfer', 'Performance Guarantees']
    },
    {
      title: 'Retrofit & Upgrade',
      description: 'Looking to increase the efficiency or capacity of your existing facility? We assess with you and deliver tailored retrofit and upgrade solutions.',
      benefits: ['Capacity Expansion', 'Efficiency Improvements', 'Technology Upgrades', 'Minimal Downtime']
    },
    {
      title: 'Rental Solutions',
      description: 'For short term or seasonal water needs, or temporary bridging projects, we can provide mobile rental units sized to your demand.',
      benefits: ['Flexible Duration', 'Quick Deployment', 'Mobile Units', 'Scalable Capacity']
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Core Services */}
        <div className="max-w-6xl mx-auto mb-20">
          <div
            ref={servicesRef}
            className={`text-center mb-12 transition-all duration-700 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive water treatment solutions from design to operation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className={`p-6 border-2 border-primary/20 hover:border-primary/40 hover:shadow-xl transition-all duration-500 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="text-primary" size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contract Models */}
        <div className="max-w-6xl mx-auto">
          <div
            ref={modelsRef}
            className={`text-center mb-12 transition-all duration-700 ${modelsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Contract Models</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer a range of contract models for water & wastewater treatment facilities that are adaptable to your unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contractModels.map((model, index) => (
              <Card
                key={index}
                className={`p-6 border-2 border-accent/20 hover:border-accent/40 hover:shadow-xl transition-all duration-500 ${modelsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-bold mb-3 text-accent">{model.title}</h3>
                <p className="text-muted-foreground mb-4">{model.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {model.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <span className="text-accent mr-2">✓</span>
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
