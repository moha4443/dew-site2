import { useState, useRef, useEffect, useCallback } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Droplets,
    Zap,
    Factory,
    Waves,
    Container,
    Gauge,
    Calendar,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Recycle,
    Beaker,
    Filter,
    Building2,
    Users,
    Globe
} from 'lucide-react';

// Section 1: Desalination & Water Supply Solutions
const section1Products = [
    {
        id: 'turnkey-desal',
        title: 'Turn-Key & BOO Projects Worldwide',
        subtitle: 'Desalination',
        icon: Globe,
        description: 'DEW utilizes pre-engineered, prefabricated concepts for "Smart-Packaged Solutions" to implement larger municipal and BOO projects for desalination with reliable "local-support", minimizing heavy on-site presence.',
        images: [
            '/product/TURN-KEY & BOO PROJECTS WORLDWIDE(1).jpg',
            '/product/TURN-KEY & BOO PROJECTS WORLDWIDE(2).jpg',
            '/product/TURN-KEY & BOO PROJECTS WORLDWIDE(3)jpg.jpg'
        ],
        color: 'from-blue-600 to-cyan-500',
        benefits: [
            'Increases market penetration in Mediterranean, Middle East & Africa regions',
            'Brings value and stable cashflows to Local Operators',
            'Minimizes heavy on-site presence'
        ],
        status: 'EU campaign started (beginning with Greece)',
        specs: null
    },
    {
        id: 'mobile-desal',
        title: 'Mobile Solutions for Seawater Desalination',
        subtitle: 'Small - Medium - Large Size',
        icon: Container,
        description: 'High efficiency & quality Modular systems in Containers based on know-how in Sea & Brackish Water desalination. Completely mobile and exceptionally compact, suitable also for B.O.O. projects.',
        images: [
            '/product/Small - Medium – Large Size MOBILE SOLUTIONS for Seawater Desalination (1)jpg.jpg',
            '/product/Small - Medium – Large Size MOBILE SOLUTIONS for Seawater Desalination (2).jpg',
            '/product/Small - Medium – Large Size MOBILE SOLUTIONS for Seawater Desalination (3)png.png',
            '/product/Small - Medium – Large Size MOBILE SOLUTIONS for Seawater Desalination 4.jpg'
        ],
        color: 'from-blue-500 to-indigo-600',
        benefits: [
            'Completely mobile and exceptionally compact',
            'Suitable for B.O.O. projects',
            'High efficiency & quality modular systems'
        ],
        specs: {
            containerized: '500 to 11,000 m³/d',
            skidMounted: 'Up to 20,000 m³/d',
            introduction: '1992',
            latestDev: '2025 (ceramic mem. pre-treatment)'
        }
    },
    {
        id: 'ceramics-uf',
        title: 'Ceramics Ultra-Filtration Technologies',
        subtitle: 'Revolutionary Pre-treatment',
        icon: Filter,
        description: 'The 1st worldwide, single pretreatment stage for Seawater Desalination which reduces power consumption by 15% & plant-foot area by 50%. Also utilizing this technology for advanced Wastewater Treatment Plants for Reuse Applications and Industrial effluent management.',
        images: [
            '/product/Ceramics Ultra-Filtration Technologies (1).jpg',
            '/product/Ceramics Ultra-Filtration Technologies (2).jpg',
            '/product/Ceramics Ultra-Filtration Technologies (3).png',
            '/product/Ceramics Ultra-Filtration Technologies (4).jpg'
        ],
        color: 'from-cyan-500 to-teal-500',
        benefits: [
            'Reduces power consumption by 15%',
            'Reduces plant-foot area by 50%',
            'NSF Certified (PRODUCT CAT-5)',
            'Standard Module 6.0 S with 34 plates'
        ],
        specs: {
            product: 'PRODUCT CAT-5 (Standard Module 6.0 S with 34 plates - NSF Certified)',
            capacity: 'From 500 to 450,000 m³/day',
            introduction: '2023',
            latestDev: '2025',
            achievement: 'Total Portfolio 262,000 m³/day (Largest Worldwide)'
        }
    }
];

