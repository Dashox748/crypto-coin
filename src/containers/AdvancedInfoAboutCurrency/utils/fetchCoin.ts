import axios, { AxiosResponse } from "axios";
import { FetchCoinTypes, CoinInfoTypes } from "./interfaces";

export const fetchCoin = async (coin: string): Promise<FetchCoinTypes> => {
  return await axios
    .get(`https://api.coingecko.com/api/v3/coins/${coin}`)
    .then((res: AxiosResponse) => res.data);
};

type GetUsersResponse = {
  market_caps: number[][];
  prices: number[][];
  total_volume: number[][];
};
export const fetchCoinChartData = async (
  coin: string,
  days: string,
  coinChartType: string
) => {
  const whichFormat = (item: any) => {
    if (days === "1") {
      return new Date(item).toLocaleTimeString("sv").slice(0, 5);
    }
    if (days === "7") {
      return new Date(item).toLocaleDateString("en-us", { weekday: "long" });
    }
    if (days === "30") {
      return new Date(item).toLocaleString("sv").slice(5, 10);
    }
    if (days === "365") {
      return new Date(item).toLocaleString("sv").slice(0, 7);
    }
    if (days === "max") {
      return new Date(item).toLocaleString("sv").slice(0, 4);
    }
  };
  try {
    const { data, status } = await axios.get<GetUsersResponse>(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const fixed: number = data.prices[data.prices.length - 1][1] >= 2 ? 0 : 4;
    const chartTypeData =
      coinChartType === "prices" ? data.prices : data.market_caps;
    let tempData: any = [];
    chartTypeData.map((item: number[]) => {
      let obj = {
        date: whichFormat(item[0]),
        price: Number(item[1]?.toFixed(fixed)),
      };
      tempData.push(obj);
    });
    return tempData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};
