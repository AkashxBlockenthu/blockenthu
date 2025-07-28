import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDown, Search, Star, Clock } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance?: string;
  price?: string;
  address?: string;
}

const popularTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷', balance: '0.00', price: '$2,341.23' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💎', balance: '0.00', price: '$1.00' },
  { symbol: 'USDT', name: 'Tether', icon: '💚', balance: '0.00', price: '$1.00' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '🟠', balance: '0.00', price: '$43,521.45' },
  { symbol: 'UNI', name: 'Uniswap', icon: '🦄', balance: '0.00', price: '$7.23' },
  { symbol: 'WETH', name: 'Wrapped Ether', icon: '🔷', balance: '0.00', price: '$2,341.23' },
  { symbol: 'BNB', name: 'BNB', icon: '🟡', balance: '0.00', price: '$312.45' },
  { symbol: 'SOL', name: 'Solana', icon: '🟢', balance: '0.00', price: '$98.76' },
  { symbol: 'MATIC', name: 'Polygon', icon: '🟣', balance: '0.00', price: '$0.85' },
  { symbol: 'AVAX', name: 'Avalanche', icon: '⛰️', balance: '0.00', price: '$36.78' },
];

const recentTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💎' },
  { symbol: 'UNI', name: 'Uniswap', icon: '🦄' },
];

const favoriteTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', icon: '🟠' },
];

interface TokenSelectorProps {
  value: Token;
  onChange: (token: Token) => void;
  network: string;
}

export const TokenSelector = ({ value, onChange, network }: TokenSelectorProps) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [customAddress, setCustomAddress] = useState('');

  const filteredTokens = popularTokens.filter(token =>
    token.symbol.toLowerCase().includes(search.toLowerCase()) ||
    token.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onChange(token);
    setOpen(false);
  };

  const handleCustomTokenImport = () => {
    if (customAddress) {
      const customToken: Token = {
        symbol: 'CUSTOM',
        name: 'Custom Token',
        icon: '❓',
        address: customAddress
      };
      onChange(customToken);
      setOpen(false);
      setCustomAddress('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="glass-card px-4 py-2 h-auto">
          <div className="flex items-center gap-2">
            <span className="text-xl">{value.icon}</span>
            <span className="font-semibold">{value.symbol}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md glass-card border-border/50">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tokens or paste address"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                Favorites
              </TabsTrigger>
            </TabsList>

            <TabsContent value="popular" className="space-y-2 max-h-60 overflow-y-auto">
              {filteredTokens.map((token) => (
                <div
                  key={token.symbol}
                  onClick={() => handleTokenSelect(token)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{token.icon}</span>
                    <div>
                      <div className="font-semibold">{token.symbol}</div>
                      <div className="text-sm text-muted-foreground">{token.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{token.balance}</div>
                    <div className="text-sm text-muted-foreground">{token.price}</div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-2">
              {recentTokens.map((token) => (
                <div
                  key={token.symbol}
                  onClick={() => handleTokenSelect(token)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <span className="text-xl">{token.icon}</span>
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.name}</div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="favorites" className="space-y-2">
              {favoriteTokens.map((token) => (
                <div
                  key={token.symbol}
                  onClick={() => handleTokenSelect(token)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <span className="text-xl">{token.icon}</span>
                  <div>
                    <div className="font-semibold">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.name}</div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {/* Custom Token Import */}
          <div className="space-y-3 border-t border-border/50 pt-4">
            <h4 className="text-sm font-medium">Import Custom Token</h4>
            <div className="flex gap-2">
              <Input
                placeholder="Paste token contract address"
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleCustomTokenImport}
                disabled={!customAddress}
                size="sm"
              >
                Import
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};