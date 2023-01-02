import {Box, Container, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchCoin} from "./utils/fetchCoin";
import {CoinInfoTypes, FetchCoinTypes} from "./utils/interfaces";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    defs,
    linearGradient
} from 'recharts';
import Prices from "./utils/data"
import CoinDataTypes from "./utils/interfaces"
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import StarIcon from "@mui/icons-material/Star";

const AdvancedInfoAboutCurrency = ({setFetching}: any) => {
    const {coin} = useParams<string>();
    const [coinData, setCoinData] = useState<CoinDataTypes>()
    const [coinInfo, setCoinInfo] = useState<FetchCoinTypes>(
        {} as FetchCoinTypes
    );
//    console.log(coinData)
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

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    useEffect(() => {
        let tempData = []
        Prices.prices.map((item) => {
            let obj = {
                date: new Date(item[0]).toLocaleTimeString('sv').slice(0, 5),
                price: item[1].toFixed(0)
            }
            tempData.push(obj)
        })
        setCoinData(tempData)
    }, [])

    return (
        <Box width="100%" height="100%">
            <Grid container spacing={4} columns={16}>
                <Grid item xs={12}>
                    <Item sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left!important",
                    }}>
                        <Box display="flex" padding="25px" gap="10px">
                            <img style={{width: "50px", height: "50px"}} src={coinInfo?.image?.small}/>
                            <Typography variant="h3"
                                        sx={{color: "white", fontWeight: "600"}}>{coinInfo?.name}</ Typography>
                            <Typography variant="h5">{coinInfo?.symbol?.toUpperCase()}</ Typography>
                            <StarIcon sx={{color:"orange"}}/>
                        </Box>
                        <LinearProgress variant="determinate" value={((16733 - 16540) * 100) / (16759 - 16540)}
                                        sx={{
                                            width: "400px",
                                            height: "12px",
                                            borderRadius: "8px",
                                            marginBottom: "50px"
                                        }}/>
                        <Container sx={{width: "100%", flexGrow: "1", maxHeight: "500px", padding: "0!important"}}>
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
                                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} stroke="#666"/>
                                    <XAxis dataKey="date" interval={40}/>
                                    <YAxis tickCount={8} domain={[coinData?.reduce(function (prev, curr) {
                                        return prev.price < curr.price ? prev : curr;
                                    }), coinData?.reduce(function (prev, curr) {
                                        return prev.price > curr.price ? prev : curr;
                                    })]}/>
                                    <Tooltip/>
                                    <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1}
                                          fill="url(#colorPrice)"/>
                                </AreaChart>
                            </ResponsiveContainer>
                        </Container>
                    </Item>

                </Grid>
                <Grid item xs={4}>
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
