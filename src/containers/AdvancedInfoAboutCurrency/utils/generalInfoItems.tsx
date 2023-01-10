import { Box, Typography, Button } from "@mui/material";

export const createGeneralInfoItem = (
  infoName: string,
  infoValue: string,
  link: string
) => {
  return (
    <Box display="flex" gap="15px" alignItems="center">
      <Typography color="white">{infoName}: </Typography>
      <Button
        color="secondary"
        size="small"
        variant="contained"
        sx={{ textTransform: "none" }}
        onClick={() =>
          link !== "none"
            ? window.open(link, "_blank", "noopener,noreferrer")
            : ""
        }
      >
        {infoValue}
      </Button>
    </Box>
  );
};

export const createCoinStatsItem = (
  statName: string,
  statValue: number | string
) => {
  return (
    <Box
      display="flex"
      gap="15px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight="600">{statName}: </Typography>
      <Typography color="white" fontWeight="600" variant="subtitle1">
        {statValue}
      </Typography>
    </Box>
  );
};
