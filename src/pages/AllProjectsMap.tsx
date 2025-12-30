import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { projectsData } from '../projectsData';
import { X, MapPin, Calendar, Droplet, Building2, ChevronRight } from 'lucide-react';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Country coordinates (capital cities or central locations)
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
  'Greece / Romania': { lat: 40.0, lng: 25.0, name: 'Greece / Romania' }
};

// City coordinates for detailed zoom view
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  // Egypt cities
  'Cairo': { lat: 30.0444, lng: 31.2357 },
  'Alexandria': { lat: 31.2001, lng: 29.9187 },
  'Giza': { lat: 30.0131, lng: 31.2089 },
  'Sharm El Sheikh': { lat: 27.9158, lng: 34.3300 },
  'Hurghada': { lat: 27.2579, lng: 33.8116 },
  'Luxor': { lat: 25.6872, lng: 32.6396 },
  'Aswan': { lat: 24.0889, lng: 32.8998 },
  'Port Said': { lat: 31.2653, lng: 32.3019 },
  'Suez': { lat: 29.9668, lng: 32.5498 },
  'Ismailia': { lat: 30.5965, lng: 32.2715 },
  'Dahab': { lat: 28.5000, lng: 34.5167 },
  'Marsa Alam': { lat: 25.0631, lng: 34.8944 },
  'Taba': { lat: 29.4900, lng: 34.8900 },
  'Nuweiba': { lat: 29.0333, lng: 34.6667 },
  'El Gouna': { lat: 27.3833, lng: 33.6833 },
  'Soma Bay': { lat: 26.8167, lng: 34.0000 },
  'Safaga': { lat: 26.7333, lng: 33.9333 },
  'Quseir': { lat: 26.1000, lng: 34.2833 },
  'Berenice': { lat: 23.9167, lng: 35.4833 },
  'Sahl Hasheesh': { lat: 27.1000, lng: 33.8500 },

  // Libya cities
  'Tripoli': { lat: 32.8872, lng: 13.1913 },
  'Benghazi': { lat: 32.1191, lng: 20.0686 },
  'Misrata': { lat: 32.3754, lng: 15.0925 },
  'Sirte': { lat: 31.2089, lng: 16.5887 },

  // Greece cities
  'Athens': { lat: 37.9838, lng: 23.7275 },
  'Thessaloniki': { lat: 40.6401, lng: 22.9444 },
  'Patras': { lat: 38.2466, lng: 21.7346 },
  'Heraklion': { lat: 35.3387, lng: 25.1442 },
  'Larissa': { lat: 39.6390, lng: 22.4191 },
  'Volos': { lat: 39.3667, lng: 22.9444 },
  'Rhodes': { lat: 36.4341, lng: 28.2176 },
  'Ioannina': { lat: 39.6650, lng: 20.8537 },
  'Chania': { lat: 35.5138, lng: 24.0180 },
  'Chalcis': { lat: 38.4636, lng: 23.5975 },

  // Oman cities
  'Muscat': { lat: 23.5880, lng: 58.3829 },
  'Salalah': { lat: 17.0150, lng: 54.0924 },
  'Sohar': { lat: 24.3474, lng: 56.7094 },
  'Nizwa': { lat: 22.9333, lng: 57.5333 },
  'Sur': { lat: 22.5667, lng: 59.5289 },
  'Ibri': { lat: 23.2256, lng: 56.5158 },
  'Barka': { lat: 23.6667, lng: 57.8833 },
  'Rustaq': { lat: 23.3908, lng: 57.4244 },

  // Bulgaria cities
  'Sofia': { lat: 42.6977, lng: 23.3219 },
  'Plovdiv': { lat: 42.1354, lng: 24.7453 },
  'Varna': { lat: 43.2141, lng: 27.9147 },
  'Burgas': { lat: 42.5048, lng: 27.4626 },

  // Ireland cities
  'Dublin': { lat: 53.3498, lng: -6.2603 },
  'Cork': { lat: 51.8985, lng: -8.4756 },
  'Limerick': { lat: 52.6638, lng: -8.6267 },
  'Galway': { lat: 53.2707, lng: -9.0568 },

  // Mozambique cities
  'Maputo': { lat: -25.9655, lng: 32.5832 },
  'Beira': { lat: -19.8436, lng: 34.8389 },
  'Nampula': { lat: -15.1165, lng: 39.2666 },
  'Matola': { lat: -25.9622, lng: 32.4589 },

  // Poland cities
  'Warsaw': { lat: 52.2297, lng: 21.0122 },
  'Krakow': { lat: 50.0647, lng: 19.9450 },
  'Lodz': { lat: 51.7592, lng: 19.4560 },
  'Wroclaw': { lat: 51.1079, lng: 17.0385 },

  // Romania cities
  'Bucharest': { lat: 44.4268, lng: 26.1025 },
  'Cluj-Napoca': { lat: 46.7712, lng: 23.6236 },
  'Timisoara': { lat: 45.7489, lng: 21.2087 },
  'Iasi': { lat: 47.1585, lng: 27.6014 },

  // Slovenia cities
  'Ljubljana': { lat: 46.0569, lng: 14.5058 },
  'Maribor': { lat: 46.5547, lng: 15.6459 },
  'Celje': { lat: 46.2397, lng: 15.2677 },
  'Kranj': { lat: 46.2389, lng: 14.3556 },

  // Iraq cities
  'Baghdad': { lat: 33.3152, lng: 44.3661 },
  'Basra': { lat: 30.5085, lng: 47.7835 },
  'Mosul': { lat: 36.3350, lng: 43.1189 },
  'Erbil': { lat: 36.1911, lng: 44.0091 },
  'Kirkuk': { lat: 35.4681, lng: 44.3922 },
  'Najaf': { lat: 31.9996, lng: 44.3145 },

  // Tunisia cities
  'Tunis': { lat: 36.8065, lng: 10.1815 },
  'Sfax': { lat: 34.7406, lng: 10.7603 },
  'Sousse': { lat: 35.8256, lng: 10.6369 },
  'Kairouan': { lat: 35.6781, lng: 10.0963 },

  // Qatar cities
  'Doha': { lat: 25.2854, lng: 51.5310 },
  'Al Wakrah': { lat: 25.1714, lng: 51.6039 },
  'Al Rayyan': { lat: 25.2919, lng: 51.4244 },
  'Umm Salal': { lat: 25.4114, lng: 51.3964 },

  // Ethiopia cities
  'Addis Ababa': { lat: 9.0320, lng: 38.7469 },
  'Dire Dawa': { lat: 9.5930, lng: 41.8661 },
  'Mekelle': { lat: 13.4967, lng: 39.4753 },
  'Gondar': { lat: 12.6000, lng: 37.4667 },

  // Kazakhstan cities
  'Nur-Sultan': { lat: 51.1694, lng: 71.4491 },
  'Almaty': { lat: 43.2220, lng: 76.8512 },
  'Shymkent': { lat: 42.3000, lng: 69.6000 },
  'Karaganda': { lat: 49.8047, lng: 73.1094 },

  // Angola cities
  'Luanda': { lat: -8.8383, lng: 13.2344 },
  'Huambo': { lat: -12.7763, lng: 15.7392 },
  'Lobito': { lat: -12.3644, lng: 13.5350 },
  'Benguela': { lat: -12.5763, lng: 13.4055 },

  // Morocco cities
  'Rabat': { lat: 33.9716, lng: -6.8498 },
  'Casablanca': { lat: 33.5731, lng: -7.5898 },
  'Marrakech': { lat: 31.6295, lng: -7.9811 },
  'Fes': { lat: 34.0181, lng: -5.0078 },
  'Tangier': { lat: 35.7595, lng: -5.8340 },
  'Agadir': { lat: 30.4278, lng: -9.5981 },
  'Safi': { lat: 32.2994, lng: -9.2372 },

  // United Kingdom cities
  'London': { lat: 51.5074, lng: -0.1278 },
  'Manchester': { lat: 53.4808, lng: -2.2426 },
  'Birmingham': { lat: 52.4862, lng: -1.8904 },
  'Leeds': { lat: 53.8008, lng: -1.5491 },
  'Glasgow': { lat: 55.8642, lng: -4.2518 },
  'Edinburgh': { lat: 55.9533, lng: -3.1883 },

  // Canada cities
  'Ottawa': { lat: 45.4215, lng: -75.6972 },
  'Toronto': { lat: 43.6532, lng: -79.3832 },
  'Montreal': { lat: 45.5017, lng: -73.5673 },
  'Vancouver': { lat: 49.2827, lng: -123.1207 },
  'Calgary': { lat: 51.0447, lng: -114.0719 },
  'Edmonton': { lat: 53.5461, lng: -113.4938 }
};

