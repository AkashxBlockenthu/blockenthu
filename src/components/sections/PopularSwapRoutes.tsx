import { ArrowRight, TrendingUp } from 'lucide-react';

export const PopularSwapRoutes = () => {
  const swapRoutes = [
    { from: 'ETH', to: 'SOL', fromColor: 'bg-blue-500', toColor: 'bg-purple-500' },
    { from: 'BNB', to: 'SOL', fromColor: 'bg-yellow-500', toColor: 'bg-purple-500' },
    { from: 'BERA', to: 'ETH', fromColor: 'bg-orange-500', toColor: 'bg-blue-500' },
    { from: 'ETH', to: 'TON', fromColor: 'bg-blue-500', toColor: 'bg-cyan-500' },
    { from: 'ETH', to: 'BNB', fromColor: 'bg-blue-500', toColor: 'bg-yellow-500' },
    { from: 'TRX', to: 'USDT', fromColor: 'bg-red-500', toColor: 'bg-green-500' },
    { from: 'USDT', to: 'BTC', fromColor: 'bg-green-500', toColor: 'bg-orange-400' },
    { from: 'USDT', to: 'SOL', fromColor: 'bg-green-500', toColor: 'bg-purple-500' },
    { from: 'BNB', to: 'USDT', fromColor: 'bg-yellow-500', toColor: 'bg-green-500' },
    { from: 'USDT', to: 'ETH', fromColor: 'bg-green-500', toColor: 'bg-blue-500' },
    { from: 'ETH', to: 'USDT', fromColor: 'bg-blue-500', toColor: 'bg-green-500' },
    { from: 'WETH', to: 'ETH', fromColor: 'bg-gray-500', toColor: 'bg-blue-500' },
    { from: 'TON', to: 'USDT', fromColor: 'bg-cyan-500', toColor: 'bg-green-500' },
    { from: 'ETH', to: 'USDC', fromColor: 'bg-blue-500', toColor: 'bg-blue-400' },
    { from: 'BTC', to: 'USDT', fromColor: 'bg-orange-400', toColor: 'bg-green-500' },
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
                  <div className={`w-8 h-8 ${route.fromColor} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                    {route.from.slice(0, 2)}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {route.from}
                  </div>
                </div>
                
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-foreground">
                    {route.to}
                  </div>
                  <div className={`w-8 h-8 ${route.toColor} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                    {route.to.slice(0, 2)}
                  </div>
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