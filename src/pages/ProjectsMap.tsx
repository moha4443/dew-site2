import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { projectsData, ProjectLocation } from '../data/projects-map';
import { X, MapPin, Calendar, Droplet, Building2 } from 'lucide-react';

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ProjectsMap() {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
    const [selectedProject, setSelectedProject] = useState<ProjectLocation | null>(null);
    const [stats, setStats] = useState({
        totalProjects: 0,
        countries: 0,
        totalCapacity: 0
    });

    useEffect(() => {
        // Calculate statistics
        const countries = new Set(projectsData.map(p => p.country));
        const totalCapacity = projectsData.reduce((sum, p) => {
            const capacity = parseFloat(p.capacity.replace(/[^0-9.]/g, ''));
            return sum + (isNaN(capacity) ? 0 : capacity);
        }, 0);

        setStats({
            totalProjects: projectsData.length,
            countries: countries.size,
            totalCapacity: Math.round(totalCapacity)
        });

        // Initialize map
        if (mapRef.current && !mapInstanceRef.current) {
            const map = L.map(mapRef.current, {
                center: [27.5, 35.0],
                zoom: 5,
                zoomControl: true,
                scrollWheelZoom: true,
            });

            // Use a beautiful dark theme map
            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 19
            }).addTo(map);

            mapInstanceRef.current = map;

            // Create custom icon
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `
          <div class="marker-pin">
            <div class="marker-pulse"></div>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="url(#gradient)"/>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        `,
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32]
            });

            // Add markers for each project
            projectsData.forEach((project) => {
                const marker = L.marker(project.coordinates, { icon: customIcon })
                    .addTo(map);

                marker.on('click', () => {
                    setSelectedProject(project);
                    map.setView(project.coordinates, 8, { animate: true });
                });

                // Add tooltip on hover
                marker.bindTooltip(
                    `<div class="custom-tooltip">
            <strong>${project.city}</strong><br/>
            ${project.country}
          </div>`,
                    {
                        direction: 'top',
                        offset: [0, -32],
                        opacity: 0.95
                    }
                );
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
        <div className="projects-map-container">
            <style>{`
        .projects-map-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          overflow: hidden;
        }

        .map-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0) 100%);
          padding: 2rem;
          backdrop-filter: blur(10px);
          animation: fadeInDown 0.6s ease-out;
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
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
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
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          animation: fadeIn 0.6s ease-out;
        }

        .stat-card:nth-child(1) { animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(6, 182, 212, 0.2);
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #94a3b8;
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

        .custom-marker {
          background: none;
          border: none;
        }

        .marker-pin {
          position: relative;
          width: 32px;
          height: 32px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .marker-pin:hover {
          transform: scale(1.2);
        }

        .marker-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: rgba(6, 182, 212, 0.3);
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

        .custom-tooltip {
          background: rgba(15, 23, 42, 0.95) !important;
          border: 1px solid rgba(6, 182, 212, 0.3) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          color: white !important;
          font-weight: 600 !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
        }

        .leaflet-tooltip-top:before {
          border-top-color: rgba(15, 23, 42, 0.95) !important;
        }

        .project-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease-out;
        }

        .project-modal {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid rgba(6, 182, 212, 0.3);
          border-radius: 24px;
          max-width: 600px;
          width: 100%;
          padding: 2.5rem;
          position: relative;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          animation: scaleIn 0.3s ease-out;
        }

        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
        }

        .modal-close:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: rgba(239, 68, 68, 0.5);
          transform: rotate(90deg);
        }

        .modal-header {
          margin-bottom: 2rem;
        }

        .modal-title {
          font-size: 1.875rem;
          font-weight: 800;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .modal-subtitle {
          color: #94a3b8;
          font-size: 1.125rem;
          font-weight: 600;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .info-row:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(6, 182, 212, 0.3);
        }

        .info-icon {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .info-content {
          flex: 1;
        }

        .info-label {
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .info-value {
          color: white;
          font-size: 1rem;
          font-weight: 600;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 1.875rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .project-modal {
            padding: 1.5rem;
          }

          .modal-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

            {/* Header */}
            <div className="map-header">
                <div className="header-content">
                    <h1 className="header-title">Global Projects Map</h1>

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

            {/* Project Details Modal */}
            {selectedProject && (
                <div
                    className="project-modal-overlay"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="project-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setSelectedProject(null)}
                        >
                            <X size={20} />
                        </button>

                        <div className="modal-header">
                            <h2 className="modal-title">{selectedProject.city}</h2>
                            <p className="modal-subtitle">{selectedProject.country}</p>
                        </div>

                        <div className="modal-content">
                            <div className="info-row">
                                <div className="info-icon">
                                    <Building2 size={20} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Client</div>
                                    <div className="info-value">{selectedProject.client}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-icon">
                                    <MapPin size={20} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Scope of Work</div>
                                    <div className="info-value">{selectedProject.scope}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-icon">
                                    <Calendar size={20} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Year</div>
                                    <div className="info-value">{selectedProject.year}</div>
                                </div>
                            </div>

                            <div className="info-row">
                                <div className="info-icon">
                                    <Droplet size={20} />
                                </div>
                                <div className="info-content">
                                    <div className="info-label">Capacity</div>
                                    <div className="info-value">{selectedProject.capacity}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
