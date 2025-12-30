import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { MapPin, Droplet, Calendar, ArrowRight } from 'lucide-react';

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        {/* Hero Section */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-12">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent animate-gradient-text">
              Our Global Footprint
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Delivering innovative water treatment and desalination solutions across 21 countries since 1986
            </p>
          </div>
        </div>

        {/* Static World Map Image */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-20">
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/map.jpg"
              alt="DEW Global Projects Map"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Featured Project: SAFI - FIRST */}
        <FeaturedProjectSection setSelectedImage={setSelectedImage} />

        {/* CTA to New Interactive Map */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-20 mt-16">
          <div className="relative">
            <div className="glass rounded-3xl p-8 md:p-12 border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover-lift">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Icon Side */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-500">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-white animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
                    Explore Our Complete Project Portfolio
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                    Discover all 172 projects across 21 countries with our advanced interactive map. Click on any country to see detailed project information, timelines, and technical specifications.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Link
                      to="/projects/all-map"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary via-accent to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-gradient-x"
                    >
                      <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      View Interactive Map
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="inline-flex items-center gap-2 px-6 py-4 glass rounded-xl border border-primary/20">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 border-2 border-white" />
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground">
                        172 Projects · 21 Countries
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              alt="Project large view"
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

// Featured Project Section Component
const FeaturedProjectSection = ({ setSelectedImage }: { setSelectedImage: (img: string) => void }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section className="relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white backdrop-blur-sm" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div ref={ref} className={`text-center mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider bg-primary/10 px-6 py-3 rounded-full">
              Featured Project
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent">
            Our Latest Project
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovation in mobile desalination technology
          </p>
        </div>

        {/* SAFI Project Card */}
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${isVisible ? 'fade-in-up stagger-2' : 'opacity-0'
            }`}
        >
          {/* Image Side */}
          <div className="transform transition-all duration-700">
            <button
              type="button"
              onClick={() => setSelectedImage('/project.jpg')}
              className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl hover-lift focus:outline-none focus:ring-4 focus:ring-primary/50"
            >
              <img
                src="/project.jpg"
                alt="SAFI Mobile Desalination Project"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-semibold">Click to enlarge</p>
              </div>
            </button>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                SAFI Mobile Desalination
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mobile desalination unit providing reliable water supply for the SAFI project site. This containerized solution delivers high-quality treated water in remote locations with minimal infrastructure requirements.
              </p>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 gap-4 p-6 glass rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold text-foreground">Safi, Morocco</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                  <Droplet className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capacity</p>
                  <p className="font-semibold text-foreground">140,000 m³/day</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold text-foreground">2024</p>
                </div>
              </div>
            </div>

            {/* Technology Highlights */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Key Features:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Reverse Osmosis (RO) technology for seawater desalination</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Containerized plug-and-play design for rapid deployment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Energy-efficient operation with minimal environmental impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">Remote monitoring and SCADA integration</span>
                </li>
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/projects/safi"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                View Full Project Details
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={() => setSelectedImage('/project.jpg')}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
