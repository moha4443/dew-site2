import whyHero from '@/assets/why-hero.jpg';

export const WhyHeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-slate-900">
      {/* Background Image - Full View with padding for navigation */}
      <div className="absolute inset-0 pt-24 sm:pt-28">
        <img
          src={whyHero}
          alt="Why DEW is Different"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Bottom Gradient Overlay - Elegant fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

      {/* Content - Professional Bottom Bar */}
      <div className="relative z-10 w-full">
        {/* Elegant bottom bar with glass effect */}
        <div className="bg-slate-900/70 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-6">
              {/* Left decorative line */}
              <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-500" />

              {/* Title with elegant styling */}
              <div className="px-8 text-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-light text-white tracking-[0.4em] uppercase">
                  Why We Are Different
                </h1>
              </div>

              {/* Right decorative line */}
              <div className="hidden sm:block flex-1 h-px bg-gradient-to-l from-transparent via-cyan-500/50 to-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