// Section 2: Municipal & Wastewater Treatment
const section2Products = [
    {
        id: 'turnkey-wwt',
        title: 'Turn-Key Municipal Projects Worldwide',
        subtitle: 'Wastewater Treatment (WWT)',
        icon: Building2,
        description: '"Smart-Packaged Solutions" for larger municipal WWT projects utilizing prefabricated units to provide quick solutions to distant territories (Africa, MENA, Asia).',
        images: [
            '/product/TURN-KEY MUNICIPAL PROJECTS WORLDWIDE(1).png',
            '/product/TURN-KEY MUNICIPAL PROJECTS WORLDWIDE(2).jpg',
            '/product/TURN-KEY MUNICIPAL PROJECTS WORLDWIDE(3).jpg',
            '/product/TURN-KEY MUNICIPAL PROJECTS WORLDWIDE(4).jpg'
        ],
        color: 'from-emerald-500 to-green-600',
        benefits: [
            'Increases market penetration',
            'Quick solutions to distant territories (Africa, MENA, Asia)',
            'Brings value to Local Operators'
        ],
        specs: null
    },
    {
        id: 'high-rate-bioplant',
        title: '"High-Rate BioPlant" Compact',
        subtitle: 'MBBR Technology',
        icon: Recycle,
        description: 'Modular and Containerized System for fast, reliable yet effective secondary treatment of Municipal Wastewater (sewage) using MBBR technology.',
        images: [
            '/product/High-Rate BioPlant.jpg'
        ],
        color: 'from-green-500 to-emerald-600',
        benefits: [
            'Fast and reliable secondary treatment',
            'Modular and Containerized system',
            'MBBR Technology'
        ],
        specs: {
            capacity: 'Equivalent to 250 – 5,000 people',
            introduction: '2008',
            latestDev: '2017'
        }
    },
    {
        id: 'ultra-clear-bioplant',
        title: '"Ultra-Clear BioPlant" Compact',
        subtitle: 'MBR Technology - Plug & Play',
        icon: Droplets,
        description: 'Modular and Containerized System for complete & extensive tertiary treatment of Wastewater (Municipal & Industrial) producing high-quality effluent for Water Reuse.',
        images: [
            '/product/Ultra-Clear BioPlant.jpg'
        ],
        color: 'from-teal-500 to-cyan-600',
        benefits: [
            'Complete tertiary treatment',
            'High-quality effluent for Water Reuse',
            'Plug & Play mode',
            'MBR Technology'
        ],
        specs: {
            capacity: 'Equivalent to 250 – 15,000 people',
            introduction: '2014',
            latestDev: '2022'
        }
    },
    {
        id: 'ultra-clear-unit',
        title: '"Ultra-Clear Unit"',
        subtitle: 'Large Municipal MBR Projects',
        icon: Factory,
        description: 'A Process unit designed for implementing larger municipal wastewater treatment projects, utilizing modular prefabricated units to achieve high-quality effluent results. MBR technology enables fast project implementation.',
        images: [
            '/product/Ultra-Clear Unit.png'
        ],
        color: 'from-emerald-600 to-teal-500',
        benefits: [
            'Fast project implementation',
            'Modular prefabricated units',
            'High-quality effluent results',
            'MBR Technology'
        ],
        specs: {
            capacity: 'Equivalent to 5,000 – 50,000 people',
            introduction: '2016',
            latestDev: '2022'
        }
    },
    {
        id: 'Mobile Bio-Plant',
        title: 'Mobile Bio-Plant',
        subtitle: 'Portable MBR Technology',
        icon: Container,
        description: 'A specially designed compact STP utilizing MBR technology that is fully Portable & Mobile. It can be easily disassembled and reassembled at a new location. The system with a treatment capacity of 1,000 m³/d unit occupies less than 150 m² area.',
        images: [
            '/product/Mobile Bio-Plant.jpg'
        ],
        color: 'from-blue-500 to-teal-500',
        benefits: [
            'Fully Portable & Mobile',
            'Easy disassembly and reassembly',
            'Compact footprint (< 150 m²)',
            'MBR Technology'
        ],
        specs: {
            capacity: 'Equivalent to 5,000 – 10,000 people',
            introduction: '2017',
            latestDev: '2017'
        }
    },
    {
        id: 'CSDP',
        title: 'CSDP',
        subtitle: 'Containerized Sludge Dewatering Plant',
        icon: Recycle,
        description: 'A Modular, Portable system for waste sludge dewatering and management. CSDP provides efficient sludge treatment in a containerized format for easy deployment and operation.',
        images: [
            '/product/CSDP.jpg'
        ],
        color: 'from-amber-500 to-yellow-500',
        benefits: [
            'Modular and Portable',
            'Waste sludge dewatering',
            'Containerized system',
            'Easy deployment'
        ],
        specs: {
            capacity: '1.0 to 40 m³/h',
            introduction: '2009',
            latestDev: '2022'
        }
    }
];

// Section 3: Industrial Process Water (Pure Water)
const section3Products = [
    {
        id: 'demineralization',
        title: 'Demineralization for Power & PHARMA',
        subtitle: 'EDI Technology',
        icon: Beaker,
        description: 'Systems using Electrodeionization (EDI) for Demineralized Water Production. Critical for Power Gen, Hydrogen, and Pharma industries. Water quality with conductivity less than 0.1 µS/cm². Fully containerized or skid mounted.',
        images: [
            '/product/Demineralization for Power Generation and  PHARMA Industries(1).jpg',
            '/product/Demineralization for Power Generation and  PHARMA Industries(2)png.png',
            '/product/Demineralization for Power Generation and  PHARMA Industries(3).png',
            '/product/Demineralization for Power Generation and  PHARMA Industries(4).jpg',
            '/product/Demineralization for Power Generation and  PHARMA Industries(5).png'
        ],
        color: 'from-violet-500 to-purple-600',
        benefits: [
            'Conductivity < 0.1 µS/cm²',
            'Fully containerized or skid mounted',
            'For Power, Hydrogen, and Pharma industries'
        ],
        specs: {
            capacity: 'Up to 15,000 m³/d',
            format: 'Fully containerized or skid mounted',
            introduction: '2006-2017',
            latestDev: '2023'
        }
    }
];

// Section 4: Advanced Reuse & Resource Recovery
const section4Products = [
    {
        id: 'uf-pack',
        title: '"UF-Pack"',
        subtitle: 'Tertiary Treatment for Reuse',
        icon: Filter,
        description: 'Compact Modular System for tertiary (polishing) treatment of Wastewater for Water Reuse and reclamation.',
        images: [
            '/product/UF-Pack.jpg'
        ],
        color: 'from-purple-500 to-indigo-600',
        benefits: [
            'Compact and Modular design',
            'Water reuse and reclamation',
            'Tertiary polishing treatment'
        ],
        specs: {
            capacity: 'Equivalent to 1,000 – 50,000 people',
            introduction: '2016',
            latestDev: '2024'
        }
    },
    {
        id: 'ex-mbr',
        title: '"Ex-MBR" (Landfill Leachates)',
        subtitle: 'Cross-flow MBR Technology',
        icon: Recycle,
        description: 'Compact System specifically for the treatment of Landfill Leachates using Cross-flow MBR technology.',
        images: [
            '/product/Ex-MBR.jpg'
        ],
        color: 'from-amber-500 to-orange-600',
        benefits: [
            'Cross-flow MBR technology',
            'Specialized for Landfill Leachates',
            'Compact and Modular design'
        ],
        specs: {
            capacity: '50 – 300 m³/d',
            introduction: '2018',
            latestDev: '2022'
        }
    },
    {
        id: 'micro-band-filter',
        title: '"Micro-Band-Filter" (MBF)',
        subtitle: 'Bio-solids Recovery',
        icon: Gauge,
        description: 'Innovative compact filter to remove and recover useful bio-solids from wastewater (e.g., Food Industry) for energy production (pyrolysis/gasification).',
        images: [
            '/product/Micro-Band-Filter%E2%80%9D (MBF),.png'
        ],
        color: 'from-orange-500 to-red-500',
        benefits: [
            'Recovers useful bio-solids',
            'Energy production (pyrolysis/gasification)',
            'Very compact design'
        ],
        specs: {
            capacity: '50 – 250 m³/h',
            introduction: '2017',
            latestDev: '2024'
        }
    }
];

