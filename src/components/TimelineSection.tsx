import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Calendar, Award, Globe, Rocket } from 'lucide-react';

export const TimelineSection = () => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

    const milestones = [
        {
            year: '1982',
            icon: Rocket,
            title: 'Company Founded',
            description: 'DEW established with a vision to revolutionize water treatment solutions',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            year: '2000',
            icon: Globe,
            title: 'Global Expansion',
            description: 'Expanded operations to serve clients across multiple continents',
            color: 'from-purple-500 to-pink-500',
        },
        {
            year: '2015',
            icon: Award,
            title: '100+ Projects',
            description: 'Milestone achievement of 100 successfully completed projects',
            color: 'from-green-500 to-emerald-500',
        },
        {
            year: '2025',
            icon: Calendar,
            title: '172+ Projects, 21 Countries',
            description: 'Continuing to lead innovation in water treatment across the globe',
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />

            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our Journey
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Over 40 years of excellence in water treatment engineering
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary hidden md:block" />

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => {
                            const Icon = milestone.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={index}
                                    className={`relative transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                        }`}
                                    style={{ transitionDelay: `${index * 150}ms` }}
                                >
                                    <div className={`flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                                        {/* Content */}
                                        <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                            <div className={`inline-block p-6 rounded-2xl bg-card border-2 border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 ${isEven ? 'md:ml-auto' : 'md:mr-auto'} max-w-md`}>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center`}>
                                                        <Icon className="text-white" size={24} />
                                                    </div>
                                                    <span className="text-3xl font-bold text-primary">{milestone.year}</span>
                                                </div>
                                                <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                                                <p className="text-muted-foreground">{milestone.description}</p>
                                            </div>
                                        </div>

                                        {/* Center dot */}
                                        <div className="hidden md:block relative z-10">
                                            <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${milestone.color} border-4 border-background shadow-lg`} />
                                        </div>

                                        {/* Spacer */}
                                        <div className="flex-1 hidden md:block" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
