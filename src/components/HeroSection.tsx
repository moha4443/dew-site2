import heroImage from '@/assets/hero-water.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background image - Full visibility */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Water technology innovation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle bottom gradient only */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />

      {/* Professional Bottom Bar with Key Message */}
      <div className="relative z-10 w-full">
        <div className="bg-slate-900/70 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-6">
              {/* Left decorative line */}
              <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-cyan-500" />

              {/* Main message */}
              <div className="px-6 sm:px-10 text-center">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-light text-white tracking-[0.2em] uppercase">
                  Water <span className="font-semibold text-cyan-400">Innovation</span> Since 1983
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
