export interface Transaction {
    id: string;
    type: string;
    fromToken: string;
    toToken: string;
    fromAmount: string;
    toAmount: string;
    status: string;
    date: string;
}
