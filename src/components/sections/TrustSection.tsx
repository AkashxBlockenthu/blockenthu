import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: "$2.5B+", label: "Total Volume" },
    { value: "1M+", label: "Swaps Completed" },
    { value: "15+", label: "Supported Chains" },
    { value: "0.1s", label: "Average Speed" }
  ];

  const chains = [
    { name: "Ethereum", color: "bg-blue-500" },
    { name: "Binance", color: "bg-yellow-500" },
    { name: "Polygon", color: "bg-purple-500" },
    { name: "Avalanche", color: "bg-red-500" },
    { name: "Arbitrum", color: "bg-blue-400" },
    { name: "Optimism", color: "bg-red-400" },
    { name: "Fantom", color: "bg-blue-600" },
    { name: "Solana", color: "bg-green-500" }
  ];

  useEffect(() => {
    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
        end: "bottom 20%"
      },
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });

    gsap.from(".chain-item", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%"
      },
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.2)"
    });

    // Animated counter effect
    gsap.utils.toArray(".stat-number").forEach((element: any) => {
      const text = element.textContent;
      if (text.includes("$") || text.includes("+")) {
        const numValue = parseFloat(text.replace(/[^0-9.]/g, ''));
        const obj = { val: 0 };
        
        gsap.to(obj, {
          scrollTrigger: {
            trigger: element,
            start: "top 80%"
          },
          val: numValue,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            if (text.includes("$") && text.includes("B")) {
              element.textContent = `$${obj.val.toFixed(1)}B+`;
            } else if (text.includes("M")) {
              element.textContent = `${obj.val.toFixed(0)}M+`;
            } else if (text.includes("s")) {
              element.textContent = `${obj.val.toFixed(1)}s`;
            } else {
              element.textContent = `${obj.val.toFixed(0)}+`;
            }
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-spacing bg-card/50">
      <div className="container mx-auto px-4">
        {/* Trust Message */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-lg mb-8">
            Trusted by leading DeFi protocols and traders worldwide
          </p>
          
          {/* Chain Logos */}
          <div className="flex flex-wrap justify-center items-center gap-6">
            {chains.map((chain, index) => (
              <div 
                key={index}
                className={`chain-item w-16 h-16 ${chain.color} rounded-full flex items-center justify-center text-white text-sm font-bold hover:scale-110 transition-transform cursor-pointer`}
              >
                {chain.name.slice(0, 3).toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card glass-card p-8 text-center feature-card relative overflow-hidden"
            >
              <div className="stat-number text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
              
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};