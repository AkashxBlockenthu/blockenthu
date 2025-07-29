import { ArrowRight, TrendingUp } from 'lucide-react';

export const PopularSwapRoutes = () => {
  const swapRoutes = [
    { 
      from: 'ETH', 
      to: 'SOL', 
      fromLogo: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png',
      toLogo: '/lovable-uploads/fc0ea06b-a2ca-40a3-9d5e-b887abb90b1b.png'
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
      fromLogo: '/lovable-uploads/fc0ea06b-a2ca-40a3-9d5e-b887abb90b1b.png',
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
      toLogo: '/lovable-uploads/fc0ea06b-a2ca-40a3-9d5e-b887abb90b1b.png'
    },
  ];

  return (
    <div className="section-spacing bg-secondary/30">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {swapRoutes.map((route, index) => (
            <div 
              key={index}
              className="glass-card p-4 hover:scale-105 transition-all duration-300 group cursor-pointer"
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
          ))}
        </div>
      </div>
    </div>
  );
};