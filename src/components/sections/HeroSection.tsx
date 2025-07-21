import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Initial setup
    gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current], {
      opacity: 0,
      y: 60,
      filter: "blur(20px)"
    });

    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100
    });

    // Hero animations
    tl.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out"
    })
    .to(subheadlineRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out"
    }, "-=0.6")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out"
    }, "-=1");

    // Floating chain logos animation
    gsap.to(".chain-logo", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none",
      transformOrigin: "center center"
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden grid-pattern">
      {/* Fullscreen Spline Background */}
      <div ref={splineRef} className="absolute inset-0">
        <iframe
          src="https://my.spline.design/orb-H0Jy0GxlSiGV5ZX2G8tjNlyv/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 
              ref={headlineRef}
              className="text-5xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-glow">Cross-Chain</span>
              <br />
              <span className="text-foreground">Swaps Made</span>
              <br />
              <span className="text-primary">Simple</span>
            </h1>

            <p 
              ref={subheadlineRef}
              className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Bridge assets seamlessly across <span className="text-primary font-semibold">15+ blockchains</span> with the lowest fees and fastest execution times in DeFi.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="glow-button magnetic-btn text-lg px-8 py-4"
              >
                Launch App
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="glass-card text-lg px-8 py-4 hover:bg-white/10"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  );
};