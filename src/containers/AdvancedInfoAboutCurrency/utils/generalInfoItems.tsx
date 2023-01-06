import { Box, Container, Typography, Button } from "@mui/material";

export const createGeneralInfoItem = (name: string, buttonName: string) => {
  return (
    <Box display="flex" gap="15px" alignItems="center">
      <Typography color="white">{name}: </Typography>
      <Button
        size="small"
        disabled
        variant="contained"
        sx={{ textTransform: "none" }}
      >
        {buttonName}
      </Button>
    </Box>
  );
};

export const createCoinStatsItem = (
  name: string,
  buttonName: number | string
) => {
  return (
    <Box
      display="flex"
      gap="15px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography fontWeight="600">{name}: </Typography>
      <Typography color="white" fontWeight="600" variant="subtitle1">
        {buttonName}
      </Typography>
    </Box>
  );
};
