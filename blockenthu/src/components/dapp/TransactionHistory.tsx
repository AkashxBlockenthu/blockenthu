import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Download, Filter, Info } from 'lucide-react';
import { Transaction } from '@/types/history';

interface HistoryResponse {
  address: string;
  chainId: number;
  transactions: Transaction[];
  totalCount: number;
  message?: string;
  suggestion?: string;
}

export const TransactionHistory = () => {
  const { address, chain } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<'all' | 'swap' | 'bridge'>('all');
  const [historyMessage, setHistoryMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!address || !chain) return;
      
      setIsLoading(true);
      try {
        const response = await api.get<HistoryResponse>(`/history/${address}`, {
          params: {
            chainId: chain.id,
          },
        });
        
        // Handle the new response format
        if (response.data.transactions) {
          setTransactions(response.data.transactions);
        } else {
          setTransactions([]);
        }
        
        // Set any message from the API
        if (response.data.message) {
          setHistoryMessage(response.data.message);
        }
        
      } catch (error) {
        console.error('Failed to fetch transaction history:', error);
        setTransactions([]);
        setHistoryMessage('Failed to load transaction history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [address, chain]);

  const filteredTransactions = transactions.filter(tx => 
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
          {/* Show loading state */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <div className="text-muted-foreground">Loading transaction history...</div>
            </div>
          ) : historyMessage ? (
            /* Show API message if available */
            <div className="text-center py-12">
              <div className="flex items-center justify-center mb-4">
                <Info className="h-8 w-8 text-blue-500 mr-2" />
                <div className="text-lg font-medium">Transaction History</div>
              </div>
              <div className="text-muted-foreground mb-4 max-w-md mx-auto">
                {historyMessage}
              </div>
              <div className="text-sm text-muted-foreground">
                make sure you have some transactions on the network
              </div>
            </div>
          ) : filteredTransactions.length === 0 ? (
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
