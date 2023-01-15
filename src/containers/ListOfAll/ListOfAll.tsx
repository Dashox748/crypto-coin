import { fetchAllCoins } from "./utils/fetch";
import { useEffect, useState } from "react";
import { columns } from "./utils/gridColumnsSetup";
import { CustomDataGrid } from "./utils/gridDataTheme";
import { Box, useTheme, Typography } from "@mui/material";
import { FetchAllCoins, AllCoinsState } from "./utils/interfaces";
import useResponsive from "../../utils/hooks/useResponsive";
import Pagination from "@mui/material/Pagination";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FetchState } from "./utils/interfaces";

const ListOfAll = ({ setFetching }: FetchState) => {
  const [allCoins, setAllCoins] = useState<AllCoinsState[]>([]);
  const down1000px = useResponsive("up", 1000);
  const down750px = useResponsive("up", 750);
  const down600px = useResponsive("up", 600);
  const down450px = useResponsive("up", 600);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [howMayRows, setHowManyRows] = useState<string>("10");

  const handleRowsChange = (event: SelectChangeEvent) => {
    setHowManyRows(event.target.value);
  };
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
      const x = await fetchAllCoins(currentPage, howMayRows);
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
  }, [currentPage, howMayRows]);
  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        alignItems="center"
        color="white"
        gap="1rem"
        margin="0 4rem 30px auto"
      >
        <Typography fontWeight="600">Show Rows:</Typography>
        <Select
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          value={howMayRows}
          onChange={handleRowsChange}
          sx={{ width: "80px", height: "50px", borderRadius: "8px" }}
        >
          <MenuItem value={10} onClick={() => setCurrentPage(1)}>
            10
          </MenuItem>
          <MenuItem value={20} onClick={() => setCurrentPage(1)}>
            20
          </MenuItem>
          <MenuItem value={50} onClick={() => setCurrentPage(1)}>
            50
          </MenuItem>
          <MenuItem value={100} onClick={() => setCurrentPage(1)}>
            100
          </MenuItem>
        </Select>
      </Box>
      <CustomDataGrid
        rows={allCoins}
        columns={columns}
        rowHeight={80}
        autoHeight={true}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: () => <></>,
          Pagination: () => (
            <Pagination
              sx={{ margin: "20px auto 50px auto" }}
              count={5000 / Number(howMayRows)}
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
          "Market Cap": down600px,
          id: down600px,
          "24h%": down450px,
        }}
      />
    </Box>
  );
};

export default ListOfAll;
