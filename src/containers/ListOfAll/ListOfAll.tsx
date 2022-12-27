import { fetchAllCoins } from "./utils/fetch";
import React, { Dispatch, useEffect, useState } from "react";
import { columns } from "./utils/gridColumnsSetup";
import { CustomDataGrid } from "./utils/gridDataTheme";
import { Box, useTheme } from "@mui/material";
import { FetchAllCoins, AllCoinsState } from "./utils/interfaces";
import useResponsive from "../../utils/hooks/useResponsive";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";

const ListOfAll = ({ setFetching }: any) => {
  const [allCoins, setAllCoins] = useState<AllCoinsState[]>([]);
  const down1000px = useResponsive("up", 1000);
  const down750px = useResponsive("up", 750);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [fetching, setFetching] = useState(false);

  const handleChangeCurrentPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  const theme = useTheme();
  useEffect(() => {
    setFetching(true);
    (async () => {
      const x = await fetchAllCoins(currentPage);
      console.log(x);
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
  }, [currentPage]);
  return (
    <Box display="flex" flexDirection="column">
      <CustomDataGrid
        rows={allCoins}
        columns={columns}
        rowHeight={80}
        autoHeight={true}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: () => (
            <></>
            // <Box
            //   width={1}
            //   display="flex"
            //   justifyContent="center"
            //   alignItems="center"
            // >
            //   <h1>Loading</h1>
            // </Box>
          ),
          Pagination: () => (
            <Pagination
              sx={{ margin: "20px auto 50px auto" }}
              count={11}
              defaultPage={currentPage}
              onChange={handleChangeCurrentPage}
            />
          ),
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0
            ? `even${theme.palette.mode}`
            : "odd"
        }
        columnVisibilityModel={{
          "1h%": down750px,
          "7 Day Chart": down1000px,
        }}
      />
    </Box>
  );
};

export default ListOfAll;
