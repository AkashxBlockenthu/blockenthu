import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { Token } from '../../types/token';

interface TransactionConfirmationProps {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  exchangeRate: number;
  gasEstimate: string;
  priceImpact: number;
  onConfirm: () => void;
  onCancel: () => void;
  isBridge?: boolean;
}

export const TransactionConfirmation = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  exchangeRate,
  gasEstimate,
  priceImpact,
  onConfirm,
  onCancel,
  isBridge = false
}: TransactionConfirmationProps) => {
  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-md glass-card border-border/50">
        <DialogHeader>
          <DialogTitle>
            Confirm {isBridge ? 'Bridge' : 'Swap'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{fromToken.icon}</span>
                <div>
                  <div className="font-semibold text-lg">{fromAmount}</div>
                  <div className="text-sm text-muted-foreground">{fromToken.symbol}</div>
                </div>
              </div>
              
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-lg">{toAmount}</div>
                  <div className="text-sm text-muted-foreground">{toToken.symbol}</div>
                </div>
                <span className="text-2xl">{toToken.icon}</span>
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                1 {fromToken.symbol} = {exchangeRate.toLocaleString()} {toToken.symbol}
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3">
            <h4 className="font-medium">Transaction Details</h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {isBridge ? 'Bridge Fee' : 'Liquidity Provider Fee'}
                </span>
                <span>0.3%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gas Fee</span>
                <span>{gasEstimate}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price Impact</span>
                <span className={priceImpact > 3 ? 'text-red-500' : 'text-green-500'}>
                  {priceImpact}%
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Minimum Received</span>
                <span>{(Number(toAmount) * 0.995).toFixed(6)} {toToken.symbol}</span>
              </div>

              {isBridge && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Time</span>
                  <span>2-5 minutes</span>
                </div>
              )}
            </div>
          </div>

          {/* Warnings */}
          {priceImpact > 3 && (
            <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-yellow-600">High Price Impact</div>
                <div className="text-yellow-600/80 mt-1">
                  This swap will move the market price significantly. Consider breaking it into smaller trades.
                </div>
              </div>
            </div>
          )}

          {isBridge && (
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm">
              <div className="font-medium text-blue-400">Bridge Notice</div>
              <div className="text-blue-400/80 mt-1">
                Cross-chain transactions are irreversible. Please verify all details before confirming.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            
            <Button
              onClick={onConfirm}
              className="flex-1 glow-button"
            >
              <Zap className="mr-2 h-4 w-4" />
              Confirm {isBridge ? 'Bridge' : 'Swap'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};