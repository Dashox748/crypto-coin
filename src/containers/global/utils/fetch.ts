import axios, { AxiosResponse } from "axios";
import { fetchCoins } from "./interfaces";

export const fetchMostPopularCrypto = () => {
  return axios
    .get<fetchCoins>(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cdogecoin%2Cethereum%2Cterra-luna-2&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
    .then((res: AxiosResponse) => res.data);
};
