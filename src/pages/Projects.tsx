import { useState, useEffect, useRef } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { MapPin, Droplet, Calendar, ArrowRight, X, Building2 } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { projectsData } from '../projectsData';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Country coordinates
const countryCoordinates: Record<string, { lat: number; lng: number; name: string }> = {
  'Egypt': { lat: 30.0444, lng: 31.2357, name: 'Egypt' },
  'Libya': { lat: 32.8872, lng: 13.1913, name: 'Libya' },
  'Greece': { lat: 37.9838, lng: 23.7275, name: 'Greece' },
  'Oman': { lat: 23.5880, lng: 58.3829, name: 'Oman' },
  'Bulgaria': { lat: 42.6977, lng: 23.3219, name: 'Bulgaria' },
  'Ireland': { lat: 53.3498, lng: -6.2603, name: 'Ireland' },
  'Mozambique': { lat: -25.9655, lng: 32.5832, name: 'Mozambique' },
  'Poland': { lat: 52.2297, lng: 21.0122, name: 'Poland' },
  'Romania': { lat: 44.4268, lng: 26.1025, name: 'Romania' },
  'Slovenia': { lat: 46.0569, lng: 14.5058, name: 'Slovenia' },
  'Iraq': { lat: 33.3152, lng: 44.3661, name: 'Iraq' },
  'Tunisia': { lat: 36.8065, lng: 10.1815, name: 'Tunisia' },
  'Qatar': { lat: 25.2854, lng: 51.5310, name: 'Qatar' },
  'Ethiopia': { lat: 9.0320, lng: 38.7469, name: 'Ethiopia' },
  'Kazakhstan': { lat: 51.1694, lng: 71.4491, name: 'Kazakhstan' },
  'Angola': { lat: -8.8383, lng: 13.2344, name: 'Angola' },
  'Morocco': { lat: 33.9716, lng: -6.8498, name: 'Morocco' },
  'United Kingdom': { lat: 51.5074, lng: -0.1278, name: 'United Kingdom' },
  'Canada': { lat: 56.1304, lng: -106.3468, name: 'Canada' },
  'Austria': { lat: 48.2082, lng: 16.3738, name: 'Austria' },
  'Germany': { lat: 52.5200, lng: 13.4050, name: 'Germany' },
  'Kenya': { lat: -1.2921, lng: 36.8219, name: 'Kenya' },
  'Serbia': { lat: 44.7866, lng: 20.4489, name: 'Serbia' },
  'Cyprus': { lat: 35.1264, lng: 33.4299, name: 'Cyprus' },
  'Slovakia': { lat: 48.1486, lng: 17.1077, name: 'Slovakia' }
};

