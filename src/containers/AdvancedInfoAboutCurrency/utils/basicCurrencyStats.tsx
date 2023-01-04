import { Box, Container, Typography, Button, Grid } from "@mui/material";
import changeFormat from "../../../utils/hooks/changeFormat";
import useResponsive from "../../../utils/hooks/useResponsive";

const BasicCurrencyStats = ({
  capRank,
  marketCap,
  circulatingSupply,
  totalSupply,
  symbol,
}: any) => {
  const down540px = useResponsive("down", 540);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ padding: down540px ? "35px 0" : "35px 0" }}
      flexDirection={down540px ? "column" : "row"}
      gap="11px"
    >
      <Box>
        <Typography
          variant="h6"
          sx={{
            maxHeight: down540px ? "30px" : "55px",
            height: "100%",
          }}
        >
          Cap Rank
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "500",
          }}
        >
          {capRank}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            maxHeight: down540px ? "30px" : "55px",
            height: "100%",
          }}
        >
          Market Cap
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "500",
          }}
        >
          ${changeFormat(marketCap)}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            maxHeight: down540px ? "30px" : "55px",
            height: "100%",
          }}
        >
          Circulating Supply
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "500",
          }}
        >
          {changeFormat(circulatingSupply)} {symbol?.toUpperCase()}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h6"
          sx={{
            maxHeight: down540px ? "30px" : "55px",
            height: "100%",
          }}
        >
          Total Supply
        </Typography>
        <Typography
          variant="h5"
          sx={{
            color: "white",
            fontWeight: "500",
            width: "auto",
          }}
        >
          {changeFormat(totalSupply)} {symbol?.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};

export default BasicCurrencyStats;
