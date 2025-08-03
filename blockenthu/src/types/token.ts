export interface Token {
    address: string;
    symbol: string;
    name: string;
    icon: string;
    decimals: number;
    balance?: string;
    price?: string;
}
