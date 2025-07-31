import { ArrowRight, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

export const PopularSwapRoutes = () => {
  const plugin1 = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }));
  const plugin2 = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }));

  const allSwapRoutes = [
    { 
      from: 'ETH', 
      to: 'SOL', 
      fromLogo: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png',
      toLogo: '/lovable-uploads/5cf44c31-f4ea-4e5a-a388-4c5e3bd4df27.png'
    },
    { 
      from: 'BTC', 
      to: 'USDT', 
      fromLogo: '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png',
      toLogo: '/lovable-uploads/25059349-9a59-465c-bafe-884673227826.png'
    },
    { 
      from: 'ETH', 
      to: 'USDC', 
      fromLogo: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png',
      toLogo: '/lovable-uploads/69ac5a8c-c09a-44db-80a2-634be9892276.png'
    },
    { 
      from: 'BNB', 
      to: 'USDT', 
      fromLogo: '/lovable-uploads/0946246b-5cfa-49ab-805f-69cddc2df818.png',
      toLogo: '/lovable-uploads/25059349-9a59-465c-bafe-884673227826.png'
    },
    { 
      from: 'SOL', 
      to: 'USDC', 
      fromLogo: '/lovable-uploads/5cf44c31-f4ea-4e5a-a388-4c5e3bd4df27.png',
      toLogo: '/lovable-uploads/69ac5a8c-c09a-44db-80a2-634be9892276.png'
    },
    { 
      from: 'AVAX', 
      to: 'ETH', 
      fromLogo: '/lovable-uploads/e6b520ec-0c97-4b8f-ba92-9ddf981b8e56.png',
      toLogo: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png'
    },
    { 
      from: 'USDT', 
      to: 'BTC', 
      fromLogo: '/lovable-uploads/25059349-9a59-465c-bafe-884673227826.png',
      toLogo: '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png'
    },
    { 
      from: 'USDC', 
      to: 'ETH', 
      fromLogo: '/lovable-uploads/69ac5a8c-c09a-44db-80a2-634be9892276.png',
      toLogo: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png'
    },
    { 
      from: 'ETH', 
      to: 'BNB', 
      fromLogo: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png',
      toLogo: '/lovable-uploads/0946246b-5cfa-49ab-805f-69cddc2df818.png'
    },
    { 
      from: 'BTC', 
      to: 'SOL', 
      fromLogo: '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png',
      toLogo: '/lovable-uploads/5cf44c31-f4ea-4e5a-a388-4c5e3bd4df27.png'
    },
    { 
      from: 'ADA', 
      to: 'USDT', 
      fromLogo: '/lovable-uploads/386d7be1-da48-434b-8e41-77105e6c3299.png',
      toLogo: '/lovable-uploads/25059349-9a59-465c-bafe-884673227826.png'
    },
    { 
      from: 'DOT', 
      to: 'ETH', 
      fromLogo: '/lovable-uploads/37c33a9c-66a6-4d58-87b5-dbf99e3f9aa1.png',
      toLogo: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png'
    },
  ];

  // Split routes into two groups for different carousels
  const firstRowRoutes = allSwapRoutes.slice(0, 6);
  const secondRowRoutes = allSwapRoutes.slice(6, 12);

  const renderCarouselItem = (route: typeof allSwapRoutes[0], index: number) => (
    <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
      <div className="glass-card p-4 hover:scale-105 transition-all duration-300 group cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={route.fromLogo} 
              alt={route.from} 
              className="w-8 h-8 rounded-full object-cover shadow-lg"
            />
            <div className="text-sm font-medium text-foreground">
              {route.from}
            </div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-foreground">
              {route.to}
            </div>
            <img 
              src={route.toLogo} 
              alt={route.to} 
              className="w-8 h-8 rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
        
        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
      </div>
    </CarouselItem>
  );

  return (
    <div className="section-spacing" style={{ background: 'linear-gradient(135deg, hsl(var(--background)), hsl(var(--background-secondary)))' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-primary" />
            <h2 className="text-3xl lg:text-4xl font-bold">Popular Swap Routes</h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Most traded pairs across our supported networks
          </p>
        </div>

        {/* First Carousel - Moving Right */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin1.current]}
          className="w-full max-w-6xl mx-auto mb-8"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {firstRowRoutes.map((route, index) => renderCarouselItem(route, index))}
          </CarouselContent>
        </Carousel>

        {/* Second Carousel - Moving Left (Opposite Direction) */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: "rtl",
          }}
          plugins={[plugin2.current]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {secondRowRoutes.reverse().map((route, index) => renderCarouselItem(route, index))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};