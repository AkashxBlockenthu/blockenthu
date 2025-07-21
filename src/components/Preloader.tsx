import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Initial setup
    gsap.set([logoRef.current, textRef.current], { opacity: 0, y: 30 });
    gsap.set(".blockchain-node", { scale: 0, opacity: 0 });

    // Animation sequence
    tl.to([logoRef.current, textRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2
    })
    .to(".blockchain-node", {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.2)"
    }, "-=0.4")
    .to(progressRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
    }, "-=1")
    .to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5
    })
    .to(preloaderRef.current, {
      clipPath: "circle(0% at 50% 50%)",
      duration: 1.2,
      ease: "power4.inOut"
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader grid-pattern">
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Animated Logo */}
        <div ref={logoRef} className="flex items-center space-x-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary-foreground">B</span>
          </div>
          <span className="text-4xl font-bold text-glow">BlockEnthu</span>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-muted/20 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full w-0 progress-gradient rounded-full"
          />
        </div>

        {/* Loading Text */}
        <div ref={textRef} className="text-muted-foreground text-lg">
          Connecting to Multiple Chains...
        </div>

        {/* Blockchain Nodes Animation */}
        <div ref={nodesRef} className="flex space-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="blockchain-node" />
          ))}
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};