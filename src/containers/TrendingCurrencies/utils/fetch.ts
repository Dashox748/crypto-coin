import axios, { AxiosResponse } from "axios";
import { FetchAllCoins } from "../../ListOfAll/utils/interfaces";

export const fetchAllCoins = async () => {
  let x = await axios
    .get<any>(`https://api.coingecko.com/api/v3/search/trending`)
    .then((res: AxiosResponse) =>
      res.data.coins.map((coin: any) => coin.item.id)
    );

  return await axios
    .get<FetchAllCoins>(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${x[0]}%2C${x[1]}%2C${x[2]}%2C${x[3]}%2C${x[4]}%2C${x[5]}%2C${x[6]}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
    )
    .then((res: AxiosResponse) => res.data);
};
