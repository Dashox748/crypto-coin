import axios, {AxiosResponse} from "axios";

export const fetchCoin = async(coin: string) => {
    return await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coin}`
    )
        .then((res: AxiosResponse) => {
            return {
                id: res.data.id,
                name: res.data.name,
                symbol: res.data.symbol,
                image:res.data.image.small,
                description: res.data.description.en,
                rank:res.data.coingecko_rank,
                links: {
                    homepage: res.data.links.homepage[0],
                    blockchain: res.data.links.blockchain_site[0],
                    comunity: {
                        reddit: res.data.links.subreddit_url,
                        github: res.data.links.repos_url.github[0]
                    }
                },
                statsData:{
                    marketCapRank:res.data.market_data.market_cap_rank,
                    ciruclatingSupply:res.data.market_data.circulating_supply,
                    maxSupply:res.data.market_data.max_supply,
                }
                ,
                priceData:{
                    currentPrice:res.data.market_data.current_price.usd,
                    priceChange_1h:res.data.market_data.price_change_percentage_1h,
                    priceChange_24h:res.data.market_data.price_change_percentage_24h,
                    priceChange_7d:res.data.market_data.price_change_percentage_7d,
                    priceChange_30d:res.data.market_data.price_change_percentage_30d,
                    priceChange_1y:res.data.market_data.price_change_percentage_1y,
                    marketCap:res.data.market_data.market_cap.usd,
                }
            }
        });
}

