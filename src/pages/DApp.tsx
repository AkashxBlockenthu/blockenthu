import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SwapInterface } from '@/components/dapp/SwapInterface';
import { WalletConnect } from '@/components/dapp/WalletConnect';
import { TransactionHistory } from '@/components/dapp/TransactionHistory';
import { Settings } from '@/components/dapp/Settings';
import { TradingView } from '@/components/dapp/TradingView';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftRight, History, Settings as SettingsIcon, TrendingUp, GitBranch } from 'lucide-react';

export default function DApp() {
  const [activeTab, setActiveTab] = useState('swap');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="cursor-pointer">
                <img 
                  src="/lovable-uploads/b9cc7675-3601-4456-ba44-db88bc5127a4.png" 
                  alt="BlockEnthu Logo" 
                  className="h-16 w-auto hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="swap" className="flex items-center gap-2">
                  <ArrowLeftRight className="h-4 w-4" />
                  Swap
                </TabsTrigger>
                <TabsTrigger value="bridge" className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  Bridge
                </TabsTrigger>
                <TabsTrigger value="chart" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Chart
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  History
                </TabsTrigger>
              </TabsList>

              <TabsContent value="swap" className="space-y-4">
                <SwapInterface />
              </TabsContent>

              <TabsContent value="bridge" className="space-y-4">
                <SwapInterface isBridge={true} />
              </TabsContent>

              <TabsContent value="chart" className="space-y-4">
                <TradingView />
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <TransactionHistory />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Settings />
            
            {/* Quick Stats */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-semibold">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETH Price</span>
                  <span className="text-green-500">$2,341.23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas (Gwei)</span>
                  <span>12.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span>$2.5B</span>
                </div>
              </div>
            </div>

            {/* Network Status */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-semibold">Network Status</h3>
              <div className="space-y-3">
                {['Ethereum', 'Polygon', 'BSC', 'Arbitrum'].map((network) => (
                  <div key={network} className="flex items-center justify-between">
                    <span className="text-sm">{network}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-muted-foreground">Operational</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}