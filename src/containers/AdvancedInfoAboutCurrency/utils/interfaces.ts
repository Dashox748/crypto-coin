export type useParamCoin = {
  coin: string;
};

interface ComunityLinks {
  reddit: string;
  github: string;
}

interface Links {
  homepage: string;
  blockchain: string;
  comunity: ComunityLinks;
}

interface Prices {
  currentPrice: number;
  priceChange_1h: number;
  priceChange_24h: number;
  priceChange_7d: number;
  priceChange_30d: number;
  priceChange_1y: number;
  marketCap: number;
}

interface Stats {
  marketCapRank: number;
  ciruclatingSupply: number;
  maxSupply: number | null;
}

export interface CoinInfoTypes {
  id: string;
  name: string;
  symbol: string;
  image: string;
  description: string | null;
  rank: number;
  links: Links;
  statsData: Stats;
  priceData: Prices;
}

interface image {
  small: string;
}

interface language {
  en: string;
}

interface reposLinks {
  github: string;
}

interface pages {
  homepage: string;
  blockchain_site: string;
  subreddit_url: string;
  repos_url: reposLinks;
}

interface currency {
  usd: number;
}

interface market {
  market_cap_rank: number;
  circulating_supply: number;
  max_supply: number;
  current_price: currency;
  price_change_percentage_1h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_30d: number;
  price_change_percentage_1y: number;
  market_cap: currency;
}

export interface FetchCoinTypes {
  id: string;
  name: string;
  symbol: string;
  image: image;
  description: language;
  coingecko_rank: number;
  links: pages;
  market_data: market;
}

export interface coinDataTypes {
  price: number;
  date: number;
}
