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

  const networks = [
    { name: "Ethereum", logo: "/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png" },
    { name: "Bitcoin", logo: "/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png" },
    { name: "BNB Chain", logo: "/lovable-uploads/0946246b-5cfa-49ab-805f-69cddc2df818.png" },
    { name: "Solana", logo: "/lovable-uploads/fc0ea06b-a2ca-40a3-9d5e-b887abb90b1b.png" },
    { name: "Avalanche", logo: "/lovable-uploads/e6b520ec-0c97-4b8f-ba92-9ddf981b8e56.png" },
    { name: "USDT", logo: "/lovable-uploads/25059349-9a59-465c-bafe-884673227826.png" },
    { name: "USDC", logo: "/lovable-uploads/69ac5a8c-c09a-44db-80a2-634be9892276.png" },
    { name: "TrueUSD", logo: "/lovable-uploads/37c33a9c-66a6-4d58-87b5-dbf99e3f9aa1.png" }
  ];

  // Animations disabled per user request

  return (
    <div ref={sectionRef} className="section-spacing bg-card/50">
      <div className="container mx-auto px-4">
        {/* Trust Message */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-lg mb-8">
            Trusted by leading DeFi protocols and traders worldwide
          </p>
          
          {/* Network Marquee */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...networks, ...networks].map((network, index) => (
                <div 
                  key={index}
                  className="inline-flex items-center mx-8 text-lg font-semibold text-primary/80 hover:text-primary transition-colors"
                >
                  <img 
                    src={network.logo} 
                    alt={network.name} 
                    className="w-8 h-8 mr-3 rounded-full object-cover"
                  />
                  {network.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card glass-card p-8 text-center relative overflow-hidden"
            >
              <div className="stat-number text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
              
              {/* Static background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};