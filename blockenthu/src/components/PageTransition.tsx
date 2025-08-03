import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isTransitioning) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <img 
            src="/lovable-uploads/b9cc7675-3601-4456-ba44-db88bc5127a4.png" 
            alt="BlockEnthu Logo" 
            className="h-20 w-auto animate-pulse"
          />
          <div className="w-32 h-1 bg-muted/20 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};