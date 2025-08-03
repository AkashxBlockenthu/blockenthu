import { Request, Response } from 'express';
import { FusionSDK, NetworkEnum, PrivateKeyProviderConnector, Web3Like } from '@1inch/fusion-sdk';
import { JsonRpcProvider } from 'ethers';

const DEV_PORTAL_API_TOKEN = 'dIwJMkiQDczcNnDRH0omIJnddPdwLsX4';
const NODE_URL =  'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';
// For quote-only operations, we can use a placeholder private key since we don't actually sign transactions
const PLACEHOLDER_PRIVATE_KEY = process.env.PRIVATE_KEY || '0x1000000000000000000000000000000000000000000000000000000000000000';

// Native token address constants
const NATIVE_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

// Wrapped token addresses for different chains
const WRAPPED_TOKENS: { [chainId: number]: string } = {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',    // WETH on Ethereum
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',   // WBNB on BSC
    137: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',  // WMATIC on Polygon
};

const convertNativeToWrapped = (tokenAddress: string, chainId: number): string => {
    if (tokenAddress.toLowerCase() === NATIVE_TOKEN_ADDRESS.toLowerCase()) {
        const wrappedToken = WRAPPED_TOKENS[chainId];
        if (!wrappedToken) {
            throw new Error(`Wrapped token not found for chain ${chainId}`);
        }
        return wrappedToken;
    }
    return tokenAddress;
};

const getSdk = (chainId: number) => {
    const networkMap: { [key: number]: NetworkEnum } = {
        1: NetworkEnum.ETHEREUM,
        56: NetworkEnum.BINANCE,
        137: NetworkEnum.POLYGON,
    };

    const network = networkMap[chainId];

    if (!network) {
        throw new Error(`Unsupported network: ${chainId}. Supported networks: ${Object.keys(networkMap).join(', ')}`);
    }

    // Create ethers RPC provider
    const ethersRpcProvider = new JsonRpcProvider(NODE_URL);

    // Create Web3Like interface
    const ethersProviderConnector: Web3Like = {
        eth: {
            call(transactionConfig): Promise<string> {
                return ethersRpcProvider.call(transactionConfig);
            }
        },
        extend(): void {}
    };

    // Create PrivateKeyProviderConnector
    const connector = new PrivateKeyProviderConnector(
        PLACEHOLDER_PRIVATE_KEY,
        ethersProviderConnector
    );

    console.log('Initializing Fusion SDK with:', {
        url: 'https://api.1inch.dev/fusion',
        network: network,
        authKey: DEV_PORTAL_API_TOKEN?.substring(0, 10) + '...',
        nodeUrl: NODE_URL
    });

    return new FusionSDK({
        url: 'https://api.1inch.dev/fusion',
        network: network,
        blockchainProvider: connector,
        authKey: DEV_PORTAL_API_TOKEN,
    });
}

export const getBridgeQuote = async (req: Request, res: Response) => {
    const { fromTokenAddress, toTokenAddress, amount, chainId } = req.query;

    if (!fromTokenAddress || !toTokenAddress || !amount || !chainId) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const chainIdNum = Number(chainId);
        
        // Debug: Log the API token being used
        console.log('API Token being used:', DEV_PORTAL_API_TOKEN?.substring(0, 20) + '...');
        console.log('Using environment variables:', {
            DEV_PORTAL_API_TOKEN: !!process.env.DEV_PORTAL_API_TOKEN,
            INCH_API_KEY: !!process.env.INCH_API_KEY
        });
        
        // Convert native tokens to wrapped tokens
        const wrappedFromToken = convertNativeToWrapped(fromTokenAddress as string, chainIdNum);
        const wrappedToToken = convertNativeToWrapped(toTokenAddress as string, chainIdNum);
        
        console.log('Making bridge quote request for:', { 
            originalFrom: fromTokenAddress, 
            wrappedFrom: wrappedFromToken,
            originalTo: toTokenAddress,
            wrappedTo: wrappedToToken,
            amount, 
            chainId: chainIdNum 
        });
        
        // Use Fusion SDK for quote requests
        
        const sdk = getSdk(chainIdNum);
        const params = {
            fromTokenAddress: wrappedFromToken,
            toTokenAddress: wrappedToToken,
            amount: amount as string,
        };
        
        const quote = await sdk.getQuote(params);
        
        // Convert BigInt values to strings for JSON serialization
        const serializedQuote = JSON.parse(JSON.stringify(quote, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
        
        return res.json(serializedQuote);
    } catch (error: any) {
        console.error('1inch Fusion API Error:', error.response?.data || error.message);
        
        if (error.response?.data) {
            return res.status(error.response.status || 500).json({ 
                error: '1inch Fusion API Error', 
                details: error.response.data 
            });
        }
        return res.status(500).json({ error: 'Failed to get bridge quote', details: error.message });
    }
};

export const swap = async (req: Request, res: Response) => {
    const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage, chainId } = req.body;

    if (!fromTokenAddress || !toTokenAddress || !amount || !fromAddress || !chainId) {
        return res.status(400).json({ error: 'Missing required body parameters' });
    }

    try {
        const chainIdNum = Number(chainId);
        
        // Convert native tokens to wrapped tokens
        const wrappedFromToken = convertNativeToWrapped(fromTokenAddress, chainIdNum);
        const wrappedToToken = convertNativeToWrapped(toTokenAddress, chainIdNum);
        
        console.log('Making bridge swap request for:', { 
            originalFrom: fromTokenAddress, 
            wrappedFrom: wrappedFromToken,
            originalTo: toTokenAddress,
            wrappedTo: wrappedToToken,
            amount, 
            fromAddress,
            chainId: chainIdNum 
        });
        
        const sdk = getSdk(chainIdNum);
        const params = {
            fromTokenAddress: wrappedFromToken,
            toTokenAddress: wrappedToToken,
            amount: amount,
            walletAddress: fromAddress,
            ...(slippage && { slippage: slippage })
        };

        const order = await sdk.createOrder(params);
        
        // Convert BigInt values to strings for JSON serialization
        const serializedOrder = JSON.parse(JSON.stringify(order, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
        
        return res.json(serializedOrder);
    } catch (error: any) {
        console.error('1inch Fusion Swap API Error:', error.response?.data || error.message);
        
        if (error.response?.data) {
            return res.status(error.response.status || 500).json({ 
                error: '1inch Fusion Swap API Error', 
                details: error.response.data 
            });
        }
        return res.status(500).json({ error: 'Failed to execute bridge swap', details: error.message });
    }
};
