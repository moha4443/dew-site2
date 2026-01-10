import { useEffect, useRef, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';


const About = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textColumnRef = useRef<HTMLDivElement | null>(null);
  const imageColumnRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  const differenceContent = [
    {
      title: 'More water',
      description:
        'DEW systems are engineered to unlock more clean water from every source – from brackish groundwater and seawater to complex industrial effluents. By combining high-recovery designs with smart monitoring, we help customers secure reliable water volumes even under tough operating conditions.',
    },
    {
      title: 'Less energy',
      description:
        'From equipment selection to process integration, we focus on cutting the kilowatt-hours behind every cubic meter of treated water. Our solutions pair efficient membranes and drives with intelligent control so that plants deliver the same performance with significantly lower energy demand.',
    },
    {
      title: 'Zero waste',
      description:
        'We design treatment trains that minimise liquid discharge, recover valuable by-products and protect receiving environments. Moving towards zero waste means closing loops, reducing trucking and disposal, and supporting customers on their journey to stronger ESG performance.',
    },
  ];

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!Number.isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (scrollTimeoutRef.current !== null) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Sync image column height with text column height for proper sticky behavior
  useEffect(() => {
    const syncHeights = () => {
      if (textColumnRef.current && imageColumnRef.current) {
        const textHeight = textColumnRef.current.offsetHeight;
        imageColumnRef.current.style.minHeight = `${textHeight}px`;
        console.log('Synced heights:', textHeight);
      }
    };

    // Sync on mount, resize, and when content changes
    // Use timeout to ensure DOM has updated
    const timeoutId = setTimeout(syncHeights, 100);
    window.addEventListener('resize', syncHeights);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', syncHeights);
    };
  }, [activeSection]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isAutoScrollingRef.current) return;

    const deltaY = event.deltaY;
    if (Math.abs(deltaY) < 20) return;

    event.preventDefault();

    const currentIndex = activeSection;
    const nextIndex = deltaY > 0 ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= differenceContent.length) return;

    const target = sectionRefs.current[nextIndex];
    if (target) {
      isAutoScrollingRef.current = true;
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      scrollTimeoutRef.current = window.setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 700);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />

      {/* Floating Orbs Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="floating-orb floating-orb-1" />
        <div className="floating-orb floating-orb-2" />
        <div className="floating-orb floating-orb-3" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      </div>

      <main className="pt-28 sm:pt-32 pb-16">
        {/* Hero Section with Parallax */}
        <HeroSection mousePosition={mousePosition} />



        {/* About Content */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl space-y-12">
          {/* Images Section with 2 Columns */}
          <ImagesSection />

          {/* Our Goals Section - Alternating Layout */}
          <section className="mt-16 mb-20">
            <GoalsHeader />

            <div className="space-y-0">
              {/* More Water - Image Left, Text Right */}
              <GoalSection
                imageSrc="/up.jpg"
                imageAlt="More water visual"
                title="More water"
                description="DEW systems are engineered to unlock more clean water from every source – from brackish groundwater and seawater to complex industrial effluents. By combining high-recovery designs with smart monitoring, we help customers secure reliable water volumes even under tough operating conditions."
                isEven={true}
                index={0}
              />

              {/* Less Energy - Image Right, Text Left */}
              <GoalSection
                imageSrc="/left.jpg"
                imageAlt="Less energy visual"
                title="Less energy"
                description="From equipment selection to process integration, we focus on cutting the kilowatt-hours behind every cubic meter of treated water. Our solutions pair efficient membranes and drives with intelligent control so that plants deliver the same performance with significantly lower energy demand."
                isEven={false}
                index={1}
              />

              {/* Zero Waste - Image Left, Text Right */}
              <GoalSection
                imageSrc="/down.jpg"
                imageAlt="Zero waste visual"
                title="Zero waste"
                description="We design treatment trains that minimise liquid discharge, recover valuable by-products and protect receiving environments. Moving towards zero waste means closing loops, reducing trucking and disposal, and supporting customers on their journey to stronger ESG performance."
                isEven={true}
                index={2}
              />
            </div>
          </section>

          {/* Capabilities and Values */}
          <CapabilitiesSection />
        </div>
      </main>


      <Footer />
    </div>
  );
};