// Offices & Sales Points (12 locations) - RED markers
const officeLocations = [
  { country: 'Austria', city: 'Vienna', lat: 48.2082, lng: 16.3738 },
  { country: 'Egypt', city: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { country: 'Ethiopia', city: 'Addis Ababa', lat: 9.0320, lng: 38.7469 },
  { country: 'Germany', city: 'Berlin', lat: 52.5200, lng: 13.4050 },
  { country: 'Greece', city: 'Athens', lat: 37.9838, lng: 23.7275 },
  { country: 'Kenya', city: 'Nairobi', lat: -1.2921, lng: 36.8219 },
  { country: 'Morocco', city: 'Casablanca', lat: 33.5731, lng: -7.5898 },
  { country: 'Oman', city: 'Muscat', lat: 23.5880, lng: 58.3829 },
  { country: 'Poland', city: 'Warsaw', lat: 52.2297, lng: 21.0122 },
  { country: 'Qatar', city: 'Doha', lat: 25.2854, lng: 51.5310 },
  { country: 'Romania', city: 'Bucharest', lat: 44.4268, lng: 26.1025 },
  { country: 'Serbia', city: 'Belgrade', lat: 44.7866, lng: 20.4489 }
];

// Factories (3 locations) - GREEN markers
const factoryLocations = [
  { country: 'Egypt', city: 'Cairo', lat: 30.1, lng: 31.3 },
  { country: 'Greece', city: 'Athens', lat: 38.05, lng: 23.8 },
  { country: 'Oman', city: 'Muscat', lat: 23.65, lng: 58.45 }
];

interface CountryProjects {
  country: string;
  count: number;
  projects: typeof projectsData;
  coordinates: { lat: number; lng: number };
}

// Embedded Interactive Map Component
const EmbeddedMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryProjects | null>(null);

  // Group projects by country
  const countryProjectsMap = projectsData.reduce((acc, project) => {
    const country = project.country;
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(project);
    return acc;
  }, {} as Record<string, typeof projectsData>);

  const countriesData: CountryProjects[] = Object.entries(countryProjectsMap).map(([country, projects]) => ({
    country,
    count: projects.length,
    projects,
    coordinates: countryCoordinates[country] || { lat: 0, lng: 0 }
  }));

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [30, 25],
        zoom: 3,
        zoomControl: true,
        scrollWheelZoom: true,
        minZoom: 2,
        maxZoom: 10
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;

      // Create PROJECT markers (BLUE)
      countriesData.forEach((countryData) => {
        if (countryData.coordinates.lat === 0 && countryData.coordinates.lng === 0) return;

        const markerHtml = `
          <div class="project-marker-embed">
            <div class="marker-pulse-embed blue-pulse"></div>
            <div class="marker-dot-embed blue-dot">${countryData.count}</div>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-project-marker-embed',
          html: markerHtml,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        const marker = L.marker([countryData.coordinates.lat, countryData.coordinates.lng], { icon }).addTo(map);
        marker.on('click', () => setSelectedCountry(countryData));
        marker.bindTooltip(`<strong>${countryData.country}</strong><br/>${countryData.count} Projects`, { direction: 'top', offset: [0, -15] });
      });

      // Create OFFICE markers (RED)
      officeLocations.forEach((office) => {
        const markerHtml = `
          <div class="office-marker-embed">
            <div class="marker-pulse-embed red-pulse"></div>
            <div class="marker-dot-embed red-dot">🏢</div>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-office-marker-embed',
          html: markerHtml,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const offsetLat = office.lat + 0.8;
        const offsetLng = office.lng + 0.8;

        const marker = L.marker([offsetLat, offsetLng], { icon }).addTo(map);
        marker.bindTooltip(`<strong>🏢 Office</strong><br/>${office.city}, ${office.country}`, { direction: 'top', offset: [0, -15] });
      });

      // Create FACTORY markers (GREEN)
      factoryLocations.forEach((factory) => {
        const markerHtml = `
          <div class="factory-marker-embed">
            <div class="marker-pulse-embed green-pulse"></div>
            <div class="marker-dot-embed green-dot">🏭</div>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-factory-marker-embed',
          html: markerHtml,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        const marker = L.marker([factory.lat, factory.lng], { icon }).addTo(map);
        marker.bindTooltip(`<strong>🏭 Factory</strong><br/>${factory.city}, ${factory.country}`, { direction: 'top', offset: [0, -15] });
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-project-marker-embed,
        .custom-office-marker-embed,
        .custom-factory-marker-embed {
          background: none !important;
          border: none !important;
        }

        .project-marker-embed,
        .office-marker-embed,
        .factory-marker-embed {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .marker-pulse-embed {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: pulseEmbed 2s infinite;
        }

        .blue-pulse { background: rgba(14, 165, 233, 0.3); }
        .red-pulse { background: rgba(239, 68, 68, 0.3); }
        .green-pulse { background: rgba(34, 197, 94, 0.3); }

        @keyframes pulseEmbed {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }

        .marker-dot-embed {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11px;
          color: white;
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          transition: transform 0.2s;
        }

        .marker-dot-embed:hover {
          transform: scale(1.2);
        }

        .blue-dot { background: linear-gradient(135deg, #0ea5e9, #0284c7); }
        .red-dot { background: linear-gradient(135deg, #ef4444, #dc2626); font-size: 14px; }
        .green-dot { background: linear-gradient(135deg, #22c55e, #16a34a); font-size: 14px; }

        .leaflet-tooltip {
          background: white !important;
          border: 2px solid #e2e8f0 !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          font-family: inherit !important;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;
        }

        .country-modal-embed {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          backdrop-filter: blur(4px);
        }

        .modal-content-embed {
          background: white;
          border-radius: 24px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
        }
      `}</style>

      <div className="relative">
        {/* Map Container */}
        <div ref={mapRef} className="w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl" />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200">
          <h4 className="font-bold text-sm text-slate-800 mb-3">Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow"></span>
              <span className="text-slate-600">Projects (21 Countries)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow"></span>
              <span className="text-slate-600">Offices & Sales Points (12)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow"></span>
              <span className="text-slate-600">Factories (3)</span>
            </div>
          </div>
        </div>

        {/* Stats Overlay */}
        <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-200">
          <div className="text-center mb-3 pb-3 border-b border-slate-200">
            <div className="text-xl font-bold text-primary">567,748</div>
            <div className="text-[10px] text-slate-500 leading-tight">m³/day Water Treatment<br />& Desalination</div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-primary">172</div>
              <div className="text-[10px] text-slate-500">Projects</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">21</div>
              <div className="text-[10px] text-slate-500">Countries</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-500">12</div>
              <div className="text-[10px] text-slate-500">Offices</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-500">3</div>
              <div className="text-[10px] text-slate-500">Factories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Country Projects Modal */}
      {selectedCountry && (
        <div className="country-modal-embed" onClick={() => setSelectedCountry(null)}>
          <div className="modal-content-embed" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-primary">{selectedCountry.country}</h2>
                <p className="text-slate-500">{selectedCountry.count} Projects</p>
              </div>
              <button onClick={() => setSelectedCountry(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {selectedCountry.projects.map((project) => (
                <div key={project.id} className="p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-800">{project.client}</h3>
                      <p className="text-sm text-primary/80 font-medium mt-0.5">{project.scope}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          {project.city}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {project.year}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Droplet className="w-4 h-4 text-slate-400" />
                          {project.capacity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

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

      <main className="pt-28 sm:pt-32 pb-16">
        {/* Hero Section */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-12">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent animate-gradient-text">
              Our Global Footprint
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Delivering innovative water treatment and desalination solutions
              <br />
              <span className="text-primary font-medium">across 21 countries since 1983</span>
            </p>
          </div>
        </div>

        {/* Interactive Map - Replacing Static Image */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl mb-20">
          <EmbeddedMap />
        </div>

        {/* Featured Project: SAFI */}
        <FeaturedProjectSection setSelectedImage={setSelectedImage} />
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white backdrop-blur-sm" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
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

        <div className={`grid md:grid-cols-2 gap-12 items-center ${isVisible ? 'fade-in-up stagger-2' : 'opacity-0'}`}>
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

          <div className="space-y-6">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                SAFI Mobile Desalination
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Mobile desalination unit providing reliable water supply for the SAFI project site. This containerized solution delivers high-quality treated water in remote locations.
              </p>
            </div>

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
