import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%"
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    });

    gsap.from(visualRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%"
      },
      scale: 0.8,
      opacity: 0,
      duration: 1.5,
      ease: "back.out(1.2)"
    });

    // Particle effects on button hover
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button.querySelectorAll('.particle'), {
          scale: 1.2,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button.querySelectorAll('.particle'), {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05
        });
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="section-spacing relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-purple-500/10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="text-center lg:text-left space-y-8">
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-foreground">Ready to Experience</span>
              <br />
              <span className="text-primary text-glow">Seamless Cross-Chain</span>
              <br />
              <span className="text-foreground">DeFi?</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Join thousands of users bridging the gap between blockchains. Experience the future of decentralized finance today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="cta-button glow-button magnetic-btn text-lg px-8 py-4 relative overflow-hidden group"
              >
                {/* Particle Effects */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div 
                    key={i}
                    className="particle absolute w-2 h-2 bg-white/50 rounded-full opacity-0"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 40}%`
                    }}
                  />
                ))}
                
                Launch App
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="cta-button glass-card text-lg px-8 py-4 hover:bg-white/10 relative overflow-hidden group"
              >
                {/* Particle Effects */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div 
                    key={i}
                    className="particle absolute w-1.5 h-1.5 bg-primary/50 rounded-full opacity-0"
                    style={{
                      left: `${25 + i * 20}%`,
                      top: `${35 + (i % 2) * 30}%`
                    }}
                  />
                ))}
                
                <BookOpen className="mr-2 h-5 w-5" />
                Read Documentation
              </Button>
            </div>

            {/* Features List */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>15+ Supported Chains</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Lowest Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>

          {/* Animated Visual */}
          <div ref={visualRef} className="h-96 lg:h-[500px] relative rounded-2xl overflow-hidden glass-card">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-primary/5" />
            
            {/* Floating Blockchain Cubes */}
            <div className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => {
                const logos = [
                  '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png', // Ethereum
                  '/lovable-uploads/0946246b-5cfa-49ab-805f-69cddc2df818.png', // BNB
                  '/lovable-uploads/5cf44c31-f4ea-4e5a-a388-4c5e3bd4df27.png', // Solana
                  '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png', // Bitcoin
                  '/lovable-uploads/e6b520ec-0c97-4b8f-ba92-9ddf981b8e56.png', // Avalanche
                  '/lovable-uploads/25059349-9a59-465c-bafe-884673227826.png', // USDT
                  '/lovable-uploads/69ac5a8c-c09a-44db-80a2-634be9892276.png', // USDC
                  '/lovable-uploads/37c33a9c-66a6-4d58-87b5-dbf99e3f9aa1.png', // TrueUSD
                ];
                
                return (
                  <div
                    key={i}
                    className="absolute w-12 h-12 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm shadow-lg border border-white/10"
                    style={{
                      left: `${20 + Math.sin(i * 0.8) * 30}%`,
                      top: `${20 + Math.cos(i * 0.8) * 30}%`,
                      animation: `float ${6 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                      transform: 'perspective(500px) rotateX(45deg) rotateY(45deg)'
                    }}
                  >
                    <div className="w-full h-full rounded-lg flex items-center justify-center p-2">
                      <img 
                        src={logos[i]} 
                        alt="Crypto logo" 
                        className="w-8 h-8 object-contain opacity-90"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse" />
              <div className="absolute w-20 h-20 bg-primary/50 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Overlay Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-20" />
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-20 glass-card p-8 rounded-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">&lt;5s</div>
              <div className="text-muted-foreground">Settlement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">0.1%</div>
              <div className="text-muted-foreground">Max Fee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};