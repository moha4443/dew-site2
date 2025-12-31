import { Droplets, Factory, Globe, Award } from 'lucide-react';
import waterConservation from '@/assets/water-conservation.jpg';
import { useState, useEffect, useRef } from 'react';
import { AnimatedNumber } from './AnimatedNumber';

export const FeaturesSection = () => {
  const [statsVisible, setStatsVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [missionVisible, setMissionVisible] = useState(false);

  const statsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === statsRef.current && entry.isIntersecting) {
            setStatsVisible(true);
          }
          if (entry.target === videoRef.current && entry.isIntersecting) {
            setVideoVisible(true);
          }
          if (entry.target === missionRef.current && entry.isIntersecting) {
            setMissionVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    if (videoRef.current) observer.observe(videoRef.current);
    if (missionRef.current) observer.observe(missionRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    {
      icon: Award,
      number: '172+',
      label: 'Projects Completed',
      description: 'Successfully delivered water treatment solutions worldwide',
    },
    {
      icon: Globe,
      number: '21',
      label: 'Countries Served',
      description: 'Global presence across multiple continents',
    },
    {
      icon: Factory,
      number: '6000',
      label: 'M² Fabrication',
      description: 'State-of-the-art manufacturing facilities',
    },
    {
      icon: Droplets,
      number: '99.9%',
      label: 'System Uptime',
      description: 'Proven reliability and performance',
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-accent font-semibold text-sm tracking-wider uppercase mb-4">
            PROVEN EXCELLENCE
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Complete Water Treatment Solutions
          </h2>
          <p className="text-xl text-muted-foreground">
            From desalination to wastewater treatment, we deliver reliable, scalable solutions backed by decades of engineering expertise
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card hover:bg-muted transition-all duration-300 hover:shadow-xl border border-border text-center"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 inline-block p-4 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                <stat.icon size={32} />
              </div>
              <AnimatedNumber
                value={stat.number}
                shouldAnimate={statsVisible}
                className="text-4xl font-bold text-primary mb-2"
              />
              <h3 className="text-lg font-bold mb-2">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Video Section */}
        <div
          ref={videoRef}
          className={`mb-20 transition-all duration-700 ${videoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              See Our Solutions in Action
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how DEW delivers innovative water treatment systems across diverse industries and challenging environments
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-black max-w-5xl mx-auto">
            <video
              src="/video.mov"
              className="w-full h-full object-cover"
              controls
              playsInline
            />
          </div>
        </div>

        {/* Mission Section */}
        <div
          ref={missionRef}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
        >
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Engineering Water Solutions for a Sustainable Future
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At DEW, we combine proven engineering expertise with innovative technology to deliver water treatment solutions that meet the real-world challenges of industry, agriculture, and communities.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our comprehensive approach covers everything from initial design and fabrication to installation, commissioning, and ongoing operation & maintenance. With 6000 m² of fabrication facilities and a track record of 172+ successful projects across 21 countries, we have the capacity and experience to handle projects of any scale.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Desalination Systems</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Wastewater Treatment</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Industrial Water Solutions</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>Mobile Treatment Units</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-3" />
            <img
              src={waterConservation}
              alt="Water treatment facility"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
