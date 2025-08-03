export interface Transaction {
    id: string;
    type: 'swap' | 'bridge';
    fromToken: string;
    toToken: string;
    fromAmount: string;
    toAmount: string;
    status: 'completed' | 'pending' | 'failed';
    timestamp: string;
    hash: string;
    gasUsed: string;
    network: string;
}
