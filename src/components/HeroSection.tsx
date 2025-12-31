import heroImage from '@/assets/hero-water.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with soft overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Water technology innovation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-secondary/40 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <p className="text-primary-foreground/90 text-lg md:text-xl font-medium tracking-wider uppercase">
            A Revolutionary Approach to
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground leading-tight">
            WATER INNOVATION
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Transforming water management for the world's leading industries through cutting-edge technology and
            sustainable solutions
          </p>
        </div>
      </div>
    </section>
  );
};
