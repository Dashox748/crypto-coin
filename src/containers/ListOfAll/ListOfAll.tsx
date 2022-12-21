import {fetchAllCoins} from "./utils/fetch";
import {useEffect, useState} from "react";
import {columns} from "./utils/gridColumnsSetup";
import {CustomDataGrid} from "./utils/gridDataTheme";
import {Box, useTheme} from "@mui/material";
import {FetchAllCoins,AllCoinsState} from "./utils/interfaces";

const ListOfAll = () => {
    const [allCoins, setAllCoins] = useState<AllCoinsState[]>([])
    const theme = useTheme()
    useEffect(() => {

        (async () => {
            const x = await fetchAllCoins()
            console.log(x)
            setAllCoins(x.map((coin: FetchAllCoins, index: number) => {
                    return {
                        id: index+1,
                        Name: {
                            Name: coin.name,
                            img: coin.image,
                            link: `/advancedInfo/${coin.id}`
                        },
                        Price: coin.current_price,
                        "1h%": coin.price_change_percentage_1h_in_currency,
                        "24h%": coin.price_change_percentage_24h_in_currency,
                        "7d%": coin.price_change_percentage_7d_in_currency,
                        "Market Cap": coin.market_cap,
                        "7 Day Chart": {
                            sparkline:coin.sparkline_in_7d,
                            change:coin.price_change_percentage_7d_in_currency
                        },
                        "Favourite": "x"
                    }
                }
            ))
        })()
    }, [])
    return (
            <Box>
            <CustomDataGrid rows={allCoins} columns={columns} rowHeight={80} autoHeight={true} disableSelectionOnClick
                            components={{NoRowsOverlay: () => (
                                    <Box width={1} display="flex" justifyContent="center" alignItems="center">
                                        <h1>Loading</h1></Box>)
                            }}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? `even${theme.palette.mode}` : 'odd'
                            }/>
        </Box>

    )
}

export default ListOfAll