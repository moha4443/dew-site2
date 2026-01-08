import whyHero from '@/assets/why-hero.jpg';

export const WhyHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden bg-slate-900 pb-20">
      {/* Background Image - Full View */}
      <div className="absolute inset-0">
        <img
          src={whyHero}
          alt="Why DEW is Different"
          className="w-full h-full object-contain object-top"
        />
      </div>

      {/* Bottom Gradient Overlay - Only at bottom for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900 to-transparent" />

      {/* Content - Positioned at Bottom */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Text Box with Glass Effect */}
        <div className="inline-block">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-wide">
            WHY WE ARE DIFFERENT
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full" />
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover what sets DEW apart in delivering innovative water and energy solutions
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs mb-2 tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
