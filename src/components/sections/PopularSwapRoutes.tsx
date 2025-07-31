import { ArrowRight, TrendingUp } from 'lucide-react';

export const PopularSwapRoutes = () => {
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

  const renderRouteCard = (route: typeof allSwapRoutes[0], index: number | string) => (
    <div 
      key={index}
      className="glass-card p-4 hover:scale-105 transition-all duration-300 group cursor-pointer min-w-[280px] mx-3"
    >
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
  );

  return (
    <div className="section-spacing overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(0 85% 35%), hsl(15 90% 45%), hsl(0 80% 50%))', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 4px 20px rgba(220,38,127,0.3)' }}>
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

        {/* First Marquee - Moving Left to Right */}
        <div className="relative overflow-hidden mb-8">
          <div className="flex animate-marquee">
            {/* First set of items */}
            {allSwapRoutes.slice(0, 6).map((route, index) => renderRouteCard(route, index))}
            {/* Duplicate for seamless loop */}
            {allSwapRoutes.slice(0, 6).map((route, index) => renderRouteCard(route, `dup-${index}`))}
          </div>
        </div>

        {/* Second Marquee - Moving Right to Left */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {/* First set of items */}
            {allSwapRoutes.slice(6, 12).map((route, index) => renderRouteCard(route, index))}
            {/* Duplicate for seamless loop */}
            {allSwapRoutes.slice(6, 12).map((route, index) => renderRouteCard(route, `dup-${index}`))}
          </div>
        </div>
      </div>
    </div>
  );
};