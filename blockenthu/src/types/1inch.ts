import { Token } from "./token";

export interface TokenData extends Token {
  logoURI: string;
}

// Comprehensive 1inch API parameters based on official documentation
export interface SwapParams {
  // Required parameters
  src: string;                    // Contract address of token to sell
  dst: string;                    // Contract address of token to buy
  amount: string;                 // Amount in minimal divisible units
  from: string;                   // Seller address
  origin: string;                 // EOA address for compliance (KYC/AML)
  slippage: number;              // Price slippage tolerance (0-50)
  
  // Optional parameters with defaults
  protocols?: string;             // Specify liquidity protocols
  receiver?: string;              // Recipient address (defaults to 'from')
  includeTokensInfo?: boolean;    // Include token info in response (default: false)
  includeProtocols?: boolean;     // Include protocols in response (default: false)
  referrer?: string;              // Referrer's address
  fee?: number;                   // Referrer fee percentage (0-3)
  gasPrice?: string;              // Gas price in wei (default: "fast" from network)
  permit?: string;                // EIP-2612 permit data
  compatibility?: boolean;        // Exclude Unoswap for FoT tokens (default: false)
  excludedProtocols?: string;     // Protocols to exclude
  complexityLevel?: string;       // Token-connectors limit (0-3, default: 2)
  connectorTokens?: string;       // Custom token-connectors (max: 5)
  allowPartialFill?: boolean;     // Allow partial fills (default: true)
  disableEstimate?: boolean;      // Disable checks (default: false)
  gasLimit?: number;              // Max gas for swap (default: 11500000)
  mainRouteParts?: number;        // Max main route parts (default: 20, max: 50)
  parts?: number;                 // Max parts per route (default: 20, max: 100)
  usePermit2?: boolean;           // Use Permit2 for approval
}

// Quote API parameters (subset of swap parameters)
export interface QuoteParams {
  src: string;
  dst: string;
  amount: string;
  protocols?: string;
  fee?: number;
  gasPrice?: string;
  complexityLevel?: string;
  connectorTokens?: string;
  gasLimit?: number;
  mainRouteParts?: number;
  parts?: number;
  includeTokensInfo?: boolean;
  includeProtocols?: boolean;
  includeGas?: boolean;
}

// Advanced configuration settings
export interface AdvancedSwapConfig {
  // Gas settings
  gasPrice: 'slow' | 'standard' | 'fast' | 'custom';
  customGasPrice?: string;
  gasLimit: number;
  
  // Route optimization
  complexityLevel: number;        // 0-3
  mainRouteParts: number;         // 1-50
  parts: number;                  // 1-100
  
  // Protocol settings
  enabledProtocols: string[];
  excludedProtocols: string[];
  connectorTokens: string[];
  
  // Trade settings
  allowPartialFill: boolean;
  compatibility: boolean;         // For fee-on-transfer tokens
  usePermit2: boolean;
  
  // Referrer settings
  referrer?: string;
  referrerFee: number;            // 0-3%
}

// Default configuration constants
export const DEFAULT_SWAP_CONFIG: AdvancedSwapConfig = {
  gasPrice: 'standard',
  gasLimit: 11500000,
  complexityLevel: 2,
  mainRouteParts: 20,
  parts: 20,
  enabledProtocols: [],           // Empty means all protocols
  excludedProtocols: [],
  connectorTokens: [],
  allowPartialFill: true,
  compatibility: false,
  usePermit2: false,
  referrerFee: 0,
};

// Supported networks for different swap types
export const SUPPORTED_NETWORKS = {
  classic: [
    'ethereum', 'arbitrum', 'avalanche', 'bnb', 'gnosis', 
    'sonic', 'optimism', 'polygon', 'zksync', 'base', 'unichain'
  ],
  fusion: [
    'ethereum', 'arbitrum', 'avalanche', 'bnb', 'gnosis', 
    'solana', 'sonic', 'optimism', 'polygon', 'zksync', 'base', 'unichain'
  ],
  fusionPlus: [
    'ethereum', 'arbitrum', 'avalanche', 'bnb', 'gnosis', 
    'sonic', 'optimism', 'polygon', 'base', 'unichain'
  ]
};

// Popular liquidity protocols
export const LIQUIDITY_PROTOCOLS = [
  'WETH', 'CURVE', 'BALANCER', 'UNISWAP_V2', 'UNISWAP_V3',
  'SUSHISWAP', 'AAVE', 'COMPOUND', 'ZRX', 'KYBER',
  'BANCOR', 'ONEINCHLP', 'DODO', 'PMM1'
];

export interface QuoteResponse {
  fromToken: TokenData;
  toToken: TokenData;
  toTokenAmount: string;
  fromTokenAmount: string;
  protocols: Array<any>;
  estimatedGas: number;
  srcToken?: TokenData;
  dstToken?: TokenData;
  fromAmount?: string;
  dstAmount?: string;
}

export interface SwapResponse {
  fromToken: TokenData;
  toToken: TokenData;
  toTokenAmount: string;
  fromTokenAmount: string;
  protocols: Array<any>;
  tx: {
    from: string;
    to: string;
    data: string;
    value: string;
    gasPrice: string;
    gas: number;
  };
  srcToken?: TokenData;
  dstToken?: TokenData;
  fromAmount?: string;
  dstAmount?: string;
}
