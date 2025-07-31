import { useState, useEffect } from 'react';
import { Preloader } from './Preloader';
import Navigation from './Navigation';
import { HeroSection } from './sections/HeroSection';
import { TrustSection } from './sections/TrustSection';
import { PopularSwapRoutes } from './sections/PopularSwapRoutes';
import { FeaturesSection } from './sections/FeaturesSection';
import { CTASection } from './sections/CTASection';

export const BlockEnthu = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Short delay to allow preloader to show

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
        <TrustSection />
        <PopularSwapRoutes />
        <div id="features">
          <FeaturesSection />
        </div>
      <CTASection />
      
      {/* Footer */}
      <footer id="about" className="section-spacing border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/b9cc7675-3601-4456-ba44-db88bc5127a4.png" 
                  alt="BlockEnthu Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-muted-foreground">
                The future of cross-chain DeFi, today.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Swap</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Bridge</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Audit Reports</a></li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BlockEnthu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};