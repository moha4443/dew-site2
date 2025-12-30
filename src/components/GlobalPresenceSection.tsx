import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MapPin } from 'lucide-react';

export const GlobalPresenceSection = () => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

    const regions = [
        {
            name: 'Middle East & North Africa',
            countries: 12,
            projects: 98,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            name: 'Europe',
            countries: 5,
            projects: 42,
            color: 'from-purple-500 to-pink-500',
        },
        {
            name: 'Sub-Saharan Africa',
            countries: 3,
            projects: 22,
            color: 'from-green-500 to-emerald-500',
        },
        {
            name: 'Asia Pacific',
            countries: 1,
            projects: 10,
            color: 'from-orange-500 to-red-500',
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
            <div className="container mx-auto px-4 lg:px-8">
                <div
                    ref={ref}
                    className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Global Presence
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Delivering water treatment excellence across 21 countries and 4 continents
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {regions.map((region, index) => (
                        <div
                            key={index}
                            className={`group p-6 rounded-2xl bg-card border-2 border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${region.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <MapPin className="text-white" size={24} />
                            </div>
                            <h3 className="text-lg font-bold mb-3">{region.name}</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Countries</span>
                                    <span className="text-xl font-bold text-primary">{region.countries}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Projects</span>
                                    <span className="text-xl font-bold text-accent">{region.projects}</span>
                                </div>
                            </div>
                            <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${region.color}`} />
                        </div>
                    ))}
                </div>

                <div
                    className={`mt-16 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <div className="inline-flex items-center gap-8 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border-2 border-primary/20">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary mb-2">21</div>
                            <div className="text-sm text-muted-foreground">Countries</div>
                        </div>
                        <div className="w-px h-16 bg-border" />
                        <div className="text-center">
                            <div className="text-5xl font-bold text-accent mb-2">172+</div>
                            <div className="text-sm text-muted-foreground">Projects</div>
                        </div>
                        <div className="w-px h-16 bg-border" />
                        <div className="text-center">
                            <div className="text-5xl font-bold text-primary mb-2">4</div>
                            <div className="text-sm text-muted-foreground">Continents</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
