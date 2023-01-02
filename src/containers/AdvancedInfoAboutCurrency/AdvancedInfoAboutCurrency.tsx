import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCoin } from "./utils/fetchCoin";
import { CoinInfoTypes, FetchCoinTypes } from "./utils/interfaces";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  defs,
  linearGradient,
} from "recharts";
import Prices from "./utils/data";
import CoinDataTypes from "./utils/interfaces";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import StarIcon from "@mui/icons-material/Star";

const AdvancedInfoAboutCurrency = ({ setFetching }: any) => {
  const { coin } = useParams<string>();
  const [coinData, setCoinData] = useState<CoinDataTypes>();
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? "#1A2027" : "rgb(27, 26, 29)",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    let tempData = [];
    Prices.prices.map((item) => {
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
        <Grid container spacing={{ xs: 5, md: 1,lg:3,xl:5 }} columns={16}>
        <Grid item xs={16} md={12}>
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
                  variant="h3"
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
                <Typography variant="h4">Price</Typography>
                <Typography
                  variant="h4"
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
              <Box width="400px">
                <LinearProgress
                  variant="determinate"
                  value={
                    ((coinInfo?.market_data?.current_price.usd -
                      coinInfo?.market_data?.low_24h.usd) *
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
              sx={{
                width: "100%",
                flexGrow: "1",
                maxHeight: "500px",
                padding: "0!important",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={coinData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#666" />
                  <XAxis dataKey="date" interval={40} />
                  <YAxis
                    tickCount={8}
                    domain={[
                      coinData?.reduce(function (prev, curr) {
                        return prev.price < curr.price ? prev : curr;
                      }),
                      coinData?.reduce(function (prev, curr) {
                        return prev.price > curr.price ? prev : curr;
                      }),
                    ]}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    strokeWidth="2px"
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Container>
            <Box
              display="flex"
              justifyContent="space-between"
              padding="35px 15px"
            >
              <Box>
                <Typography variant="h6">Market Cap Rank</Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: "500" }}
                >
                  1
                </Typography>
              </Box>{" "}
              <Box>
                <Typography variant="h6">Market Cap</Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: "500" }}
                >
                  $322.094.383.230
                </Typography>
              </Box>{" "}
              <Box>
                <Typography variant="h6">Circulating Supply</Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: "500" }}
                >
                  19.250.168BTC
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">Total Supply</Typography>
                <Typography
                  variant="h5"
                  sx={{ color: "white", fontWeight: "500" }}
                >
                  21.000.000 BTC
                </Typography>
              </Box>
            </Box>
          </Item>
        </Grid>
          <Grid item xs={16} md={4} sx={{display:"flex",flexDirection:"column",gap:"32px"}}>
          <Item>
            <button onClick={() => console.log(coinInfo)}></button>
            <button onClick={() => console.log()}></button>
            <button onClick={() => console.log(data)}></button>
          </Item>
            <Item>
                <button onClick={() => console.log(coinInfo)}></button>
                <button onClick={() => console.log()}></button>
                <button onClick={() => console.log(data)}></button>
            </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdvancedInfoAboutCurrency;
