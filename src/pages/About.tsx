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

      <main className="pt-24 pb-16">
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
    <section ref={ref} className="container mx-auto px-4 lg:px-8 max-w-7xl mb-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <div
          className="parallax"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          }}
        >
          <h1
            className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent animate-gradient-text ${isVisible ? 'fade-in-up stagger-1' : 'opacity-0'
              }`}
          >
            About DEW
          </h1>
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed ${isVisible ? 'fade-in-up stagger-2' : 'opacity-0'
              }`}
          >
            DEW (Devise Energy & Water) specialises in integrated solutions that combine water treatment and
            renewable energy to deliver sustainable, resilient infrastructure.
          </p>
          <div
            className={`glass p-6 rounded-3xl ${isVisible ? 'fade-in-up stagger-3' : 'opacity-0'}`}
          >
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Since 1983, DEVISE ENERGY & WATER GmbH (DEW GROUP), operating from Austria, Egypt, Greece, Germany,
              Morocco and Oman, develops innovative Energy & Water solutions for rural and agricultural
              developments. With partnerships bringing over 43 years of experience in 21 countries, we drive
              circular economies by creating the Water-Energy-Food NEXUS (WEF) infrastructure to foster healthy
              sustainable developments against climate instability and growing nations.
            </p>
          </div>
        </div>

        {/* Right Column - 43 Years Image */}
        <div
          className={`flex justify-center items-center ${isVisible ? 'fade-in-up stagger-2' : 'opacity-0'}`}
        >
          <div className="relative w-full max-w-md">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative image-zoom card-3d">
              <img
                src="/logo2.jpg"
                alt="43 Years of Innovation"
                className="w-full h-auto rounded-3xl shadow-2xl object-contain"
              />
            </div>
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
        <div className="image-zoom w-full max-w-5xl">
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
