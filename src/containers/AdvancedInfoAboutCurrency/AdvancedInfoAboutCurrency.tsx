import { useEffect, useState } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchCoin } from "./utils/fetchCoin";
import { CoinInfoTypes, FetchCoinTypes } from "./utils/interfaces";
import createGeneralInfoItem from "./utils/generalInfoItems";
import Item from "./utils/styled";
import Prices from "./utils/data.json";
import { CoinDataTypes } from "./utils/interfaces";
import LinearProgress from "@mui/material/LinearProgress";
import StarIcon from "@mui/icons-material/Star";
import changeFormat from "../../utils/hooks/changeFormat";
import useResponsive from "../../utils/hooks/useResponsive";
import AdvancedChart from "./utils/advancedChart";
import BasicCurrencyStats from "./utils/basicCurrencyStats";
import CustomizedTables from "./utils/percentChangeTable";

const AdvancedInfoAboutCurrency = ({ setFetching }: any) => {
  const down540px = useResponsive("down", 540);
  const { coin } = useParams<string>();
  const [coinData, setCoinData] = useState<any>();
  const [coinInfo, setCoinInfo] = useState<FetchCoinTypes>(
    {} as FetchCoinTypes
  );
  useEffect(() => {
    setFetching(true);
    (async () => {
      if (coin) {
        setCoinInfo(await fetchCoin(coin));
        const x = await fetchCoin(coin);
      }
      setFetching(false);
    })();
  }, [coin]);

  useEffect(() => {
    let tempData: any = [];
    Prices.prices.map((item: any) => {
      let obj = {
        date: new Date(item[0]).toLocaleTimeString("sv").slice(0, 5),
        price: item[1].toFixed(0),
      };
      tempData.push(obj);
    });
    setCoinData(tempData);
  }, []);

  return (
    <Box width="100%" height="100%">
      <Grid container spacing={{ xs: 5, md: 5, lg: 3, xl: 5 }} columns={17}>
        <Grid item xs={17} md={17} lg={12}>
          <Item
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              padding="30px"
              display="flex"
              flexDirection="column"
              gap="15px"
            >
              <Box display="flex" gap="10px">
                <img
                  style={{ width: "50px", height: "50px" }}
                  src={coinInfo?.image?.small}
                />
                <Typography
                  variant={down540px ? "h4" : "h3"}
                  sx={{ color: "white", fontWeight: "600" }}
                >
                  {coinInfo?.name}
                </Typography>
                <Typography variant="h5">
                  {coinInfo?.symbol?.toUpperCase()}
                </Typography>
                <StarIcon sx={{ color: "orange" }} />
              </Box>
              <Box display="flex" alignItems="center" gap="15px">
                <Typography variant={down540px ? "h5" : "h4"}>Price</Typography>
                <Typography
                  variant={down540px ? "h5" : "h4"}
                  sx={{ color: "white", fontWeight: "600" }}
                >
                  ${coinInfo?.market_data?.current_price.usd}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color:
                      coinInfo?.market_data?.price_change_percentage_24h > 0
                        ? "rgb(0, 224, 142)"
                        : "red",
                    fontWeight: "500",
                  }}
                >
                  {coinInfo?.market_data?.price_change_percentage_24h.toFixed(
                    2
                  )}
                  %
                  <span
                    style={{
                      marginLeft: "5px",
                      fontSize: "15px",
                      color: "gray",
                    }}
                  >
                    (1d)
                  </span>
                </Typography>
              </Box>
              <Box maxWidth="400px">
                <LinearProgress
                  variant="determinate"
                  value={
                    ((coinInfo?.market_data?.current_price.usd -
                      coinInfo?.market_data?.low_24h?.usd) *
                      100) /
                    (coinInfo?.market_data?.high_24h.usd -
                      coinInfo?.market_data?.low_24h.usd)
                  }
                  sx={{
                    width: "100%",
                    height: "12px",
                    borderRadius: "8px",
                    marginBottom: "5px",
                  }}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginBottom="25px"
                >
                  <Typography sx={{ color: "white", fontWeight: "600" }}>
                    ${coinInfo?.market_data?.low_24h.usd}
                  </Typography>
                  <Typography sx={{ color: "white", fontWeight: "600" }}>
                    24h range
                  </Typography>
                  <Typography sx={{ color: "white", fontWeight: "600" }}>
                    ${coinInfo?.market_data?.high_24h.usd}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Container
              maxWidth={false}
              sx={{
                width: "100%",
                flexGrow: "1",
                height: "500px",
                padding: "0!important",
              }}
            >
              <AdvancedChart chartData={coinData} />
            </Container>

            <Box
              padding={down540px ? "0" : "1rem"}
              display="flex"
              flexDirection="column"
              gap="2rem"
            >
              <BasicCurrencyStats
                capRank={coinInfo?.market_cap_rank}
                marketCap={coinInfo?.market_data?.market_cap?.usd}
                circulatingSupply={coinInfo?.market_data?.circulating_supply}
                totalSupply={coinInfo?.market_data?.total_supply}
                symbol={coinInfo?.symbol}
              />
              <CustomizedTables
                change1h={
                  coinInfo?.market_data?.price_change_percentage_1h_in_currency
                    .usd
                }
                change24h={coinInfo?.market_data?.price_change_percentage_24h}
                change7d={coinInfo?.market_data?.price_change_percentage_7d}
                change30d={coinInfo?.market_data?.price_change_percentage_30d}
                change1y={coinInfo?.market_data?.price_change_percentage_1y}
              />
            </Box>
          </Item>
        </Grid>
        <Grid
          item
          xs={17}
          md={17}
          lg={5}
          xl={4}
          sx={{ display: "flex", flexDirection: "column", gap: "32px" }}
        >
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "20px",
            }}
          >
            <Typography variant="h5" color="white">
              General Info
            </Typography>
            {createGeneralInfoItem("Rank", "1")}
            {createGeneralInfoItem("Categories", "Cryptocurrency")}
            {createGeneralInfoItem("Comunity", "Reddit")}
            {createGeneralInfoItem("Homepage", "www.bitcoin.org")}
            {createGeneralInfoItem("Blockchains", "blockchair.com")}
          </Item>
          <Item>
            <button onClick={() => console.log(coinInfo)}></button>
            <button onClick={() => console.log(coinData)}></button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvancedInfoAboutCurrency;
