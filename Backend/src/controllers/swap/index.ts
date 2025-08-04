import { Request, Response } from 'express';
import axios from 'axios';

import { QuoteResponse, SwapResponse } from '../../types/1inch';

const INCH_API_KEY = process.env.INCH_API_KEY || 'dIwJMkiQDczcNnDRH0omIJnddPdwLsX4'; // Get API key from environment
const INCH_API_URL = 'https://api.1inch.dev/swap/v5.0';

const getApiUrl = (chainId: number, path: string) => {
    return `${INCH_API_URL}/${chainId}${path}`;
}

export const getQuote = async (req: Request, res: Response) => {
    const { 
        fromTokenAddress, 
        toTokenAddress, 
        amount, 
        chainId,
        slippage,
        includeTokensInfo,
        includeProtocols,
        includeGas,
        complexityLevel,
        gasLimit,
        mainRouteParts,
        parts,
        gasPrice,
        allowPartialFill,
        compatibility,
        usePermit2
    } = req.query;

    if (!fromTokenAddress || !toTokenAddress || !amount || !chainId) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        // Build query parameters
        const params = new URLSearchParams({
            fromTokenAddress: fromTokenAddress as string,
            toTokenAddress: toTokenAddress as string,
            amount: amount as string,
        });

        // Add optional parameters if they exist
        if (slippage) params.append('slippage', slippage as string);
        if (includeTokensInfo) params.append('includeTokensInfo', includeTokensInfo as string);
        if (includeProtocols) params.append('includeProtocols', includeProtocols as string);
        if (includeGas) params.append('includeGas', includeGas as string);
        if (complexityLevel) params.append('complexityLevel', complexityLevel as string);
        if (gasLimit) params.append('gasLimit', gasLimit as string);
        if (mainRouteParts) params.append('mainRouteParts', mainRouteParts as string);
        if (parts) params.append('parts', parts as string);
        if (gasPrice) params.append('gasPrice', gasPrice as string);
        if (allowPartialFill) params.append('allowPartialFill', allowPartialFill as string);
        if (compatibility) params.append('compatibility', compatibility as string);
        if (usePermit2) params.append('usePermit2', usePermit2 as string);

        const url = getApiUrl(Number(chainId), `/quote?${params.toString()}`);
        console.log('Making request to:', url);
        
        const { data } = await axios.get<QuoteResponse>(url, {
            headers: {
                Authorization: `Bearer ${INCH_API_KEY}`,
            }
        });
        return res.json(data);
    } catch (error: any) {
        console.error('1inch API Error:', error.response?.data || error.message);
        
        if (error.response?.data) {
            return res.status(error.response.status || 500).json({ 
                error: '1inch API Error', 
                details: error.response.data 
            });
        }
        return res.status(500).json({ error: 'Failed to get quote', details: error.message });
    }
};

export const swap = async (req: Request, res: Response) => {
    const { fromTokenAddress, toTokenAddress, amount, fromAddress, slippage, chainId } = req.body;

    if (!fromTokenAddress || !toTokenAddress || !amount || !fromAddress || !slippage || !chainId) {
        return res.status(400).json({ error: 'Missing required body parameters' });
    }

    try {
        const url = getApiUrl(Number(chainId), `/swap?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}&fromAddress=${fromAddress}&slippage=${slippage}`);
        console.log('Making swap request to:', url);
        
        const { data } = await axios.get<SwapResponse>(url, {
            headers: {
                Authorization: `Bearer ${INCH_API_KEY}`,
            },
        });
        return res.json(data);
    } catch (error: any) {
        console.error('1inch Swap API Error:', error.response?.data || error.message);
        
        if (error.response?.data) {
            return res.status(error.response.status || 500).json({ 
                error: '1inch Swap API Error', 
                details: error.response.data 
            });
        }
        return res.status(500).json({ error: 'Failed to execute swap', details: error.message });
    }
};
