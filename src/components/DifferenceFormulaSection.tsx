import { Card } from '@/components/ui/card';
import { Users, Wrench, Globe, Award } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const DifferenceFormulaSection = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal({ threshold: 0.2 });
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal({ threshold: 0.2 });

  const differentiators = [
    {
      icon: Users,
      title: 'Client-Centered Approach',
      description: 'We begin every project with deep listening and understanding. Each facility has unique challenges, and we craft customized solutions rather than applying one-size-fits-all approaches. Our collaborative process ensures optimal outcomes for your specific needs.'
    },
    {
      icon: Wrench,
      title: 'Comprehensive Engineering',
      description: 'Our multidisciplinary team seamlessly integrates mechanical, electrical, and process engineering. From initial design through fabrication, installation, and commissioning, we handle every aspect to deliver turnkey water treatment solutions.'
    },
    {
      icon: Globe,
      title: 'Proven Global Experience',
      description: 'With 172+ completed projects across 21 countries, we bring real-world expertise to every challenge. Our track record spans diverse industries and environments, from remote desert locations to large industrial complexes.'
    },
    {
      icon: Award,
      title: 'Quality & Reliability',
      description: 'Our 6000 m² fabrication facilities ensure complete quality control from design to delivery. We use proven technologies and rigorous testing protocols to guarantee system performance and long-term reliability.'
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={headerRef}
          className={`max-w-4xl mx-auto mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Complete <span className="text-primary">End-to-End</span> Solutions
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-4">
            Drawing from extensive project experience, we engineer tailored solutions that combine proven technologies with comprehensive services to ensure success within your specific requirements.
          </p>
          <p className="text-lg text-muted-foreground text-center mb-4">
            We approach every project with careful analysis and an open mind because we know every customer has unique needs — one size does not fit all.
          </p>
          <p className="text-lg text-muted-foreground text-center">
            Our engineering excellence and project delivery success are built on four key differentiators.
          </p>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            What Sets Us Apart
          </h3>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className={`p-8 hover:shadow-xl transition-all duration-500 border-2 border-primary/20 hover:border-primary/40 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
