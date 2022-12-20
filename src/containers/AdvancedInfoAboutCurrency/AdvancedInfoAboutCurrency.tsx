import {Box, Container} from "@mui/material";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {fetchCoin} from "./utils/fetchCoin";
import {useParamCoin,CoinInfoTypes} from "./utils/interfaces";


const AdvancedInfoAboutCurrency = () => {
    const {coin} = useParams<useParamCoin>()
    const [coinInfo, setCoinInfo] = useState<CoinInfoTypes>({} as CoinInfoTypes)

    useEffect(() => {
        (async () => {
            if (coin) {
                setCoinInfo(await fetchCoin(coin))
            }

        })()
    }, [coin])
    return (
        <Box>
            <button onClick={()=>console.log(coinInfo)}></button>
            {coinInfo?.name}
            {coinInfo.priceData?.currentPrice}
        </Box>
    )
}

export default AdvancedInfoAboutCurrency