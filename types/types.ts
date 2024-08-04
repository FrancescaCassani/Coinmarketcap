export interface Crypto {
    circulating_supply: number;
    cmc_rank: number;
    date_added: string;
    id: number;
    infinite_supply: boolean;
    last_updated: string;
    max_supply: number;
    name: string;
    num_market_pairs: number;
    platform: null | object;
    quote: { [key: string]: any };
    self_reported_circulating_supply: null | number;
    self_reported_market_cap: null | number;
    slug: string;
    symbol: string;
    tags: string[];
    total_supply: number;
    tvl_ratio: null | number;
}

export interface CryptoFrontend {
    name: string;
    price: number | string;
}

export interface ApiResponse {
    data: Crypto[];
    status: {
        error_code: number;
        error_message: string | null;
    };
}
