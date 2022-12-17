import axios, {AxiosResponse} from "axios";

export const fetchAllCoins = () => {
    return axios.get<any[]>("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d")
        .then((res: AxiosResponse) => res.data);
}

//export const fetchAllCoins = () => {
//    return fetch(
//        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10
//        &page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`).then((response) => response.json()).then((data) => data)
//}