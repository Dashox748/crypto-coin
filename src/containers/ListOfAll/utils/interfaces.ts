export interface FetchAllCoins {
    id: string,
    name: string,
    image: string,
    current_price: number,
    price_change_percentage_1h_in_currency: number,
    price_change_percentage_24h_in_currency: number,
    price_change_percentage_7d_in_currency: number,
    market_cap: number,
    sparkline_in_7d: number[],
}

export interface AllCoinsState{
    id: number,
    Name: {
        Name: string,
        img: string,
        link: string,
    },
    Price: number,
    "1h%": number,
    "24h%": number,
    "7d%": number,
    "Market Cap": number,
    "7 Day Chart": {
        sparkline:number[],
        change:number
    },
}