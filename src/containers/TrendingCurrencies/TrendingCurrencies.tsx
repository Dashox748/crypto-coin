import React, { Dispatch, useEffect, useState } from "react";
import { columns } from "../ListOfAll/utils/gridColumnsSetup";
import { CustomDataGrid } from "../ListOfAll/utils/gridDataTheme";
import { Box, useTheme } from "@mui/material";
import { FetchAllCoins, AllCoinsState } from "../ListOfAll/utils/interfaces";
import { fetchAllCoins } from "./utils/fetch";
import useResponsive from "../../utils/hooks/useResponsive";

const TrendingCurrencies = ({ setFetching }: any) => {
  const [allCoins, setAllCoins] = useState<AllCoinsState[]>([]);
  const down1000px = useResponsive("up", 1000);
  const down750px = useResponsive("up", 750);
  const down600px = useResponsive("up", 600);
  const down450px = useResponsive("up", 600);

  const theme = useTheme();
  useEffect(() => {
    setFetching(true);
    (async () => {
      const x = await fetchAllCoins();
      setAllCoins(
        x.map((coin: FetchAllCoins, index: number) => {
          return {
            id: index + 1,
            Name: {
              Name: coin.name,
              img: coin.image,
              link: `/advancedInfo/${coin.id}`,
            },
            Price: coin.current_price,
            "1h%": coin.price_change_percentage_1h_in_currency,
            "24h%": coin.price_change_percentage_24h_in_currency,
            "7d%": coin.price_change_percentage_7d_in_currency,
            "Market Cap": coin.market_cap,
            "7 Day Chart": {
              sparkline: coin.sparkline_in_7d,
              change: coin.price_change_percentage_7d_in_currency,
            },
          };
        })
      );
      setFetching(false);
    })();
  }, []);
  return (
    <Box display="flex" flexDirection="column">
      <CustomDataGrid
        rows={allCoins}
        columns={columns}
        rowHeight={80}
        autoHeight={true}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: () => <></>,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0
            ? `even${theme.palette.mode}`
            : "odd"
        }
        columnVisibilityModel={{
          "1h%": down750px,
          "7 Day Chart": down1000px,
          "Market Cap": down600px,
          id: down600px,
          "24h%": down450px,
        }}
      />
    </Box>
  );
};

export default TrendingCurrencies;