// All sections
const sections = [
    {
        id: 'desalination',
        title: 'Seawater Desalination & Water Supply',
        subtitle: 'Drinking water, SWRO, Mobile Units',
        icon: Waves,
        color: 'from-blue-600 to-cyan-500',
        bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
        products: section1Products
    },
    {
        id: 'municipal',
        title: 'Municipal Wastewater Treatment',
        subtitle: 'Sewage treatment, MBR, MBBR',
        icon: Recycle,
        color: 'from-emerald-500 to-teal-500',
        bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
        products: section2Products
    },
    {
        id: 'industrial',
        title: 'Industrial Process Water (Pure Water)',
        subtitle: 'Power Generation, Pharma, Hydrogen',
        icon: Beaker,
        color: 'from-violet-500 to-purple-600',
        bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50',
        products: section3Products
    },
    {
        id: 'reuse',
        title: 'Advanced Reuse & Resource Recovery',
        subtitle: 'Tertiary Polishing, Leachates, Bio-solids',
        icon: Factory,
        color: 'from-orange-500 to-amber-500',
        bgColor: 'bg-gradient-to-br from-orange-50 to-amber-50',
        products: section4Products
    }
];

const Products = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
    const sectionsRef = useRef<HTMLDivElement>(null);

    const scrollToSections = () => {
        sectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navigation />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />

                    {/* Animated Waves */}
                    <div className="absolute inset-0">
                        <svg className="absolute bottom-0 w-full h-64 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path fill="currentColor" className="text-cyan-400 animate-wave" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                        <svg className="absolute bottom-0 w-full h-48 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
                            <path fill="currentColor" className="text-blue-400 animate-wave-slow" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,144C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        </svg>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-white/10 animate-float-random"
                                style={{
                                    width: `${4 + Math.random() * 8}px`,
                                    height: `${4 + Math.random() * 8}px`,
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    animationDuration: `${10 + Math.random() * 20}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl text-center pt-32">
                    <div className="animate-fade-in">
                        <span className="inline-flex items-center gap-2 px-6 py-2 mb-6 text-sm font-semibold tracking-wider text-cyan-300 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                            <Droplets className="w-4 h-4 animate-pulse" />
                            COMPLETE WATER SOLUTIONS
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-slide-up">
                        Our <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">Products</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
                        From Seawater Desalination to Wastewater Treatment — Complete solutions for every water challenge
                    </p>

                    {/* Section Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '400ms' }}>
                        {sections.map((section, i) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group relative p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 hover:border-white/30 transition-all duration-500 text-left overflow-hidden"
                                >
                                    {/* Hover Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{section.title}</h3>
                                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{section.subtitle}</p>
                                    <div className="flex items-center text-cyan-400 text-sm font-semibold">
                                        <span>{section.products.length} Products</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Scroll Indicator */}
                    <button
                        onClick={scrollToSections}
                        className="inline-flex flex-col items-center text-white/50 hover:text-white transition-colors group"
                    >
                        <span className="text-sm mb-2 group-hover:text-cyan-300">Explore Products</span>
                        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2 group-hover:border-cyan-400 transition-colors">
                            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-scroll-down group-hover:bg-cyan-400" />
                        </div>
                    </button>
                </div>
            </section>

            {/* Product Sections */}
            <div ref={sectionsRef}>
                {sections.map((section, sectionIndex) => (
                    <SectionComponent
                        key={section.id}
                        section={section}
                        sectionIndex={sectionIndex}
                        expandedProduct={expandedProduct}
                        setExpandedProduct={setExpandedProduct}
                        setSelectedImage={setSelectedImage}
                    />
                ))}
            </div>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-semibold text-cyan-300 bg-white/10 rounded-full">
                        <Zap className="w-4 h-4" />
                        GET STARTED TODAY
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Need a Custom Solution?
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
                        Our engineering team is ready to design the perfect water treatment system for your specific requirements
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-slate-900 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl hover:from-cyan-300 hover:to-blue-300 transform hover:scale-105 transition-all duration-300 shadow-xl shadow-cyan-500/25"
                        >
                            <Zap className="w-5 h-5" />
                            Request Quote
                        </a>
                        <a
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white border-2 border-white/20 rounded-xl hover:bg-white/10 hover:border-white/40 transition-all duration-300"
                        >
                            View Our Services
                        </a>
                    </div>
                </div>
            </section>

            {/* Image Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/60 hover:text-white p-2 z-50 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-all"
                        onClick={() => setSelectedImage(null)}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={selectedImage}
                        alt="Product view"
                        className="max-w-full max-h-[90vh] object-contain rounded-xl animate-scale-in shadow-2xl"
                    />
                </div>
            )}

            <Footer />

            {/* Custom Styles */}
            <style>{`
        @keyframes float-random {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -20px) rotate(90deg); }
          50% { transform: translate(-5px, -40px) rotate(180deg); }
          75% { transform: translate(-15px, -20px) rotate(270deg); }
        }
        
        @keyframes wave {
          0% { transform: translateX(0); }
          50% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes wave-slow {
          0% { transform: translateX(0); }
          50% { transform: translateX(25%); }
          100% { transform: translateX(0); }
        }
        
        @keyframes scroll-down {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }
        
        .animate-float-random { animation: float-random 20s infinite ease-in-out; }
        .animate-wave { animation: wave 20s infinite ease-in-out; }
        .animate-wave-slow { animation: wave-slow 25s infinite ease-in-out; }
        .animate-scroll-down { animation: scroll-down 1.5s infinite; }
      `}</style>
        </div>
    );
};

// Image Carousel Component
const ImageCarousel = ({
    images,
    onImageClick,
    color
}: {
    images: string[];
    onImageClick: (img: string) => void;
    color: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goToNext = useCallback(() => {
        if (isAnimating || images.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setTimeout(() => setIsAnimating(false), 500);
    }, [images.length, isAnimating]);

    const goToPrev = useCallback(() => {
        if (isAnimating || images.length <= 1) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setTimeout(() => setIsAnimating(false), 500);
    }, [images.length, isAnimating]);

    // Auto-play
    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [goToNext, images.length]);

    return (
        <div className="relative group">
            {/* Glow Effect */}
            <div className={`absolute -inset-4 bg-gradient-to-r ${color} rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500`} />

            {/* Main Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
                {/* Images */}
                {images.map((img, i) => (
                    <div
                        key={i}
                        className={`absolute inset-0 transition-all duration-500 ease-out ${i === currentIndex
                            ? 'opacity-100 scale-100 z-10'
                            : i === (currentIndex - 1 + images.length) % images.length
                                ? 'opacity-0 scale-95 -translate-x-full z-0'
                                : 'opacity-0 scale-95 translate-x-full z-0'
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Product image ${i + 1}`}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => onImageClick(img)}
                        />
                    </div>
                ))}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-20 pointer-events-none" />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                        >
                            <ChevronLeft className="w-5 h-5 text-slate-700" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                        >
                            <ChevronRight className="w-5 h-5 text-slate-700" />
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentIndex
                                    ? 'bg-white w-6'
                                    : 'bg-white/50 hover:bg-white/80'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Image Counter */}
                {images.length > 1 && (
                    <div className="absolute top-4 right-4 z-30 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>
        </div>
    );
};

// Section Component
const SectionComponent = ({
    section,
    sectionIndex,
    expandedProduct,
    setExpandedProduct,
    setSelectedImage
}: {
    section: typeof sections[0];
    sectionIndex: number;
    expandedProduct: string | null;
    setExpandedProduct: (id: string | null) => void;
    setSelectedImage: (img: string | null) => void;
}) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
    const Icon = section.icon;

    return (
        <section
            id={section.id}
            ref={ref}
            className={`py-24 ${section.bgColor}`}
        >
            <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                {/* Section Header */}
                <div className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${section.color} text-white mb-6 shadow-lg`}>
                        <Icon className="w-5 h-5" />
                        <span className="font-bold tracking-wide">SECTION {sectionIndex + 1}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
                        {section.title}
                    </h2>
                    <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                        {section.subtitle}
                    </p>
                    <div className={`w-32 h-1.5 bg-gradient-to-r ${section.color} rounded-full mx-auto mt-8`} />
                </div>

                {/* Products */}
                <div className="space-y-24">
                    {section.products.map((product, productIndex) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            productIndex={productIndex}
                            isExpanded={expandedProduct === product.id}
                            onToggle={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                            onImageClick={setSelectedImage}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Product Card Component
const ProductCard = ({
    product,
    productIndex,
    isExpanded,
    onToggle,
    onImageClick
}: {
    product: typeof section1Products[0];
    productIndex: number;
    isExpanded: boolean;
    onToggle: () => void;
    onImageClick: (img: string) => void;
}) => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
    const isEven = productIndex % 2 === 0;
    const Icon = product.icon;

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-start ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image Carousel Side */}
                <div
                    className={`${!isEven ? 'lg:col-start-2' : ''} transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : isEven ? '-translate-x-12 opacity-0' : 'translate-x-12 opacity-0'
                        }`}
                >
                    <ImageCarousel
                        images={product.images}
                        onImageClick={onImageClick}
                        color={product.color}
                    />
                </div>

                {/* Content Side */}
                <div
                    className={`${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''} transition-all duration-700`}
                    style={{ transitionDelay: '150ms' }}
                >
                    <div className="space-y-6">
                        {/* Product Number Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r ${product.color} text-white shadow-lg`}>
                            <Icon className="w-5 h-5" />
                            <span className="font-bold">Product {productIndex + 1}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                            {product.title}
                        </h3>

                        {/* Subtitle */}
                        <p className={`text-lg font-semibold bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>
                            {product.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.description}
                        </p>

                        {/* Key Benefits */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Key Benefits</h4>
                            <div className="grid gap-3">
                                {product.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className={`w-6 h-6 rounded-lg bg-gradient-to-r ${product.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-slate-700 font-medium">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Badge */}
                        {'status' in product && product.status && (
                            <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
                                <span className="text-amber-800 font-semibold">{product.status}</span>
                            </div>
                        )}

                        {/* Specifications Button */}
                        {product.specs && (
                            <button
                                onClick={onToggle}
                                className={`flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${product.color} text-white font-bold rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300`}
                            >
                                {isExpanded ? 'Hide Technical Specs' : 'View Technical Specs'}
                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        )}

                        {/* Expanded Specifications */}
                        {product.specs && (
                            <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pt-4">
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 space-y-5">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Gauge className="w-5 h-5" />
                                            <h4 className="text-sm font-bold uppercase tracking-wider">Technical Specifications</h4>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {'capacity' in product.specs && (
                                                <div className="p-4 bg-slate-50 rounded-xl">
                                                    <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Treatment Capacity</div>
                                                    <div className="text-lg font-bold text-slate-800">{product.specs.capacity}</div>
                                                </div>
                                            )}
                                            {'containerized' in product.specs && (
                                                <div className="p-4 bg-slate-50 rounded-xl">
                                                    <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Containerized</div>
                                                    <div className="text-lg font-bold text-slate-800">{product.specs.containerized}</div>
                                                </div>
                                            )}
                                            {'skidMounted' in product.specs && (
                                                <div className="p-4 bg-slate-50 rounded-xl">
                                                    <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Skid Mounted</div>
                                                    <div className="text-lg font-bold text-slate-800">{product.specs.skidMounted}</div>
                                                </div>
                                            )}
                                            {'product' in product.specs && (
                                                <div className="p-4 bg-slate-50 rounded-xl sm:col-span-2">
                                                    <div className="text-xs text-slate-400 uppercase font-semibold mb-1">Product</div>
                                                    <div className="text-base font-bold text-slate-800">{product.specs.product}</div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Timeline */}
                                        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
                                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                                                <Calendar className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm text-slate-600">Introduction: <strong className="text-blue-600">{product.specs.introduction}</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                                                <Zap className="w-4 h-4 text-green-500" />
                                                <span className="text-sm text-slate-600">Latest: <strong className="text-green-600">{product.specs.latestDev}</strong></span>
                                            </div>
                                        </div>

                                        {'achievement' in product.specs && (
                                            <div className={`flex items-center gap-3 px-5 py-4 bg-gradient-to-r ${product.color} rounded-xl text-white`}>
                                                <CheckCircle2 className="w-6 h-6" />
                                                <span className="font-bold">{product.specs.achievement}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
