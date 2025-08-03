import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Volume, BarChart3, Activity } from 'lucide-react';
import { ChartDataPoint } from '@/types/chart';

const timeframeToResolution: { [key: string]: string } = {
    '5M': '5m',
    '15M': '15m',
    '1H': '1h',
    '4H': '4h',
    '1D': '1d',
    '1W': '1w',
};

export const TradingView = () => {
  const { chain } = useAccount();
  const [selectedPair, setSelectedPair] = useState('ETH/USDC');
  const [timeframe, setTimeframe] = useState('1H');
  const [chartType, setChartType] = useState<'candlestick' | 'line'>('candlestick');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      if (!chain) return;
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = to - 60 * 60 * 24 * 7; // 7 days ago
        
        console.log('Fetching chart data for timeframe:', timeframe);
        
        const response = await api.get('/chart', {
          params: {
            tokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
            chainId: chain.id,
            from,
            to,
            resolution: timeframeToResolution[timeframe],
          },
        });
        
        console.log('Received chart data:', response.data?.length, 'points');
        
        // Data comes normalized from the backend
        const normalizedData = response.data.map((point: ChartDataPoint) => ({
          ...point,
          time: Number(point.time),
          open: Number(point.open),
          high: Number(point.high),
          low: Number(point.low),
          close: Number(point.close),
          volume: Number(point.volume) || 0,
        }));
        
        setChartData(normalizedData);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
        setChartData([]); // Set empty array on error
      }
    };

    fetchChartData();
  }, [selectedPair, timeframe, chain]);

  const tradingPairs = [
    'ETH/USDC',
    'BTC/USDT',
    'UNI/ETH',
    'WBTC/ETH',
    'LINK/USDC'
  ];

  const timeframes = ['5M', '15M', '1H', '4H', '1D', '1W'];

  const priceData = chartData.length > 0
    ? {
        current: chartData[chartData.length - 1].close,
        change24h: chartData[chartData.length - 1].close - chartData[0].close,
        changePercent24h: ((chartData[chartData.length - 1].close - chartData[0].close) / chartData[0].close) * 100,
        high24h: Math.max(...chartData.map((d) => d.high)),
        low24h: Math.min(...chartData.map((d) => d.low)),
        volume24h: chartData.reduce((sum, d) => sum + (d.volume || 0), 0),
      }
    : {
        current: 0,
        change24h: 0,
        changePercent24h: 0,
        high24h: 0,
        low24h: 0,
        volume24h: 0,
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
          <div className="text-2xl font-bold">${priceData.current.toFixed(4)}</div>
          <div className={`text-sm ${priceData.changePercent24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceData.changePercent24h > 0 ? '+' : ''}{priceData.changePercent24h.toFixed(2)}% 
            (${priceData.change24h > 0 ? '+' : ''}{priceData.change24h.toFixed(4)})
          </div>
        </div>

        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">24h Range</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Low: ${priceData.low24h.toFixed(4)}</span>
              <span>High: ${priceData.high24h.toFixed(4)}</span>
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
          
          <div className="flex items-center gap-4">
            {/* Chart Type Selector */}
            <div className="flex items-center gap-2">
              <Button
                variant={chartType === 'candlestick' ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType('candlestick')}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Candles
              </Button>
              <Button
                variant={chartType === 'line' ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType('line')}
              >
                <Activity className="h-4 w-4 mr-1" />
                Line
              </Button>
            </div>
            
            {/* Timeframe Selector */}
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
        </div>

        {/* Chart Area */}
        <div className="glass-card p-6 h-96">
          {chartData.length > 0 ? (
            <div className="w-full h-full">
              <svg width="100%" height="100%" viewBox="0 0 800 400" className="overflow-visible">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="800" height="400" fill="url(#grid)" />
                
                {/* Y-axis price labels */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                  const price = priceData.low24h + (priceData.high24h - priceData.low24h) * ratio;
                  const y = 400 - (ratio * 380 + 10);
                  return (
                    <g key={ratio}>
                      <line x1="0" y1={y} x2="800" y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
                      <text x="5" y={y - 5} fontSize="10" fill="currentColor" opacity="0.7">
                        ${price.toFixed(4)}
                      </text>
                    </g>
                  );
                })}
                
                {/* Chart Rendering based on type */}
                {chartType === 'candlestick' ? (
                  /* Candlestick Chart */
                  chartData.map((candle, index) => {
                    const candleWidth = Math.max(3, (800 / chartData.length) * 0.7);
                    const centerX = (index + 0.5) * (800 / chartData.length);
                    
                    // Calculate Y positions
                    const openY = 400 - ((candle.open - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20);
                    const closeY = 400 - ((candle.close - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20);
                    const highY = 400 - ((candle.high - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20);
                    const lowY = 400 - ((candle.low - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20);
                    
                    const isBullish = candle.close >= candle.open;
                    const candleColor = isBullish ? "#22c55e" : "#ef4444"; // Green for bullish, red for bearish
                    const bodyHeight = Math.abs(closeY - openY);
                    const bodyTop = Math.min(openY, closeY);
                    
                    return (
                      <g key={index}>
                        {/* High-Low Line (Wick) */}
                        <line
                          x1={centerX}
                          y1={highY}
                          x2={centerX}
                          y2={lowY}
                          stroke={candleColor}
                          strokeWidth="1.5"
                          opacity="0.9"
                        />
                        
                        {/* Candle Body */}
                        <rect
                          x={centerX - candleWidth / 2}
                          y={bodyTop}
                          width={candleWidth}
                          height={Math.max(2, bodyHeight)}
                          fill={isBullish ? "none" : candleColor}
                          stroke={candleColor}
                          strokeWidth="1.5"
                          fillOpacity={isBullish ? "0" : "1"}
                        />
                        
                        {/* Volume bars at bottom */}
                        {candle.volume && (
                          <rect
                            x={centerX - candleWidth / 2}
                            y={370 - (candle.volume / Math.max(...chartData.map(d => d.volume || 0))) * 25}
                            width={candleWidth}
                            height={(candle.volume / Math.max(...chartData.map(d => d.volume || 0))) * 25}
                            fill={candleColor}
                            fillOpacity="0.4"
                          />
                        )}
                      </g>
                    );
                  })
                ) : (
                  /* Line Chart */
                  <g>
                    <path
                      d={`M 0 ${400 - ((chartData[0].close - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20)} ` +
                        chartData
                          .map(
                            (d, i) =>
                              `L ${i * (800 / (chartData.length - 1))} ${
                                400 - ((d.close - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20)
                              }`
                          )
                          .join(' ')}
                      fill="none"
                      stroke="rgb(34, 197, 94)"
                      strokeWidth="2.5"
                      className="drop-shadow-sm"
                    />
                    
                    {/* Price area fill */}
                    <path
                      d={`M 0 380 L 0 ${400 - ((chartData[0].close - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20)} ` +
                        chartData
                          .map(
                            (d, i) =>
                              `L ${i * (800 / (chartData.length - 1))} ${
                                400 - ((d.close - priceData.low24h) / (priceData.high24h - priceData.low24h) * 360 + 20)
                              }`
                          )
                          .join(' ') + ` L 800 380 Z`}
                      fill="url(#priceGradient)"
                      opacity="0.3"
                    />
                    
                    {/* Gradient definition */}
                    <defs>
                      <linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.4"/>
                        <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </g>
                )}
                
                {/* Chart Legend */}
                <g transform="translate(10, 20)">
                  <rect x="0" y="0" width="200" height="60" fill="rgba(0,0,0,0.1)" rx="4"/>
                  <text x="10" y="15" fontSize="12" fill="currentColor" fontWeight="bold">
                    {selectedPair}
                  </text>
                  <text x="10" y="30" fontSize="10" fill="currentColor">
                    O: ${chartData[chartData.length - 1]?.open.toFixed(4)}
                  </text>
                  <text x="10" y="42" fontSize="10" fill="currentColor">
                    H: ${chartData[chartData.length - 1]?.high.toFixed(4)}
                  </text>
                  <text x="10" y="54" fontSize="10" fill="currentColor">
                    L: ${chartData[chartData.length - 1]?.low.toFixed(4)}
                  </text>
                  <text x="100" y="30" fontSize="10" fill="currentColor">
                    C: ${chartData[chartData.length - 1]?.close.toFixed(4)}
                  </text>
                  <text x="100" y="42" fontSize="10" fill="currentColor">
                    Vol: {((chartData[chartData.length - 1]?.volume || 0) / 1000).toFixed(1)}K
                  </text>
                </g>
              </svg>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <h4 className="text-lg font-semibold mb-2">Loading Chart Data...</h4>
                <p className="text-sm text-muted-foreground">Fetching real-time price data</p>
              </div>
            </div>
          )}
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
