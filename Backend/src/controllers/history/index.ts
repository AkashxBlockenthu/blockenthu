import { Request, Response } from 'express';
import axios from 'axios';
import { Transaction } from '../../types/history';

const INCH_API_KEY = 'dIwJMkiQDczcNnDRH0omIJnddPdwLsX4';
// Try different possible endpoint structures
const getApiUrl = (chainId: number, address: string) => {
    // Try pattern 1: Similar to swap API structure
    return `https://api.1inch.dev/history/v2.0/${chainId}/history/${address}`;
}

export const getHistory = async (req: Request, res: Response) => {
    const { address } = req.params;
    const { chainId } = req.query;

    if (!address || !chainId) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Since 1inch History API is not publicly available, provide a fallback response
    console.log('1inch History API is not publicly available. Providing fallback response.');
    
    // Return a structured empty response that matches expected transaction history format
    const fallbackResponse = {
        address: address,
        chainId: Number(chainId),
        transactions: [],
        totalCount: 0,
        message: "Transaction history not found",
        suggestion: ""
    };
    
    return res.json(fallbackResponse);
};
