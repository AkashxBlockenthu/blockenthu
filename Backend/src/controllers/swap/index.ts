import { Request, Response } from 'express';
import axios from 'axios';

import { QuoteResponse, SwapResponse } from '../../types/1inch';

const INCH_API_KEY = process.env.INCH_API_KEY || 'dIwJMkiQDczcNnDRH0omIJnddPdwLsX4'; // Get API key from environment
const INCH_API_URL = 'https://api.1inch.dev/swap/v5.0';

const getApiUrl = (chainId: number, path: string) => {
    return `${INCH_API_URL}/${chainId}${path}`;
}

export const getQuote = async (req: Request, res: Response) => {
    const { fromTokenAddress, toTokenAddress, amount, chainId } = req.query;

    if (!fromTokenAddress || !toTokenAddress || !amount || !chainId) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const url = getApiUrl(Number(chainId), `/quote?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}`);
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
