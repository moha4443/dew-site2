import whyHero from '@/assets/why-hero.jpg';

export const WhyHeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${whyHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/50 to-background" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-wide">
          WHY WE ARE DIFFERENT
        </h1>
      </div>
    </section>
  );
};
