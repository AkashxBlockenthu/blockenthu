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
    "Ethereum", "Bitcoin", "BNB Chain (BSC)", "Solana", "Polygon (PoS)", 
    "Arbitrum", "Optimism", "Avalanche", "Base", "Fantom", 
    "zkSync Era", "Linea", "Starknet", "Cardano", "Near Protocol", 
    "Aptos", "Sui", "Cronos", "Klaytn", "Hedera Hashgraph (HBAR)"
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
                  <div className="w-3 h-3 bg-primary rounded-full mr-3 animate-pulse"></div>
                  {network}
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