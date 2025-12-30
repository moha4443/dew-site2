import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/contact', { state: { email } });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-95" />
      
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Ready to Transform Your Water Management?
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Partner with us to solve your toughest water treatment challenges with unparalleled service and innovation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto pt-8">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/90 border-none text-lg py-6"
            />
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 whitespace-nowrap px-8 py-6"
              type="button"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/70 pt-4">
            Join leading global brands in revolutionizing industrial water management
          </p>
        </div>
      </div>
    </section>
  );
};
