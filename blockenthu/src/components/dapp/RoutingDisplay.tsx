import { ArrowRight, Zap } from 'lucide-react';

interface RoutingDisplayProps {
  fromToken: string;
  toToken: string;
}

export const RoutingDisplay = ({ fromToken, toToken }: RoutingDisplayProps) => {
  // Mock routing data
  const routes = [
    { dex: 'Uniswap V3', percentage: 60, fee: '0.3%' },
    { dex: 'SushiSwap', percentage: 25, fee: '0.25%' },
    { dex: 'Balancer', percentage: 15, fee: '0.3%' }
  ];

  return (
    <div className="glass-card p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Zap className="h-4 w-4 text-primary" />
        Optimal Route
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{fromToken}</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{toToken}</span>
        </div>

        <div className="space-y-2">
          {routes.map((route, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div 
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${route.percentage}%`, maxWidth: '60px' }}
                />
                <span className="text-muted-foreground">{route.dex}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{route.percentage}%</span>
                <span className="text-muted-foreground">{route.fee}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        This route optimizes for the best price with minimal slippage
      </div>
    </div>
  );
};