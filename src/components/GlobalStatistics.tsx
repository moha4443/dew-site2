import { useEffect, useRef, useState } from 'react';
import { Building2, Globe, Droplet, Factory, MapPin } from 'lucide-react';
import { projectsData } from '../projectsData';

// Helper function to calculate statistics
const getProjectStatistics = () => {
    const countries = new Set(projectsData.map(p => p.country));
    const totalCapacity = projectsData.reduce((sum, p) => {
        const capacity = parseFloat(p.capacity.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(capacity) ? 0 : capacity);
    }, 0);

    return {
        totalProjects: projectsData.length,
        totalCountries: countries.size,
        totalCapacity: Math.round(totalCapacity).toLocaleString(),
        offices: 3, // Static value
        factories: 1  // Static value
    };
};

export const GlobalStatistics = () => {
    const [shouldCount, setShouldCount] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);
    const stats = getProjectStatistics();

    useEffect(() => {
        const element = statsRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldCount(true);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={statsRef} className="w-full mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard
                    icon={<Building2 className="w-8 h-8" />}
                    end={stats.totalProjects}
                    label="Projects Completed"
                    suffix=""
                    shouldAnimate={shouldCount}
                    delay={0}
                    gradient="from-blue-500 to-cyan-500"
                />
                <StatCard
                    icon={<Globe className="w-8 h-8" />}
                    end={stats.totalCountries}
                    label="Countries Served"
                    suffix=""
                    shouldAnimate={shouldCount}
                    delay={100}
                    gradient="from-purple-500 to-pink-500"
                />
                <StatCard
                    icon={<Droplet className="w-8 h-8" />}
                    end={parseInt(stats.totalCapacity.replace(/,/g, ''))}
                    label="Total Capacity (m³/day)"
                    suffix=""
                    shouldAnimate={shouldCount}
                    delay={200}
                    gradient="from-cyan-500 to-blue-500"
                    formatNumber={true}
                />
                <StatCard
                    icon={<MapPin className="w-8 h-8" />}
                    end={stats.offices}
                    label="Offices & Sales Points"
                    suffix=""
                    shouldAnimate={shouldCount}
                    delay={300}
                    gradient="from-green-500 to-emerald-500"
                />
                <StatCard
                    icon={<Factory className="w-8 h-8" />}
                    end={stats.factories}
                    label="Manufacturing Facilities"
                    suffix=""
                    shouldAnimate={shouldCount}
                    delay={400}
                    gradient="from-orange-500 to-red-500"
                />
            </div>
        </section>
    );
};

interface StatCardProps {
    icon: React.ReactNode;
    end: number;
    label: string;
    suffix: string;
    shouldAnimate: boolean;
    delay: number;
    gradient: string;
    formatNumber?: boolean;
}

const StatCard = ({
    icon,
    end,
    label,
    suffix,
    shouldAnimate,
    delay,
    gradient,
    formatNumber = false
}: StatCardProps) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!shouldAnimate || hasAnimated.current) return;
        hasAnimated.current = true;

        const timeout = setTimeout(() => {
            const duration = 2500;
            const startTime = Date.now();

            const animate = () => {
                const currentTime = Date.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentCount = Math.floor(end * easeOutQuart);

                setCount(currentCount);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timeout);
    }, [shouldAnimate, end, delay]);

    const formatDisplayNumber = (num: number) => {
        if (!formatNumber) return num.toString();
        return num.toLocaleString();
    };

    return (
        <div
            className={`relative group glass rounded-3xl p-6 hover-lift perspective-container overflow-hidden ${shouldAnimate ? 'animate-bounce-in' : 'opacity-0'
                }`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>

            {/* Number */}
            <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
                {formatDisplayNumber(count)}
                {suffix}
            </div>

            {/* Label */}
            <div className="text-sm md:text-base text-muted-foreground font-medium leading-tight">
                {label}
            </div>

            {/* Decorative Element */}
            <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-300`} />
        </div>
    );
};
