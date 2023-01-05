import axios, { AxiosResponse } from "axios";
import { FetchCoinTypes, CoinInfoTypes } from "./interfaces";

export const fetchCoin = async (coin: string): Promise<FetchCoinTypes> => {
  return await axios
    .get(`https://api.coingecko.com/api/v3/coins/${coin}`)
    .then((res: AxiosResponse) => res.data);
};

export const fetchCoinChartData = async (coin: string,days:number,coinChartType:string) => {
    console.log(coinChartType)
    const whichFormat=(item:any)=>{
        if(days==="1"){return new Date(item).toLocaleTimeString("sv").slice(0, 5) }
        if(days==="7"){return new Date(item).toLocaleDateString("en-us", {weekday: 'long'});}
        if(days==="30"){return new Date(item).toLocaleString("sv").slice(5, 10)}
        if(days==="365"){return new Date(item).toLocaleString("sv").slice(0,7)}
        if(days==="max"){return new Date(item).toLocaleString("sv").slice(0,4)}
    }
  return await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`
    )
    .then((res: AxiosResponse) => {
        const fixed = res.data.prices[res.data.prices.length-1][1] >= 2 ? 0 : 4;
        const what = coinChartType ==="prices"?res.data.prices:res.data.market_caps
      let tempData: any = [];
      what.map((item: any) => {
        let obj = {
            date: whichFormat(item[0]),
            price: Number(item[1]?.toFixed(fixed)),
        };
        tempData.push(obj);
      });
      return tempData;
    });
};
