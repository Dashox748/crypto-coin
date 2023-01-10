import axios, { AxiosResponse } from "axios";
import { FetchAllCoins } from "./interfaces";

export const fetchAllCoins = (currentPage: number, howManyRows: string) => {
  return axios
    .get<FetchAllCoins>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${howManyRows}&page=${currentPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    )
    .then((res: AxiosResponse) => res.data);
};
