export type  useParamCoin = {
    coin: string
}

interface ComunityLinks {
    reddit: string,
    github: string
}

interface Links {
    homepage: string,
    blockchain: string,
    comunity: ComunityLinks,
}

interface Prices {
    currentPrice: number,
    priceChange_1h: number,
    priceChange_24h: number,
    priceChange_7d: number,
    priceChange_30d: number,
    priceChange_1y: number,
    marketCap: number,
}

interface Stats {
    marketCapRank: number,
    ciruclatingSupply: number,
    maxSupply: number | null,
}

export interface CoinInfoTypes {
    id: string,
    name: string,
    symbol: string,
    image: string,
    description: string | null,
    rank: number,
    links: Links,
    statsData: Stats,
    priceData: Prices,
}