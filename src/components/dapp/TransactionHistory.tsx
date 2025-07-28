import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Download, Filter } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'swap' | 'bridge';
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  hash: string;
  gasUsed: string;
  network: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'swap',
    fromToken: 'ETH',
    toToken: 'USDC',
    fromAmount: '1.5',
    toAmount: '3,512.45',
    status: 'completed',
    timestamp: '2024-01-15 14:30:25',
    hash: '0x1234...5678',
    gasUsed: '$12.50',
    network: 'Ethereum'
  },
  {
    id: '2',
    type: 'bridge',
    fromToken: 'USDC',
    toToken: 'USDC',
    fromAmount: '1,000',
    toAmount: '1,000',
    status: 'pending',
    timestamp: '2024-01-15 13:15:10',
    hash: '0x5678...9012',
    gasUsed: '$8.75',
    network: 'Polygon'
  },
  {
    id: '3',
    type: 'swap',
    fromToken: 'WBTC',
    toToken: 'ETH',
    fromAmount: '0.1',
    toAmount: '1.85',
    status: 'completed',
    timestamp: '2024-01-14 16:45:30',
    hash: '0x9012...3456',
    gasUsed: '$15.20',
    network: 'Ethereum'
  },
  {
    id: '4',
    type: 'swap',
    fromToken: 'UNI',
    toToken: 'ETH',
    fromAmount: '50',
    toAmount: '0.15',
    status: 'failed',
    timestamp: '2024-01-14 10:20:15',
    hash: '0x3456...7890',
    gasUsed: '$5.40',
    network: 'Ethereum'
  }
];

export const TransactionHistory = () => {
  const [filter, setFilter] = useState<'all' | 'swap' | 'bridge'>('all');

  const filteredTransactions = mockTransactions.filter(tx => 
    filter === 'all' || tx.type === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const exportTransactions = () => {
    // Mock export functionality
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Type,From,To,Amount,Status,Date,Hash\n" +
      filteredTransactions.map(tx => 
        `${tx.type},${tx.fromToken},${tx.toToken},${tx.fromAmount},${tx.status},${tx.timestamp},${tx.hash}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transaction-history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Transaction History</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={exportTransactions}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="swap">Swaps</TabsTrigger>
          <TabsTrigger value="bridge">Bridges</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4 mt-6">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-2">No transactions found</div>
              <div className="text-sm text-muted-foreground">
                Your transaction history will appear here once you start trading
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="glass-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="capitalize">
                        {tx.type}
                      </Badge>
                      <Badge className={getStatusColor(tx.status)}>
                        {tx.status}
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {tx.timestamp}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {tx.fromAmount} {tx.fromToken}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-semibold">
                        {tx.toAmount} {tx.toToken}
                      </span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      Gas: {tx.gasUsed}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Network:</span>
                      <span>{tx.network}</span>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-primary hover:text-primary/80"
                      onClick={() => window.open(`https://etherscan.io/tx/${tx.hash}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {tx.hash}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};