import { useState } from 'react';
import { projectsData as allProjects, ProjectLocation as Project } from '@/data/projects-map';
import { X, MapPin, Calendar, Droplet, Building2 } from 'lucide-react';

// Helper functions to work with the new data structure
const getProjectsByCountry = (countryCode: string): Project[] => {
    return allProjects.filter(p => p.countryCode === countryCode);
};

const getCountriesWithProjects = (): string[] => {
    return Array.from(new Set(allProjects.map(p => p.countryCode)));
};

// Map of country codes to their approximate positions on the map (as percentages)
// Coordinates adjusted to match the actual map.jpg image
const countryPositions: Record<string, { x: number; y: number; label: string }> = {
    // North Africa & Middle East
    'MAR': { x: 46, y: 52, label: 'Morocco' },      // Morocco - North Africa West
    'TUN': { x: 49, y: 51, label: 'Tunisia' },      // Tunisia - North Africa
    'LBY': { x: 51, y: 52, label: 'Libya' },        // Libya - North Africa
    'EGY': { x: 54, y: 53, label: 'Egypt' },        // Egypt - North Africa East

    // Middle East
    'QAT': { x: 60, y: 54, label: 'Qatar' },        // Qatar - Persian Gulf
    'OMN': { x: 62, y: 55, label: 'Oman' },         // Oman - Arabian Peninsula
    'IRQ': { x: 58, y: 51, label: 'Iraq' },         // Iraq - Middle East
    'CYP': { x: 54, y: 50, label: 'Cyprus' },       // Cyprus - Mediterranean

    // Europe
    'GRC': { x: 52, y: 48, label: 'Greece' },       // Greece - Southern Europe
    'SRB': { x: 52, y: 46, label: 'Serbia' },       // Serbia - Balkans
    'BGR': { x: 53, y: 47, label: 'Bulgaria' },     // Bulgaria - Balkans
    'ROU': { x: 53, y: 45, label: 'Romania' },      // Romania - Eastern Europe
    'POL': { x: 52, y: 43, label: 'Poland' },       // Poland - Central Europe
    'AUT': { x: 50, y: 45, label: 'Austria' },      // Austria - Central Europe
    'DEU': { x: 49, y: 43, label: 'Germany' },      // Germany - Central Europe
    'IRL': { x: 45, y: 42, label: 'Ireland' },      // Ireland - Western Europe
    'GBR': { x: 46, y: 43, label: 'United Kingdom' }, // UK - Western Europe

    // Sub-Saharan Africa
    'ETH': { x: 57, y: 60, label: 'Ethiopia' },     // Ethiopia - East Africa
    'KEN': { x: 57, y: 63, label: 'Kenya' },        // Kenya - East Africa
    'MOZ': { x: 55, y: 67, label: 'Mozambique' },   // Mozambique - Southeast Africa
    'AGO': { x: 50, y: 64, label: 'Angola' },       // Angola - Southwest Africa

    // Asia
    'KAZ': { x: 64, y: 45, label: 'Kazakhstan' },   // Kazakhstan - Central Asia

    // North America
    'CAN': { x: 22, y: 42, label: 'Canada' },       // Canada - North America
};

interface InteractiveWorldMapProps {
    onCountryClick?: (countryCode: string) => void;
}

