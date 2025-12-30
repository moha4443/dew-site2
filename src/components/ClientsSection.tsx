import { useScrollReveal } from '@/hooks/useScrollReveal';

export const ClientsSection = () => {
    const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

    // You can replace these with actual client logos
    const clients = [
        { name: 'Client 1', logo: '/placeholder-logo.png' },
        { name: 'Client 2', logo: '/placeholder-logo.png' },
        { name: 'Client 3', logo: '/placeholder-logo.png' },
        { name: 'Client 4', logo: '/placeholder-logo.png' },
        { name: 'Client 5', logo: '/placeholder-logo.png' },
        { name: 'Client 6', logo: '/placeholder-logo.png' },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
                <div
                    ref={ref}
                    className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We've delivered successful water treatment solutions for leading companies across 21 countries
                    </p>
                </div>

                <div
                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    {clients.map((client, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0"
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <div className="text-center">
                                <div className="w-20 h-20 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-primary">
                                        {client.name.charAt(0)}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground font-medium">{client.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className={`mt-12 text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                        }`}
                >
                    <p className="text-sm text-muted-foreground">
                        And many more companies worldwide trust DEW for their water treatment needs
                    </p>
                </div>
            </div>
        </section>
    );
};
