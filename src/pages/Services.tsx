import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const Services = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const services = [
    {
      key: 'fabrication',
      title: 'Fabrication',
      image: '/Fabrication.jpg',
      description:
        'DEW has around 6000 m² of fabrication workshops, including all types of steel & stainless-steel welding, HDPE welding, container modification, fiberglass coating, assembly and testing activities.',
    },
    {
      key: 'epc',
      title: 'EPC',
      image: '/EPC.jpg',
      description:
        'Complete Engineering, Procurement and Construction solutions from intake to product supply of decentralized water desalination & treatment solutions.',
    },
    {
      key: 'om',
      title: 'O&M',
      image: '/O&M.jpg',
      description:
        'We provide operation & maintenance services of our supplied solutions when needed, customizable to include consumables, chemicals, spare parts and more.',
    },
    {
      key: 'boo-bot',
      title: 'B.O.O & B.O.T',
      image: '/B.O.O&B.O.T.jpg',
      description:
        'If you prefer not to invest in your water utilities, we can build, own and operate or transfer the assets, delivering the water quality you need under flexible contract models.',
    },
    {
      key: 'retrofit',
      title: 'Retrofit',
      image: '/RETOFIT.jpg',
      description:
        'Looking to increase the efficiency or capacity of your existing facility? We assess with you and deliver tailored retrofit and upgrade solutions.',
    },
    {
      key: 'rental',
      title: 'Rental',
      image: '/RENTAL.jpg',
      description:
        'For short term or seasonal water needs, or temporary bridging projects, we can provide mobile rental units sized to your demand.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10 animate-gradient bg-gradient-to-br from-white via-blue-50 to-blue-100" />

      <main className="pt-28 sm:pt-32 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-16">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive water treatment solutions tailored to your needs
            </p>
          </div>
        </div>

        {/* Services Sections */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <ServiceSection
              key={service.key}
              service={service}
              index={index}
              onImageClick={() => setSelectedImage(service.image)}
            />
          ))}
        </div>
      </main>

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Service large view"
              className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl bg-white animate-scale-in"
              onClick={() => setSelectedImage(null)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

// Service Section Component with Scroll Animation
const ServiceSection = ({
  service,
  index,
  onImageClick
}: {
  service: { title: string; image: string; description: string };
  index: number;
  onImageClick: () => void;
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative py-20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      {/* Alternating Background Colors */}
      <div className={`absolute inset-0 ${isEven ? 'bg-white/60' : 'bg-blue-50/60'
        } backdrop-blur-sm`} />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:grid-flow-dense'
          }`}>

          {/* Image Side */}
          <div
            className={`${isEven ? '' : 'md:col-start-2'} transform transition-all duration-700 ${isVisible
              ? 'translate-x-0 opacity-100'
              : isEven
                ? '-translate-x-12 opacity-0'
                : 'translate-x-12 opacity-0'
              }`}
          >
            <button
              type="button"
              onClick={onImageClick}
              className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl hover-lift focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Content Side */}
          <div
            className={`${isEven ? '' : 'md:col-start-1 md:row-start-1'} transform transition-all duration-700 delay-150 ${isVisible
              ? 'translate-x-0 opacity-100'
              : isEven
                ? 'translate-x-12 opacity-0'
                : '-translate-x-12 opacity-0'
              }`}
          >
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-primary uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
                  Service {index + 1}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                {service.title}
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />

              <p className="text-lg text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              <button
                onClick={onImageClick}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300 group"
              >
                View Details
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