export const InteractiveWorldMap = ({ onCountryClick }: InteractiveWorldMapProps) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const countriesWithProjects = getCountriesWithProjects();

    const handleCountryClick = (countryCode: string) => {
        const countryProjects = getProjectsByCountry(countryCode);
        setProjects(countryProjects);
        setSelectedCountry(countryCode);
        setIsPanelOpen(true);
        onCountryClick?.(countryCode);
    };

    const handleClosePanel = () => {
        setIsPanelOpen(false);
        setTimeout(() => setSelectedCountry(null), 300);
    };

    return (
        <div className="relative w-full">
            {/* Map Container */}
            <div className="relative w-full bg-gradient-to-br from-blue-50 to-slate-100 rounded-3xl shadow-2xl overflow-hidden border border-blue-100">
                {/* Base Map Image */}
                <div className="relative w-full h-[600px]">
                    <img
                        src="/map.jpg"
                        alt="World Map"
                        className="w-full h-full object-contain"
                    />

                    {/* Interactive Country Markers */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {countriesWithProjects.map((countryCode) => {
                            const position = countryPositions[countryCode];
                            if (!position) return null;

                            const isSelected = selectedCountry === countryCode;
                            const isHovered = hoveredCountry === countryCode;
                            const projectCount = getProjectsByCountry(countryCode).length;

                            return (
                                <g key={countryCode}>
                                    {/* Pulsing circle for countries with projects */}
                                    <circle
                                        cx={`${position.x}%`}
                                        cy={`${position.y}%`}
                                        r={isSelected ? "12" : isHovered ? "10" : "8"}
                                        fill={isSelected ? "#0ea5e9" : "#0284c7"}
                                        opacity={isHovered ? "0.9" : "0.7"}
                                        className="pointer-events-auto cursor-pointer transition-all duration-300"
                                        style={{
                                            filter: 'drop-shadow(0 2px 8px rgba(2, 132, 199, 0.5))',
                                            animation: isHovered ? 'pulse 2s infinite' : 'none'
                                        }}
                                        onClick={() => handleCountryClick(countryCode)}
                                        onMouseEnter={() => setHoveredCountry(countryCode)}
                                        onMouseLeave={() => setHoveredCountry(null)}
                                    />

                                    {/* Project count badge */}
                                    <circle
                                        cx={`${position.x}%`}
                                        cy={`${position.y}%`}
                                        r="6"
                                        fill="white"
                                        className="pointer-events-none"
                                    />
                                    <text
                                        x={`${position.x}%`}
                                        y={`${position.y}%`}
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                        className="text-xs font-bold fill-primary pointer-events-none"
                                    >
                                        {projectCount}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Hover Tooltip */}
                {hoveredCountry && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-blue-200 animate-fade-in z-10">
                        <p className="text-sm font-semibold text-gray-800">
                            {countryPositions[hoveredCountry]?.label || hoveredCountry}
                        </p>
                        <p className="text-xs text-gray-600">
                            {getProjectsByCountry(hoveredCountry).length} project{getProjectsByCountry(hoveredCountry).length !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-4 h-4 rounded-full bg-[#0284c7]"></div>
                        <span className="text-xs text-gray-700">Countries with projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-white border-2 border-primary"></div>
                        <span className="text-xs text-gray-700">Number of projects</span>
                    </div>
                </div>
            </div>

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="h-full flex flex-col">
                    {/* Panel Header */}
                    <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                    {projects[0]?.country}
                                </h2>
                                <p className="text-blue-100 text-sm md:text-base">
                                    {projects.length} project{projects.length !== 1 ? 's' : ''} completed
                                </p>
                            </div>
                            <button
                                onClick={handleClosePanel}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                aria-label="Close panel"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Projects List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isPanelOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
                    onClick={handleClosePanel}
                />
            )}
        </div>
    );
};

// Project Card Component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Project Details */}
            <div className="space-y-3">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{project.client}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{project.scope}</p>
                </div>

                <div className="grid grid-cols-1 gap-3 pt-3 border-t border-blue-200">
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-gray-700">
                            <span className="font-semibold">Location:</span> {project.city}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-gray-700">
                            <span className="font-semibold">Year:</span> {project.year}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Droplet className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-gray-700">
                            <span className="font-semibold">Capacity:</span> {project.capacity}
                        </span>
                    </div>
                </div>

                {/* Project Badge */}
                <div className="flex items-center gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        <Building2 className="w-3 h-3" />
                        {project.scope.includes('Desalination') ? 'Desalination' :
                            project.scope.includes('Wastewater') ? 'Wastewater' :
                                project.scope.includes('Treatment') ? 'Water Treatment' : 'Infrastructure'}
                    </span>
                </div>
            </div>
        </div>
    );
};