// Hero Section Component
const HeroSection = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="container mx-auto px-4 lg:px-8 max-w-6xl mb-20">
      {/* Centered Hero Content */}
      <div className="text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1a237e]/10 mb-6 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <span className="w-2 h-2 rounded-full bg-[#0891b2] animate-pulse"></span>
          <span className="text-sm font-semibold text-[#1a237e]">SINCE 1983</span>
        </div>

        {/* Main Title */}
        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-[#1a237e] ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          About <span className="text-[#0891b2]">DEW</span>
        </h1>

        {/* Main Description */}
        <p className={`text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <span className="font-semibold text-[#1a237e]">DEW</span> (Devise Energy & Water) specialises in integrated solutions that combine water treatment and renewable energy to deliver sustainable, resilient infrastructure.
        </p>

        {/* Stats Row */}
        <div className={`grid grid-cols-3 gap-6 md:gap-12 mb-16 max-w-3xl mx-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a237e]">43+</span>
            <p className="text-sm md:text-base text-gray-500 mt-2">Years Experience</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0891b2]">21</span>
            <p className="text-sm md:text-base text-gray-500 mt-2">Countries</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#06b6d4]">12</span>
            <p className="text-sm md:text-base text-gray-500 mt-2">Global Offices</p>
          </div>
        </div>

        {/* Company Description Card */}
        <div className={`bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 max-w-4xl mx-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            <span className="font-bold text-[#1a237e]">DEVISE ENERGY & WATER GmbH (DEW GROUP)</span>, operating from
            <span className="font-semibold text-[#0891b2]"> Austria, Egypt, Greece, Germany, Morocco and Oman</span>, develops innovative Energy & Water solutions for rural and agricultural developments. With partnerships bringing over
            <span className="font-bold text-[#1a237e]"> 43 years of experience</span> in
            <span className="font-bold text-[#1a237e]"> 21 countries</span>, we drive circular economies by creating the
            <span className="font-bold text-[#0891b2]"> Water-Energy-Food NEXUS (WEF)</span> infrastructure to foster healthy sustainable developments against climate instability and growing nations.
          </p>

          {/* Location Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8 pt-6 border-t border-gray-200">
            {['Austria', 'Egypt', 'Greece', 'Germany', 'Morocco', 'Oman'].map((country) => (
              <span
                key={country}
                className="px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-[#1a237e] border border-gray-200 hover:bg-[#0891b2] hover:text-white hover:border-[#0891b2] transition-all duration-300 cursor-default"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



// Images Section Component
const ImagesSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={ref}>
      <div className={`flex flex-col items-center gap-8 py-12 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent text-center max-w-4xl">
          Trusted by Leading Corporations, SMEs, and Government Entities
        </h2>
        <div className="w-full max-w-5xl">
          <img
            src="/logo3.jpg"
            alt="Logos of trusted DEW partners and clients"
            className="w-full object-contain rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

// Goals Header Component
const GoalsHeader = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 });

  return (
    <div ref={ref} className={`text-center mb-10 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent animate-gradient-text">
        Our Goals
      </h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
        More water. Less energy. Zero waste. Three pillars that guide how DEW designs and operates every
        project we deliver.
      </p>
    </div>
  );
};

// Capabilities Section Component
const CapabilitiesSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section ref={ref} className={`grid md:grid-cols-2 gap-8 items-start ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
      <div className="glass p-8 rounded-3xl hover-lift">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Our Capabilities
        </h2>
        <ul className="space-y-3 text-foreground/80">
          <li className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <span>Project development and advisory</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <span>Feasibility studies & technical due diligence</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <span>Custom design & modular manufacturing</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <span>Project financing support</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary text-xl">✓</span>
            <span>Digital monitoring & smart control</span>
          </li>
        </ul>
      </div>
      <div className="glass p-8 rounded-3xl hover-lift">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
          Our Values
        </h2>
        <p className="text-foreground/80 leading-relaxed">
          Sustainability, innovation and partnership. We work across sectors delivering lasting impact, helping
          communities and industries build climate-resilient water and energy infrastructure.
        </p>
      </div>
    </section>
  );
};

// Goal Section Component with Scroll Animation
const GoalSection = ({
  imageSrc,
  imageAlt,
  title,
  description,
  isEven,
  index
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  isEven: boolean;
  index: number;
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`relative py-20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
        } ${isEven ? 'bg-white/60' : 'bg-blue-50/60'} backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'
            }`}
        >
          {/* Image Side */}
          <div
            className={`${isEven ? '' : 'md:col-start-2'} transform transition-all duration-700 ${isVisible
              ? 'translate-x-0 opacity-100'
              : isEven
                ? '-translate-x-12 opacity-0'
                : 'translate-x-12 opacity-0'
              }`}
          >
            <div className="relative w-full max-w-xl mx-auto">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto rounded-3xl shadow-2xl object-contain card-3d glow-effect"
              />
            </div>
          </div>

          {/* Text Side */}
          <div
            className={`${isEven ? '' : 'md:col-start-1 md:row-start-1'
              } transform transition-all duration-700 delay-150 ${isVisible
                ? 'translate-x-0 opacity-100'
                : isEven
                  ? 'translate-x-12 opacity-0'
                  : '-translate-x-12 opacity-0'
              }`}
          >
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
