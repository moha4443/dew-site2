import { Card } from '@/components/ui/card';
import { DollarSign, Shield, Leaf, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const BenefitsSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.2 });

  const benefits = [
    {
      icon: DollarSign,
      title: 'Cost-Effective Solutions',
      description: 'Our integrated approach from design through fabrication and installation reduces project costs and timeline. With 6000 m² of in-house fabrication facilities, we control quality and costs while delivering competitive pricing without compromising on performance.'
    },
    {
      icon: Shield,
      title: 'Proven Reliability',
      description: 'With 172+ successfully completed projects across 21 countries, we bring proven expertise to every challenge. Our systems are designed for 99.9% uptime, backed by comprehensive O&M services and spare parts support to ensure continuous operation.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Engineering',
      description: 'We design systems that minimize environmental impact through efficient energy use, water recovery, and waste reduction. Our solutions help industries meet sustainability goals while maintaining operational efficiency and regulatory compliance.'
    },
    {
      icon: Clock,
      title: 'Rapid Deployment',
      description: 'Our containerized and mobile units enable quick deployment for urgent water needs. From rental solutions for temporary projects to fast-track EPC delivery, we have the flexibility and resources to meet tight deadlines without sacrificing quality.'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose DEW</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real benefits backed by proven performance and engineering excellence
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className={`p-8 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border-2 border-primary/10 hover:border-primary/30 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-300 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">172+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">21</div>
                <div className="text-sm text-muted-foreground">Countries Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
