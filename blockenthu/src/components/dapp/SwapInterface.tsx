import { useState } from 'react';
import { useAccount, useSendTransaction } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NetworkSelector } from './NetworkSelector';
import { TokenSelector } from './TokenSelector';
import { RoutingDisplay } from './RoutingDisplay';
import { TransactionConfirmation } from './TransactionConfirmation';
import { Settings } from './Settings';
import { ArrowDownUp, Settings as SettingsIcon, Zap, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';
import { Token } from '../../types/token';
import { QuoteResponse, SwapResponse, SwapParams, QuoteParams, AdvancedSwapConfig, DEFAULT_SWAP_CONFIG } from '../../types/1inch';

interface SwapInterfaceProps {
  isBridge?: boolean;
}

export const SwapInterface = ({ isBridge = false }: SwapInterfaceProps) => {
  const { address, chain } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const [fromToken, setFromToken] = useState<Token>({ address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', symbol: 'ETH', name: 'Ethereum', icon: '🔷', decimals: 18 });
  const [toToken, setToToken] = useState<Token>({ address: '0x6b175474e89094c44da98b954eedeac495271d0f', symbol: 'DAI', name: 'Dai Stablecoin', icon: '💎', decimals: 18 });
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [fromNetwork, setFromNetwork] = useState('ethereum');
  const [toNetwork, setToNetwork] = useState(isBridge ? 'polygon' : 'ethereum');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [slippage, setSlippage] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [swapConfig, setSwapConfig] = useState<AdvancedSwapConfig>(DEFAULT_SWAP_CONFIG);
  const { toast } = useToast();

  const exchangeRate = quote && fromAmount ? (Number(toAmount) / Number(fromAmount)) : 0;
  const priceImpact = quote ? 0 : 0; // TODO: Calculate price impact
  const gasEstimate = quote ? String(quote.estimatedGas) : '0';

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

  // Build backend-compatible parameters with 1inch configuration
  const buildBackendQuoteParams = (amount: string) => {
    const baseParams = {
      fromTokenAddress: fromToken.address,
      toTokenAddress: toToken.address,
      amount: (Number(amount) * (10 ** fromToken.decimals)).toString(),
      chainId: chain?.id,
      
      // Include 1inch advanced configuration
      slippage: slippage,
      includeTokensInfo: true,
      includeProtocols: true,
      includeGas: true,
      
      // Advanced routing settings
      complexityLevel: swapConfig.complexityLevel,
      gasLimit: swapConfig.gasLimit,
      mainRouteParts: swapConfig.mainRouteParts,
      parts: swapConfig.parts,
      
      // Gas settings
      gasPrice: swapConfig.gasPrice !== 'standard' ? (swapConfig.customGasPrice || 'fast') : 'standard',
      
      // Protocol settings
      excludedProtocols: swapConfig.excludedProtocols.length > 0 ? swapConfig.excludedProtocols.join(',') : undefined,
      
      // Referrer settings
      referrer: swapConfig.referrer || undefined,
      referrerFee: swapConfig.referrerFee > 0 ? swapConfig.referrerFee : undefined,
      
      // Advanced trade settings
      allowPartialFill: swapConfig.allowPartialFill,
      compatibility: swapConfig.compatibility,
      usePermit2: swapConfig.usePermit2,
    };

    // Remove undefined values
    return Object.fromEntries(
      Object.entries(baseParams).filter(([_, value]) => value !== undefined)
    );
  };

  const buildBackendSwapParams = (amount: string) => {
    if (!address) throw new Error('Wallet not connected');

    const baseParams = {
      fromTokenAddress: fromToken.address,
      toTokenAddress: toToken.address,
      amount: (Number(amount) * (10 ** fromToken.decimals)).toString(),
      fromAddress: address,
      slippage: slippage,
      chainId: chain?.id,
      
      // Include 1inch advanced configuration
      includeTokensInfo: true,
      includeProtocols: true,
      
      // Advanced routing settings
      complexityLevel: swapConfig.complexityLevel,
      gasLimit: swapConfig.gasLimit,
      mainRouteParts: swapConfig.mainRouteParts,
      parts: swapConfig.parts,
      
      // Gas settings
      gasPrice: swapConfig.gasPrice !== 'standard' ? (swapConfig.customGasPrice || 'fast') : 'standard',
      
      // Protocol settings
      excludedProtocols: swapConfig.excludedProtocols.length > 0 ? swapConfig.excludedProtocols.join(',') : undefined,
      
      // Referrer settings
      referrer: swapConfig.referrer || undefined,
      referrerFee: swapConfig.referrerFee > 0 ? swapConfig.referrerFee : undefined,
      
      // Advanced trade settings
      allowPartialFill: swapConfig.allowPartialFill,
      compatibility: swapConfig.compatibility,
      usePermit2: swapConfig.usePermit2,
      
      // Compliance
      origin: address, // For KYC/AML compliance
    };

    // Remove undefined values
    return Object.fromEntries(
      Object.entries(baseParams).filter(([_, value]) => value !== undefined)
    );
  };

  const handleFromAmountChange = async (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(Number(value)) && chain) {
      try {
        const url = isBridge ? '/bridge/quote' : '/swap/quote';
        const params = isBridge ? {
          fromTokenAddress: fromToken.address,
          toTokenAddress: toToken.address,
          amount: (Number(value) * (10 ** fromToken.decimals)).toString(),
          chainId: chain.id,
        } : buildBackendQuoteParams(value);

        const response = await api.get(url, { params });
        
        if (isBridge) {
          // Handle Fusion API bridge response
          const bridgeData = response.data;
          const toTokenAmountFormatted = (Number(bridgeData.toTokenAmount) / (10 ** toToken.decimals)).toString();
          setToAmount(toTokenAmountFormatted);
          
          // Create a compatible quote object for bridge responses
          const bridgeQuote = {
            toTokenAmount: bridgeData.toTokenAmount,
            toToken: {
              decimals: toToken.decimals,
              symbol: toToken.symbol,
              name: toToken.name,
              address: toToken.address
            },
            fromToken: {
              decimals: fromToken.decimals,
              symbol: fromToken.symbol,
              name: fromToken.name,
              address: fromToken.address
            },
            estimatedGas: bridgeData.presets?.[bridgeData.recommendedPreset]?.gasCostInfo?.gasPriceEstimate || '0',
            protocols: [],
            marketReturn: bridgeData.marketReturn,
            prices: bridgeData.prices,
            volume: bridgeData.volume,
            // Bridge-specific data
            presets: bridgeData.presets,
            recommendedPreset: bridgeData.recommendedPreset,
            settlementAddress: bridgeData.settlementAddress,
            whitelist: bridgeData.whitelist
          };
          setQuote(bridgeQuote as QuoteResponse);
        } else {
          // Handle regular swap API response
          setToAmount((Number(response.data.toTokenAmount) / (10 ** response.data.toToken.decimals)).toString());
          setQuote(response.data);
        }
      } catch (error) {
        console.error('Failed to get quote:', error);
        setToAmount('');
        setQuote(null);
      }
    } else {
      setToAmount('');
      setQuote(null);
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

    if (!address || !chain) {
        toast({
            title: "Wallet not connected",
            description: "Please connect your wallet to proceed.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    try {
      const url = isBridge ? '/bridge/swap' : '/swap/swap';
      const body = isBridge ? {
        fromTokenAddress: fromToken.address,
        toTokenAddress: toToken.address,
        amount: (Number(fromAmount) * (10 ** fromToken.decimals)).toString(),
        fromAddress: address,
        slippage: slippage,
        chainId: chain.id,
      } : buildBackendSwapParams(fromAmount);

      const { data } = await api.post<SwapResponse>(url, body);

      sendTransaction({
        to: data.tx.to,
        data: data.tx.data,
        value: BigInt(data.tx.value),
      }, {
        onSuccess: () => {
            toast({
                title: 'Transaction Successful!',
                description: `Swapped ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
            });
            setFromAmount('');
            setToAmount('');
        },
        onError: (error) => {
            toast({
                title: 'Transaction Failed',
                description: error.message,
                variant: 'destructive',
            });
        }
      });
    } catch (error) {
      console.error('Failed to execute swap:', error);
      toast({
        title: 'Transaction Failed',
        description: 'Something went wrong while executing the swap.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 space-y-6 max-w-md mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {isBridge ? 'Bridge Assets' : 'Swap Tokens'}
        </h2>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
        >
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Advanced Settings */}
      {showSettings && (
        <Settings 
          config={swapConfig}
          onConfigChange={setSwapConfig}
        />
      )}

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
            {quote && quote.prices && isBridge ? (
              `≈ ${(Number(fromAmount) * Number(quote.prices.usd.fromToken) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
            ) : (
              `≈ ${(Number(fromAmount) * 2341.23 || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
            )}
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
            {quote && quote.prices && isBridge ? (
              `≈ ${(Number(toAmount) * Number(quote.prices.usd.toToken) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
            ) : (
              `≈ ${(Number(toAmount) || 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`
            )}
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      {fromAmount && toAmount && quote && (
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
              <span>
                {isBridge && quote && (quote as any).presets ? 
                  `${(quote as any).presets[(quote as any).recommendedPreset]?.gasCostInfo?.gasPriceEstimate || '0'} Gwei` :
                  gasEstimate
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slippage</span>
              <span>{slippage}%</span>
            </div>
            {isBridge && quote && (quote as any).presets && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Execution Speed</span>
                <span className="capitalize">{(quote as any).recommendedPreset} ({(quote as any).presets[(quote as any).recommendedPreset]?.auctionDuration}s)</span>
              </div>
            )}
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
        disabled={!fromAmount || !toAmount || isLoading || !address}
        className="w-full h-12 text-lg font-semibold glow-button"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
            <>
                {address ? (
                    <>
                        <Zap className="mr-2 h-5 w-5" />
                        {isBridge ? 'Bridge Assets' : 'Swap Tokens'}
                    </>
                ) : (
                    'Connect Wallet'
                )}
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