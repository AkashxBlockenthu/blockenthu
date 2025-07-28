import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NetworkSelector } from './NetworkSelector';
import { TokenSelector } from './TokenSelector';
import { RoutingDisplay } from './RoutingDisplay';
import { TransactionConfirmation } from './TransactionConfirmation';
import { ArrowDownUp, Settings, Zap, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SwapInterfaceProps {
  isBridge?: boolean;
}

export const SwapInterface = ({ isBridge = false }: SwapInterfaceProps) => {
  const [fromToken, setFromToken] = useState({ symbol: 'ETH', name: 'Ethereum', icon: '🔷' });
  const [toToken, setToToken] = useState({ symbol: 'USDC', name: 'USD Coin', icon: '💎' });
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromNetwork, setFromNetwork] = useState('ethereum');
  const [toNetwork, setToNetwork] = useState(isBridge ? 'polygon' : 'ethereum');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const exchangeRate = 2341.23; // Mock exchange rate
  const priceImpact = 0.12; // Mock price impact
  const gasEstimate = '$12.50'; // Mock gas estimate

  const handleSwapDirection = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
    if (isBridge) {
      setFromNetwork(toNetwork);
      setToNetwork(fromNetwork);
    }
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(Number(value))) {
      const calculated = (Number(value) * exchangeRate).toFixed(6);
      setToAmount(calculated);
    } else {
      setToAmount('');
    }
  };

  const handleSwap = () => {
    if (!fromAmount || !toAmount) {
      toast({
        title: "Error",
        description: "Please enter an amount to swap",
        variant: "destructive",
      });
      return;
    }
    setShowConfirmation(true);
  };

  const confirmTransaction = async () => {
    setIsLoading(true);
    setShowConfirmation(false);
    
    // Simulate transaction
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Transaction Successful!",
        description: `Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
      });
      setFromAmount('');
      setToAmount('');
    }, 3000);
  };

  return (
    <div className="glass-card p-6 space-y-6 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isBridge ? 'Bridge Assets' : 'Swap Tokens'}
        </h2>
        <Button variant="ghost" size="sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* From Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>You pay</span>
          <span>Balance: $0.00</span>
        </div>
        
        {isBridge && (
          <NetworkSelector 
            value={fromNetwork} 
            onChange={setFromNetwork}
            label="From Network"
          />
        )}

        <div className="glass-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="border-0 bg-transparent text-2xl font-semibold p-0 h-auto"
            />
            <TokenSelector
              value={fromToken}
              onChange={setFromToken}
              network={fromNetwork}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            ≈ ${(Number(fromAmount) * 2341.23 || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Swap Direction Button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSwapDirection}
          className="rounded-full w-10 h-10 p-0 hover:rotate-180 transition-transform duration-300"
        >
          <ArrowDownUp className="h-4 w-4" />
        </Button>
      </div>

      {/* To Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>You receive</span>
          <span>Balance: $0.00</span>
        </div>

        {isBridge && (
          <NetworkSelector 
            value={toNetwork} 
            onChange={setToNetwork}
            label="To Network"
          />
        )}

        <div className="glass-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="border-0 bg-transparent text-2xl font-semibold p-0 h-auto"
            />
            <TokenSelector
              value={toToken}
              onChange={setToToken}
              network={toNetwork}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            ≈ ${(Number(toAmount) || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      {fromAmount && toAmount && (
        <div className="space-y-3">
          <div className="glass-card p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span>1 {fromToken.symbol} = {exchangeRate.toLocaleString()} {toToken.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={priceImpact > 3 ? 'text-red-500' : 'text-green-500'}>
                {priceImpact}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gas Fee</span>
              <span>{gasEstimate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slippage</span>
              <span>{slippage}%</span>
            </div>
          </div>

          {priceImpact > 3 && (
            <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-yellow-600">High price impact warning</span>
            </div>
          )}

          <RoutingDisplay fromToken={fromToken.symbol} toToken={toToken.symbol} />
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={handleSwap}
        disabled={!fromAmount || !toAmount || isLoading}
        className="w-full h-12 text-lg font-semibold glow-button"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          <>
            <Zap className="mr-2 h-5 w-5" />
            {isBridge ? 'Bridge Assets' : 'Swap Tokens'}
          </>
        )}
      </Button>

      {/* Transaction Confirmation Modal */}
      {showConfirmation && (
        <TransactionConfirmation
          fromToken={fromToken}
          toToken={toToken}
          fromAmount={fromAmount}
          toAmount={toAmount}
          exchangeRate={exchangeRate}
          gasEstimate={gasEstimate}
          priceImpact={priceImpact}
          onConfirm={confirmTransaction}
          onCancel={() => setShowConfirmation(false)}
          isBridge={isBridge}
        />
      )}
    </div>
  );
};