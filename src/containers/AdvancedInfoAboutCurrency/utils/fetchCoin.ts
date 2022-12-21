import axios, { AxiosResponse } from "axios";
import { FetchCoinTypes, CoinInfoTypes } from "./interfaces";

export const fetchCoin = async (coin: string): Promise<FetchCoinTypes> => {
  return await axios
    .get(`https://api.coingecko.com/api/v3/coins/${coin}`)
    .then((res: AxiosResponse) => res.data);
};