interface CountryProjects {
  country: string;
  count: number;
  projects: typeof projectsData;
  coordinates: { lat: number; lng: number };
}

export default function AllProjectsMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryProjects | null>(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    countries: 0,
    totalCapacity: 0
  });

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
    // Calculate statistics
    const countries = new Set(projectsData.map(p => p.country));

    setStats({
      totalProjects: projectsData.length,
      countries: 21, // Fixed value as per user request
      totalCapacity: 500000 // Fixed value as per user request: 5 million m³/day
    });

    // Initialize map
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [30, 25],
        zoom: 3,
        zoomControl: true,
        scrollWheelZoom: true,
        minZoom: 2,
        maxZoom: 15
      });

      // Light theme map
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;

      // Store markers for zoom-based visibility
      const countryMarkers: L.Marker[] = [];
      const cityMarkers: L.Marker[] = [];

      // Create country-level markers (visible at zoom 2-5)
      countriesData.forEach((countryData) => {
        if (countryData.coordinates.lat === 0 && countryData.coordinates.lng === 0) return;

        const markerHtml = `
          <div class="country-marker">
            <div class="marker-pulse"></div>
            <div class="marker-content">
              <div class="marker-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#gradient-${countryData.country.replace(/\s/g, '')})"/>
                  <defs>
                    <linearGradient id="gradient-${countryData.country.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#0284c7;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="marker-count">${countryData.count}</div>
            </div>
          </div>
        `;

        const icon = L.divIcon({
          className: 'custom-country-marker',
          html: markerHtml,
          iconSize: [50, 50],
          iconAnchor: [25, 50],
          popupAnchor: [0, -50]
        });

        const marker = L.marker([countryData.coordinates.lat, countryData.coordinates.lng], { icon })
          .addTo(map);

        marker.on('click', () => {
          setSelectedCountry(countryData);
          map.setView([countryData.coordinates.lat, countryData.coordinates.lng], 7, { animate: true });
        });

        marker.bindTooltip(
          `<div class="map-tooltip">
            <strong>${countryData.country}</strong><br/>
            ${countryData.count} project${countryData.count !== 1 ? 's' : ''}
          </div>`,
          {
            direction: 'top',
            offset: [0, -50],
            opacity: 0.95
          }
        );

        countryMarkers.push(marker);
      });

      // Create a normalized lookup for city coordinates (case‑insensitive)
      const cityCoordinatesMap: Record<string, { lat: number; lng: number }> = {};
      Object.entries(cityCoordinates).forEach(([key, value]) => {
        cityCoordinatesMap[key.toLowerCase()] = value;
      });

      // Create city-level markers (visible at zoom 6+)
      projectsData.forEach((project, idx) => {
        const cityKey = project.city?.trim().toLowerCase();
        const hasCityCoord = cityKey && cityCoordinatesMap[cityKey];
        const baseCoords = hasCityCoord ? cityCoordinatesMap[cityKey] : countryCoordinates[project.country] || { lat: 0, lng: 0 };
        if (baseCoords.lat === 0 && baseCoords.lng === 0) return;

        // Apply a small offset for fallback markers to avoid stacking on country marker
        const cityCoords = hasCityCoord
          ? baseCoords
          : {
            lat: baseCoords.lat + 0.05 * Math.sin(idx),
            lng: baseCoords.lng + 0.05 * Math.cos(idx),
          };

        // Group projects by city for count
        const cityProjects = projectsData.filter(p => p.city === project.city);
        const isFirstInCity = projectsData.findIndex(p => p.city === project.city) === idx;

        if (!isFirstInCity) return; // Only create one marker per city

        const cityMarkerHtml = `
          <div class="city-marker">
            <div class="city-marker-content">
              <div class="city-marker-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="url(#city-gradient-${project.city.replace(/\s/g, '')})"/>
                  <defs>
                    <linearGradient id="city-gradient-${project.city.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#0ea5e9;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#0284c7;stop-opacity:1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              ${cityProjects.length > 1 ? `<div class="city-marker-count">${cityProjects.length}</div>` : ''}
            </div>
          </div>
        `;

        const cityIcon = L.divIcon({
          className: 'custom-city-marker',
          html: cityMarkerHtml,
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        });

        const cityMarker = L.marker([cityCoords.lat, cityCoords.lng], { icon: cityIcon });

        cityMarker.on('click', () => {
          // Show projects for this city
          const countryData = countriesData.find(c => c.country === project.country);
          if (countryData) {
            const cityProjectsData = {
              ...countryData,
              projects: cityProjects,
              count: cityProjects.length,
              country: `${project.city}, ${project.country}`
            };
            setSelectedCountry(cityProjectsData);
          }
        });

        cityMarker.bindTooltip(
          `<div class="map-tooltip">
            <strong>${project.city}</strong><br/>
            ${cityProjects.length} project${cityProjects.length !== 1 ? 's' : ''}
          </div>`,
          {
            direction: 'top',
            offset: [0, -30],
            opacity: 0.95
          }
        );

        cityMarkers.push(cityMarker);
      });


      // Function to update marker visibility based on zoom level
      const updateMarkerVisibility = () => {
        const zoom = map.getZoom();

        if (zoom <= 5) {
          // Show country markers, hide city markers
          countryMarkers.forEach(marker => {
            if (!map.hasLayer(marker)) {
              marker.addTo(map);
            }
          });
          cityMarkers.forEach(marker => {
            if (map.hasLayer(marker)) {
              map.removeLayer(marker);
            }
          });
        } else {
          // Hide country markers, show city markers
          countryMarkers.forEach(marker => {
            if (map.hasLayer(marker)) {
              map.removeLayer(marker);
            }
          });
          cityMarkers.forEach(marker => {
            if (!map.hasLayer(marker)) {
              marker.addTo(map);
            }
          });
        }
      };

      // Initial visibility setup
      updateMarkerVisibility();

      // Listen to zoom changes
      map.on('zoomend', updateMarkerVisibility);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="all-projects-map-container">
      <style>{`
        .all-projects-map-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          overflow: hidden;
        }

        .map-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0) 100%);
          padding: 2rem;
          backdrop-filter: blur(10px);
          animation: fadeInDown 0.6s ease-out;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.1);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          text-align: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .stat-card {
          background: white;
          backdrop-filter: blur(10px);
          border: 2px solid #e0f2fe;
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease-out;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.08);
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }

        .stat-card:hover {
          background: #f0f9ff;
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(14, 165, 233, 0.15);
          border-color: #0ea5e9;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .map-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }

        #map {
          width: 100%;
          height: 100%;
        }

        .custom-country-marker {
          background: none;
          border: none;
        }

        .country-marker {
          position: relative;
          width: 50px;
          height: 50px;
          cursor: pointer;
        }

        .marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          background: rgba(14, 165, 233, 0.2);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        .marker-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: transform 0.3s ease;
        }

        .country-marker:hover .marker-content {
          transform: scale(1.2);
        }

        .marker-icon {
          filter: drop-shadow(0 4px 8px rgba(14, 165, 233, 0.4));
        }

        .marker-count {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          color: white;
          font-weight: 800;
          font-size: 0.875rem;
          padding: 4px 8px;
          border-radius: 12px;
          min-width: 28px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .map-tooltip {
          background: white !important;
          border: 2px solid #0ea5e9 !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          color: #0f172a !important;
          font-weight: 600 !important;
          box-shadow: 0 10px 30px rgba(14, 165, 233, 0.2) !important;
        }

        .leaflet-tooltip-top:before {
          border-top-color: white !important;
        }

        /* City Marker Styles */
        .custom-city-marker {
          background: none;
          border: none;
        }

        .city-marker {
          position: relative;
          width: 30px;
          height: 30px;
          cursor: pointer;
        }

        .city-marker-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          transition: transform 0.3s ease;
        }

        .city-marker:hover .city-marker-content {
          transform: scale(1.3);
        }

        .city-marker-icon {
          filter: drop-shadow(0 2px 4px rgba(14, 165, 233, 0.4));
        }

        .city-marker-count {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          color: white;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
        }


        .country-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(14, 165, 233, 0.1);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease-out;
        }

        .country-modal {
          background: white;
          border: 2px solid #e0f2fe;
          border-radius: 24px;
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          position: relative;
          box-shadow: 0 25px 50px rgba(14, 165, 233, 0.15);
          animation: scaleIn 0.3s ease-out;
          display: flex;
          flex-direction: column;
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: #f0f9ff;
          border: 2px solid #e0f2fe;
          border-radius: 12px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #0ea5e9;
          z-index: 10;
        }

        .modal-close:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
          transform: rotate(90deg);
        }

        .modal-header {
          padding: 2.5rem;
          border-bottom: 2px solid #e0f2fe;
          background: linear-gradient(135deg, #f0f9ff 0%, white 100%);
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .modal-subtitle {
          color: #64748b;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .modal-content {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
          background: #fafafa;
        }

        .projects-list {
          display: grid;
          gap: 1rem;
        }

        .project-card {
          background: white;
          border: 2px solid #e0f2fe;
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.05);
        }

        .project-card:hover {
          background: #f0f9ff;
          border-color: #0ea5e9;
          transform: translateX(4px);
          box-shadow: 0 8px 16px rgba(14, 165, 233, 0.12);
        }

        .project-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .project-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .project-info {
          flex: 1;
        }

        .project-client {
          color: #0f172a;
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .project-scope {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .project-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid #e0f2fe;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .detail-icon {
          color: #0ea5e9;
          flex-shrink: 0;
        }

        .detail-text {
          color: #475569;
          font-size: 0.875rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 1.875rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .country-modal {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .project-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div className="map-header">
        <div className="header-content">
          <h1 className="header-title">Global Projects Portfolio</h1>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalProjects}</div>
              <div className="stat-label">Total Projects</div>
            </div>

            <div className="stat-card">
              <div className="stat-value">{stats.countries}</div>
              <div className="stat-label">Countries</div>
            </div>

            <div className="stat-card">
              <div className="stat-value">{stats.totalCapacity.toLocaleString()}</div>
              <div className="stat-label">Total Capacity (m³/day)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="map-wrapper">
        <div ref={mapRef} id="map" />
      </div>

      {/* Country Projects Modal */}
      {selectedCountry && (
        <div
          className="country-modal-overlay"
          onClick={() => setSelectedCountry(null)}
        >
          <div
            className="country-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedCountry(null)}
            >
              <X size={20} />
            </button>

            <div className="modal-header">
              <h2 className="modal-title">{selectedCountry.country}</h2>
              <p className="modal-subtitle">
                {selectedCountry.count} project{selectedCountry.count !== 1 ? 's' : ''} completed
              </p>
            </div>

            <div className="modal-content">
              <div className="projects-list">
                {selectedCountry.projects.map((project) => (
                  <div key={project.id} className="project-card">
                    <div className="project-header">
                      <div className="project-icon">
                        <Building2 size={20} />
                      </div>
                      <div className="project-info">
                        <div className="project-client">{project.client}</div>
                        <div className="project-scope">{project.scope}</div>
                      </div>
                    </div>

                    <div className="project-details">
                      {project.city && project.city !== '—' && (
                        <div className="detail-item">
                          <MapPin size={16} className="detail-icon" />
                          <span className="detail-text">{project.city}</span>
                        </div>
                      )}
                      <div className="detail-item">
                        <Calendar size={16} className="detail-icon" />
                        <span className="detail-text">{project.year}</span>
                      </div>
                      {project.capacity && project.capacity !== '—' && (
                        <div className="detail-item">
                          <Droplet size={16} className="detail-icon" />
                          <span className="detail-text">{project.capacity}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
