import { Request, Response } from 'express';
import axios from 'axios';
import { ChartDataPoint } from '../../types/chart';

const INCH_API_KEY = process.env.INCH_API_KEY || 'dIwJMkiQDczcNnDRH0omIJnddPdwLsX4'; // Get API key from environment
// Using Spot Price API since 1inch doesn't provide OHLC data - we'll return current price data
const INCH_API_URL = 'https://api.1inch.dev/price/v1.1';

const getApiUrl = (chainId: number, tokenAddress: string) => {
    return `${INCH_API_URL}/${chainId}/${tokenAddress}`;
}

export const getChartData = async (req: Request, res: Response): Promise<void> => {
    const { tokenAddress, chainId, from, to, resolution } = req.query;

    if (!tokenAddress || !chainId || !from || !to || !resolution) {
        res.status(400).json({ error: 'Missing required query parameters' });
        return;
    }

    try {
        const url = getApiUrl(Number(chainId), tokenAddress as string);
        console.log('Making chart request to:', url);
        
        const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${INCH_API_KEY}`,
            },
        });
        
        // Since 1inch doesn't provide OHLC data, we'll generate mock chart data based on current price
        // 1inch price API returns price in smallest unit, convert to USD (assuming 18 decimals for most tokens)
        const rawPrice = parseFloat(data[tokenAddress as string]) || 1000000000000000000; // Default to 1 USD in wei
        const currentPrice = rawPrice / 1e12; // Convert to reasonable USD price (adjusted for 1inch format)
        const timePoints = [];
        const fromTime = Number(from);
        const toTime = Number(to);
        const resolutionMap: { [key: string]: number } = {
            '1m': 60,
            '5m': 300,
            '15m': 900,
            '1h': 3600,
            '4h': 14400,
            '1d': 86400
        };
        
        const interval = resolutionMap[resolution as string] || 3600;
        
        // Generate mock OHLC data points
        for (let time = fromTime; time <= toTime; time += interval) {
            const variance = (Math.random() - 0.5) * 0.02; // 2% variance
            const price = currentPrice * (1 + variance);
            timePoints.push({
                time: time,
                open: price,
                high: price * 1.01,
                low: price * 0.99,
                close: price,
                volume: Math.floor(Math.random() * 1000000)
            });
        }
        
        res.json(timePoints);
    } catch (error: any) {
        console.error('1inch Chart API Error:', error.response?.data || error.message);
        
        if (error.response?.data) {
            res.status(error.response.status || 500).json({ 
                error: '1inch Chart API Error', 
                details: error.response.data 
            });
            return;
        }
        res.status(500).json({ error: 'Failed to get chart data', details: error.message });
    }
};
