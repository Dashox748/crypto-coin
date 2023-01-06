import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  OutlinedInput,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { useParams } from "react-router-dom";
import { fetchCoin, fetchCoinChartData } from "./utils/fetchCoin";
import { CoinInfoTypes, FetchCoinTypes } from "./utils/interfaces";
import createGeneralInfoItem from "./utils/generalInfoItems";
import Item from "./utils/styled";
import { CoinDataTypes } from "./utils/interfaces";
import LinearProgress from "@mui/material/LinearProgress";
import StarIcon from "@mui/icons-material/Star";
import useResponsive from "../../utils/hooks/useResponsive";
import AdvancedChart from "./utils/advancedChart";
import BasicCurrencyStats from "./utils/basicCurrencyStats";
import CustomizedTables from "./utils/percentChangeTable";

const AdvancedInfoAboutCurrency = ({ setFetching }: any) => {
  const down540px = useResponsive("down", 540);
  const { coin } = useParams<string>();
  const [coinChartDays, setCoinChartDays] = useState<string>("7");
  const [coinChartType, setCoinChartType] = useState<string>("prices");
  const [coinData, setCoinData] = useState<any>();
  const [coinInfo, setCoinInfo] = useState<FetchCoinTypes>(
    {} as FetchCoinTypes
  );
  const [currencyValue, setCurrencyValue] = useState<number | string>(1);
  const [cryptoValue, setCryptoValue] = useState<number | string>(1);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (!newAlignment) return;
    if (newAlignment.length > 3) {
      setCoinChartType(newAlignment);
      return;
    }
    setCoinChartDays(newAlignment);
  };
  useEffect(() => {
    setFetching(true);
    (async () => {
      if (coin) {
        setCoinInfo(await fetchCoin(coin));
      }
      setFetching(false);
    })();
  }, [coin]);

  useEffect(() => {
    (async () => {
      if (coin) {
        setCoinData(
          await fetchCoinChartData(coin, coinChartDays, coinChartType)
        );
      }
    })();
  }, [coin, coinChartDays, coinChartType]);

  const handleCurrencyInput = (value: any) => {
    setCurrencyValue(value);
    if (!value) {
      setCryptoValue("");
      return;
    }
    setCryptoValue(value * coinInfo?.market_data?.current_price.usd);
  };
  const handleCryptoInput = (value: any) => {
    setCryptoValue(value);
    if (!value) {
      setCurrencyValue("");
      return;
    }
    setCurrencyValue(coinInfo?.market_data?.current_price.usd / value);
  };
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection={down540px ? "column" : "row"}
              padding="0 2rem 20px 3rem"
              gap="1rem"
            >
              <ToggleButtonGroup
                color="primary"
                value={coinChartType}
                exclusive
                aria-label="Platform"
                onChange={handleChange}
              >
                <ToggleButton value="prices">Price</ToggleButton>
                <ToggleButton value="market_caps">Market Cap</ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                color="primary"
                value={coinChartDays}
                exclusive
                aria-label="Platform"
                onChange={handleChange}
              >
                <ToggleButton value="1">1D</ToggleButton>
                <ToggleButton value="7">1W</ToggleButton>
                <ToggleButton value="30">1M</ToggleButton>
                <ToggleButton value="365">1Y</ToggleButton>
                <ToggleButton value="max">All</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Container
              maxWidth={false}
              sx={{
                width: "100%",
                flexGrow: "1",
                height: !down540px ? "500px" : "400px",
                padding: "0!important",
              }}
            >
              <AdvancedChart
                chartData={coinData}
                coinChartDays={coinChartDays}
                coinChartType={coinChartType}
              />
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
          <Item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "15px",
            }}
          >
            <Typography variant="h4" color="white">
              Currency Converter
            </Typography>
            <OutlinedInput
              onChange={(event) => handleCurrencyInput(event.target.value)}
              value={currencyValue}
              placeholder="1,00"
              endAdornment={<InputAdornment position="end">USD</InputAdornment>}
            />
            <OutlinedInput
              onChange={(event) => handleCryptoInput(event.target.value)}
              value={cryptoValue}
              placeholder="1,00"
              endAdornment={
                <InputAdornment position="end">
                  {coinInfo?.symbol?.toUpperCase()}
                </InputAdornment>
              }
            />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvancedInfoAboutCurrency;
