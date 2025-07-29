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
  { symbol: 'ETH', name: 'Ethereum', icon: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png', balance: '0.00', price: '$2,341.23' },
  { symbol: 'USDC', name: 'USD Coin', icon: '/lovable-uploads/69ac5a8c-c09a-44db-80a2-634be9892276.png', balance: '0.00', price: '$1.00' },
  { symbol: 'USDT', name: 'Tether', icon: '/lovable-uploads/25059349-9a59-465c-bafe-884673227826.png', balance: '0.00', price: '$1.00' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png', balance: '0.00', price: '$43,521.45' },
  { symbol: 'BNB', name: 'BNB', icon: '/lovable-uploads/0946246b-5cfa-49ab-805f-69cddc2df818.png', balance: '0.00', price: '$312.45' },
  { symbol: 'SOL', name: 'Solana', icon: '/lovable-uploads/5cf44c31-f4ea-4e5a-a388-4c5e3bd4df27.png', balance: '0.00', price: '$98.76' },
  { symbol: 'AVAX', name: 'Avalanche', icon: '/lovable-uploads/e6b520ec-0c97-4b8f-ba92-9ddf981b8e56.png', balance: '0.00', price: '$36.78' },
  { symbol: 'TUSD', name: 'TrueUSD', icon: '/lovable-uploads/37c33a9c-66a6-4d58-87b5-dbf99e3f9aa1.png', balance: '0.00', price: '$1.00' },
];

const recentTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png' },
  { symbol: 'USDC', name: 'USD Coin', icon: '/lovable-uploads/69ac5a8c-c09a-44db-80a2-634be9892276.png' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png' },
];

const favoriteTokens: Token[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '/lovable-uploads/aa3dd11f-114b-4014-8919-88aab10102d4.png' },
  { symbol: 'BTC', name: 'Bitcoin', icon: '/lovable-uploads/b23030ca-eca9-4394-a0d1-2c6bec108d69.png' },
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
            <img src={value.icon} alt={value.symbol} className="w-6 h-6 rounded-full object-cover" />
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
                    <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full object-cover" />
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
                  <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full object-cover" />
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
                  <img src={token.icon} alt={token.symbol} className="w-8 h-8 rounded-full object-cover" />
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