import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, TrendingUp, Shield, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Zap,
      title: "Lightning-Fast Swaps",
      description: "Execute cross-chain swaps in seconds with our optimized routing engine and advanced liquidity aggregation.",
      visual: "⚡"
    },
    {
      icon: TrendingUp,
      title: "Best Rates Guaranteed",
      description: "Our intelligent aggregator scans all DEXs and bridges to find you the most competitive rates every time.",
      visual: "📈"
    },
    {
      icon: Shield,
      title: "Maximum Security",
      description: "Audited smart contracts and non-custodial architecture ensure your funds remain safe and under your control.",
      visual: "🛡️"
    }
  ];

  useEffect(() => {
    gsap.from(".feature-card", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%"
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Icon rotation on scroll
    gsap.to(".feature-icon", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      },
      rotation: 360,
      duration: 2,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-spacing">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Swap</span>{" "}
            <span className="text-primary text-glow">Smarter</span>,{" "}
            <span className="text-foreground">Not Harder</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of DeFi with features designed for both beginners and advanced traders.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="feature-card glass-card p-8 text-center relative overflow-hidden group cursor-pointer"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="feature-icon w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4">
                    <IconComponent className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="text-4xl">{feature.visual}</div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Learn More Link */}
                  <div className="inline-flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>

                {/* Animated Particles */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary/30 rounded-full animate-ping"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                        animationDelay: `${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Flow Diagram */}
        <div className="mt-20 text-center">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-foreground">How It All Works Together</h3>
            
            <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
              {/* Step 1 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <p className="text-sm text-muted-foreground">Fast Execution</p>
              </div>

              <ArrowRight className="w-8 h-8 text-primary/50 rotate-90 md:rotate-0" />

              {/* Step 2 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📈</span>
                </div>
                <p className="text-sm text-muted-foreground">Best Rates</p>
              </div>

              <ArrowRight className="w-8 h-8 text-primary/50 rotate-90 md:rotate-0" />

              {/* Step 3 */}
              <div className="flex-1 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <p className="text-sm text-muted-foreground">Secure Transfer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};