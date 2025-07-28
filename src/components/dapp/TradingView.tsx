import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Volume, BarChart3 } from 'lucide-react';

export const TradingView = () => {
  const [selectedPair, setSelectedPair] = useState('ETH/USDC');
  const [timeframe, setTimeframe] = useState('1H');

  const tradingPairs = [
    'ETH/USDC',
    'BTC/USDT',
    'UNI/ETH',
    'WBTC/ETH',
    'LINK/USDC'
  ];

  const timeframes = ['5M', '15M', '1H', '4H', '1D', '1W'];

  // Mock data for demonstration
  const priceData = {
    current: 2341.23,
    change24h: 5.67,
    changePercent24h: 2.43,
    high24h: 2387.45,
    low24h: 2298.12,
    volume24h: 142500000
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Trading View</h2>
        
        <div className="flex items-center gap-4">
          <Select value={selectedPair} onValueChange={setSelectedPair}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tradingPairs.map((pair) => (
                <SelectItem key={pair} value={pair}>
                  {pair}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Current Price</span>
          </div>
          <div className="text-2xl font-bold">${priceData.current.toLocaleString()}</div>
          <div className={`text-sm ${priceData.changePercent24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceData.changePercent24h > 0 ? '+' : ''}{priceData.changePercent24h}% 
            (${priceData.change24h > 0 ? '+' : ''}{priceData.change24h.toFixed(2)})
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">24h Range</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Low: ${priceData.low24h.toLocaleString()}</span>
              <span>High: ${priceData.high24h.toLocaleString()}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ 
                  width: `${((priceData.current - priceData.low24h) / (priceData.high24h - priceData.low24h)) * 100}%` 
                }}
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Volume className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-muted-foreground">24h Volume</span>
          </div>
          <div className="text-2xl font-bold">
            ${(priceData.volume24h / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-muted-foreground">
            {(priceData.volume24h / priceData.current).toFixed(0)} {selectedPair.split('/')[0]}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Price Chart</h3>
          
          <div className="flex items-center gap-2">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        {/* Mock Chart Area */}
        <div className="glass-card p-6 h-96 flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-semibold mb-2">Chart Coming Soon</h4>
            <p className="text-muted-foreground">
              Interactive price charts with technical indicators will be available here
            </p>
          </div>
        </div>
      </div>

      {/* Market Data Tabs */}
      <Tabs defaultValue="orderbook" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="markets">All Markets</TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook" className="space-y-4">
          <div className="glass-card p-4">
            <div className="text-center text-muted-foreground">
              Order book data will be displayed here
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trades" className="space-y-4">
          <div className="glass-card p-4">
            <div className="text-center text-muted-foreground">
              Recent trades data will be displayed here
            </div>
          </div>
        </TabsContent>

        <TabsContent value="markets" className="space-y-4">
          <div className="glass-card p-4">
            <div className="text-center text-muted-foreground">
              All markets data will be displayed here
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};