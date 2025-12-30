import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const DifferentiatorCardsSection = () => {
  const cards = [
    {
      title: 'Solutions',
      description: 'Engineering industry-leading turnkey treatment systems that meet your exacting requirements.',
      link: '#technology'
    },
    {
      title: 'Industries',
      description: 'Partnering with the world\'s most critical industries to deliver solutions to every corner of the site.',
      link: '#technology'
    },
    {
      title: 'Custom Chemicals',
      description: 'Developing high performance, custom formulae for all site-wide applications.',
      link: '#technology'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See how we do things differently
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 border-primary/20 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {card.description}
              </p>
              <Button variant="outline" className="w-full group" asChild>
                <a href={card.link}>
                  Discover more
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
