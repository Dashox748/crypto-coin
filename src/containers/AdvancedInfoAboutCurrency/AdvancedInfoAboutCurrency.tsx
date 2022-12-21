import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoin } from "./utils/fetchCoin";
import { CoinInfoTypes, FetchCoinTypes } from "./utils/interfaces";

const AdvancedInfoAboutCurrency = () => {
  const { coin } = useParams<string>();
  const [coinInfo, setCoinInfo] = useState<FetchCoinTypes>(
    {} as FetchCoinTypes
  );
  console.log(coinInfo);
  useEffect(() => {
    (async () => {
      if (coin) {
        setCoinInfo(await fetchCoin(coin));
        const x = await fetchCoin(coin);
        console.log(x.market_data.current_price.usd);
      }
    })();
  }, [coin]);
  console.log(coinInfo);
  return (
    <Box>
      <button onClick={() => console.log(coinInfo)}></button>
    </Box>
  );
};

export default AdvancedInfoAboutCurrency;
